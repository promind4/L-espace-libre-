"use client";

/**
 * ContactQuoteForm — formulaire « Value-First » (redesign v3).
 *
 * Flow scindé en deux temps :
 *
 *  1. Formulaire principal (gauche) — 5 sections de critères techniques
 *     scannables d'un coup d'œil :
 *       01. Le bien à libérer (type + surface réelle à débarrasser)
 *       02. État du lieu (salubrité, 4 niveaux)
 *       03. Accessibilité (4 niveaux, alignés sur FloorAccess pricing)
 *       04. Annexes optionnelles (multi-sélection + surface annexes)
 *       05. Précisions accès (textarea libre, optionnel)
 *     Pas de submit ici.
 *
 *  2. Mini-form de capture (aside) — sous l'estimation live :
 *       Prénom, Téléphone (optionnel), E-mail + consent RGPD.
 *     Un seul bouton submit qui envoie TOUT (techniques + coordonnées).
 *
 * L'estimation se recalcule en temps réel à chaque changement de
 * critère technique (useMemo + lib/pricing.ts).
 */

import { useMemo, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import {
  computeEstimate,
  formatEuros,
  PRICING_CONSTANTS,
  TYPE_LABELS,
  type BienType,
  type FloorAccess,
  type SalubrityLevel,
} from "@/lib/pricing";
import {
  ACCESSIBILITE_OPTIONS,
  ANNEXES_OPTIONS,
  BIEN_OPTIONS,
  SALUBRITE_OPTIONS,
  type AnnexeId,
} from "@/content/quote-options";

const SURFACE_DEFAULT = 60;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; range: { low: number; high: number } }
  | { kind: "error"; message: string };

