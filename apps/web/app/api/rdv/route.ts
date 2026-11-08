import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import http from "http";
import https from "https";

type ProspectRecord = {
  id?: number;
  nom_entreprise?: string;
  metier?: string;
  dirigeant_prenom?: string;
  dirigeant_nom?: string;
  telephone?: string;
  email?: string;
  ville?: string;
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COCKPIT_BASE_URL =
  process.env["COCKPIT_API_URL"] || "http://84.235.229.203:8088";

// Jeton partagé exigé par le Cockpit (variable d'environnement Vercel, jamais dans le code)
function cockpitHeaders(extra: Record<string, string> = {}): Record<string, string> {
  const token = process.env["COCKPIT_API_TOKEN"] || "";
  return token ? { ...extra, "X-Cockpit-Token": token } : extra;
}

/**
 * Helper HTTP/HTTPS résilient (évite l'erreur UNABLE_TO_VERIFY_LEAF_SIGNATURE
 * sous Windows local et supporte les appels vers le Cockpit VPS en HTTP).
 */
function httpRequest(
  urlStr: string,
  options: {
    method?: "GET" | "POST" | "PATCH";
    headers?: Record<string, string>;
    body?: string;
    timeoutMs?: number;
  } = {}
): Promise<{ status: number; ok: boolean; text: string }> {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const isHttps = url.protocol === "https:";
    const lib = isHttps ? https : http;
    const req = lib.request(
      {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method: options.method || "GET",
        headers: options.headers || {},
        ...(isHttps ? { rejectUnauthorized: false } : {}),
        timeout: options.timeoutMs || 6000,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf-8");
          const status = res.statusCode || 500;
          resolve({
            status,
            ok: status >= 200 && status < 300,
            text,
          });
        });
      }
    );
    req.on("timeout", () => {
      req.destroy(new Error("Request timeout"));
    });
    req.on("error", reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

const httpsRequest = httpRequest;

/**
 * Récupère la fiche prospect depuis le Cockpit VPS par son ID (`ref`)
 */
async function fetchCockpitProspect(refId: string): Promise<ProspectRecord | null> {
  const clean = String(refId || "").trim();
  if (!/^\d+$/.test(clean)) return null;
  try {
    const res = await httpRequest(
      `${COCKPIT_BASE_URL}/api/public/rdv/${clean}`,
      { method: "GET", headers: cockpitHeaders(), timeoutMs: 2500 }
    );
    if (res.ok && res.text) {
      return JSON.parse(res.text);
    }
  } catch (e) {
    console.warn("[COCKPIT PREFILL FETCH WARN]", e);
  }
  return null;
}

/**
 * Synchronise le statut du prospect dans le Cockpit VPS
 */
async function updateCockpitProspectStatus(
  refId: string,
  updates: Record<string, unknown>
): Promise<void> {
  const clean = String(refId || "").trim();
  if (!/^\d+$/.test(clean)) return;
  try {
    await httpRequest(`${COCKPIT_BASE_URL}/api/prospects/${clean}`, {
      method: "PATCH",
      headers: cockpitHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(updates),
      timeoutMs: 3500,
    });
  } catch (e) {
    console.warn("[COCKPIT STATUS UPDATE WARN]", e);
  }
}

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref") || "";
  if (!ref || !/^\d+$/.test(ref.trim())) {
    return NextResponse.json({ ok: false, prospect: null });
  }
  const prospect = await fetchCockpitProspect(ref);
  if (!prospect) {
    return NextResponse.json({ ok: false, prospect: null }, { status: 404 });
  }
  // Réponse publique : jamais d'e-mail ni de téléphone (les identifiants `ref` se suivent et sont devinables)
  return NextResponse.json({
    ok: true,
    prospect: {
      nom_entreprise: prospect.nom_entreprise || "",
      dirigeant_prenom: prospect.dirigeant_prenom || "",
      dirigeant_nom: prospect.dirigeant_nom || "",
      ville: prospect.ville || "",
    },
  });
}

/**
 * Envoie une notification instantanée à Kesiah et à son adresse de secours.
 * Priorité à Resend afin de préserver 100% du quota journalier Brevo (300/jour)
 * pour la prospection BTP, avec bascule automatique sur Brevo en cas d'erreur.
 */
