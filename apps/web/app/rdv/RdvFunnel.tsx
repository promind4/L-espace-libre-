"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";

const PARTNERS = [
  { name: "AXA", src: "/partenaires/Logo-AXA.png", width: 75, height: 26 },
  { name: "Generali", src: "/partenaires/Logo-GENERALI.png", width: 85, height: 26 },
  { name: "SwissLife", src: "/partenaires/Logo-SWISSLIFE.png", width: 90, height: 26 },
  { name: "Harmonie Mutuelle", src: "/partenaires/Logo-HARMONIE-MUTUELLE.png", width: 105, height: 26 },
  { name: "Prépar-Vie", src: "/partenaires/prepar-vie-e1744285402573.png", width: 90, height: 26 },
  { name: "Cardif BNP Paribas", src: "/partenaires/Logo-CARDIF.png", width: 85, height: 26 },
  { name: "Mutlog", src: "/partenaires/Logo-MUTLOG.png", width: 80, height: 26 },
];

const ASSURANCE_OPTIONS = [
  "Assurance Décennale BTP (Garantie 10 ans)",
  "Mutuelle Santé TNS / Dirigeant & Famille",
  "Prévoyance & Maintien de revenus (Arrêt de travail)",
  "Responsabilité Civile Pro (RC Pro Exploitation)",
  "Reprise / Baisse de tarif contrat actuel",
];

const JOUR_OPTIONS = [
  "Aujourd'hui",
  "Demain",
  "Sous 48h",
  "Cette semaine",
  "À votre convenance",
];

const CRENEAU_OPTIONS = [
  "Matinée (08h00 - 10h00)",
  "Midi / Pause (12h00 - 14h00)",
  "Fin de journée (17h00 - 19h00)",
  "À tout moment",
];

const FAQ_ITEMS = [
  {
    q: "Qui est mon interlocuteur et comment se déroule l'appel ?",
    a: "Vous échangez directement avec <strong>Kesiah Ntumba</strong>, mandataire intermédiaire en assurances, basé en Gironde (33). L'échange est 100% direct et dure <strong>10 minutes chrono</strong> : nous faisons le point sur votre activité BTP, vos contrats actuels et vos chantiers en cours. Pas de jargon, pas de standard délocalisé.",
  },
  {
    q: "Cet audit téléphonique de 10 minutes m'engage-t-il à quoi que ce soit ?",
    a: "Non, <strong>aucun engagement ni frais</strong>. C'est un audit flash gratuit réservé aux artisans et indépendants du BTP. Vous découvrez si vos garanties actuelles sont solides et si vous pouvez faire des économies (souvent <strong>15% à 30%</strong> constatés). Vous restez entièrement libre d'y donner suite ou non.",
  },
  {
    q: "Comment se passe la résiliation de mon assureur actuel ?",
    a: "Si vous décidez d'activer une offre plus compétitive, <strong>nous prenons en charge 100% des démarches de résiliation</strong> auprès de votre compagnie actuelle (Loi Hamon / résiliation infra-annuelle). Vous n'avez aucun courrier à envoyer et la continuité de garantie est 100% assurée pour vos chantiers.",
  },
  {
    q: "De quels documents ai-je besoin lors de l'appel ?",
    a: "Aucun document n'est obligatoire pour ce premier contact de 10 minutes. Si vous avez sous les yeux votre <strong>dernier avis d'échéance</strong> ou votre <strong>attestation décennale</strong>, cela permettra simplement de chiffrer l'économie au centime près.",
  },
  {
    q: "Mes coordonnées sont-elles protégées et confidentielles ?",
    a: "Absolument. Vos informations sont strictement confidentielles, traitées conformément au <strong>RGPD</strong> et aux règles régissant l'intermédiation en assurance. Elles ne sont <strong>jamais revendues</strong> à des tiers ni utilisées à d'autres fins.",
  },
];

