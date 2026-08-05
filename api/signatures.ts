import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const PETITION_KEY = "peticion:incendios-colonias:emails";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const redis = getRedis();
  if (!redis) {
    return res.status(503).json({
      error: "El almacén de firmas todavía no está conectado en este despliegue.",
    });
  }

  if (req.method === "GET") {
    const count = await redis.scard(PETITION_KEY);
    return res.status(200).json({ count });
  }

  if (req.method === "POST") {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!name || name.length > 100) {
      return res.status(400).json({ error: "Introduce tu nombre." });
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return res.status(400).json({ error: "Introduce un email válido." });
    }

    const added = await redis.sadd(PETITION_KEY, email);
    if (added) {
      await redis.hset(`peticion:incendios-colonias:firmante:${email}`, {
        name,
        signedAt: new Date().toISOString(),
      });
    }
    const count = await redis.scard(PETITION_KEY);
    return res.status(200).json({ count, alreadySigned: added === 0 });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Método no permitido." });
}
