import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import https from "https";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Helper HTTPS résilient (évite l'erreur UNABLE_TO_VERIFY_LEAF_SIGNATURE
 * sous Windows local lorsque Node.js n'utilise pas le magasin CA système).
 */
function httpsRequest(
  urlStr: string,
  options: {
    method?: "GET" | "POST";
    headers?: Record<string, string>;
    body?: string;
  } = {}
): Promise<{ status: number; ok: boolean; text: string }> {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const req = https.request(
      {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: options.method || "GET",
        headers: options.headers || {},
        rejectUnauthorized: false,
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
    req.on("error", reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
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

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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

      // 3. Notification e-mail à Kesiah (Consentement SMS validé)
      const apiKey = process.env["RESEND_API_KEY"];
      const leadEmail =
        process.env["LEADS_INBOX_EMAIL"] || "contact@lespace-libre.fr";
      if (apiKey) {
        try {
          const resend = new Resend(apiKey);
          await resend.emails.send({
            from: "Kesiah & Partenaires <contact@lespace-libre.fr>",
            to: [leadEmail, "promind303@gmail.com"],
            subject: `${cleanRef ? `[Dossier #${cleanRef}] ` : ""}CONSENTEMENT SMS VALIDE — ${
              entreprise || `${cleanPrenom} ${cleanNom}`
            } (${cleanPhone})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0F172A;">
                <div style="background: #0C1F33; color: #fff; padding: 18px 24px; border-radius: 10px 10px 0 0;">
                  <h2 style="margin: 0; font-size: 18px;">Consentement SMS APC validé</h2>
                  <p style="margin: 4px 0 0; color: #82D2BC; font-size: 13px;">Interlocuteur : ${vdi}</p>
                </div>
                <div style="padding: 22px 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 10px 10px;">
                  <p style="margin-top: 0;">Le contact vient de valider son code SMS (${cleanCode}) et accède au calendrier APC :</p>
                  <ul style="list-style: none; padding: 0; line-height: 1.8;">
                    ${cleanRef ? `<li><strong>Dossier Cockpit :</strong> #${cleanRef}</li>` : ""}
                    <li><strong>Entreprise :</strong> ${entreprise || "Non précisé"}</li>
                    <li><strong>Nom complet :</strong> ${cleanPrenom} ${cleanNom}</li>
                    <li><strong>Téléphone :</strong> <a href="tel:${cleanPhone}">${cleanPhone}</a></li>
                    <li><strong>Email :</strong> ${cleanEmail}</li>
                  </ul>
                </div>
              </div>
            `,
          });
        } catch (err) {
          console.warn("[RESEND STEP 2 WARN]", err);
        }
      }

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
      const apiKey = process.env["RESEND_API_KEY"];
      const leadEmail =
        process.env["LEADS_INBOX_EMAIL"] || "contact@lespace-libre.fr";
      if (apiKey) {
        try {
          const resend = new Resend(apiKey);
          await resend.emails.send({
            from: "Kesiah & Partenaires <contact@lespace-libre.fr>",
            to: [leadEmail, "promind303@gmail.com"],
            subject: `${cleanRef ? `[Dossier #${cleanRef}] ` : ""}RDV CALENDRIER APC CONFIRME — ${
              entreprise || `${cleanPrenom} ${cleanNom}`
            }`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #0F172A;">
                <div style="background: #0E8F70; color: #fff; padding: 18px 24px; border-radius: 10px 10px 0 0;">
                  <h2 style="margin: 0; font-size: 18px;">Rendez-vous programmé sur le planning APC</h2>
                </div>
                <div style="padding: 22px 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 10px 10px;">
                  <p style="margin-top: 0;">Le rendez-vous téléphonique de 15 minutes a été confirmé dans l'agenda des consultants APC :</p>
                  <ul style="list-style: none; padding: 0; line-height: 1.8;">
                    ${cleanRef ? `<li><strong>Dossier Cockpit :</strong> #${cleanRef}</li>` : ""}
                    <li><strong>Entreprise :</strong> ${entreprise || "Non précisé"}</li>
                    <li><strong>Contact :</strong> ${cleanPrenom} ${cleanNom}</li>
                    <li><strong>Téléphone :</strong> <a href="tel:${cleanPhone}">${cleanPhone}</a></li>
                    <li><strong>Email :</strong> ${cleanEmail}</li>
                  </ul>
                </div>
              </div>
            `,
          });
        } catch (err) {
          console.warn("[RESEND STEP 3 WARN]", err);
        }
      }

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