export function ContactQuoteForm() {
  // ===== ÉTAT — critères techniques =====
  const [type, setType] = useState<BienType>("maison");
  const [surface, setSurface] = useState<number>(SURFACE_DEFAULT);
  const [salubrity, setSalubrity] = useState<SalubrityLevel>("normal");
  const [floor, setFloor] = useState<FloorAccess>("rdc");
  const [annexes, setAnnexes] = useState<AnnexeId[]>([]);
  const [annexesSurface, setAnnexesSurface] = useState<number>(0);
  const [acces, setAcces] = useState<string>("");

  // ===== ÉTAT — capture (mini-form aside) =====
  const [prenom, setPrenom] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);
  const [website, setWebsite] = useState<string>(""); // honeypot
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // ===== Estimation live =====
  const estimate = useMemo(() => {
    try {
      return computeEstimate({
        type,
        surface_m2: surface,
        annexes_surface_m2: annexesSurface > 0 ? annexesSurface : undefined,
        salubrity,
        floor,
        zone: "cub",
      });
    } catch {
      return null;
    }
  }, [type, surface, annexesSurface, salubrity, floor]);

  // ===== Helpers =====
  function clampSurface(raw: string, setter: (n: number) => void, max: number) {
    const num = Number.parseInt(raw, 10);
    if (Number.isNaN(num)) return;
    const min = PRICING_CONSTANTS.SURFACE_MIN_PUBLIC;
    const clamped = Math.max(min, Math.min(max, num));
    setter(clamped);
  }

  function toggleAnnexe(id: AnnexeId) {
    setAnnexes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  // ===== Submit (mini-form aside) =====
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          surface_m2: surface,
          annexes,
          annexes_surface_m2: annexesSurface,
          salubrity,
          floor,
          acces: acces.trim() || undefined,
          prenom: prenom.trim(),
          email: email.trim(),
          telephone: telephone.trim() || undefined,
          consent,
          website,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        const errorMessages: Record<string, string> = {
          rate_limit:
            "Vous avez atteint la limite de demandes. Réessayez dans une heure.",
          invalid_input:
            "Certains champs sont invalides. Vérifiez votre saisie.",
          invalid_json: "Erreur technique. Réessayez dans un instant.",
          email_failed:
            "L'envoi a échoué. Contactez-nous directement par e-mail.",
        };
        const msg =
          (data.error && errorMessages[data.error]) ??
          "Une erreur est survenue. Réessayez dans un instant.";
        setStatus({ kind: "error", message: msg });
        return;
      }

      const data = (await res.json()) as {
        range: { low: number; high: number };
      };
      setStatus({ kind: "success", range: data.range });
    } catch {
      setStatus({
        kind: "error",
        message: "Connexion impossible. Vérifiez votre réseau et réessayez.",
      });
    }
  }

  const submitting = status.kind === "submitting";
  const succeeded = status.kind === "success";

  return (
    <div className="cqf-wrap">
      {/* =================================================
           FORMULAIRE PRINCIPAL — Critères techniques
          ================================================= */}
      <section className="cqf" aria-label="Critères de votre projet">
        {/* ----- 01 · Le bien à libérer ----- */}
        <fieldset className="cqf__group">
          <legend className="cqf__group-label">
            <Spark size={12} />
            01 · Le bien à libérer
          </legend>

          <div className="cqf__field">
            <label className="cqf__label">
              Type de bien <span className="cqf__req">*</span>
            </label>
            <div
              className="cqf__chips"
              role="radiogroup"
              aria-label="Type de bien"
            >
              {BIEN_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="cqf__chip"
                  aria-pressed={type === opt.id}
                  onClick={() => setType(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="cqf__field" style={{ marginTop: 16 }}>
            <label htmlFor="cqf-surface" className="cqf__label">
              Quelle est la surface totale des zones à débarrasser&nbsp;?{" "}
              <span className="cqf__req">*</span>
            </label>
            <div className="cqf__surface">
              <input
                id="cqf-surface"
                type="range"
                className="cqf__surface-slider"
                min={PRICING_CONSTANTS.SURFACE_MIN_PUBLIC}
                max={PRICING_CONSTANTS.SURFACE_MAX_PUBLIC}
                step={5}
                value={surface}
                onChange={(e) =>
                  setSurface(Number.parseInt(e.target.value, 10))
                }
                aria-valuetext={`${surface} mètres carrés`}
              />
              <input
                type="number"
                className="cqf__surface-input"
                min={PRICING_CONSTANTS.SURFACE_MIN_PUBLIC}
                max={PRICING_CONSTANTS.SURFACE_MAX_PUBLIC}
                step={1}
                value={surface}
                onChange={(e) =>
                  clampSurface(
                    e.target.value,
                    setSurface,
                    PRICING_CONSTANTS.SURFACE_MAX_PUBLIC,
                  )
                }
                aria-label="Surface en mètres carrés"
                inputMode="numeric"
              />
            </div>
            <span className="cqf__hint">
              Indiquez uniquement la surface des pièces concernées (et non
              la surface totale du bien). Affinée sur photos ou visite.
            </span>
          </div>
        </fieldset>

        {/* ----- 02 · État du lieu ----- */}
        <fieldset className="cqf__group">
          <legend className="cqf__group-label">
            <Spark size={12} />
            02 · État du lieu
          </legend>

          <div className="cqf__field">
            <label className="cqf__label">
              Salubrité et encombrement <span className="cqf__req">*</span>
            </label>
            <div
              className="cqf__chips"
              role="radiogroup"
              aria-label="Niveau de salubrité"
            >
              {SALUBRITE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="cqf__chip"
                  aria-pressed={salubrity === opt.id}
                  onClick={() => setSalubrity(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        {/* ----- 03 · Accessibilité ----- */}
        <fieldset className="cqf__group">
          <legend className="cqf__group-label">
            <Spark size={12} />
            03 · Accessibilité
          </legend>

          <div className="cqf__field">
            <label className="cqf__label">
              Étage et accès <span className="cqf__req">*</span>
            </label>
            <div
              className="cqf__chips"
              role="radiogroup"
              aria-label="Niveau d'accessibilité"
            >
              {ACCESSIBILITE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="cqf__chip"
                  aria-pressed={floor === opt.id}
                  onClick={() => setFloor(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        {/* ----- 04 · Annexes (optionnel) ----- */}
        <fieldset className="cqf__group">
          <legend className="cqf__group-label">
            <Spark size={12} />
            04 · Annexes à débarrasser (optionnel)
          </legend>

          <div className="cqf__field">
            <label className="cqf__label">
              Quelles dépendances à vider également&nbsp;?
            </label>
            <div className="cqf__checkboxes" role="group" aria-label="Annexes">
              {ANNEXES_OPTIONS.map((opt) => {
                const checked = annexes.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`cqf__checkbox ${checked ? "cqf__checkbox--checked" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAnnexe(opt.id)}
                    />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </div>

          {annexes.length > 0 && (
            <div className="cqf__field" style={{ marginTop: 16 }}>
              <label htmlFor="cqf-annexes-surface" className="cqf__label">
                Surface totale des annexes
              </label>
              <div className="cqf__surface">
                <input
                  id="cqf-annexes-surface"
                  type="range"
                  className="cqf__surface-slider"
                  min={0}
                  max={PRICING_CONSTANTS.ANNEX_SURFACE_MAX}
                  step={5}
                  value={annexesSurface}
                  onChange={(e) =>
                    setAnnexesSurface(Number.parseInt(e.target.value, 10))
                  }
                  aria-valuetext={`${annexesSurface} mètres carrés d'annexes`}
                />
                <input
                  type="number"
                  className="cqf__surface-input"
                  min={0}
                  max={PRICING_CONSTANTS.ANNEX_SURFACE_MAX}
                  step={1}
                  value={annexesSurface}
                  onChange={(e) =>
                    clampSurface(
                      e.target.value,
                      setAnnexesSurface,
                      PRICING_CONSTANTS.ANNEX_SURFACE_MAX,
                    )
                  }
                  aria-label="Surface des annexes en mètres carrés"
                  inputMode="numeric"
                />
              </div>
              <span className="cqf__hint">
                Cumul des surfaces des annexes sélectionnées (les annexes
                sont pondérées : densité d'objets plus faible qu'en habitat).
              </span>
            </div>
          )}
        </fieldset>

        {/* ----- 05 · Précisions accès (optionnel) ----- */}
        <fieldset className="cqf__group">
          <legend className="cqf__group-label">
            <Spark size={12} />
            05 · Précisions d&apos;accès (optionnel)
          </legend>

          <div className="cqf__field">
            <label htmlFor="cqf-acces" className="cqf__label">
              Stationnement, contraintes, créneaux préférés…
            </label>
            <textarea
              id="cqf-acces"
              rows={3}
              placeholder="Stationnement difficile, ascenseur étroit, présence d'animaux, créneaux préférés…"
              value={acces}
              onChange={(e) => setAcces(e.target.value)}
              maxLength={500}
            />
          </div>
        </fieldset>
      </section>

      {/* =================================================
           ASIDE — Estimation live + Capture mini-form
          ================================================= */}
      <aside className="cqf-aside" aria-label="Estimation indicative et demande de devis ferme">
        {/* ----- Bloc estimation live (prix d'appel mis en valeur) ----- */}
        <div className="cqf-aside__estimate">
          <span className="cqf-aside__eyebrow">
            <Spark size={12} variant="light" />
            Votre estimation
          </span>
          <div className="cqf-aside__price-prefix">à partir de</div>
          <div className="cqf-aside__price">
            {estimate ? formatEuros(estimate.low) : "—"}
          </div>
          <div className="cqf-aside__price-max">
            <span>jusqu&apos;à&nbsp;</span>
            <strong>{estimate ? formatEuros(estimate.high) : "—"}</strong>
            <span>&nbsp;selon la complexité réelle</span>
          </div>
          <p className="cqf-aside__note">
            Le devis ferme final intègre la revente éventuelle des biens
            valorisables et peut réduire encore ce prix.
          </p>
          <span className="cqf-aside__pill">
            <Icon name="shield-check" size={12} />
            Assurance RC Pro incluse
          </span>

          {/* Récap des paramètres choisis */}
          <div className="cqf-aside__recap">
            <div className="cqf-aside__recap-row">
              <span>Type</span>
              <strong>{TYPE_LABELS[type]}</strong>
            </div>
            <div className="cqf-aside__recap-row">
              <span>Surface à vider</span>
              <strong>{surface} m²</strong>
            </div>
            {annexes.length > 0 && annexesSurface > 0 && (
              <div className="cqf-aside__recap-row">
                <span>Annexes</span>
                <strong>{annexesSurface} m²</strong>
              </div>
            )}
            <div className="cqf-aside__recap-row">
              <span>Salubrité</span>
              <strong>
                {SALUBRITE_OPTIONS.find((o) => o.id === salubrity)?.label}
              </strong>
            </div>
            <div className="cqf-aside__recap-row">
              <span>Accès</span>
              <strong>
                {ACCESSIBILITE_OPTIONS.find((o) => o.id === floor)?.label}
              </strong>
            </div>
          </div>
        </div>

        {/* ----- Encart capture mini-form ----- */}
        <div className="cqf-aside__capture">
          <span className="cqf-aside__capture-eyebrow">
            <Spark size={12} />
            Devis ferme sous 2 h
          </span>
          <h3>Cette estimation est automatique.</h3>
          <p className="cqf-aside__capture-lead">
            Pour un devis <strong>ferme</strong> qui tient compte de la
            revente des biens valorisables, laissez-nous trois infos —
            réponse sous deux heures ouvrées.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="cqf__field">
              <label htmlFor="cqf-prenom" className="cqf__label">
                Prénom <span className="cqf__req">*</span>
              </label>
              <input
                id="cqf-prenom"
                type="text"
                placeholder="Marie"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
                maxLength={80}
                autoComplete="given-name"
              />
            </div>

            <div className="cqf__field">
              <label htmlFor="cqf-tel" className="cqf__label">
                Téléphone
              </label>
              <input
                id="cqf-tel"
                type="tel"
                placeholder="06 00 00 00 00"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                maxLength={30}
                autoComplete="tel"
              />
            </div>

            <div className="cqf__field">
              <label htmlFor="cqf-email" className="cqf__label">
                E-mail <span className="cqf__req">*</span>
              </label>
              <input
                id="cqf-email"
                type="email"
                placeholder="marie@exemple.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={254}
                autoComplete="email"
              />
            </div>

            <div className="cqf__consent">
              <input
                id="cqf-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <label htmlFor="cqf-consent">
                J&apos;accepte le traitement de mes données pour cette
                demande de devis.{" "}
                <a href="/politique-de-confidentialite">
                  Politique de confidentialité
                </a>
                .
              </label>
            </div>

            {/* Honeypot caché */}
            <div className="cqf__honeypot" aria-hidden>
              <label htmlFor="cqf-website">Site web (laissez vide)</label>
              <input
                id="cqf-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="cqf__submit"
              disabled={submitting || succeeded}
            >
              {submitting
                ? "Envoi en cours…"
                : succeeded
                  ? "Demande envoyée"
                  : "Recevoir mon devis ferme"}
              {!submitting && !succeeded && (
                <Icon name="arrow-right" size={18} />
              )}
            </button>

            <p className="cqf__legal">
              Aucun engagement, aucun appel commercial non sollicité.
            </p>

            {status.kind === "success" && (
              <div className="cqf__status cqf__status--ok" role="status">
                Demande reçue. Vous recevez par e-mail votre estimation
                dans quelques instants. Notre équipe revient vers vous
                sous deux heures ouvrées pour un devis ferme.
              </div>
            )}
            {status.kind === "error" && (
              <div className="cqf__status cqf__status--err" role="alert">
                {status.message}
              </div>
            )}
          </form>
        </div>

        {/* ----- Trust pills ----- */}
        <div className="cqf-aside__trust">
          <h4>Ce que vous recevrez</h4>
          <ul>
            <li>
              <Spark size={14} />
              Un devis ferme sous deux heures ouvrées
            </li>
            <li>
              <Spark size={14} />
              L&apos;attestation d&apos;assurance RC Pro
            </li>
            <li>
              <Spark size={14} />
              Notre charte 0 gaspillage
            </li>
            <li>
              <Spark size={14} />
              Une date d&apos;intervention proposée
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