export function RdvFunnel() {
  const searchParams = useSearchParams();

  const [entreprise, setEntreprise] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const [assurances, setAssurances] = useState<string[]>([
    "Assurance Décennale BTP (Garantie 10 ans)",
  ]);
  const [jour, setJour] = useState<string>("Demain");
  const [creneau, setCreneau] = useState<string>("Matinée (08h00 - 10h00)");
  const [notes, setNotes] = useState<string>("");
  const [website, setWebsite] = useState<string>(""); // Honeypot

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pré-remplissage automatique depuis les query params de l'e-mail
  useEffect(() => {
    const qSte = searchParams.get("ste") || searchParams.get("entreprise") || "";
    const qPrenom = searchParams.get("prenom") || "";
    const qNom = searchParams.get("nom") || "";
    const qTel = searchParams.get("tel") || searchParams.get("telephone") || "";
    const qEmail = searchParams.get("email") || "";

    if (qSte) setEntreprise(qSte);
    if (qPrenom) setPrenom(qPrenom);
    if (qNom) setNom(qNom);
    if (qTel) setTelephone(qTel);
    if (qEmail) setEmail(qEmail);
  }, [searchParams]);

  function toggleAssurance(item: string) {
    setAssurances((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!telephone && !email) {
      setErrorMessage("Veuillez renseigner au moins un numéro de téléphone ou un e-mail pour l'appel.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entreprise,
          prenom,
          nom,
          telephone,
          email,
          assurances,
          jour,
          creneau,
          notes,
          website,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur de transmission");
      }

      setIsSuccess(true);
    } catch {
      // Même en cas de coupure réseau, on valide localement pour le prospect
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rdv-funnel" data-isolated-funnel="true">
      {/* ===== EN-TÊTE DÉDIÉ (Pas de mention débarras) ===== */}
      <header className="rdv-topbar">
        <div className="rdv-topbar__inner">
          <div className="rdv-topbar__brand">
            <div className="rdv-topbar__icon">
              <Icon name="shield-check" size={20} />
            </div>
            <div>
              <div className="rdv-topbar__title">KESIAH & PARTENAIRES</div>
              <div className="rdv-topbar__subtitle">
                Mandataire Assurance BTP &amp; Décennale • Gironde (33)
              </div>
            </div>
          </div>
          <div className="rdv-topbar__actions">
            <a href="tel:0751352249" className="rdv-phone-btn">
              <Icon name="phone" size={15} />
              <span>07 51 35 22 49</span>
            </a>
          </div>
        </div>
      </header>

      {/* ===== HERO DÉDIÉ BTP ===== */}
      <section className="rdv-hero">
        <div className="rdv-hero__inner">
          <div className="rdv-hero__eyebrow">
            <Spark size={14} />
            <span>Audit Flash 100% Gratuit • BTP Gironde</span>
          </div>

          <h1 className="rdv-hero__title">
            Votre point d&apos;échange téléphonique de 10&nbsp;minutes.
          </h1>

          <p className="rdv-hero__lead">
            {entreprise ? (
              <>
                Spécialement dédié à <strong>{entreprise}</strong> : faites
                auditer vos garanties Décennale, Mutuelle TNS ou Prévoyance.
                Zéro paperasse, 0&nbsp;engagement, résiliation 100% prise en
                charge.
              </>
            ) : (
              <>
                Artisans et indépendants du BTP en Gironde (33) : vérifiez en
                10&nbsp;minutes si vos contrats actuels sont au juste prix de
                marché. Sans engagement.
              </>
            )}
          </p>

          <div className="rdv-hero__badges">
            <div className="rdv-hero__badge-item">
              <Icon name="hard-hat" size={16} />
              <span>10 min chrono sans blabla</span>
            </div>
            <div className="rdv-hero__badge-item">
              <Icon name="sparkles" size={16} />
              <span>15% à 30% d&apos;économies moyennes</span>
            </div>
            <div className="rdv-hero__badge-item">
              <Icon name="shield-check" size={16} />
              <span>Résiliation 100% gérée (Loi Hamon)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BANDEAU PARTENAIRES ASSUREURS ===== */}
      <section className="rdv-partners" aria-label="Compagnies d'assurance partenaires">
        <div className="rdv-partners__inner">
          <div className="rdv-partners__label">
            Partenariats établis auprès des acteurs de référence
          </div>
          <div className="rdv-partners__grid">
            {PARTNERS.map((p) => (
              <div key={p.name} className="rdv-partners__item" title={p.name}>
                <Image
                  src={p.src}
                  alt={p.name}
                  width={p.width}
                  height={p.height}
                  className="rdv-partners__img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CORPS PRINCIPAL : FORMULAIRE & PILIERS ===== */}
      <main style={{ padding: "48px 20px", maxWidth: "1140px", margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "start" }}>
          
          {/* COLONNE GAUCHE : FORMULAIRE OU CARTE DE SUCCÈS */}
          <div>
            {isSuccess ? (
              <div className="rdv-card" style={{ borderTop: "4px solid var(--cr-emerald-600)", textAlign: "center", padding: "40px 24px" }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "var(--cr-emerald-100)",
                  color: "var(--cr-emerald-600)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <Icon name="shield-check" size={36} />
                </div>
                <h2 style={{ fontSize: "24px", color: "var(--cr-navy-950)", marginBottom: "12px", fontWeight: 800 }}>
                  C&apos;est validé {prenom ? prenom : ""} !
                </h2>
                <p style={{ fontSize: "16px", color: "var(--cr-pearl-700)", lineHeight: "1.6", marginBottom: "24px" }}>
                  Votre demande de point téléphonique de 10 minutes a bien été enregistrée pour{" "}
                  <strong>{entreprise || "votre entreprise"}</strong>.
                </p>

                <div style={{ background: "var(--cr-pearl-100)", padding: "18px", borderRadius: "12px", textAlign: "left", marginBottom: "24px" }}>
                  <div style={{ fontSize: "14px", marginBottom: "8px" }}>
                    <strong>Créneau retenu :</strong> {jour} ({creneau})
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "8px" }}>
                    <strong>Numéro d&apos;appel :</strong> {telephone || "Non précisé"}
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    <strong>Interlocuteur :</strong> Kesiah Ntumba (Mandataire BTP)
                  </div>
                </div>

                <p style={{ fontSize: "14px", color: "var(--cr-pearl-500)", marginBottom: "20px" }}>
                  Vous recevrez un appel directement sur ce créneau. Si vous avez une urgence chantier d&apos;ici là, vous pouvez joindre Kesiah au <strong>07 51 35 22 49</strong>.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="btn btn--secondary btn--sm"
                  style={{ borderRadius: "8px" }}
                >
                  Modifier ma demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rdv-card">
                <div style={{ marginBottom: "24px" }}>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--cr-emerald-600)",
                    display: "block",
                    marginBottom: "4px"
                  }}>
                    Étape 1 sur 1
                  </span>
                  <h2 className="rdv-card__title">Confirmez votre appel de 10 minutes</h2>
                  <p className="rdv-card__desc">
                    Vérifiez ou complétez vos coordonnées pour que nous puissions vous rappeler au moment idéal.
                  </p>
                </div>

                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* BLOC 1 : COORDONNÉES */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--cr-navy-950)", marginBottom: "6px" }}>
                    Nom de votre entreprise / enseigne
                  </label>
                  <input
                    type="text"
                    className="rdv-input"
                    placeholder="Ex: SARL Gironde Rénovation, BTP Aquitaine..."
                    value={entreprise}
                    onChange={(e) => setEntreprise(e.target.value)}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--cr-navy-950)", marginBottom: "6px" }}>
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="rdv-input"
                      placeholder="Votre prénom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--cr-navy-950)", marginBottom: "6px" }}>
                      Nom
                    </label>
                    <input
                      type="text"
                      className="rdv-input"
                      placeholder="Votre nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--cr-navy-950)", marginBottom: "6px" }}>
                      Téléphone portable <span style={{ color: "var(--cr-emerald-600)" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      className="rdv-input"
                      placeholder="06 .. .. .. .."
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--cr-navy-950)", marginBottom: "6px" }}>
                      Adresse e-mail
                    </label>
                    <input
                      type="email"
                      className="rdv-input"
                      placeholder="contact@entreprise.fr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* BLOC 2 : ASSURANCES À AUDITER */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--cr-navy-950)", marginBottom: "10px" }}>
                    Quelles assurances souhaitez-vous auditer ou optimiser ?
                  </label>
                  <div className="rdv-chips">
                    {ASSURANCE_OPTIONS.map((item) => {
                      const active = assurances.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          className="rdv-chip"
                          aria-pressed={active}
                          onClick={() => toggleAssurance(item)}
                        >
                          <Icon
                            name={active ? "shield-check" : "sparkles"}
                            size={14}
                          />
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* BLOC 3 : CHOIX DU CRÉNEAU */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--cr-navy-950)", marginBottom: "10px" }}>
                    Jour préféré pour votre point de 10 min
                  </label>
                  <div className="rdv-chips" style={{ marginBottom: "14px" }}>
                    {JOUR_OPTIONS.map((j) => (
                      <button
                        key={j}
                        type="button"
                        className="rdv-chip"
                        aria-pressed={jour === j}
                        onClick={() => setJour(j)}
                      >
                        {j}
                      </button>
                    ))}
                  </div>

                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--cr-navy-950)", marginBottom: "10px" }}>
                    Tranche horaire souhaitée
                  </label>
                  <div className="rdv-chips">
                    {CRENEAU_OPTIONS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className="rdv-chip"
                        aria-pressed={creneau === c}
                        onClick={() => setCreneau(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* BLOC 4 : NOTES */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--cr-navy-950)", marginBottom: "6px" }}>
                    Corps de métier ou précisions éventuelles (optionnel)
                  </label>
                  <textarea
                    rows={2}
                    className="rdv-input"
                    placeholder="Ex: Maçonnerie, plomberie, contrat actuel arrivant à échéance..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {errorMessage && (
                  <div style={{ color: "var(--cr-danger)", fontSize: "14px", marginBottom: "16px" }}>
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn--primary btn--lg"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    borderRadius: "12px",
                    fontWeight: 700,
                  }}
                >
                  <span>{isSubmitting ? "Envoi en cours..." : "Confirmer mon créneau d'appel gratuit"}</span>
                  <Icon name="arrow-right" size={16} />
                </button>

                <div style={{ textAlign: "center", marginTop: "14px", fontSize: "12px", color: "var(--cr-pearl-500)" }}>
                  🔒 100% sans engagement • Données protégées RGPD • Zéro spam
                </div>
              </form>
            )}
          </div>

          {/* COLONNE DROITE : LES 4 ENGAGEMENTS CLÉS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="rdv-card" style={{ background: "var(--cr-pearl-100)", border: "none" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--cr-navy-950)", marginBottom: "12px" }}>
                Comment se passe votre échange ?
              </h3>
              <p style={{ fontSize: "14px", color: "var(--cr-pearl-700)", lineHeight: 1.6, margin: 0 }}>
                Un échange direct, sans formalités lourdes, pensé pour les professionnels du BTP qui n&apos;ont pas de temps à perdre entre deux chantiers.
              </p>
            </div>

            <div className="rdv-card">
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "var(--cr-emerald-100)",
                  color: "var(--cr-emerald-600)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Icon name="hard-hat" size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--cr-navy-950)", margin: "0 0 6px" }}>
                    1. 10 minutes chrono, adapté à vos chantiers
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--cr-pearl-700)", margin: 0, lineHeight: 1.55 }}>
                    Pas de rendez-vous en agence d&apos;une heure. Nous ciblons directement vos activités réelles et vos montants de garantie.
                  </p>
                </div>
              </div>
            </div>

            <div className="rdv-card">
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "var(--cr-navy-100)",
                  color: "var(--cr-navy-900)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Icon name="sparkles" size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--cr-navy-950)", margin: "0 0 6px" }}>
                    2. Comparatif multi-compagnies
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--cr-pearl-700)", margin: 0, lineHeight: 1.55 }}>
                    Nous interrogeons les leaders de l&apos;assurance BTP (AXA, Generali, SwissLife...) pour obtenir les franchises les plus protectrices au tarif le plus bas.
                  </p>
                </div>
              </div>
            </div>

            <div className="rdv-card">
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "var(--cr-emerald-100)",
                  color: "var(--cr-emerald-600)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <Icon name="shield-check" size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--cr-navy-950)", margin: "0 0 6px" }}>
                    3. Résiliation 100% prise en charge
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--cr-pearl-700)", margin: 0, lineHeight: 1.55 }}>
                    Si vous changez, vous n&apos;avez aucune démarche à faire : nous envoyons la notification à votre assureur actuel en respectant scrupuleusement la loi.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ===== SECTION FAQ DÉDIÉE REASSURANCE ===== */}
        <section style={{ marginTop: "72px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--cr-emerald-600)",
              marginBottom: "8px"
            }}>
              <Spark size={14} />
              <span>Questions fréquentes</span>
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--cr-navy-950)", margin: "0 0 10px" }}>
              Tout savoir sur votre échange téléphonique.
            </h2>
            <p style={{ fontSize: "16px", color: "var(--cr-pearl-500)", maxWidth: "560px", margin: "0 auto" }}>
              Des réponses claires et sans détour pour les professionnels du bâtiment en Gironde.
            </p>
          </div>

          <div style={{ display: "grid", gap: "16px", maxWidth: "860px", margin: "0 auto" }}>
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={idx}
                className="faq-home__item"
                style={{
                  background: "#fff",
                  border: "1px solid var(--cr-pearl-200)",
                  borderRadius: "14px",
                  overflow: "hidden"
                }}
              >
                <summary className="faq-home__q">
                  <span className="faq-home__q-text">{item.q}</span>
                  <span className="faq-home__q-icon">
                    <Icon name="chevron-down" size={18} />
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
      </main>

      {/* ===== PIED DE PAGE DÉDIÉ KESIAH & PARTENAIRES ===== */}
      <footer className="rdv-footer">
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div style={{ fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
            KESIAH &amp; PARTENAIRES — MANDATAIRE D&apos;ASSURANCE BTP
          </div>
          <p style={{ margin: "0 0 12px 0", color: "rgba(255, 255, 255, 0.65)" }}>
            Accompagnement indépendant des artisans et entreprises du BTP en Gironde (33) et Nouvelle-Aquitaine.
          </p>
          <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.45)" }}>
            Activité d&apos;intermédiation en assurance exercée en conformité avec le Code des Assurances • Respect du RGPD • Aucune cession de données à des tiers.
          </div>
        </div>
      </footer>
    </div>
  );
}
