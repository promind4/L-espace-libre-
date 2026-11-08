"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { BUSINESS } from "@/config/business";

const PARTNERS = [
  { name: "AXA", src: "/partenaires/Logo-AXA.svg", height: 34 },
  { name: "Generali", src: "/partenaires/Logo-GENERALI.svg", height: 34 },
  { name: "SwissLife", src: "/partenaires/Logo-SWISSLIFE.svg", height: 32 },
  { name: "Harmonie Mutuelle", src: "/partenaires/Logo-HARMONIE-MUTUELLE.svg", height: 34 },
  { name: "Groupe MNCAP", src: "/partenaires/Logo-MNCAP.svg", height: 30 },
  { name: "Cardif BNP Paribas", src: "/partenaires/Logo-CARDIF.svg", height: 28 },
  { name: "Prépar-Vie", src: "/partenaires/Logo-PREPAR-VIE.png", height: 28 },
  { name: "Mutlog", src: "/partenaires/Logo-MUTLOG.png", height: 30 },
];

const APC_REVIEWS = [
  {
    name: "Corentin D.",
    rating: 5,
    quote: "80 € par mois d'économie, très satisfait du bilan.",
  },
  {
    name: "Arnaud D.",
    rating: 4.5,
    quote: "9 000 € d'économie qui me permettent de financer des travaux. Échange fluide et conseiller réactif.",
  },
  {
    name: "Thibault C.",
    rating: 4,
    quote: "Plus de 10 000 € d'économie sur nos contrats professionnels, un accompagnement très sérieux.",
  },
  {
    name: "Jessica C.",
    rating: 5,
    quote: "3 800 € d'économie, accompagnement au top merci à Sébastien.",
  },
];

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Étoile pleine (dorée)
      stars.push(
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="#F59E0B"
          aria-hidden="true"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <path d={STAR_PATH} />
        </svg>
      );
    } else if (rating >= i - 0.5) {
      // Demi-étoile : étoile grise en fond, demi-étoile dorée rognée à 50% par dessus (aucun bug de fraction de texte)
      stars.push(
        <span
          key={i}
          style={{
            position: "relative",
            display: "inline-block",
            width: "16px",
            height: "16px",
            verticalAlign: "middle",
          }}
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="#CBD5E1"
            style={{ display: "block" }}
          >
            <path d={STAR_PATH} />
          </svg>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              overflow: "hidden",
              display: "block",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="#F59E0B"
              style={{ display: "block" }}
            >
              <path d={STAR_PATH} />
            </svg>
          </span>
        </span>
      );
    } else {
      // Étoile vide (grise)
      stars.push(
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="#CBD5E1"
          aria-hidden="true"
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <path d={STAR_PATH} />
        </svg>
      );
    }
  }
  return (
    <span style={{ display: "inline-flex", gap: "3px", alignItems: "center" }}>
      {stars}
    </span>
  );
}

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
    q: "Comment se déroule l'étude comparative ?",
    a: "Lors d'un court échange téléphonique de 15 minutes, un conseiller dédié analyse vos garanties actuelles (RC Décennale, Mutuelle TNS ou Prévoyance). Il compare ensuite vos tarifs auprès de nos 8 compagnies partenaires pour identifier vos économies potentielles, sans modifier le niveau de votre couverture.",
  },
  {
    q: "Ce point téléphonique de 15 minutes m'engage-t-il à quelque chose ?",
    a: "Non, <strong>aucun engagement ni frais</strong>. Cet échange est 100% gratuit. Vous recevez votre étude comparative chiffrée et restez entièrement libre de donner suite ou non.",
  },
  {
    q: "Qui s'occupe de résilier mon contrat actuel si je trouve une meilleure offre ?",
    a: "Vous n'avez aucune démarche administrative à accomplir ni aucun courrier à envoyer. Si vous décidez de changer, <strong>100% des formalités de résiliation sont prises en charge</strong> auprès de votre ancien assureur, sans coupure de garantie pour vos chantiers.",
  },
  {
    q: "Dois-je préparer des documents pour ce premier échange ?",
    a: "Aucun document n'est obligatoire pour ce premier point de 15 minutes. Avoir simplement en tête le nom de votre assureur actuel ou votre cotisation approximative permet d'affiner instantanément le montant de vos économies.",
  },
];

