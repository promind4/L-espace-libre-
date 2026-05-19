"use client";

/**
 * Simulator — module phare de conversion.
 *
 * Parcours en 3 étapes (Constitution P3.2 — NON NÉGOCIABLE) :
 *   1. Type de bien (maison / appartement / cave)
 *   2. Surface + étage (volume évacué inféré via DENSITY_COEFF 0,38)
 *   3. E-mail + consentement RGPD
 *
 * Côté public : salubrité = "normal" et zone = "cub" par défaut.
 * L'outil interne /admin/estimateur expose tous les coefficients.
 *
 * Accessibilité :
 *   - Navigation clavier complète (Tab + Entrée).
 *   - Focus visible 4 px (--shadow-focus).
 *   - Labels ARIA explicites.
 *   - Cibles tactiles ≥ 44 px.
 */
import { useId, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  computeEstimate,
  formatEuros,
  TYPE_LABELS,
  FLOOR_LABELS,
  PRICING_CONSTANTS,
  type BienType,
  type FloorAccess,
} from "@/lib/pricing";
import styles from "./Simulator.module.css";

type Step = 0 | 1 | 2;
type Status = "idle" | "submitting" | "submitted" | "error";

const TYPE_OPTIONS: Array<{
  id: BienType;
  label: string;
  sub: string;
  icon: "home" | "building-2" | "archive";
}> = [
  { id: "maison", label: "Maison", sub: "Pavillon, plain-pied", icon: "home" },
  {
    id: "appartement",
    label: "Appartement",
    sub: "Studio → T5",
    icon: "building-2",
  },
  {
    id: "cave",
    label: "Cave / Garage",
    sub: "Local, dépendance",
    icon: "archive",
  },
];

