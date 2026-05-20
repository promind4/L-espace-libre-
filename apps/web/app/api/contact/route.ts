/**
 * POST /api/contact
 *
 * Endpoint de soumission du formulaire plat de la page Contact
 * (redesign v3 — Concept D).
 *
 *  1. Rate-limit (10 req/IP/h, partagé avec /api/simulator).
 *  2. Validation Zod stricte (prénom, nom, e-mail, téléphone optionnel,
 *     type, surface, précisions accès optionnelles).
 *  3. Calcul de la fourchette via lib/pricing (défauts publics).
 *  4. Envoi de deux e-mails transactionnels :
 *     - Prospect : son estimation + suite des opérations.
 *     - Back-office : leads@lespacelibre.fr avec toutes les coordonnées.
 *  5. Honeypot anti-bot : succès silencieux si rempli.
 *
 * En cas d'échec Resend, on renvoie 502 sans persister (pas de BDD v1).
 */
import { NextResponse, type NextRequest } from "next/server";
import { ContactQuoteSchema } from "@/lib/validation";
import { computeEstimate } from "@/lib/pricing";
import { sendContactQuoteEmails } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // 1. Rate-limit
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (rl.limited) {
    return NextResponse.json(
      { error: "rate_limit" },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfterSeconds),
        },
      },
    );
  }

  // 2. Parse + validation
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = ContactQuoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "invalid_input",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const input = parsed.data;

  // 3. Honeypot
  if (input.website && input.website.length > 0) {
    return NextResponse.json(
      { ok: true, range: { low: 0, high: 0 } },
      { status: 200 },
    );
  }

  // 4. Calcul avec les vrais critères choisis (v3 : salubrité, accès,
  //    annexes — fini les défauts hardcodés). Zone CUB par défaut
  //    public, affinée manuellement au devis ferme.
  const estimate = computeEstimate({
    type: input.type,
    surface_m2: input.surface_m2,
    annexes_surface_m2: input.annexes_surface_m2,
    floor: input.floor,
    salubrity: input.salubrity,
    zone: "cub",
  });

  // 5. Envoi e-mails
  try {
    await sendContactQuoteEmails({
      type: input.type,
      surface_m2: input.surface_m2,
      annexes: input.annexes,
      annexes_surface_m2: input.annexes_surface_m2,
      floor: input.floor,
      salubrity: input.salubrity,
      acces: input.acces,
      prenom: input.prenom,
      email: input.email,
      telephone: input.telephone || undefined,
      ville: input.ville || undefined,
      estimate,
      meta: {
        submittedAt: new Date(),
        ip,
        userAgent: req.headers.get("user-agent") ?? "unknown",
        referer: req.headers.get("referer") ?? "unknown",
      },
    });
  } catch (err) {
    console.error("[contact] sendContactQuoteEmails failed", err);
    return NextResponse.json(
      { error: "email_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      range: { low: estimate.low, high: estimate.high },
    },
    { status: 200 },
  );
}
