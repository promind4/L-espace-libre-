"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

const PARTNERS = [
  { name: "AXA", src: "/partenaires/Logo-AXA.png", width: 70, height: 24 },
  { name: "Generali", src: "/partenaires/Logo-GENERALI.png", width: 80, height: 24 },
  { name: "SwissLife", src: "/partenaires/Logo-SWISSLIFE.png", width: 85, height: 24 },
  { name: "Harmonie Mutuelle", src: "/partenaires/Logo-HARMONIE-MUTUELLE.png", width: 100, height: 24 },
  { name: "Prépar-Vie", src: "/partenaires/prepar-vie-e1744285402573.png", width: 85, height: 24 },
  { name: "Cardif BNP Paribas", src: "/partenaires/Logo-CARDIF.png", width: 80, height: 24 },
  { name: "Mutlog", src: "/partenaires/Logo-MUTLOG.png", width: 75, height: 24 },
];

const BENEFITS = [
  {
    img: "/partenaires/25cfb1b11302cb6996946a9646a22e9b.png",
    eyebrow: "Vos finances",
    title: "Moins de charges",
    text: "Réduisez le coût de votre RC Décennale et de votre mutuelle TNS à garanties équivalentes pour préserver votre trésorerie.",
  },
  {
    img: "/partenaires/32d71011efa18a4d478ec3a49e3b12a0.png",
    eyebrow: "Votre temps",
    title: "Un appel court de 15 min",
    text: "Pas besoin d'y consacrer votre soirée. Choisissez le créneau exact qui vous arrange dans le planning officiel.",
  },
  {
    img: "/partenaires/42dcf6997a79b673ea4e5e048a29f888.png",
    eyebrow: "Votre tranquillité",
    title: "Sans engagement",
    text: "Faire le point ne vous engage à rien. Vous recevez votre étude comparative et prenez le temps de décider.",
  },
  {
    img: "/partenaires/4bd8b9cba1de5996622b7d31c11cacd0.png",
    eyebrow: "Zéro démarche",
    title: "Résiliation 100% gérée",
    text: "Si une offre vous convient, toutes les démarches de résiliation auprès de votre assureur actuel sont prises en charge.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Pourquoi dois-je confirmer mon numéro par un code SMS ?",
    a: "Le code SMS à 6 chiffres permet de valider votre consentement RGPD et de sécuriser votre réservation de créneau auprès de notre pôle de consultants partenaires (APC), sans démarchage non sollicité.",
  },
  {
    q: "Ce point téléphonique de 15 minutes m'engage-t-il à quelque chose ?",
    a: "Non, <strong>aucun engagement ni frais</strong>. Cet échange sert uniquement à comparer vos contrats actuels (RC Décennale, Mutuelle TNS, Prévoyance) avec les barèmes négociés auprès des compagnies partenaires.",
  },
  {
    q: "Qui s'occupe de résilier mon contrat actuel si je change ?",
    a: "Vous n'avez aucun courrier à envoyer. Si vous validez une proposition plus avantageuse, <strong>100% des démarches de résiliation</strong> sont prises en charge sans aucune coupure de couverture pour vos chantiers.",
  },
  {
    q: "De quels documents ai-je besoin pour le rendez-vous ?",
    a: "Aucun document n'est obligatoire pour ce premier échange téléphonique. Avoir votre dernier avis d'échéance ou votre attestation actuelle sous la main permet simplement de comparer les tarifs au centime près.",
  },
];

