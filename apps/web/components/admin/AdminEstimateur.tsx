"use client";

/**
 * AdminEstimateur — outil interne de production de devis fermes.
 *
 * Réutilise `computeEstimate` (specify §3.10 — même fonction que le
 * public). Expose TOUS les coefficients : salubrité, zone, distance,
 * coefficient correctif personnalisé, notes internes.
 *
 * Calcul en direct (recompute à chaque saisie). Aucune persistance —
 * l'opérateur archive le devis dans son client mail.
 */
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  computeEstimate,
  formatEuros,
  PricingError,
  PRICING_CONSTANTS,
  FLOOR_LABELS,
  SALUBRITY_LABELS,
  TYPE_LABELS,
  ZONE_LABELS,
  type BienType,
  type FloorAccess,
  type SalubrityLevel,
  type Zone,
  type PricingOutput,
} from "@/lib/pricing";
import {
  formatQuoteForClient,
  formatQuoteForOperator,
  generateReference,
} from "@/lib/quote-format";
import styles from "./AdminEstimateur.module.css";

export function AdminEstimateur() {
  // ----- Saisies opérateur -----
  const [type, setType] = useState<BienType>("appartement");
  const [surface, setSurface] = useState<number>(60);
  const [floor, setFloor] = useState<FloorAccess>("rdc");
  const [salubrity, setSalubrity] = useState<SalubrityLevel>("normal");
  const [zone, setZone] = useState<Zone>("cub");
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [customCoef, setCustomCoef] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");

  // ----- Référence + date d'émission stables (regen sur reset) -----
  const [reference, setReference] = useState<string>("");
  const [emittedAt, setEmittedAt] = useState<Date | null>(null);

  // Génère la référence côté client uniquement (évite l'hydration mismatch).
  useEffect(() => {
    if (!reference) {
      const now = new Date();
      setReference(generateReference(now));
      setEmittedAt(now);
    }
  }, [reference]);

  // ----- Calcul live -----
  const { output, error } = useMemo<{
    output: PricingOutput | null;
    error: string | null;
  }>(() => {
    try {
      const out = computeEstimate(
        {
          type,
          surface_m2: surface,
          floor,
          salubrity,
          zone,
          distance_km: zone === "hors-departement" ? distanceKm : undefined,
          custom_coefficient: customCoef === 1 ? undefined : customCoef,
        },
        "admin",
      );
      return { output: out, error: null };
    } catch (err) {
      const message =
        err instanceof PricingError ? err.message : "Erreur de calcul.";
      return { output: null, error: message };
    }
  }, [type, surface, floor, salubrity, zone, distanceKm, customCoef]);

  // ----- Texte client à copier -----
  const clientText = useMemo(() => {
    if (!output || !emittedAt) return "";
    return formatQuoteForClient({
      reference,
      emittedAt,
      input: {
        type,
        surface_m2: surface,
        floor,
        salubrity,
        zone,
        distance_km: zone === "hors-departement" ? distanceKm : undefined,
        custom_coefficient: customCoef === 1 ? undefined : customCoef,
      },
      output,
    });
  }, [output, emittedAt, reference, type, surface, floor, salubrity, zone, distanceKm, customCoef]);

  const operatorText = useMemo(() => {
    if (!output || !emittedAt) return "";
    return formatQuoteForOperator({
      reference,
      emittedAt,
      notesInternes: notes,
      input: {
        type,
        surface_m2: surface,
        floor,
        salubrity,
        zone,
        distance_km: zone === "hors-departement" ? distanceKm : undefined,
        custom_coefficient: customCoef === 1 ? undefined : customCoef,
      },
      output,
    });
  }, [output, emittedAt, reference, notes, type, surface, floor, salubrity, zone, distanceKm, customCoef]);

  // ----- Actions -----
  const [copiedKind, setCopiedKind] = useState<"client" | "operator" | null>(
    null,
  );

  const copyText = async (text: string, kind: "client" | "operator") => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKind(kind);
      window.setTimeout(() => setCopiedKind(null), 2400);
    } catch {
      // Fallback ultra-minimal : on sélectionne dans la preview
      window.alert("Impossible de copier automatiquement. Sélectionnez le texte manuellement dans la prévisualisation.");
    }
  };

  const reset = () => {
    setType("appartement");
    setSurface(60);
    setFloor("rdc");
    setSalubrity("normal");
    setZone("cub");
    setDistanceKm(0);
    setCustomCoef(1);
    setNotes("");
    setReference("");
    setEmittedAt(null);
  };

  // ----- Render -----
  return (
    <div className={styles.shell}>
      <div className={styles.banner} role="status">
        <Icon name="shield-check" size={16} />
        <span>
          Outil interne — page non indexée, protégée par mot de passe Vercel.
          Aucune donnée n&apos;est persistée.
        </span>
      </div>

      <header className={styles.head}>
        <span className={styles.eyebrow}>L&apos;Espace Libre — Admin</span>
        <h1>Estimateur — production de devis ferme</h1>
        <p>
          Saisissez les caractéristiques observées sur les photos du prospect.
          La fourchette se met à jour en temps réel. Copiez le devis client
          formaté pour le coller dans votre réponse e-mail.
        </p>
      </header>

      <div className={styles.grid}>
        {/* ====== Colonne formulaire ====== */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Caractéristiques du bien</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="adm-type">Type de bien</label>
              <select
                id="adm-type"
                value={type}
                onChange={(e) => setType(e.target.value as BienType)}
              >
                {(Object.keys(TYPE_LABELS) as BienType[]).map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="adm-surface">Surface (m²)</label>
              <input
                id="adm-surface"
                type="number"
                inputMode="numeric"
                min={PRICING_CONSTANTS.SURFACE_MIN_ADMIN}
                max={PRICING_CONSTANTS.SURFACE_MAX_ADMIN}
                step={1}
                value={surface}
                onChange={(e) => setSurface(Number(e.target.value))}
              />
              <p className={styles.helper}>
                Plage admin : {PRICING_CONSTANTS.SURFACE_MIN_ADMIN}–{PRICING_CONSTANTS.SURFACE_MAX_ADMIN} m².
              </p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="adm-floor">Étage et accès</label>
              <select
                id="adm-floor"
                value={floor}
                onChange={(e) => setFloor(e.target.value as FloorAccess)}
              >
                {(Object.keys(FLOOR_LABELS) as FloorAccess[]).map((f) => (
                  <option key={f} value={f}>
                    {FLOOR_LABELS[f]}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="adm-salubrity">Salubrité</label>
              <select
                id="adm-salubrity"
                value={salubrity}
                onChange={(e) =>
                  setSalubrity(e.target.value as SalubrityLevel)
                }
              >
                {(Object.keys(SALUBRITY_LABELS) as SalubrityLevel[]).map((s) => (
                  <option key={s} value={s}>
                    {SALUBRITY_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="adm-zone">Zone</label>
              <select
                id="adm-zone"
                value={zone}
                onChange={(e) => setZone(e.target.value as Zone)}
              >
                {(Object.keys(ZONE_LABELS) as Zone[]).map((z) => (
                  <option key={z} value={z}>
                    {ZONE_LABELS[z]}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="adm-distance">
                Distance (km) — hors département uniquement
              </label>
              <input
                id="adm-distance"
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                disabled={zone !== "hors-departement"}
              />
              <p className={styles.helper}>
                Tarif : {formatEuros(PRICING_CONSTANTS.RATE_PER_KM_HORS_DEPT)} /
                km (arrondi à l&apos;euro).
              </p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="adm-coef">
                Coefficient correctif (défaut 1.00)
              </label>
              <input
                id="adm-coef"
                type="number"
                inputMode="decimal"
                step={0.05}
                min={PRICING_CONSTANTS.CUSTOM_COEFF_MIN}
                max={PRICING_CONSTANTS.CUSTOM_COEFF_MAX}
                value={customCoef}
                onChange={(e) => setCustomCoef(Number(e.target.value))}
              />
              <p className={styles.helper}>
                Multiplie le sous-total (base × étage). Utile pour ajuster au
                cas par cas (encombrement atypique, faveur commerciale).
              </p>
            </div>
            <div className={styles.field}>
              <label htmlFor="adm-ref">Référence</label>
              <input
                id="adm-ref"
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="LEL-YYYYMMDD-HHMMSS"
              />
              <p className={styles.helper}>
                Générée automatiquement. Modifiable si besoin.
              </p>
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="adm-notes">
              Notes commerciales internes (non transmises au prospect)
            </label>
            <textarea
              id="adm-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contexte du prospect, points de vigilance observés sur photos, conditions négociées…"
            />
          </div>

          {error && (
            <p className={styles.errorText} role="alert">
              {error}
            </p>
          )}
        </div>

        {/* ====== Colonne résultat ====== */}
        <aside className={styles.result} aria-label="Devis calculé">
          <div className={styles.resultHead}>
            <span className={styles.resultEyebrow}>Devis nominal</span>
            <p className={styles.resultPrice}>
              {output ? formatEuros(output.nominal) : "—"}
            </p>
            <p className={styles.resultRange}>
              Fourchette&nbsp;:{" "}
              {output
                ? `${formatEuros(output.low)} — ${formatEuros(output.high)}`
                : "—"}
            </p>
          </div>

          <div className={styles.resultBody}>
            {output && (
              <table className={styles.breakdown}>
                <tbody>
                  <tr>
                    <td>Volume évacué</td>
                    <td>{output.volume_evacue_m3.toFixed(1)} m³</td>
                  </tr>
                  <tr>
                    <td>Travail (vol × salubrité × tarif)</td>
                    <td>{formatEuros(Math.round(output.travail))}</td>
                  </tr>
                  <tr>
                    <td>Base (forfait + travail)</td>
                    <td>{formatEuros(Math.round(output.base))}</td>
                  </tr>
                  <tr>
                    <td>× Coef. étage</td>
                    <td>×{output.coefficient_etage.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>× Coef. salubrité</td>
                    <td>×{output.coefficient_salubrity.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>× Coef. correctif</td>
                    <td>×{output.coefficient_custom.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>+ Frais kilométriques</td>
                    <td>{formatEuros(output.frais_km)}</td>
                  </tr>
                  <tr>
                    <td>Total nominal</td>
                    <td>{formatEuros(output.nominal)}</td>
                  </tr>
                </tbody>
              </table>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => copyText(clientText, "client")}
                disabled={!output}
              >
                <Icon name="scroll-text" size={16} />
                Copier le devis client
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => copyText(operatorText, "operator")}
                disabled={!output}
              >
                Copier la fiche interne
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => window.print()}
                disabled={!output}
              >
                Imprimer
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={reset}
              >
                Réinitialiser
              </button>
            </div>
            {copiedKind && (
              <p className={styles.copied} role="status">
                {copiedKind === "client"
                  ? "Devis client copié dans le presse-papiers."
                  : "Fiche interne copiée dans le presse-papiers."}
              </p>
            )}

            {clientText && (
              <pre className={styles.preview} aria-label="Aperçu du devis client">
                {clientText}
              </pre>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