async function sendAlertNotification({
  subject,
  htmlContent,
}: {
  subject: string;
  htmlContent: string;
}): Promise<void> {
  const resendKey = process.env["RESEND_API_KEY"] || "";

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from: "Kesiah & Partenaires <contact@lespace-libre.fr>",
        to: ["kesiah@lespace-libre.fr", "flowmind303@gmail.com"],
        subject,
        html: htmlContent,
      });
      if (!error) {
        console.log("[RESEND ALERT NOTIFICATION OK]", subject);
        return;
      }
      console.warn("[RESEND ALERT RETURNED ERROR - FALLING BACK TO BREVO]", error);
    } catch (resendErr) {
      console.warn("[RESEND ALERT FAILED - FALLING BACK TO BREVO]", resendErr);
    }
  }

  // Repli sur Brevo (1 seul destinataire car kesiah@lespace-libre.fr redirige déjà vers flowmind303@gmail.com)
  const brevoApiKey = process.env["BREVO_API_KEY"] || "";
  if (!brevoApiKey) {
    console.error("[ALERT NOTIFICATION SKIPPED] RESEND_API_KEY et BREVO_API_KEY absents ou en échec");
    return;
  }

  try {
    const brevoPayload = {
      sender: {
        name: "Kesiah & Partenaires (Alertes Leads)",
        email: "kesiah@lespace-libre.fr",
      },
      to: [{ email: "kesiah@lespace-libre.fr", name: "Kesiah" }],
      subject,
      htmlContent,
    };

    const res = await httpsRequest("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(brevoPayload),
    });

    console.log("[BREVO ALERT NOTIFICATION]", res.status, res.text);
  } catch (brevoErr) {
    console.error("[BREVO ALERT ALSO FAILED]", brevoErr);
  }
}

/**
 * Formate un numéro français ou international au format E.164 (+33612345678)
 * attendu par Tally / Make pour l'envoi du SMS de validation APC.
 */
function formatPhoneE164(raw: string): string {
  const cleaned = raw.replace(/[\s.\-()]/g, "");
  if (cleaned.startsWith("+")) {
    return cleaned;
  }
  if (cleaned.startsWith("00")) {
    return "+" + cleaned.slice(2);
  }
  if (cleaned.startsWith("33") && cleaned.length === 11) {
    return "+" + cleaned;
  }
  if (cleaned.startsWith("0") && cleaned.length === 10) {
    return "+33" + cleaned.slice(1);
  }
  return cleaned;
}