export function RdvFunnel() {
  const searchParams = useSearchParams();

  // Étape active du tunnel : 1 (Coordonnées) -> 2 (Code SMS) -> 3 (Calendrier APC)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [entreprise, setEntreprise] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [email, setEmail] = useState("");
  const [codeSms, setCodeSms] = useState("");
  const [respondentUuid, setRespondentUuid] = useState("");
  const [calendarUrl, setCalendarUrl] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [website, setWebsite] = useState(""); // Honeypot

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pré-remplissage automatique depuis le lien de l'e-mail
  useEffect(() => {
    const qSte = searchParams.get("ste") || searchParams.get("entreprise") || "";
    const qPrenom = searchParams.get("prenom") || "";
    const qNom = searchParams.get("nom") || "";
    const qTel = searchParams.get("tel") || searchParams.get("telephone") || "";
    const qEmail = searchParams.get("email") || "";
    const qStep = searchParams.get("step");

    if (qSte) setEntreprise(qSte);
    if (qPrenom) setPrenom(qPrenom);
    if (qNom) setNom(qNom);
    if (qTel) setTelephone(qTel);
    if (qEmail) setEmail(qEmail);
    if (qStep === "2") setStep(2);
    if (qStep === "3") setStep(3);
  }, [searchParams]);

  // Écoute de la confirmation du calendrier HubSpot APC en Étape 3
  useEffect(() => {
    function handleHubSpotMessage(event: MessageEvent) {
      if (
        event.data &&
        typeof event.data === "object" &&
        event.data.meetingBookSucceeded
      ) {
        setBookingConfirmed(true);
        fetch("/api/rdv", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            step: "3",
            entreprise,
            prenom,
            nom,
            telephone: formattedPhone || telephone,
            email,
          }),
        }).catch(() => {});
      }
    }

    window.addEventListener("message", handleHubSpotMessage);
    return () => window.removeEventListener("message", handleHubSpotMessage);
  }, [entreprise, prenom, nom, telephone, formattedPhone, email]);

  // Soumission Étape 1 -> Envoi invisible vers Tally Form A -> Déclenche le SMS
  async function handleStep1Submit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!prenom.trim() || !nom.trim() || !email.trim() || !telephone.trim()) {
      setErrorMessage("Merci de compléter vos 4 champs de coordonnées.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "1",
          entreprise,
          prenom,
          nom,
          telephone,
          email,
          website,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMessage(
          data.message ||
            "Vérifiez votre numéro de téléphone mobile et votre adresse e-mail."
        );
        return;
      }

      if (data.respondentUuid) setRespondentUuid(data.respondentUuid);
      if (data.formattedPhone) setFormattedPhone(data.formattedPhone);
      setStep(2);
    } catch {
      setErrorMessage(
        "Une erreur réseau est survenue. Veuillez réessayer dans un instant."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Soumission Étape 2 -> Validation du Code SMS via Tally Form B + Make -> Ouvre le Calendrier APC
  async function handleStep2Submit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!codeSms.trim() || codeSms.trim().length < 4) {
      setErrorMessage("Veuillez saisir le code reçu par SMS sur votre téléphone.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "2",
          entreprise,
          prenom,
          nom,
          telephone: formattedPhone || telephone,
          email,
          codeSms,
          respondentUuid,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMessage(
          data.message ||
            "Code SMS incorrect. Vérifiez les chiffres reçus par SMS."
        );
        return;
      }

      if (data.calendarUrl) {
        setCalendarUrl(data.calendarUrl);
      }
      setStep(3);
    } catch {
      setErrorMessage(
        "Impossible de vérifier le code pour le moment. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rdv-funnel" data-isolated-funnel="true">
      {/* ===== BARRE SUPÉRIEURE MINIMALISTE ===== */}
      <header className="rdv-topbar">
        <div className="rdv-topbar__inner">
          <div className="rdv-topbar__brand">
            <div className="rdv-topbar__avatar">
              <img
                src="/partenaires/step-contact.jpg"
                alt="Kesiah & Partenaires"
                width={38}
                height={38}
                style={{ objectFit: "cover", width: "38px", height: "38px" }}
              />
            </div>
            <div>
              <div className="rdv-topbar__title">Kesiah &amp; Partenaires</div>
              <div className="rdv-topbar__subtitle">
                RC Décennale &amp; Mutuelle TNS • Gironde (33)
              </div>
            </div>
          </div>

          <div className="rdv-topbar__badge">
            <span className="rdv-topbar__dot" />
            <span>Audit gratuit • Sans engagement</span>
          </div>
        </div>
      </header>

      {/* ===== ZONE PRINCIPALE : TUNNEL EN 3 ÉTAPES ===== */}
      <main className="rdv-stage">
        <div className="rdv-stage__header">
          <span className="rdv-stage__pill">
            {entreprise
              ? `Dossier préparé pour ${entreprise}`
              : "Artisans & Dirigeants du BTP"}
          </span>
          <h1 className="rdv-stage__title">
            Planifiez votre échange téléphonique en 3&nbsp;étapes simples.
          </h1>
          <p className="rdv-stage__subtitle">
            Découvrez en 15&nbsp;minutes combien vous pouvez économiser sur
            votre RC&nbsp;Décennale et votre mutuelle TNS, à garanties
            identiques.
          </p>
        </div>

        {/* Indicateur de progression */}
        <div className="rdv-stepper" role="navigation" aria-label="Étapes de réservation">
          <div
            className={`rdv-step-pill ${
              step === 1
                ? "rdv-step-pill--active"
                : "rdv-step-pill--done"
            }`}
          >
            <span className="rdv-step-pill__num">{step > 1 ? "✓" : "1"}</span>
            <span className="rdv-step-pill__label">Coordonnées</span>
          </div>

          <div
            className={`rdv-step-pill ${
              step === 2
                ? "rdv-step-pill--active"
                : step > 2
                ? "rdv-step-pill--done"
                : ""
            }`}
          >
            <span className="rdv-step-pill__num">{step > 2 ? "✓" : "2"}</span>
            <span className="rdv-step-pill__label">Code SMS</span>
          </div>

          <div
            className={`rdv-step-pill ${
              step === 3 ? "rdv-step-pill--active" : ""
            }`}
          >
            <span className="rdv-step-pill__num">3</span>
            <span className="rdv-step-pill__label">Calendrier</span>
          </div>
        </div>

        {/* CARTE DU TUNNEL */}
        <div
          className={`rdv-tunnel-card ${
            step === 3 ? "rdv-tunnel-card--wide" : ""
          }`}
        >
          {/* ================= ÉTAPE 1 : COORDONNÉES ================= */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} noValidate>
              <div className="rdv-tunnel-card__head">
                <img
                  src="/partenaires/step-contact.jpg"
                  alt="Vos coordonnées"
                  width={64}
                  height={64}
                  className="rdv-tunnel-card__illust"
                />
                <div>
                  <h2 className="rdv-tunnel-card__title">
                    1. Vérifiez vos coordonnées
                  </h2>
                  <p className="rdv-tunnel-card__desc">
                    Un code à 6 chiffres vous sera envoyé par SMS pour débloquer
                    l&apos;accès au calendrier des consultants.
                  </p>
                </div>
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="rdv-field-grid">
                <div>
                  <label className="rdv-label" htmlFor="rdv-prenom">
                    Prénom
                  </label>
                  <input
                    id="rdv-prenom"
                    type="text"
                    required
                    className="rdv-input"
                    placeholder="Ex : Jean"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </div>
                <div>
                  <label className="rdv-label" htmlFor="rdv-nom">
                    Nom
                  </label>
                  <input
                    id="rdv-nom"
                    type="text"
                    required
                    className="rdv-input"
                    placeholder="Ex : Dupont"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
              </div>

              <div className="rdv-field">
                <label className="rdv-label" htmlFor="rdv-tel">
                  Téléphone mobile (pour recevoir le code SMS)
                </label>
                <input
                  id="rdv-tel"
                  type="tel"
                  required
                  className="rdv-input"
                  placeholder="06 12 34 56 78"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>

              <div className="rdv-field" style={{ marginBottom: "24px" }}>
                <label className="rdv-label" htmlFor="rdv-email">
                  Adresse e-mail
                </label>
                <input
                  id="rdv-email"
                  type="email"
                  required
                  className="rdv-input"
                  placeholder="contact@entreprise.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {errorMessage && (
                <div className="rdv-error-box">{errorMessage}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rdv-submit-btn"
              >
                <span>
                  {isSubmitting
                    ? "Envoi du SMS en cours..."
                    : "Recevoir mon code SMS et continuer →"}
                </span>
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "var(--cr-pearl-500)",
                  margin: "14px 0 0",
                }}
              >
                Vos informations servent uniquement à valider votre demande et à
                vous transmettre les conditions RGPD.
              </p>
            </form>
          )}

          {/* ================= ÉTAPE 2 : CODE SMS ================= */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} noValidate>
              <div className="rdv-tunnel-card__head">
                <img
                  src="/partenaires/step-sms.jpg"
                  alt="Validation SMS"
                  width={64}
                  height={64}
                  className="rdv-tunnel-card__illust"
                />
                <div>
                  <h2 className="rdv-tunnel-card__title">
                    2. Saisissez le code reçu par SMS
                  </h2>
                  <p className="rdv-tunnel-card__desc">
                    Un code à 6 chiffres vient d&apos;être envoyé au{" "}
                    <strong>{formattedPhone || telephone}</strong>.
                  </p>
                </div>
              </div>

              <div className="rdv-field" style={{ marginBottom: "24px" }}>
                <label
                  className="rdv-label"
                  htmlFor="rdv-otp"
                  style={{ textAlign: "center", marginBottom: "10px" }}
                >
                  Code de confirmation à 6 chiffres
                </label>
                <input
                  id="rdv-otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={8}
                  required
                  autoFocus
                  className="rdv-input rdv-input--otp"
                  placeholder="••••••"
                  value={codeSms}
                  onChange={(e) => setCodeSms(e.target.value)}
                />
              </div>

              {errorMessage && (
                <div className="rdv-error-box">{errorMessage}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rdv-submit-btn"
              >
                <span>
                  {isSubmitting
                    ? "Vérification du code..."
                    : "Valider le code et choisir mon créneau →"}
                </span>
              </button>

              <div style={{ textAlign: "center" }}>
                <button
                  type="button"
                  className="rdv-back-link"
                  onClick={() => {
                    setErrorMessage("");
                    setStep(1);
                  }}
                >
                  ← Modifier mon numéro ou renvoyer un code
                </button>
              </div>
            </form>
          )}

          {/* ================= ÉTAPE 3 : CALENDRIER OFFICIEL APC ================= */}
          {step === 3 && (
            <div>
              <div className="rdv-tunnel-card__head">
                <img
                  src="/partenaires/step-calendar.jpg"
                  alt="Planning officiel"
                  width={64}
                  height={64}
                  className="rdv-tunnel-card__illust"
                />
                <div>
                  <h2 className="rdv-tunnel-card__title">
                    3. Sélectionnez votre date et votre horaire
                  </h2>
                  <p className="rdv-tunnel-card__desc">
                    Choisissez librement votre créneau de 15 minutes dans le
                    planning en temps réel de nos consultants, puis cliquez sur{" "}
                    <strong>Confirmer</strong>.
                  </p>
                </div>
              </div>

              {bookingConfirmed && (
                <div
                  style={{
                    background: "var(--cr-emerald-100)",
                    border: "1px solid var(--cr-emerald-300)",
                    color: "var(--cr-emerald-700)",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    marginBottom: "20px",
                    fontWeight: 600,
                    fontSize: "14.5px",
                    textAlign: "center",
                  }}
                >
                  ✓ Votre rendez-vous téléphonique est parfaitement confirmé !
                  Un e-mail récapitulatif vient de vous être envoyé.
                </div>
              )}

              <div
                style={{
                  width: "100%",
                  minHeight: "680px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid var(--cr-pearl-200)",
                  background: "#fff",
                }}
              >
                <iframe
                  src={
                    calendarUrl ||
                    `https://meetings-eu1.hubspot.com/consultant-apc/planifiez-votre-rendez-vous?uuid=b247e109-0009-4b8f-ba64-7cab19b1854d&embed=true&firstName=${encodeURIComponent(
                      prenom
                    )}&lastName=${encodeURIComponent(
                      nom
                    )}&email=${encodeURIComponent(
                      email
                    )}&phone=${encodeURIComponent(formattedPhone || telephone)}`
                  }
                  title="Planning des consultants APC"
                  style={{
                    width: "100%",
                    height: "700px",
                    border: "none",
                    display: "block",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ===== BANDEAU PARTENAIRES COMPAGNIES ===== */}
      <section
        className="rdv-partners"
        aria-label="Compagnies d'assurance comparées"
      >
        <div className="rdv-partners__inner">
          <div className="rdv-partners__label">
            Comparatif réalisé auprès des compagnies de premier plan
          </div>
          <div className="rdv-partners__grid">
            {PARTNERS.map((p) => (
              <div key={p.name} className="rdv-partners__item" title={p.name}>
                <img
                  src={p.src}
                  alt={p.name}
                  className="rdv-partners__img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LES 4 PILIERS (ICÔNES ILLUSTRÉES IDENTIQUES AU MAIL) ===== */}
      <section style={{ padding: "56px 20px 32px" }}>
        <div className="rdv-benefits-grid">
          {BENEFITS.map((b, i) => (
            <div key={i} className="rdv-benefit-card">
              <img
                src={b.img}
                alt={b.title}
                className="rdv-benefit-card__img"
              />
              <div>
                <div className="rdv-benefit-card__eyebrow">{b.eyebrow}</div>
                <h3 className="rdv-benefit-card__title">{b.title}</h3>
                <p className="rdv-benefit-card__text">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ SOBRE & RASSURANTE ===== */}
      <section style={{ padding: "32px 20px 72px", maxWidth: "780px", margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "var(--cr-navy-950)",
              margin: "0 0 6px",
            }}
          >
            Questions fréquentes
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "var(--cr-pearl-500)",
              margin: 0,
            }}
          >
            Tout savoir sur le déroulement de votre étude comparative.
          </p>
        </div>

        <div style={{ display: "grid", gap: "12px" }}>
          {FAQ_ITEMS.map((item, idx) => (
            <details
              key={idx}
              className="faq-home__item"
              style={{
                background: "#fff",
                border: "1px solid var(--cr-pearl-200)",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              <summary className="faq-home__q">
                <span className="faq-home__q-text">{item.q}</span>
                <span
                  className="faq-home__q-icon"
                  style={{ fontWeight: 700, fontSize: "16px", lineHeight: 1 }}
                >
                  +
                </span>
              </summary>
              <div
                className="faq-home__a"
                dangerouslySetInnerHTML={{ __html: item.a }}
              />
            </details>
          ))}
        </div>
      </section>

      {/* ===== PIED DE PAGE SOBRE ===== */}
      <footer className="rdv-footer">
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
            Kesiah &amp; Partenaires — Mise en relation RC Décennale &amp; Mutuelle TNS
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
            Échange gratuit et sans engagement • Données strictement protégées (RGPD)
          </div>
        </div>
      </footer>
    </div>
  );
}
