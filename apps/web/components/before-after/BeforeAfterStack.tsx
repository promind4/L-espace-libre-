"use client";

/**
 * BeforeAfterStack — preuve sociale tactile.
 *
 * Pile de N paires Avant/Après. La carte « avant » se glisse
 * horizontalement (souris + tactile + clavier) pour révéler « après ».
 * Au-delà du seuil, la carte s'envole et la paire suivante prend sa place.
 *
 * Accessibilité :
 *   - PointerEvents unifie souris/touch/stylet (Constitution P2.3).
 *   - Clavier : flèche droite = révéler, flèche gauche = annuler,
 *     Entrée/Espace = passer à la paire suivante.
 *   - prefers-reduced-motion : pas de rotation, simple fondu.
 *
 * Stratégie d'animation :
 *   - Pendant le drag : transform suit le pointeur sans transition.
 *   - Au relâche : transition vers 0 (annulation) ou hors écran (révélation).
 */
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import {
  BEFORE_AFTER_PAIRS,
  type BeforeAfterPair,
} from "@/content/before-after-pairs";
import styles from "./BeforeAfterStack.module.css";

const DRAG_THRESHOLD_PX = 120;
const FLIGHT_DISTANCE_PX = 900;
const FLIGHT_ROTATION_DEG = 18;

type DragState = {
  active: boolean;
  startX: number;
  currentDx: number;
};

const INITIAL_DRAG: DragState = { active: false, startX: 0, currentDx: 0 };

export interface BeforeAfterStackProps {
  pairs?: readonly BeforeAfterPair[];
  /**
   * - `section` : wrapper avec titre/lead/CTA (page autonome).
   * - `inline`  : pile seule, optimisée pour le slot `.hero__visual`
   *                 (utilisée dans le Hero de la page d'accueil).
   */
  variant?: "section" | "inline";
}