export function RdvFunnel() {
  const searchParams = useSearchParams();

  // Étape active du tunnel : 1 (Coordonnées) -> 2 (Code SMS) -> 3 (Calendrier APC)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedNeed, setSelectedNeed] = useState("");

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

  // Pré-remplissage automatique depuis le lien de l'e-mail (?ref={id} ou ?t={base64})
  // Remplit : Prénom, Nom, Email professionnel, Entreprise, Ville.
  // Laisse volontairement le Téléphone mobile vide pour saisie par le prospect.
  useEffect(() => {
    let tokenData: {
      ste?: string;
      prenom?: string;
      nom?: string;
      email?: string;
      ville?: string;
    } = {};

    const rawToken = searchParams.get("t") || "";
    if (rawToken) {
      try {
        const b64 = rawToken.replace(/-/g, "+").replace(/_/g, "/");
        const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
        const binary = atob(padded);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        const jsonStr = new TextDecoder("utf-8").decode(bytes);
        tokenData = JSON.parse(jsonStr);
      } catch {
        // Ignore invalid token
      }
    }

    const qSte =
      searchParams.get("ste") ||
      searchParams.get("entreprise") ||
      tokenData.ste ||
      "";
    const qPrenom = searchParams.get("prenom") || tokenData.prenom || "";
    const qNom = searchParams.get("nom") || tokenData.nom || "";
    const qTel = searchParams.get("tel") || searchParams.get("telephone") || "";
    const qEmail = searchParams.get("email") || tokenData.email || "";
    const qVille = searchParams.get("ville") || tokenData.ville || "";
    const qStep = searchParams.get("step");
    const qRef = searchParams.get("ref") || searchParams.get("id") || "";

    if (qSte) setEntreprise(qSte);
    if (qVille) setVille(qVille);
    if (qPrenom) setPrenom(qPrenom);
    if (qNom) setNom(qNom);
    if (qTel) setTelephone(qTel);
    if (qEmail) setEmail(qEmail);
    if (qStep === "2") setStep(2);
    if (qStep === "3") setStep(3);
    if (qRef) setRefId(qRef);
    if (qSte || qPrenom || qNom || qEmail) {
      setPrefillLoaded(true);
    }

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
              if (!qEmail && p.email) {
                setEmail(p.email);
                fetchedEmail = p.email;
              }
              // Le téléphone n'est PAS pré-rempli dans le champ input (laissé au prospect),
              // mais on le conserve en interne pour l'alerte de clic destinée à Kesiah.
              if (!fetchedTel && p.telephone) {
                fetchedTel = p.telephone;
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
      {/* ===== BARRE SUPÉRIEURE OFFICIELLE RATTACHÉE À L'ESPACE LIBRE ===== */}
      <header className="rdv-topbar">
        <div className="rdv-topbar__inner">
          <div className="rdv-topbar__brand">
            <a
              href="https://www.lespace-libre.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="rdv-topbar__logo-link"
              title="Visiter le site principal L'Espace Libre"
            >
              <img
                src="/logo.png"
                alt="L'Espace Libre"
                width={42}
                height={42}
                style={{ objectFit: "contain", width: "42px", height: "42px", display: "block" }}
              />
            </a>
            <div>
              <div className="rdv-topbar__title">L&apos;Espace Libre Pros &bull; Pôle BTP</div>
              <div className="rdv-topbar__subtitle">
                RC Décennale &amp; Mutuelle • Partenaire Cabinet APC (ORIAS)
              </div>
            </div>
          </div>

          <div className="rdv-topbar__actions">
            <a
              href="tel:+33767290787"
              className="rdv-topbar__phone"
              title="Nous appeler directement"
            >
              <span>07 67 29 07 87</span>
            </a>
            <div
              className="rdv-topbar__badge"
              style={{
                background: "#F8FAFC",
                color: "#1E293B",
                border: "1px solid #CBD5E1",
                fontWeight: 600,
                fontSize: "12px",
                padding: "6px 12px",
                borderRadius: "6px",
              }}
            >
              <span>Devis gratuit sans engagement</span>
            </div>
          </div>
        </div>
      </header>

      {/* ===== BANDEAU PARTENAIRES AVEC DÉFILEMENT CONTINU ===== */}
      <section
        className="rdv-partners"
        aria-label="Compagnies d'assurance comparées"
      >
        <div className="rdv-partners__inner">
          <div className="rdv-partners__label">
            Comparatif indépendant réalisé auprès des compagnies de premier plan
          </div>
          <div
            className="rdv-marquee"
            style={{ pointerEvents: "none", userSelect: "none" }}
          >
            <div
              className="rdv-marquee__track"
              style={{ pointerEvents: "none" }}
            >
              {[...PARTNERS, ...PARTNERS].map((p, idx) => (
                <div
                  key={`${p.name}-${idx}`}
                  className="rdv-marquee__item"
                  title={p.name}
                  style={{ pointerEvents: "none" }}
                >
                  <img
                    src={p.src}
                    alt={p.name}
                    className="rdv-marquee__img"
                    style={{ height: `${p.height}px`, pointerEvents: "none" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ZONE PRINCIPALE : TUNNEL EN 3 ÉTAPES ===== */}
      <main className="rdv-stage">
        <div className="rdv-stage__header">
          <h1 className="rdv-stage__title">
            Accédez à votre créneau d&apos;échange gratuit de 15&nbsp;minutes.
          </h1>
          <p className="rdv-stage__subtitle">
            Vérifiez immédiatement combien vous pouvez économiser sur votre
            RC&nbsp;Décennale et votre mutuelle TNS, à garanties strictement
            identiques.
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "var(--cr-pearl-500)",
              margin: "12px 0 0",
              fontWeight: 500,
            }}
          >
            8 compagnies comparées • Sans engagement • Démarches de résiliation 100% prises en charge
          </p>
        </div>

        {/* Indicateur de progression en 2 points simples */}
        <div className="rdv-stepper" role="navigation" aria-label="Étapes de réservation">
          <div
            className={`rdv-step-pill ${
              step <= 2
                ? "rdv-step-pill--active"
                : "rdv-step-pill--done"
            }`}
          >
            <span className="rdv-step-pill__num">{step > 2 ? "✓" : "1"}</span>
            <span className="rdv-step-pill__label">Formulaire</span>
          </div>

          <div
            className={`rdv-step-pill ${
              step === 3 ? "rdv-step-pill--active" : ""
            }`}
          >
            <span className="rdv-step-pill__num">2</span>
            <span className="rdv-step-pill__label">Accès au planning</span>
          </div>
        </div>

        {/* CARTE DU TUNNEL */}
        <div
          className={`rdv-tunnel-card ${
            step === 3 ? "rdv-tunnel-card--wide" : ""
          }`}
        >
          {/* ================= ÉTAPE 1 : PALIER 1-CLIC PUIS COORDONNÉES ================= */}
          {step === 1 && !selectedNeed && (
            <div>
              <div className="rdv-tunnel-card__head" style={{ marginBottom: "18px" }}>
                <div>
                  <h2 className="rdv-tunnel-card__title">
                    Quel contrat souhaitez-vous vérifier en priorité&nbsp;?
                  </h2>
                  <p className="rdv-tunnel-card__desc">
                    Sélectionnez votre besoin en 1 clic pour accéder au planning et comparer vos tarifs actuels à garanties égales.
                  </p>
                </div>
              </div>

              {(prefillLoaded || entreprise) && (
                <div className="rdv-prefill-banner" style={{ marginBottom: "16px" }}>
                  <span>
                    Dossier <strong>{entreprise || `#${refId}`}</strong> identifié — cliquez sur votre priorité ci-dessous :
                  </span>
                </div>
              )}

              <div style={{ display: "grid", gap: "10px", marginBottom: "18px" }}>
                {[
                  {
                    id: "RC Décennale + Mutuelle TNS",
                    title: "RC Décennale + Mutuelle TNS",
                    sub: "Étude globale de vos 2 contrats professionnels (15 min)",
                  },
                  {
                    id: "RC Décennale BTP",
                    title: "RC Décennale BTP",
                    sub: "Optimisation de votre contrat chantier à garanties identiques",
                  },
                  {
                    id: "Mutuelle TNS / Prévoyance",
                    title: "Mutuelle TNS / Prévoyance",
                    sub: "Contrat Loi Madelin déductible fiscalement",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedNeed(opt.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      width: "100%",
                      textAlign: "left",
                      padding: "16px 18px",
                      borderRadius: "10px",
                      border: "1px solid #CBD5E1",
                      background: "#FFFFFF",
                      cursor: "pointer",
                      transition: "border-color 0.15s ease, background-color 0.15s ease",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#0F172A",
                          marginBottom: "3px",
                        }}
                      >
                        {opt.title}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#64748B",
                          lineHeight: 1.35,
                        }}
                      >
                        {opt.sub}
                      </div>
                    </div>
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: "16px",
                        color: "#64748B",
                      }}
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>

              {/* Frise sobre en 2 temps */}
              <div
                style={{
                  fontSize: "12.5px",
                  color: "#64748B",
                  textAlign: "center",
                  padding: "8px 0",
                }}
              >
                1. Choix de votre contrat &bull; 2. Accès direct au planning
              </div>
            </div>
          )}

          {step === 1 && selectedNeed && (
            <form onSubmit={handleStep1Submit} noValidate>
              {/* Rappel sobre du choix + bouton Modifier */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  marginBottom: "16px",
                  fontSize: "13px",
                  color: "#334155",
                }}
              >
                <span>
                  Option sélectionnée : <strong>{selectedNeed}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedNeed("")}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#2563EB",
                    fontSize: "12.5px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: 0,
                  }}
                >
                  Modifier
                </button>
              </div>

              <div className="rdv-tunnel-card__head">
                <div>
                  <h2 className="rdv-tunnel-card__title">
                    1. Accédez au planning des consultants
                  </h2>
                  <p className="rdv-tunnel-card__desc">
                    {prefillLoaded || entreprise
                      ? "Vos informations ont été pré-remplies. Indiquez uniquement votre numéro mobile pour recevoir votre code d'accès au planning."
                      : "Indiquez vos coordonnées ci-dessous pour consulter immédiatement les créneaux disponibles."}
                  </p>
                </div>
              </div>

              {(prefillLoaded || entreprise) && (
                <div className="rdv-prefill-banner">
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
                    placeholder="Votre prénom"
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
                    placeholder="Votre nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
              </div>

              <div className="rdv-field">
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
                  placeholder="contact@votre-entreprise.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="rdv-field" style={{ marginBottom: "22px" }}>
                <label className="rdv-label" htmlFor="rdv-tel">
                  Numéro sur lequel vous souhaitez être contacté par le conseiller
                </label>
                <input
                  id="rdv-tel"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  autoFocus
                  className="rdv-input"
                  placeholder="06 12 34 56 78"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
                <p
                  style={{
                    marginTop: "6px",
                    fontSize: "12px",
                    color: "var(--cr-pearl-500)",
                    lineHeight: 1.35,
                  }}
                >
                  Ce numéro sert exclusivement à convenir de votre échange téléphonique de 15 minutes avec votre conseiller. Zéro spam, aucun démarchage commercial tiers.
                </p>
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
                Gratuit et sans engagement • Vos coordonnées restent strictement confidentielles.
              </p>
            </form>
          )}

          {/* ================= ÉTAPE 2 : CODE SMS ================= */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} noValidate>
              <div className="rdv-tunnel-card__head">
                <div>
                  <h2 className="rdv-tunnel-card__title">
                    Votre code d&apos;accès au planning
                  </h2>
                  <p className="rdv-tunnel-card__desc">
                    Pour afficher les créneaux disponibles, saisissez le code à 6 chiffres envoyé au{" "}
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
                <div>
                  <h2 className="rdv-tunnel-card__title">
                    Sélectionnez votre date et votre horaire
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
                  Votre rendez-vous téléphonique est parfaitement confirmé.
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

      {/* ===== BANDEAU D'AVIS CLIENTS VÉRIFIÉS ===== */}
      <section className="rdv-reviews" aria-label="Avis clients vérifiés">
        <div className="rdv-reviews__header">
          <div className="rdv-reviews__badge">
            <StarRating rating={4.8} />
            <span>4.8 / 5 &bull; Avis clients vérifiés</span>
          </div>
          <h2 className="rdv-reviews__title">
            Ce que constatent les professionnels après leur bilan
          </h2>
          <p className="rdv-reviews__subtitle">
            Retours d&apos;expérience concrets de professionnels accompagnés par nos conseillers partenaires agréés.
          </p>
        </div>

        <div className="rdv-reviews__grid">
          {APC_REVIEWS.map((rev, i) => (
            <div key={i} className="rdv-review-card">
              <div className="rdv-review-card__stars">
                <StarRating rating={rev.rating} />
              </div>
              <p className="rdv-review-card__quote">
                «&nbsp;{rev.quote}&nbsp;»
              </p>
              <div className="rdv-review-card__meta">
                <span className="rdv-review-card__author">{rev.name}</span>
              </div>
            </div>
          ))}
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

      {/* ===== PIED DE PAGE OFFICIEL L'ESPACE LIBRE (DESKTOP & MOBILE) ===== */}
      <footer className="rdv-footer">
        <div className="rdv-footer__main">
          <div className="rdv-footer__container">
            <div className="rdv-footer__top">
              <a
                href="https://www.lespace-libre.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="rdv-footer__brand"
                aria-label="L'Espace Libre — accueil"
              >
                <img
                  src="/logo.png"
                  alt="L'Espace Libre"
                  width={76}
                  height={76}
                  style={{ display: "block", width: "76px", height: "auto" }}
                />
                <div>
                  <div className="rdv-footer__brand-title">
                    L&apos;Espace Libre • Kesiah &amp; Partenaires
                  </div>
                  <div className="rdv-footer__brand-sub">
                    Pôle Partenaires &amp; Courtage Assurance BTP (RC Décennale, Mutuelle TNS, Prévoyance)
                  </div>
                </div>
              </a>

              <a
                href="https://www.lespace-libre.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="rdv-footer__visit-btn"
              >
                <span>Visiter le site principal : www.lespace-libre.fr</span>
                <span>→</span>
              </a>
            </div>

            <div className="rdv-footer__grid">
              <div className="rdv-footer__col">
                <h3 className="rdv-footer__heading">Siège &amp; Zone</h3>
                <p className="rdv-footer__text">
                  {BUSINESS.adresse.rue}<br />
                  {BUSINESS.adresse.codePostal} {BUSINESS.adresse.ville}<br />
                  {ville ? `${ville} & France entière` : "Nouvelle-Aquitaine & France entière"}
                </p>
              </div>

              <div className="rdv-footer__col">
                <h3 className="rdv-footer__heading">Contact direct</h3>
                <p className="rdv-footer__phone">
                  <a href="tel:+33767290787">07 67 29 07 87</a>
                </p>
                <a
                  href="mailto:kesiah@lespace-libre.fr"
                  className="rdv-footer__link"
                >
                  kesiah@lespace-libre.fr
                </a>
              </div>

              <div className="rdv-footer__col">
                <h3 className="rdv-footer__heading">Disponibilités</h3>
                <p className="rdv-footer__text">
                  Échanges téléphoniques :<br />
                  <strong>Lundi au Samedi de 8h à 20h</strong>
                </p>
              </div>

              <div className="rdv-footer__col">
                <h3 className="rdv-footer__heading">Informations &amp; Accès</h3>
                <ul className="rdv-footer__list">
                  <li>
                    <a href="https://www.lespace-libre.fr" target="_blank" rel="noopener noreferrer">
                      Accueil L&apos;Espace Libre
                    </a>
                  </li>
                  <li>
                    <a href="https://www.lespace-libre.fr/a-propos" target="_blank" rel="noopener noreferrer">
                      À propos de L&apos;Espace Libre
                    </a>
                  </li>
                  <li>
                    <a href="https://www.lespace-libre.fr/contact" target="_blank" rel="noopener noreferrer">
                      Formulaire de contact
                    </a>
                  </li>
                  <li>
                    <a href="https://www.lespace-libre.fr/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">
                      Protection des données (RGPD)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bande sous-footer verte officielle de la charte L'Espace Libre */}
        <div className="rdv-footer__bottom">
          <div className="rdv-footer__bottom-inner">
            <div className="rdv-footer__bottom-links">
              <a href="https://www.lespace-libre.fr/mentions-legales" target="_blank" rel="noopener noreferrer">
                Mentions Légales
              </a>
              <a href="https://www.lespace-libre.fr/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">
                Politique de Confidentialité
              </a>
              <a href="https://www.lespace-libre.fr/cgv" target="_blank" rel="noopener noreferrer">
                CGV
              </a>
              <a href="https://www.lespace-libre.fr/plan-du-site" target="_blank" rel="noopener noreferrer">
                Plan du site
              </a>
            </div>
            <div className="rdv-footer__copy">
              © {new Date().getFullYear()} L&apos;Espace Libre — Kesiah &amp; Partenaires. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
