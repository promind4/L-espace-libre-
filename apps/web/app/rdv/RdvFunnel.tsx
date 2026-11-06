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
    q: "Pourquoi y a-t-il une étape de confirmation par SMS ?",
    a: "Le code SMS à 6 chiffres permet de sécuriser votre réservation de créneau auprès de notre pôle de consultants partenaires (APC) et de valider votre demande conformément au RGPD, sans démarchage non sollicité.",
  },
  {
    q: "Ce point téléphonique de 15 minutes m'engage-t-il à quelque chose ?",
    a: "Non, <strong>aucun engagement ni frais</strong>. Cet échange sert uniquement à comparer vos contrats actuels (RC Décennale, Mutuelle TNS, Prévoyance) avec les barèmes négociés auprès des compagnies partenaires.",
  },
  {
    q: "Qui s'occupe de résilier mon contrat actuel si je change ?",
    a: "Vous n'avez aucun courrier à envoyer. Si vous validez une proposition plus avantageuse, <strong>100% des démarches de résiliation</strong> sont prises en charge sans aucune coupure de couverture pour vos chantiers.",
  },
];

export function RdvFunnel() {
  const searchParams = useSearchParams();

  // Étape active du tunnel : 1 (Coordonnées) -> 2 (Code SMS) -> 3 (Calendrier APC)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [entreprise, setEntreprise] = useState("");
  const [ville, setVille] = useState("");
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
  const [refId, setRefId] = useState("");
  const [prefillLoaded, setPrefillLoaded] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pré-remplissage automatique depuis le lien de l'e-mail (?ref={id})
  useEffect(() => {
    const qSte = searchParams.get("ste") || searchParams.get("entreprise") || "";
    const qPrenom = searchParams.get("prenom") || "";
    const qNom = searchParams.get("nom") || "";
    const qTel = searchParams.get("tel") || searchParams.get("telephone") || "";
    const qEmail = searchParams.get("email") || "";
    const qVille = searchParams.get("ville") || "";
    const qStep = searchParams.get("step");
    const qRef = searchParams.get("ref") || "";

    if (qSte) setEntreprise(qSte);
    if (qVille) setVille(qVille);
    if (qPrenom) setPrenom(qPrenom);
    if (qNom) setNom(qNom);
    if (qTel) setTelephone(qTel);
    if (qEmail) setEmail(qEmail);
    if (qStep === "2") setStep(2);
    if (qStep === "3") setStep(3);
    if (qRef) setRefId(qRef);

    async function loadPrefillAndTrack() {
      let fetchedSte = qSte;
      let fetchedPrenom = qPrenom;
      let fetchedNom = qNom;
      let fetchedTel = qTel;
      let fetchedEmail = qEmail;

      if (qRef && /^\d+$/.test(qRef.trim())) {
        try {
          const res = await fetch(`/api/rdv?ref=${encodeURIComponent(qRef.trim())}`);
          if (res.ok) {
            const data = await res.json();
            const p = data?.prospect;
            if (p) {
              if (!qSte && p.nom_entreprise) {
                setEntreprise(p.nom_entreprise);
                fetchedSte = p.nom_entreprise;
              }
              if (!qVille && p.ville) {
                setVille(p.ville);
              }
              if (!qPrenom && p.dirigeant_prenom) {
                setPrenom(p.dirigeant_prenom);
                fetchedPrenom = p.dirigeant_prenom;
              }
              if (!qNom && p.dirigeant_nom) {
                setNom(p.dirigeant_nom);
                fetchedNom = p.dirigeant_nom;
              }
              if (!qTel && p.telephone) {
                setTelephone(p.telephone);
                fetchedTel = p.telephone;
              }
              if (!qEmail && p.email) {
                setEmail(p.email);
                fetchedEmail = p.email;
              }
              setPrefillLoaded(true);
            }
          }
        } catch {
          // Ignore prefill network error
        }
      }

      // Notification de clic prospect instantanée (une alerte par session)
      if (qRef || fetchedSte || fetchedEmail || fetchedTel) {
        const trackingKey = `rdv_click_sent_${qRef || fetchedEmail || "visit"}`;
        if (typeof window !== "undefined" && !sessionStorage.getItem(trackingKey)) {
          sessionStorage.setItem(trackingKey, "1");
          fetch("/api/rdv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              step: "clic",
              entreprise: fetchedSte,
              prenom: fetchedPrenom,
              nom: fetchedNom,
              telephone: fetchedTel,
              email: fetchedEmail,
              ref: qRef,
            }),
          }).catch(() => {});
        }
      }
    }

    loadPrefillAndTrack();
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
            ref: refId,
          }),
        }).catch(() => {});
      }
    }

    window.addEventListener("message", handleHubSpotMessage);
    return () => window.removeEventListener("message", handleHubSpotMessage);
  }, [entreprise, prenom, nom, telephone, formattedPhone, email, refId]);

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
          ref: refId,
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
          ref: refId,
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
                RC Décennale &amp; Mutuelle TNS • {ville ? `${ville} & France entière` : "Nouvelle-Aquitaine & France entière"}
              </div>
            </div>
          </div>

          <div className="rdv-topbar__actions">
            <a
              href="tel:+33767290787"
              className="rdv-topbar__phone"
              title="Appeler directement Kesiah"
            >
              <span>📞</span>
              <span>07 67 29 07 87</span>
            </a>
            <div className="rdv-topbar__badge">
              <span className="rdv-topbar__dot" />
              <span>Audit gratuit • Sans engagement</span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== BANDEAU PARTENAIRES COMPAGNIES (Juste sous le header) ===== */}
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

      {/* ===== ZONE PRINCIPALE : TUNNEL EN 3 ÉTAPES ===== */}
      <main className="rdv-stage">
        <div className="rdv-stage__header">
          <span className="rdv-stage__pill">
            {entreprise
              ? `Dossier préparé pour ${entreprise}${ville ? ` (${ville})` : ""}`
              : "Artisans & Dirigeants du BTP"}
          </span>
          <h1 className="rdv-stage__title">
            Accédez à votre créneau d&apos;échange gratuit de 15&nbsp;minutes.
          </h1>
          <p className="rdv-stage__subtitle">
            Vérifiez immédiatement combien vous pouvez économiser sur votre
            RC&nbsp;Décennale et votre mutuelle TNS, à garanties strictement
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
            <span className="rdv-step-pill__label">Vos infos</span>
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
            <span className="rdv-step-pill__label">Accès SMS</span>
          </div>

          <div
            className={`rdv-step-pill ${
              step === 3 ? "rdv-step-pill--active" : ""
            }`}
          >
            <span className="rdv-step-pill__num">3</span>
            <span className="rdv-step-pill__label">Planning</span>
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
                    1. Accédez au planning des consultants
                  </h2>
                  <p className="rdv-tunnel-card__desc">
                    {prefillLoaded || entreprise
                      ? "Vos informations ont été pré-remplies pour vous faire gagner du temps. Vérifiez votre numéro mobile pour afficher les créneaux disponibles."
                      : "Indiquez vos coordonnées ci-dessous pour consulter immédiatement les créneaux disponibles de 15 minutes."}
                  </p>
                </div>
              </div>

              {(prefillLoaded || entreprise) && (
                <div className="rdv-prefill-banner">
                  <span>✓</span>
                  <span>
                    Dossier <strong>{entreprise || `#${refId}`}</strong> identifié — vérifiez ou complétez vos informations ci-dessous.
                  </span>
                </div>
              )}

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
                    autoComplete="given-name"
                    required
                    className="rdv-input"
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
                    autoComplete="family-name"
                    required
                    className="rdv-input"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
              </div>

              <div className="rdv-field">
                <label className="rdv-label" htmlFor="rdv-tel">
                  Téléphone mobile (pour l&apos;accès au planning)
                </label>
                <input
                  id="rdv-tel"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  className="rdv-input"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>

              <div className="rdv-field" style={{ marginBottom: "22px" }}>
                <label className="rdv-label" htmlFor="rdv-email">
                  Adresse e-mail professionnelle
                </label>
                <input
                  id="rdv-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  className="rdv-input"
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
                    ? "Ouverture de l'accès au planning..."
                    : "Voir les créneaux disponibles →"}
                </span>
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  color: "var(--cr-pearl-500)",
                  margin: "12px 0 0",
                }}
              >
                🔒 Gratuit et sans engagement • Un code d&apos;accès par SMS sécurise votre créneau.
              </p>

              <div className="rdv-direct-call-box">
                <div className="rdv-direct-call-box__text">
                  <strong>Vous êtes sur chantier ou pressé ?</strong>
                  <span>Faites le point directement par téléphone avec Kesiah :</span>
                </div>
                <a href="tel:+33767290787" className="rdv-direct-call-box__btn">
                  📞 Appeler le 07 67 29 07 87
                </a>
              </div>
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
                    2. Débloquez le planning avec votre code SMS
                  </h2>
                  <p className="rdv-tunnel-card__desc">
                    Pour éviter les faux rendez-vous, un code d&apos;accès à 6 chiffres vient d&apos;être envoyé au{" "}
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

      {/* ===== PIED DE PAGE AVEC LIENS SITE OFFICIEL & RÉASSURANCE ===== */}
      <footer className="rdv-footer" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ marginBottom: "18px" }}>
            <a
              href="https://www.lespace-libre.fr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#82D2BC",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "13.5px",
                padding: "8px 18px",
                borderRadius: "20px",
                backgroundColor: "rgba(130, 210, 188, 0.1)",
                border: "1px solid rgba(130, 210, 188, 0.3)",
                transition: "all 0.2s ease",
              }}
            >
              <span>🌐 Visiter le site principal : www.lespace-libre.fr</span>
              <span>→</span>
            </a>
          </div>

          <div style={{ fontWeight: 700, color: "#fff", marginBottom: "6px", fontSize: "15px" }}>
            Kesiah &amp; Partenaires — Mandataire &amp; Courtage Partenaire Assurance BTP
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.65)", margin: "0 auto 16px auto", maxWidth: "620px", lineHeight: 1.5 }}>
            Service de comparaison et d'audit indépendant opéré par L'Espace Libre en partenariat avec les leaders de l'assurance décennale et santé (AXA, Generali, SwissLife, Harmonie Mutuelle).
          </p>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", flexWrap: "wrap", fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
            <a href="https://www.lespace-libre.fr/mentions-legales" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "underline" }}>
              Mentions Légales
            </a>
            <span>•</span>
            <a href="https://www.lespace-libre.fr/politique-de-confidentialite" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "underline" }}>
              Politique de Confidentialité &amp; RGPD
            </a>
            <span>•</span>
            <a href="tel:+33767290787" style={{ color: "rgba(255, 255, 255, 0.75)", textDecoration: "none", fontWeight: 600 }}>
              Tél direct : 07 67 29 07 87
            </a>
            <span>•</span>
            <span>{ville ? `${ville} & France entière` : "Nouvelle-Aquitaine & France entière"}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
