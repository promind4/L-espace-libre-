/**
 * POST /api/simulator
 *
 * Endpoint de soumission du Simulateur public.
 *  1. Validation Zod stricte.
 *  2. Rate-limit (10 req/IP/h).
 *  3. Calcul de la fourchette via lib/pricing.
 *  4. Envoi de deux e-mails transactionnels via Resend.
 *
 * En cas d'échec Resend, on renvoie 502 sans persister :
 * la v1 n'a pas de base de données (R2). Le PO accepte le risque
 * de perdre un lead en cas de panne complète Resend.
 */
import { NextResponse, type NextRequest } from "next/server";
import { SimulatorPublicSubmissionSchema } from "@/lib/validation";
import { computeEstimate } from "@/lib/pricing";
import { sendLeadEmails } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs"; // Resend requiert le runtime Node
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

  const parsed = SimulatorPublicSubmissionSchema.safeParse(body);
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

  // 3. Honeypot : si rempli, on simule un succès silencieux.
  if (input.website && input.website.length > 0) {
    return NextResponse.json(
      { ok: true, range: { low: 0, high: 0 } },
      { status: 200 },
    );
  }

  // 4. Calcul (valeurs publiques par défaut : normal + CUB)
  const estimate = computeEstimate({
    type: input.type,
    surface_m2: input.surface_m2,
    floor: input.floor,
    salubrity: "normal",
    zone: "cub",
  });

  // 5. Envoi e-mails
  try {
    await sendLeadEmails({
      type: input.type,
      surface_m2: input.surface_m2,
      floor: input.floor,
      email: input.email,
      estimate,
      meta: {
        submittedAt: new Date(),
        ip,
        userAgent: req.headers.get("user-agent") ?? "unknown",
        referer: req.headers.get("referer") ?? "unknown",
      },
    });
  } catch (err) {
    // Log côté serveur ; pour la v1 on remonte un 502 explicite.
    console.error("[simulator] sendLeadEmails failed", err);
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