const FLOOR_OPTIONS: FloorAccess[] = [
  "rdc",
  "etage-asc",
  "etage-sans-asc",
  "haut-sans-asc",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SimulatorProps {
  /** Type pré-sélectionné (utile pour les pages services). */
  defaultType?: BienType;
}

export function Simulator({ defaultType }: SimulatorProps) {
  const formId = useId();
  const [step, setStep] = useState<Step>(0);
  const [type, setType] = useState<BienType | null>(defaultType ?? null);
  const [surface, setSurface] = useState<number>(60);
  const [floor, setFloor] = useState<FloorAccess>("rdc");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pré-calcul transparent : volume estimé évacué + fourchette.
  const estimate = useMemo(() => {
    if (!type) return null;
    return computeEstimate({
      type,
      surface_m2: surface,
      floor,
      salubrity: "normal",
      zone: "cub",
    });
  }, [type, surface, floor]);

  const emailValid = EMAIL_RE.test(email);
  const canAdvance =
    (step === 0 && type !== null) ||
    step === 1 ||
    (step === 2 && emailValid && consent);

  function next() {
    if (!canAdvance) return;
    if (step < 2) {
      setStep((step + 1) as Step);
    } else {
      void submit();
    }
  }

  function back() {
    if (step > 0) setStep((step - 1) as Step);
  }

  async function submit() {
    if (!type || !estimate) return;
    if (website.length > 0) {
      // Honeypot rempli — silencieux, on simule un succès.
      setStatus("submitted");
      return;
    }
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          surface_m2: surface,
          floor,
          email,
          consent,
          website,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "submission_failed");
      }
      setStatus("submitted");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error && err.message === "rate_limit"
          ? "Trop de demandes. Merci de réessayer dans une heure."
          : "Une erreur est survenue. Merci de réessayer dans quelques instants.",
      );
    }
  }

  function reset() {
    setStep(0);
    setType(defaultType ?? null);
    setSurface(60);
    setFloor("rdc");
    setEmail("");
    setConsent(false);
    setStatus("idle");
    setErrorMessage(null);
  }

  return (
    <section
      id="simulator"
      className={styles.section}
      aria-labelledby={`${formId}-title`}
    >
      <div className="container">
        <header className={styles.head}>
          <span className="eyebrow">Simulateur</span>
          <h2 id={`${formId}-title`}>
            Une fourchette de prix en 30 secondes.
          </h2>
          <p className={styles.lead}>
            Trois questions. Aucun engagement. Le devis ferme arrive par photo,
            sous deux heures.
          </p>
        </header>

        <div className={styles.card}>
          {status !== "submitted" && (
            <>
              <div
                className={styles.steps}
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={step + 1}
                aria-label={`Étape ${step + 1} sur 3`}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`${styles.stepBar} ${
                      step >= i ? styles.stepBarActive : ""
                    }`}
                  />
                ))}
              </div>

              {step === 0 && (
                <Step1Type
                  selected={type}
                  onSelect={(t) => setType(t)}
                  formId={formId}
                />
              )}

              {step === 1 && (
                <Step2SurfaceFloor
                  surface={surface}
                  floor={floor}
                  onSurfaceChange={setSurface}
                  onFloorChange={setFloor}
                  formId={formId}
                />
              )}

              {step === 2 && (
                <Step3Email
                  email={email}
                  consent={consent}
                  website={website}
                  emailValid={emailValid}
                  onEmailChange={setEmail}
                  onConsentChange={setConsent}
                  onWebsiteChange={setWebsite}
                  formId={formId}
                  error={status === "error" ? errorMessage : null}
                />
              )}

              <nav className={styles.nav} aria-label="Navigation Simulateur">
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnGhost} ${
                    step === 0 ? styles.btnInvisible : ""
                  }`}
                  onClick={back}
                  disabled={status === "submitting"}
                >
                  <Icon name="arrow-left" />
                  Retour
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={next}
                  disabled={!canAdvance || status === "submitting"}
                  aria-disabled={!canAdvance || status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <span
                        className={styles.submittedSpinner}
                        aria-hidden
                      />
                      Envoi en cours…
                    </>
                  ) : step < 2 ? (
                    <>
                      Continuer
                      <Icon name="arrow-right" />
                    </>
                  ) : (
                    <>
                      Obtenir mon estimation
                      <Icon name="arrow-right" />
                    </>
                  )}
                </button>
              </nav>
            </>
          )}

          {status === "submitted" && type && estimate && (
            <Result
              type={type}
              surface={surface}
              floor={floor}
              email={email}
              low={estimate.low}
              high={estimate.high}
              onReset={reset}
            />
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  Sous-composants
// ============================================================

function Step1Type({
  selected,
  onSelect,
  formId,
}: {
  selected: BienType | null;
  onSelect: (t: BienType) => void;
  formId: string;
}) {
  return (
    <div role="group" aria-labelledby={`${formId}-step1-title`}>
      <span className={styles.eyebrow}>Étape 1 / 3</span>
      <h3 id={`${formId}-step1-title`} className={styles.question}>
        Quel type de bien&#8239;?
      </h3>
      <div className={styles.types}>
        {TYPE_OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className={`${styles.typeOption} ${
                isSelected ? styles.typeOptionSelected : ""
              }`}
              onClick={() => onSelect(opt.id)}
              aria-pressed={isSelected}
            >
              <Icon name={opt.icon} />
              <span className={styles.typeOptionLabel}>{opt.label}</span>
              <span className={styles.typeOptionSub}>{opt.sub}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step2SurfaceFloor({
  surface,
  floor,
  onSurfaceChange,
  onFloorChange,
  formId,
}: {
  surface: number;
  floor: FloorAccess;
  onSurfaceChange: (v: number) => void;
  onFloorChange: (v: FloorAccess) => void;
  formId: string;
}) {
  const volume = Math.round(surface * PRICING_CONSTANTS.DENSITY_COEFF * 10) / 10;
  const sliderId = `${formId}-surface`;
  const selectId = `${formId}-floor`;
  return (
    <div role="group" aria-labelledby={`${formId}-step2-title`}>
      <span className={styles.eyebrow}>Étape 2 / 3</span>
      <h3 id={`${formId}-step2-title`} className={styles.question}>
        Surface et accès du bien.
      </h3>

      <div className={styles.field}>
        <label htmlFor={sliderId} className={styles.label}>
          Surface approximative
        </label>
        <div className={styles.rangeValue}>
          {surface}
          <span className={styles.rangeUnit}>m²</span>
        </div>
        <input
          id={sliderId}
          type="range"
          min={PRICING_CONSTANTS.SURFACE_MIN_PUBLIC}
          max={PRICING_CONSTANTS.SURFACE_MAX_PUBLIC}
          step={5}
          value={surface}
          onChange={(e) => onSurfaceChange(Number(e.target.value))}
          className={styles.slider}
          aria-valuemin={PRICING_CONSTANTS.SURFACE_MIN_PUBLIC}
          aria-valuemax={PRICING_CONSTANTS.SURFACE_MAX_PUBLIC}
          aria-valuenow={surface}
          aria-valuetext={`${surface} mètres carrés, soit environ ${volume} mètres cubes à évacuer`}
        />
        <div className={styles.ticks} aria-hidden>
          <span>10 m²</span>
          <span>80 m²</span>
          <span>150 m²</span>
          <span>250 m²</span>
        </div>
        <p className={styles.rangeVolume}>
          Volume estimé à évacuer&nbsp;: ~{volume}&nbsp;m³.
        </p>
      </div>

      <div className={styles.field}>
        <label htmlFor={selectId} className={styles.label}>
          Étage et accès
        </label>
        <select
          id={selectId}
          className={styles.select}
          value={floor}
          onChange={(e) => onFloorChange(e.target.value as FloorAccess)}
        >
          {FLOOR_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {FLOOR_LABELS[opt]}
            </option>
          ))}
        </select>
        <p className={styles.helper}>
          La présence d&apos;un ascenseur ou le rez-de-chaussée évite la
          majoration d&apos;accès.
        </p>
      </div>
    </div>
  );
}

function Step3Email({
  email,
  consent,
  website,
  emailValid,
  onEmailChange,
  onConsentChange,
  onWebsiteChange,
  formId,
  error,
}: {
  email: string;
  consent: boolean;
  website: string;
  emailValid: boolean;
  onEmailChange: (v: string) => void;
  onConsentChange: (v: boolean) => void;
  onWebsiteChange: (v: string) => void;
  formId: string;
  error: string | null;
}) {
  const emailId = `${formId}-email`;
  const consentId = `${formId}-consent`;
  const websiteId = `${formId}-website`;
  const showEmailError = email.length > 0 && !emailValid;
  return (
    <div role="group" aria-labelledby={`${formId}-step3-title`}>
      <span className={styles.eyebrow}>Étape 3 / 3</span>
      <h3 id={`${formId}-step3-title`} className={styles.question}>
        Où envoyons-nous votre estimation&#8239;?
      </h3>

      <div className={styles.field}>
        <label htmlFor={emailId} className={styles.label}>
          Adresse e-mail
        </label>
        <input
          id={emailId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="prenom.nom@exemple.fr"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={`${styles.input} ${
            showEmailError ? styles.inputError : ""
          }`}
          aria-invalid={showEmailError}
          aria-describedby={showEmailError ? `${emailId}-err` : undefined}
          required
        />
        {showEmailError && (
          <p id={`${emailId}-err`} className={styles.errorText}>
            Merci d&apos;indiquer une adresse e-mail valide.
          </p>
        )}

        {/* Honeypot anti-bot — invisible visuellement, marqué hidden aux lecteurs d'écran. */}
        <div className={styles.honeypot} aria-hidden>
          <label htmlFor={websiteId}>
            Ne pas remplir
            <input
              id={websiteId}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => onWebsiteChange(e.target.value)}
            />
          </label>
        </div>
      </div>

      <label htmlFor={consentId} className={styles.consent}>
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
        />
        <span>
          J&apos;accepte que L&apos;Espace Libre utilise mon e-mail pour
          m&apos;envoyer cette estimation et un éventuel devis ferme. Mes
          données sont conservées 3 ans et je peux demander leur effacement à
          tout moment.{" "}
          <a href="/politique-de-confidentialite">En savoir plus.</a>
        </span>
      </label>

      <p className={styles.helper}>
        Aucun engagement, aucun appel commercial sortant non sollicité.
      </p>

      {error && (
        <p className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Result({
  type,
  surface,
  floor,
  email,
  low,
  high,
  onReset,
}: {
  type: BienType;
  surface: number;
  floor: FloorAccess;
  email: string;
  low: number;
  high: number;
  onReset: () => void;
}) {
  const typeLabel = TYPE_LABELS[type].toLowerCase();
  const floorLabel = FLOOR_LABELS[floor].toLowerCase();
  return (
    <div className={styles.result} role="status" aria-live="polite">
      <span className={styles.resultEyebrow}>Votre estimation</span>
      <p className={styles.resultPrice}>
        {formatEuros(low)}
        <span className={styles.resultPriceUnit}> — </span>
        {formatEuros(high)}
      </p>
      <p className={styles.resultNote}>
        Fourchette indicative pour un(e) {typeLabel} de {surface}&nbsp;m²
        ({floorLabel}). Votre devis ferme arrive par e-mail à{" "}
        <strong>{email}</strong> dans les deux heures, après envoi de quelques
        photos.
      </p>
      <div className={styles.resultActions}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={onReset}
        >
          Nouvelle estimation
        </button>
        <a className={`${styles.btn} ${styles.btnGhost}`} href="/contact">
          Envoyer mes photos
        </a>
      </div>
    </div>
  );
}
