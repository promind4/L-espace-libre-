import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      entreprise = "",
      prenom = "",
      nom = "",
      telephone = "",
      email = "",
      assurances = [],
      jour = "",
      creneau = "",
      notes = "",
      website = "", // honeypot
    } = body;

    // Honeypot anti-bot
    if (website && website.length > 0) {
      return NextResponse.json({ success: true, message: "OK" });
    }

    console.log("[RDV BTP LEAD]", {
      entreprise,
      prenom,
      nom,
      telephone,
      email,
      assurances,
      jour,
      creneau,
      notes,
      date: new Date().toISOString(),
    });

    const apiKey = process.env["RESEND_API_KEY"];
    const leadEmail =
      process.env["LEADS_INBOX_EMAIL"] || "contact@lespace-libre.fr";

    if (apiKey) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "Kesiah & Partenaires <contact@lespace-libre.fr>",
          to: [leadEmail, "promind303@gmail.com"],
          subject: `🔥 NOUVEAU RDV BTP 10 MIN — ${entreprise || prenom || "Artisan"} (${telephone})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1F2733; line-height: 1.5;">
              <div style="background: #0C1F33; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0; color: #ffffff; font-size: 20px;">Nouveau RDV Téléphonique BTP 10 min</h2>
                <p style="margin: 6px 0 0 0; color: #82D2BC; font-size: 14px;">Lead issu de la campagne prospection Gironde</p>
              </div>
              <div style="padding: 24px; border: 1px solid #E9ECF1; border-top: none; border-radius: 0 0 8px 8px;">
                <h3 style="color: #1D3E61; margin-top: 0;">Coordonnées de l'artisan</h3>
                <ul style="list-style: none; padding: 0; margin: 0 0 20px 0;">
                  <li style="padding: 6px 0; border-bottom: 1px solid #f0f0f0;"><strong>Entreprise :</strong> ${entreprise || "Non précisé"}</li>
                  <li style="padding: 6px 0; border-bottom: 1px solid #f0f0f0;"><strong>Contact :</strong> ${prenom} ${nom}</li>
                  <li style="padding: 6px 0; border-bottom: 1px solid #f0f0f0;"><strong>Téléphone :</strong> <a href="tel:${telephone}" style="color: #0E8F70; font-weight: bold;">${telephone}</a></li>
                  <li style="padding: 6px 0; border-bottom: 1px solid #f0f0f0;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
                </ul>

                <h3 style="color: #1D3E61;">Créneau souhaité pour l'appel de 10 min</h3>
                <p style="background: #FAFBFC; padding: 12px; border-radius: 6px; border-left: 4px solid #0E8F70; margin: 0 0 20px 0;">
                  <strong>Jour :</strong> ${jour || "Dès que possible"}<br/>
                  <strong>Tranche horaire :</strong> ${creneau || "À votre convenance"}
                </p>

                <h3 style="color: #1D3E61;">Besoins & assurances sélectionnées</h3>
                <p style="margin: 0 0 20px 0;">${
                  Array.isArray(assurances) && assurances.length > 0
                    ? assurances.map((a: string) => `• ${a}`).join("<br/>")
                    : "Étude globale"
                }</p>

                ${
                  notes
                    ? `<h3 style="color: #1D3E61;">Précisions / Message</h3><p style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 0 0 20px 0;">${notes}</p>`
                    : ""
                }

                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #8A93A2;">
                  Envoyé automatiquement depuis le formulaire /rdv de lespace-libre.fr
                </div>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("[RDV RESEND WARN]", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[RDV API ERROR]", err);
    return NextResponse.json(
      { error: "internal_error", message: err.message },
      { status: 500 }
    );
  }
}