const TALLY_HEADERS = {
  "Content-Type": "application/json",
  "tally-version": "2025-01-15",
  Origin: "https://tally.so",
  Referer: "https://tally.so/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

function esc(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Journal de mesure du tunnel (consultable dans Vercel > Logs, filtre "RDV_EVENT")
    if (body?.step === "event") {
      const name = String(body.event || "");
      if (/^[a-z0-9_]{1,40}$/.test(name)) {
        const props: Record<string, string> = {};
        for (const [k, v] of Object.entries(body as Record<string, unknown>)) {
          if (k === "step" || k === "event") continue;
          if (/^[A-Za-z0-9_]{1,30}$/.test(k) && ["string", "number", "boolean"].includes(typeof v)) {
            props[k] = String(v).slice(0, 80);
          }
        }
        console.log("[RDV_EVENT]", JSON.stringify({ event: name, ...props }));
      }
      return NextResponse.json({ ok: true });
    }
    const {
      step = "1",
      entreprise = "",
      prenom = "",
      nom = "",
      telephone = "",
      email = "",
      codeSms = "",
      respondentUuid: existingRespondentUuid = "",
      vdi = "NTUMBA-Keziah",
      website = "", // honeypot
      ref = "",
    } = body;

    // Honeypot anti-bot
    if (website && website.length > 0) {
      return NextResponse.json({ ok: true, success: true, message: "OK" });
    }

    const cleanPrenom = String(prenom || "").trim();
    const cleanNom = String(nom || "").trim();
    const cleanEmail = String(email || "").trim();
    const cleanPhone = formatPhoneE164(String(telephone || "").trim());
    const cleanRef = String(ref || "").trim();
    const respondentUuid = existingRespondentUuid || crypto.randomUUID();

    // =========================================================================
    // ABANDON : numéro saisi mais formulaire non envoyé (visiteur parti avant l'étape 1)
    // =========================================================================
    if (step === "abandon") {
      if (cleanPhone.replace(/\D/g, "").length < 9) {
        return NextResponse.json({ ok: true });
      }
      const nomAffiche = esc(entreprise || `${cleanPrenom} ${cleanNom}`.trim() || "Visiteur");
      await sendAlertNotification({
        subject: `📞 [NUMÉRO LAISSÉ - FORMULAIRE NON ENVOYÉ] ${String(entreprise || `${cleanPrenom} ${cleanNom}`.trim() || "Visiteur").slice(0, 60)} (${cleanPhone.slice(0, 20)})${cleanRef ? ` — Dossier #${cleanRef.slice(0, 12)}` : ""}`,
        htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0F172A;">
          <div style="background: #92400E; color: #fff; padding: 18px 24px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 18px;">📞 Un visiteur a tapé son numéro puis a quitté la page</h2>
          </div>
          <div style="padding: 22px 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 10px 10px;">
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              ${cleanRef ? `<li><strong>Dossier :</strong> #${esc(cleanRef)}</li>` : ""}
              <li><strong>Entreprise :</strong> ${nomAffiche}</li>
              <li><strong>Nom :</strong> ${esc(cleanPrenom)} ${esc(cleanNom)}</li>
              <li><strong>Téléphone :</strong> <a href="tel:${esc(cleanPhone)}" style="color: #0E8F70; font-weight: bold;">${esc(cleanPhone)}</a></li>
              <li><strong>E-mail :</strong> ${esc(cleanEmail)}</li>
              <li><strong>Heure :</strong> ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</li>
            </ul>
            <p style="font-size: 12px; color: #64748B; margin-bottom: 0;">Le visiteur n'a pas reçu de code SMS. Information affichée sur la page : son numéro est conservé pour le recontacter.</p>
          </div>
        </div>`,
      });
      return NextResponse.json({ ok: true });
    }

    // =========================================================================
    // ÉTAPE CLIC : Notification instantanée quand un prospect consulte la page
    // =========================================================================
    if (step === "clic") {
      let resolvedSte = String(entreprise || "").trim();
      let resolvedPrenom = cleanPrenom;
      let resolvedNom = cleanNom;
      let resolvedPhone = String(telephone || "").trim();
      let resolvedEmail = cleanEmail;
      let resolvedVille = "";
      let resolvedMetier = "";

      if (cleanRef && (!resolvedSte || !resolvedPhone || !resolvedEmail)) {
        const pData = await fetchCockpitProspect(cleanRef);
        if (pData) {
          resolvedSte = resolvedSte || pData.nom_entreprise || "";
          resolvedPrenom = resolvedPrenom || pData.dirigeant_prenom || "";
          resolvedNom = resolvedNom || pData.dirigeant_nom || "";
          resolvedPhone = resolvedPhone || pData.telephone || "";
          resolvedEmail = resolvedEmail || pData.email || "";
          resolvedVille = pData.ville || "";
          resolvedMetier = pData.metier || "";
        }
      }

      if (cleanRef) {
        await updateCockpitProspectStatus(cleanRef, { statut_email: "CLIQUE" });
      }

      const subject = `👀 [CLIC PROSPECT BTP] ${
        resolvedSte || "Artisan"
      }${resolvedVille ? ` (${resolvedVille})` : ""}${
        cleanRef ? ` — Dossier #${cleanRef}` : ""
      }`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0F172A;">
          <div style="background: #1E3A8A; color: #fff; padding: 18px 24px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 18px;">👀 Un prospect consulte votre page de RDV</h2>
            <p style="margin: 4px 0 0; color: #93C5FD; font-size: 13px;">Dossier Cockpit : #${cleanRef || "Sans référence"}</p>
          </div>
          <div style="padding: 22px 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="margin-top: 0;">Un artisan vient d'ouvrir votre lien de rendez-vous Décennale &amp; Mutuelle :</p>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              ${cleanRef ? `<li><strong>ID Dossier :</strong> #${cleanRef}</li>` : ""}
              ${resolvedSte ? `<li><strong>Entreprise :</strong> ${resolvedSte}</li>` : ""}
              ${resolvedMetier ? `<li><strong>Métier :</strong> ${resolvedMetier}</li>` : ""}
              ${resolvedVille ? `<li><strong>Ville :</strong> ${resolvedVille}</li>` : ""}
              ${resolvedPrenom || resolvedNom ? `<li><strong>Dirigeant :</strong> ${resolvedPrenom} ${resolvedNom}</li>` : ""}
              ${resolvedPhone ? `<li><strong>Téléphone direct :</strong> <a href="tel:${resolvedPhone}" style="color: #0E8F70; font-weight: bold;">${resolvedPhone}</a></li>` : ""}
              ${resolvedEmail ? `<li><strong>Email :</strong> ${resolvedEmail}</li>` : ""}
              <li><strong>Heure :</strong> ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</li>
            </ul>
            <p style="font-size: 12px; color: #64748B; margin-bottom: 0;">Restez attentif, le prospect est actuellement sur la page de réservation (ses coordonnées ont été pré-remplies automatiquement).</p>
          </div>
        </div>
      `;

      await sendAlertNotification({ subject, htmlContent });
      return NextResponse.json({ ok: true, tracked: true });
    }

    // =========================================================================
    // ÉTAPE 1 : Soumission invisible vers Tally Form A (q4WLjO) -> Déclenche SMS
    // =========================================================================
    if (step === "1") {
      if (!cleanPrenom || !cleanNom || !cleanEmail || !cleanPhone) {
        return NextResponse.json(
          {
            ok: false,
            error: "missing_fields",
            message:
              "Veuillez renseigner votre prénom, nom, e-mail et téléphone mobile.",
          },
          { status: 400 }
        );
      }

      const sessionUuid = crypto.randomUUID();
      const tallyFormAPayload = {
        sessionUuid,
        respondentUuid,
        responses: {
          // Prénom
          "1dcd5378-f046-435c-8297-d72487917cef": cleanPrenom,
          // NOM
          "7ebdae45-3c73-4d8e-9642-fe89ddf489fa": cleanNom,
          // Email
          "8e05487b-b195-464b-895e-8ff0d2f9712e": cleanEmail,
          // Téléphone (+33...)
          "e47347d7-ca0e-4ba5-ac3b-6ca620b74d83": cleanPhone,
          // Hidden field @vdi = NTUMBA-Keziah
          "b84add29-c9c7-42cb-8283-18eb63409f74": {
            "3d9429ce-c5a1-492c-9dbb-0acab11735e5": vdi,
          },
        },
        captchas: {},
        isCompleted: true,
      };

      const tallyRes = await httpsRequest("https://api.tally.so/forms/q4WLjO/respond", {
        method: "POST",
        headers: TALLY_HEADERS,
        body: JSON.stringify(tallyFormAPayload),
      });

      if (!tallyRes.ok) {
        const errText = tallyRes.text;
        console.error("[TALLY FORM A ERROR]", tallyRes.status, errText);
        return NextResponse.json(
          {
            ok: false,
            error: "tally_step1_error",
            message:
              "Impossible d'envoyer le code SMS. Vérifiez le format de votre numéro de téléphone et de votre adresse e-mail.",
          },
          { status: 400 }
        );
      }

      const tallyData = JSON.parse(tallyRes.text || "{}");
      console.log("[TALLY FORM A OK - SMS SENT]", {
        submissionId: tallyData.submissionId,
        cleanPrenom,
        cleanNom,
        cleanEmail,
        cleanPhone,
      });

      if (cleanRef) {
        await updateCockpitProspectStatus(cleanRef, {
          dirigeant_prenom: cleanPrenom,
          dirigeant_nom: cleanNom,
          telephone: cleanPhone,
          email: cleanEmail,
          statut_email: "FORMULAIRE_REMPLI",
          statut_appel: "RAPPELER",
        });
      }

      // Alerte instantanée à Kesiah dès qu'un prospect valide l'étape 1 (demande de créneau / envoi SMS)
      const step1Subject = `📝 [ETAPE 1 VALIDEE - SMS ENVOYE] ${
        entreprise || `${cleanPrenom} ${cleanNom}`
      } (${cleanPhone})${cleanRef ? ` — Dossier #${cleanRef}` : ""}`;
      const step1Html = `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0F172A;">
          <div style="background: #0F172A; color: #fff; padding: 18px 24px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 18px;">📝 Un prospect vient de valider ses coordonnées (Étape 1/3)</h2>
            <p style="margin: 4px 0 0; color: #82D2BC; font-size: 13px;">Code SMS envoyé au ${cleanPhone}</p>
          </div>
          <div style="padding: 22px 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="margin-top: 0;">L'artisan a soumis le formulaire de coordonnées et reçoit actuellement son code SMS :</p>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              ${cleanRef ? `<li><strong>Dossier Cockpit :</strong> #${cleanRef}</li>` : ""}
              <li><strong>Entreprise :</strong> ${entreprise || "Non précisé"}</li>
              <li><strong>Nom complet :</strong> ${cleanPrenom} ${cleanNom}</li>
              <li><strong>Téléphone :</strong> <a href="tel:${cleanPhone}" style="color: #0E8F70; font-weight: bold;">${cleanPhone}</a></li>
              <li><strong>E-mail :</strong> ${cleanEmail}</li>
              <li><strong>Heure :</strong> ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</li>
            </ul>
          </div>
        </div>
      `;
      await sendAlertNotification({ subject: step1Subject, htmlContent: step1Html });

      return NextResponse.json({
        ok: true,
        step: 2,
        respondentUuid,
        formattedPhone: cleanPhone,
      });
    }

    // =========================================================================
    // ÉTAPE 2 : Validation du Code SMS via Tally Form B (RGBMA4) + Make Webhook
    // =========================================================================
    if (step === "2") {
      const cleanCode = String(codeSms || "").replace(/\s+/g, "").trim();
      if (!cleanCode) {
        return NextResponse.json(
          {
            ok: false,
            error: "missing_code",
            message: "Veuillez saisir le code reçu par SMS.",
          },
          { status: 400 }
        );
      }

      // 1. Enregistrement sur Tally Form B (RGBMA4)
      const sessionUuidB = crypto.randomUUID();
      const tallyFormBPayload = {
        sessionUuid: sessionUuidB,
        respondentUuid,
        responses: {
          // Code SMS
          "b2ec619d-bab6-4ba6-849c-cfb5aef4b5a7": cleanCode,
          // Hidden field @email
          "e7ec41b4-2e0c-4027-9700-6272d75766d5": {
            "b5209d45-9b6c-47d1-8416-9b87cf0d834e": cleanEmail,
          },
        },
        captchas: {},
        isCompleted: true,
      };

      try {
        await httpsRequest("https://api.tally.so/forms/RGBMA4/respond", {
          method: "POST",
          headers: TALLY_HEADERS,
          body: JSON.stringify(tallyFormBPayload),
        });
      } catch (e) {
        console.warn("[TALLY FORM B WARN]", e);
      }

      // 2. Vérification auprès du webhook Make.com d'APC
      const makeUrl = `https://hook.eu1.make.com/r3ehbcnudw1qa3c9bkyflrrm2r56hxcp?email=${encodeURIComponent(
        cleanEmail
      )}&code_sms_reel=${encodeURIComponent(cleanCode)}`;

      let makeHtml = "";
      let isCodeValid = false;

      for (let attempt = 0; attempt < 2; attempt++) {
        const makeRes = await httpsRequest(makeUrl, {
          method: "GET",
          headers: {
            "User-Agent": TALLY_HEADERS["User-Agent"],
          },
        });
        makeHtml = makeRes.text;

        const veriteMatch = makeHtml.match(/var\s+verite\s*=\s*"([^"]*)"/);
        const saisieMatch = makeHtml.match(/var\s+saisie\s*=\s*"([^"]*)"/);
        const verite = veriteMatch ? veriteMatch[1] : "";
        const saisie = saisieMatch ? saisieMatch[1] : cleanCode;

        if (verite && saisie === verite) {
          isCodeValid = true;
          break;
        }
        // Si Make n'avait pas encore synchronisé `verite`, on attend 1.5s et on réessaie
        if (!verite && attempt === 0) {
          await sleep(1500);
        }
      }

      if (!isCodeValid) {
        return NextResponse.json(
          {
            ok: false,
            error: "invalid_sms_code",
            message:
              "Le code SMS saisi est incorrect ou expiré. Vérifiez les 6 chiffres reçus sur votre téléphone.",
          },
          { status: 400 }
        );
      }

      // 3. Notification e-mail immédiate à Kesiah & Flowmind (Consentement SMS validé)
      const subject = `🔥 [LEAD CHAUD - SMS VALIDE] ${
        entreprise || `${cleanPrenom} ${cleanNom}`
      } (${cleanPhone})${cleanRef ? ` — Dossier #${cleanRef}` : ""}`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0F172A;">
          <div style="background: #0C1F33; color: #fff; padding: 18px 24px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 18px;">🔥 Consentement SMS APC validé</h2>
            <p style="margin: 4px 0 0; color: #82D2BC; font-size: 13px;">Interlocuteur : ${vdi}</p>
          </div>
          <div style="padding: 22px 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="margin-top: 0;">Le contact vient de valider son code SMS (${cleanCode}) et accède actuellement au calendrier HubSpot APC :</p>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              ${cleanRef ? `<li><strong>Dossier Cockpit :</strong> #${cleanRef}</li>` : ""}
              <li><strong>Entreprise :</strong> ${entreprise || "Non précisé"}</li>
              <li><strong>Nom complet :</strong> ${cleanPrenom} ${cleanNom}</li>
              <li><strong>Téléphone mobile :</strong> <a href="tel:${cleanPhone}" style="color: #0E8F70; font-weight: bold;">${cleanPhone}</a></li>
              <li><strong>E-mail :</strong> ${cleanEmail}</li>
              <li><strong>Date &amp; heure :</strong> ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</li>
            </ul>
          </div>
        </div>
      `;

      if (cleanRef) {
        await updateCockpitProspectStatus(cleanRef, {
          statut_email: "SMS_VALIDE",
          statut_appel: "RDV_POSE",
        });
      }

      await sendAlertNotification({ subject, htmlContent });

      // Construction de l'URL du calendrier officiel HubSpot APC avec pré-remplissage
      const hubspotParams = new URLSearchParams({
        embed: "true",
        firstName: cleanPrenom,
        lastName: cleanNom,
        email: cleanEmail,
        phone: cleanPhone,
      });

      const calendarUrl = `https://meetings-eu1.hubspot.com/consultant-apc/planifiez-votre-rendez-vous?uuid=b247e109-0009-4b8f-ba64-7cab19b1854d&${hubspotParams.toString()}`;

      return NextResponse.json({
        ok: true,
        step: 3,
        calendarUrl,
      });
    }

    // =========================================================================
    // ÉTAPE 3 : Confirmation finale du rendez-vous réservé sur le calendrier APC
    // =========================================================================
    if (step === "3") {
      const subject = `🚨 [NOUVEAU RDV CONFIRME APC] ${
        entreprise || `${cleanPrenom} ${cleanNom}`
      } (${cleanPhone})${cleanRef ? ` — Dossier #${cleanRef}` : ""}`;

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0F172A;">
          <div style="background: #0E8F70; color: #fff; padding: 18px 24px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0; font-size: 18px;">🚨 Rendez-vous réservé sur le planning APC !</h2>
            <p style="margin: 4px 0 0; color: #E6FBF5; font-size: 13px;">Interlocuteur : ${vdi}</p>
          </div>
          <div style="padding: 22px 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="margin-top: 0; font-weight: bold; color: #0E8F70;">Le rendez-vous téléphonique de 10 minutes a été réservé avec succès sur le planning des consultants APC :</p>
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
              ${cleanRef ? `<li><strong>Dossier Cockpit :</strong> #${cleanRef}</li>` : ""}
              <li><strong>Entreprise :</strong> ${entreprise || "Non précisé"}</li>
              <li><strong>Nom complet :</strong> ${cleanPrenom} ${cleanNom}</li>
              <li><strong>Téléphone mobile :</strong> <a href="tel:${cleanPhone}" style="color: #0E8F70; font-weight: bold;">${cleanPhone}</a></li>
              <li><strong>E-mail :</strong> ${cleanEmail}</li>
              <li><strong>Heure de validation :</strong> ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</li>
            </ul>
            <div style="margin-top: 16px; padding: 12px; background: #F0FDF4; border-radius: 6px; font-size: 13px; color: #166534;">
              ✅ Le prospect est qualifié et son créneau est enregistré.
            </div>
          </div>
        </div>
      `;

      if (cleanRef) {
        await updateCockpitProspectStatus(cleanRef, {
          statut_email: "SMS_VALIDE",
          statut_appel: "RDV_POSE",
        });
      }

      await sendAlertNotification({ subject, htmlContent });

      return NextResponse.json({ ok: true, completed: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inattendue";
    console.error("[RDV API ERROR]", err);
    return NextResponse.json(
      { ok: false, error: "internal_error", message },
      { status: 500 }
    );
  }
}