export function BeforeAfterStack({
  pairs = BEFORE_AFTER_PAIRS,
  variant = "section",
}: BeforeAfterStackProps) {
  const titleId = useId();
  const [index, setIndex] = useState(0);
  const [released, setReleased] = useState(false);
  const [drag, setDrag] = useState<DragState>(INITIAL_DRAG);
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const current = pairs[index];
  const next = pairs[index + 1];
  const stacked = pairs[index + 2];
  const hasNext = index < pairs.length - 1;

  // ============================================================
  //  Drag handlers
  // ============================================================
  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (released) return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setDrag({ active: true, startX: e.clientX, currentDx: 0 });
    },
    [released],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!drag.active || released) return;
      const dx = Math.max(0, e.clientX - drag.startX);
      setDrag((d) => ({ ...d, currentDx: dx }));
    },
    [drag.active, drag.startX, released],
  );

  const onPointerUp = useCallback(() => {
    if (!drag.active) return;
    if (drag.currentDx >= DRAG_THRESHOLD_PX) {
      setReleased(true);
    } else {
      setDrag(INITIAL_DRAG);
    }
  }, [drag.active, drag.currentDx]);

  // Reset après l'animation d'envol (pour passer à la paire suivante)
  useEffect(() => {
    if (!released) return;
    const t = window.setTimeout(() => {
      if (hasNext) {
        setIndex((i) => i + 1);
      }
      setReleased(false);
      setDrag(INITIAL_DRAG);
    }, prefersReducedMotion ? 240 : 480);
    return () => window.clearTimeout(t);
  }, [released, hasNext, prefersReducedMotion]);

  // ============================================================
  //  Keyboard handlers
  // ============================================================
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (released) return;
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setReleased(true);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setDrag(INITIAL_DRAG);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (drag.currentDx > 0 || released) {
            setReleased(true);
          } else {
            setDrag((d) => ({ ...d, currentDx: 30 })); // hint visuel
          }
          break;
      }
    },
    [released, drag.currentDx],
  );

  const reset = () => {
    setIndex(0);
    setReleased(false);
    setDrag(INITIAL_DRAG);
  };

  // ============================================================
  //  Calcul du transform pour la carte « avant »
  // ============================================================
  const beforeStyle = useMemo<CSSProperties>(() => {
    if (released) {
      return {
        transform: `translateX(${FLIGHT_DISTANCE_PX}px) rotate(${
          prefersReducedMotion ? 0 : FLIGHT_ROTATION_DEG
        }deg)`,
        opacity: 0,
      };
    }
    if (!drag.active && drag.currentDx === 0) {
      return {
        transform: `translateX(0) rotate(${prefersReducedMotion ? 0 : -3}deg)`,
      };
    }
    const progress = Math.min(1, drag.currentDx / 200);
    const rotation = prefersReducedMotion ? 0 : -3 + progress * 21;
    return {
      transform: `translateX(${drag.currentDx}px) rotate(${rotation}deg)`,
      opacity: 1 - progress * 0.15,
    };
  }, [released, drag.active, drag.currentDx, prefersReducedMotion]);

  // ============================================================
  //  Render
  // ============================================================
  if (!current) {
    if (variant === "inline") {
      return (
        <div className={styles.inline} aria-labelledby={titleId}>
          <div className={styles.counter}>
            <span>Tous les cas parcourus</span>
          </div>
          <div className={styles.nav}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={reset}
            >
              <Icon name="arrow-left" />
              Recommencer
            </button>
          </div>
        </div>
      );
    }
    return (
      <section className={styles.section}>
        <div className="container">
          <div className={styles.head}>
            <span className="eyebrow">Avant / Après</span>
            <h2>Vous avez parcouru tous nos cas.</h2>
            <p className={styles.lead}>
              Vous pouvez recommencer la pile pour revoir les transformations.
            </p>
          </div>
          <div className={styles.nav}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={reset}
            >
              <Icon name="arrow-left" />
              Recommencer
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  //  Pile (stage) — utilisée dans les deux variantes
  // ============================================================
  const renderStage = () => (
    <div ref={stageRef} className={styles.stage}>
      {stacked && (
        <div
          className={`${styles.card} ${styles.cardStacked}`}
          style={{
            transform: prefersReducedMotion
              ? "translateY(16px) scale(0.94)"
              : "translateY(16px) scale(0.94) rotate(2deg)",
            opacity: 0.6,
          }}
          aria-hidden
        >
          <Image
            src={stacked.after.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 540px"
            className={styles.cardImg}
          />
        </div>
      )}
      <div
        className={`${styles.card} ${styles.cardAfter}`}
        style={{
          transform: prefersReducedMotion
            ? "translateY(8px) scale(0.97)"
            : "translateY(8px) scale(0.97) rotate(-1deg)",
        }}
        aria-hidden={!released}
      >
        <Image
          src={current.after.src}
          alt={current.after.alt}
          fill
          sizes="(max-width: 768px) 100vw, 540px"
          className={styles.cardImg}
          priority={index === 0}
        />
        <span className={`${styles.label} ${styles.labelAfter}`}>Après</span>
      </div>
      <div
        role="button"
        tabIndex={0}
        aria-label={`Glissez pour révéler l'après — ${current.type} à ${current.commune}`}
        className={`${styles.card} ${styles.cardBefore} ${
          drag.active ? styles.cardDragging : ""
        }`}
        style={beforeStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <Image
          src={current.before.src}
          alt={current.before.alt}
          fill
          sizes="(max-width: 768px) 100vw, 540px"
          className={styles.cardImg}
          priority={index === 0}
          draggable={false}
        />
        <span className={`${styles.label} ${styles.labelBefore}`}>Avant</span>
        {current.placeholder && (
          <span className={styles.placeholderBadge}>
            Photo d&apos;illustration
          </span>
        )}
        {!released && drag.currentDx < 20 && (
          <span className={styles.hint}>
            <Icon name="arrow-right" size={16} />
            Glissez à droite
          </span>
        )}
      </div>
    </div>
  );

  // --- Variante inline : pile seule, pas de wrapper section ---
  if (variant === "inline") {
    return (
      <div className={styles.inline} aria-labelledby={titleId}>
        <div className={styles.counter} aria-live="polite">
          <strong>{index + 1}</strong> sur {pairs.length}
        </div>
        {renderStage()}
        <div className={styles.caption}>
          <p className={styles.captionTitle}>
            {current.type} — {current.commune}
          </p>
          <p className={styles.captionMeta}>{current.duree}</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className={styles.section}
      aria-labelledby={titleId}
    >
      <div className="container">
        <header className={styles.head}>
          <span className="eyebrow">Avant / Après</span>
          <h2 id={titleId}>Faites glisser pour révéler l&apos;espace libéré.</h2>
          <p className={styles.lead}>
            {pairs.length} interventions réelles ou illustrées en Gironde et en
            Nouvelle-Aquitaine. Glissez la carte vers la droite (ou utilisez la
            flèche droite du clavier) pour découvrir le résultat.
          </p>
        </header>

        <div className={styles.counter} aria-live="polite">
          <strong>{index + 1}</strong> sur {pairs.length}
        </div>

        {renderStage()}

        <div className={styles.caption}>
          <p className={styles.captionTitle}>
            {current.type} — {current.commune}
          </p>
          <p className={styles.captionMeta}>{current.duree}</p>
        </div>

        <div className={styles.nav}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={reset}
            disabled={index === 0 && !released}
          >
            <Icon name="arrow-left" size={18} />
            Recommencer
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={() => setReleased(true)}
            disabled={!hasNext || released}
            aria-label="Cas suivant"
          >
            Cas suivant
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  Hook : prefers-reduced-motion
// ============================================================
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
