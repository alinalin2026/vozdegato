import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

// Stripe signs the exact bytes it sent, so the body must reach us unparsed.
export const config = { api: { bodyParser: false } };

const TELEGRAM_TIMEOUT_MS = 5000;

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

async function readRawBody(req: VercelRequest): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatAmount(
  cents: number | null | undefined,
  currency: string
): string {
  const amount = (cents ?? 0) / 100;
  return `${amount.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency.toUpperCase()}`;
}

/**
 * Posts to Telegram without ever failing the webhook: a non-200 back to Stripe
 * would make it retry, and we would get duplicate alerts for one donation.
 */
async function notifyTelegram(lines: string[]): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error(
      "telegram alert skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing"
    );
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines.join("\n"),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        signal: controller.signal,
      }
    );
    if (!response.ok) {
      console.error(
        "telegram alert failed",
        response.status,
        await response.text()
      );
    }
  } catch (err) {
    console.error("telegram alert failed", err);
  } finally {
    clearTimeout(timer);
  }
}

function linesForCheckout(session: Stripe.Checkout.Session): string[] {
  const monthly = session.mode === "subscription";
  const lines = [
    monthly ? "🐱 <b>Nuevo socio/a</b>" : "🐱 <b>Nueva donación</b>",
    "",
    `💶 <b>${escapeHtml(formatAmount(session.amount_total, session.currency ?? "eur"))}</b>${
      monthly ? " al mes" : ""
    }`,
  ];

  // checkout.ts stores the tier name here, so we avoid a line_items lookup.
  const label = session.metadata?.label;
  if (label) lines.push(`🏷️ ${escapeHtml(label)}`);

  const name = session.customer_details?.name;
  if (name) lines.push(`👤 ${escapeHtml(name)}`);

  const email = session.customer_details?.email ?? session.customer_email;
  if (email) lines.push(`✉️ ${escapeHtml(email)}`);

  return lines;
}

function linesForRenewal(invoice: Stripe.Invoice): string[] {
  const lines = [
    "🔁 <b>Renovación de socio/a</b>",
    "",
    `💶 <b>${escapeHtml(formatAmount(invoice.amount_paid, invoice.currency ?? "eur"))}</b>`,
  ];

  const name = invoice.customer_name;
  if (name) lines.push(`👤 ${escapeHtml(name)}`);

  const email = invoice.customer_email;
  if (email) lines.push(`✉️ ${escapeHtml(email)}`);

  return lines;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    console.error(
      "stripe webhook not configured: missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET"
    );
    return res
      .status(503)
      .json({ error: "El webhook todavía no está configurado." });
  }

  const signature = req.headers["stripe-signature"];
  if (typeof signature !== "string") {
    return res.status(400).json({ error: "Falta la firma de Stripe." });
  }

  let event: Stripe.Event;
  try {
    const rawBody = await readRawBody(req);
    // Rejects forged payloads and replays — without this anyone who found the
    // URL could invent donations.
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("stripe webhook signature rejected", err);
    return res.status(400).json({ error: "Firma no válida." });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // Async payment methods complete the session before the money arrives.
      if (
        session.payment_status === "paid" ||
        session.payment_status === "no_payment_required"
      ) {
        await notifyTelegram(linesForCheckout(session));
      }
      break;
    }
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      // The first invoice of a subscription is already covered by the checkout
      // event above, so only later cycles are announced here.
      if (invoice.billing_reason === "subscription_cycle") {
        await notifyTelegram(linesForRenewal(invoice));
      }
      break;
    }
  }

  // Everything verified gets a 200, including events we ignore, so Stripe
  // stops redelivering them.
  return res.status(200).json({ received: true });
}
