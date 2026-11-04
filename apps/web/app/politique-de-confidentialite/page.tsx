import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | L'Espace Libre",
  description:
    "Politique de confidentialité, transparence des données et conformité RGPD / CNIL pour nos services et notre prospection B2B.",
  robots: "noindex, follow",
};

export default function PrivacyPolicyPage() {
  return (
    <main
      className="tier tier-light"
      style={{
        paddingBlock: "64px",
        minHeight: "70vh",
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          paddingInline: "24px",
          lineHeight: "1.7",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#E0F2FE",
              color: "#0369A1",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "4px 12px",
              borderRadius: "999px",
              marginBottom: "12px",
            }}
          >
            Protection des données &middot; RGPD &middot; CNIL
          </span>
          <h1
            style={{
              fontSize: "34px",
              fontWeight: 800,
              color: "#0C1F33",
              margin: "0 0 12px 0",
              lineHeight: 1.25,
            }}
          >
            Politique de Confidentialité &amp; Transparence
          </h1>
          <p style={{ color: "#64748B", fontSize: "14px", margin: 0 }}>
            Dernière mise à jour : 4 novembre 2026 &middot; Conformité RGPD (Règlement UE 2016/679) et Loi Informatique et Libertés
          </p>
        </div>

        {/* Section 1 : Responsable de Traitement */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            padding: "28px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0C1F33", marginTop: 0, marginBottom: "14px" }}>
            1. Responsable du traitement
          </h2>
          <p style={{ margin: "0 0 10px 0" }}>
            Le responsable du traitement des données à caractère personnel est :
          </p>
          <ul style={{ paddingLeft: "20px", margin: 0, color: "#334155" }}>
            <li><strong>Dénomination :</strong> L&apos;Espace Libre / Kesiah &amp; Partenaires</li>
            <li><strong>Activité :</strong> Services aux entreprises, courtage et apport d&apos;affaires indépendant en assurances professionnelles</li>
            <li><strong>E-mail de contact &amp; Référent RGPD :</strong> <a href="mailto:kesiah@lespace-libre.fr" style={{ color: "#0284C7", textDecoration: "underline" }}>kesiah@lespace-libre.fr</a></li>
            <li><strong>Téléphone direct :</strong> 07 67 29 07 87</li>
            <li><strong>Site Internet officiel :</strong> <a href="https://www.lespace-libre.fr" style={{ color: "#0284C7", textDecoration: "underline" }}>www.lespace-libre.fr</a></li>
          </ul>
        </section>

        {/* Section 2 : Prospection B2B (SECTION DÉDIÉE DEMANDÉE) */}
        <section
          id="prospection-btp"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "28px",
            borderRadius: "12px",
            border: "2px solid #0E8F70",
            marginBottom: "24px",
            boxShadow: "0 4px 12px rgba(14,143,112,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ fontSize: "22px" }}>📋</span>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0C1F33", margin: 0 }}>
              2. Information spécifique : Prospection B2B &amp; Professionnels du BTP
            </h2>
          </div>
          <p style={{ color: "#475569", fontSize: "14px", marginTop: 0, marginBottom: "16px" }}>
            Cette section répond aux exigences d&apos;information prévues aux <strong>articles 13 et 14 du RGPD</strong> et aux recommandations de la <strong>CNIL</strong> relatives aux communications entre professionnels.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ backgroundColor: "#F0FDF4", borderLeft: "4px solid #16A34A", padding: "14px 18px", borderRadius: "0 8px 8px 0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#166534", margin: "0 0 6px 0" }}>
                Origine des données collectées (Article 14 du RGPD)
              </h3>
              <p style={{ margin: 0, color: "#14532D", fontSize: "14.5px" }}>
                Dans le cadre de nos campagnes d&apos;information et de mise en relation d&apos;artisans avec notre pôle de consultants partenaires (APC), les coordonnées professionnelles (raison sociale, nom/prénom du dirigeant, e-mail de contact professionnel, téléphone d&apos;entreprise) <strong>ont été collectées exclusivement à partir des registres légaux publics et des bases de données ouvertes d&apos;entreprises</strong> :
              </p>
              <ul style={{ margin: "8px 0 0 0", paddingLeft: "20px", color: "#14532D", fontSize: "14px" }}>
                <li><strong>Le répertoire national SIRENE / INSEE</strong> (base légale publique des établissements et entreprises de France) ;</li>
                <li><strong>L&apos;Annuaire des Entreprises publiques</strong> (plateforme officielle data.gouv.fr / INPI) ;</li>
                <li><strong>Les registres publics des métiers et du commerce</strong> (RNE / RCS) ;</li>
                <li><strong>Les sites internet professionnels publics</strong> et annuaires publics consultables librement en ligne.</li>
              </ul>
            </div>

            <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", padding: "14px 18px", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0C1F33", margin: "0 0 6px 0" }}>
                Finalité &amp; Base légale du traitement
              </h3>
              <p style={{ margin: "0 0 8px 0", color: "#334155", fontSize: "14px" }}>
                <strong>Finalité :</strong> Proposer aux artisans et dirigeants du secteur du bâtiment une étude comparative gratuite et sans engagement de leurs cotisations d&apos;assurance obligatoire (RC Décennale) et de leur mutuelle TNS / prévoyance.
              </p>
              <p style={{ margin: 0, color: "#334155", fontSize: "14px" }}>
                <strong>Base légale :</strong> Intérêt légitime (Article 6-1-f du RGPD). Conformément aux règles de la CNIL et à l&apos;article L. 34-5 du CPCE, la prospection par courrier électronique sans consentement préalable est admise dès lors qu&apos;elle est adressée à un professionnel sur son adresse de contact et porte sur des produits ou services en rapport direct avec son activité professionnelle.
              </p>
            </div>

            <div style={{ backgroundColor: "#FEF2F2", borderLeft: "4px solid #DC2626", padding: "14px 18px", borderRadius: "0 8px 8px 0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#991B1B", margin: "0 0 6px 0" }}>
                Droit d&apos;opposition immédiat &amp; Suppression définitive (Articles 17 et 21 du RGPD)
              </h3>
              <p style={{ margin: "0 0 8px 0", color: "#7F1D1D", fontSize: "14px" }}>
                Vous disposez du droit absolu de vous opposer à tout moment, sans justification et sans frais, à l&apos;utilisation de vos coordonnées professionnelles.
              </p>
              <p style={{ margin: 0, color: "#7F1D1D", fontSize: "14px" }}>
                Pour exercer ce droit :
              </p>
              <ul style={{ margin: "6px 0 0 0", paddingLeft: "20px", color: "#7F1D1D", fontSize: "14px" }}>
                <li>En répondant simplement <strong>« STOP »</strong> ou <strong>« Désinscription »</strong> au courriel reçu ;</li>
                <li>En adressant un simple courriel à <a href="mailto:kesiah@lespace-libre.fr?subject=Désinscription%20RGPD" style={{ color: "#991B1B", fontWeight: "bold", textDecoration: "underline" }}>kesiah@lespace-libre.fr</a> en mentionnant l&apos;adresse concernée ;</li>
                <li>Par téléphone au <strong>07 67 29 07 87</strong>.</li>
              </ul>
              <p style={{ margin: "8px 0 0 0", fontSize: "13px", color: "#991B1B" }}>
                <em>Dès réception de votre demande, votre adresse est immédiatement inscrite sur notre liste d&apos;exclusion définitive (liste noire RGPD) pour garantir qu&apos;aucun message ne vous sera plus jamais adressé.</em>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 : Formulaire de rendez-vous et Tally/SMS */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            padding: "28px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0C1F33", marginTop: 0, marginBottom: "14px" }}>
            3. Données renseignées sur la page de rendez-vous
          </h2>
          <p style={{ margin: "0 0 10px 0", color: "#334155" }}>
            Lorsque vous utilisez notre formulaire officiel pour réserver un créneau d&apos;appel :
          </p>
          <ul style={{ paddingLeft: "20px", margin: "0 0 10px 0", color: "#334155" }}>
            <li><strong>Données collectées :</strong> Prénom, Nom, Nom de l&apos;entreprise, Numéro de mobile, Adresse e-mail, Date et heure du rendez-vous choisi.</li>
            <li><strong>Vérification par SMS :</strong> L&apos;envoi d&apos;un code SMS temporaire à 6 chiffres permet de certifier que vous êtes bien le titulaire du numéro et de valider expressément votre demande de contact auprès de notre pôle partenaire.</li>
            <li><strong>Sous-traitants techniques sécurisés :</strong> Tally (hébergement du formulaire et recueil sécurisé), Make.com (acheminement de la vérification de conformité), HubSpot (calendrier de réservation de créneau).</li>
          </ul>
        </section>

        {/* Section 4 : Durée de conservation */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            padding: "28px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0C1F33", marginTop: 0, marginBottom: "14px" }}>
            4. Durée de conservation des données
          </h2>
          <ul style={{ paddingLeft: "20px", margin: 0, color: "#334155" }}>
            <li><strong>Données de prospection :</strong> Conservées pendant un maximum de 12 mois sans interaction active, ou supprimées immédiatement en cas de demande d&apos;opposition.</li>
            <li><strong>Données de rendez-vous confirmés :</strong> Conservées pendant la durée de la relation précontractuelle et contractuelle (3 ans à compter du dernier contact).</li>
            <li><strong>Liste d&apos;opposition (liste noire RGPD) :</strong> Conservée à titre de preuve négative pour veiller à ne jamais réimporter ou resolliciter une adresse ayant exercé son droit d&apos;opposition (recommandation CNIL).</li>
          </ul>
        </section>

        {/* Section 5 : Vos droits & CNIL */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            padding: "28px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            marginBottom: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0C1F33", marginTop: 0, marginBottom: "14px" }}>
            5. Vos droits et recours CNIL
          </h2>
          <p style={{ margin: "0 0 10px 0", color: "#334155" }}>
            En application du RGPD, vous disposez des droits suivants sur vos données :
          </p>
          <ul style={{ paddingLeft: "20px", margin: "0 0 14px 0", color: "#334155" }}>
            <li>Droit d&apos;accès et d&apos;information (Article 15) ;</li>
            <li>Droit de rectification (Article 16) ;</li>
            <li>Droit à l&apos;effacement / droit à l&apos;oubli (Article 17) ;</li>
            <li>Droit à la limitation du traitement (Article 18) ;</li>
            <li>Droit d&apos;opposition au traitement (Article 21).</li>
          </ul>
          <p style={{ margin: "0 0 10px 0", color: "#334155" }}>
            Pour toute demande relative à vos données, contactez-nous à <a href="mailto:kesiah@lespace-libre.fr" style={{ color: "#0284C7", textDecoration: "underline" }}>kesiah@lespace-libre.fr</a>.
          </p>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#64748B" }}>
            Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) sur son site internet (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "#0284C7", textDecoration: "underline" }}>www.cnil.fr</a>) ou par courrier postal : CNIL, 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07.
          </p>
        </section>
      </div>
    </main>
  );
}
