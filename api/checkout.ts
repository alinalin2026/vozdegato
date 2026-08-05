import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { MONTHLY_AMOUNTS, findTier } from "../shared/donaciones.js";

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

function originOf(req: VercelRequest): string {
  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({
      error:
        "Los pagos todavía no están activados. Escríbenos a hola@vozdegato.com.",
    });
  }

  // Confirmation lookup for the success page — we trust Stripe, not the URL.
  if (req.method === "GET") {
    const id =
      typeof req.query.session_id === "string" ? req.query.session_id : "";
    if (!id)
      return res
        .status(400)
        .json({ error: "Falta el identificador de la sesión." });
    try {
      const session = await stripe.checkout.sessions.retrieve(id);
      return res.status(200).json({
        paid:
          session.payment_status === "paid" || session.status === "complete",
        amount:
          session.amount_total != null ? session.amount_total / 100 : null,
        mode: session.mode,
        label: session.metadata?.label ?? null,
      });
    } catch {
      return res
        .status(404)
        .json({ error: "No hemos encontrado esa donación." });
    }
  }

  if (req.method === "POST") {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
    const amount = Number(body.amount);
    const monthly = body.mode === "subscription";

    if (!Number.isFinite(amount)) {
      return res.status(400).json({ error: "Cantidad no válida." });
    }

    const tier = monthly ? undefined : findTier(amount);
    if (monthly ? !MONTHLY_AMOUNTS.includes(amount) : !tier) {
      return res.status(400).json({ error: "Cantidad no válida." });
    }

    const origin = originOf(req);
    const label = monthly ? `Socio/a — ${amount}€ al mes` : tier!.label;

    try {
      const session = await stripe.checkout.sessions.create({
        mode: monthly ? "subscription" : "payment",
        // The site and its whole audience are Spanish; without this Stripe
        // defaults to "auto", which reads the visitor's browser language
        // instead of showing Spanish — that's what put "Pay" and "Enter
        // shipping address" in English in front of a Spanish donor.
        locale: "es",
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "eur",
              unit_amount: Math.round(amount * 100),
              product_data: {
                name: monthly
                  ? `Apoyo mensual a Voz de Gato`
                  : `Voz de Gato — ${tier!.label}`,
                description: monthly
                  ? "Ayudas a mantener las colonias todos los meses."
                  : "Gracias por ayudar a las colonias de gatos.",
              },
              ...(monthly ? { recurring: { interval: "month" as const } } : {}),
            },
          },
        ],
        // Only ask for an address when something actually gets posted.
        ...(tier?.physical
          ? {
              shipping_address_collection: {
                allowed_countries: ["ES" as const],
              },
            }
          : {}),
        metadata: { label },
        success_url: `${origin}/donacion-completada?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/gracias`,
      });

      return res.status(200).json({ url: session.url });
    } catch (err) {
      console.error("stripe checkout failed", err);
      return res.status(502).json({
        error:
          "No hemos podido abrir el pago. Inténtalo de nuevo en unos minutos.",
      });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Método no permitido." });
}
