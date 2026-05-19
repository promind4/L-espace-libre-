/**
 * AboutPageTemplate — page « Qui sommes-nous » en mode édito magazine.
 *
 * Concept C de `concepts/C-edito.md` : H1 géant, chapitres typographiés,
 * pull-quote XL, founder signé, équipe en grille, credentials légaux,
 * closing manifeste. Composée de 7 blocs alternant 4 tiers du système
 * de rythme (Concept A).
 *
 * Server Component pur. Toutes les chaînes proviennent de
 * `content/about.ts` (placeholders à valider par le PO).
 */
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";
import { ABOUT } from "@/content/about";
import styles from "./AboutPageTemplate.module.css";

export function AboutPageTemplate() {
  return (
    <main>
      {/* Sidenav flottant — desktop large uniquement (≥ 1400px) */}
      <AboutSidenav />

      {/* 01 · Cover (Light) */}
      <AboutCover />

      {/* 02 · Chapitre Ancrage (Light) */}
      {ABOUT.chapters.map((ch) => (
        <AboutChapter key={ch.id} chapter={ch} variant="light" />
      ))}

      {/* 03 · Pull-quote charte (Editorial) */}
      <AboutPullQuoteSection />

      {/* 04 · Fondateur (Paper) */}
      <AboutFounderSection />

      {/* 05 · Équipe (Light) */}
      <AboutTeamSection />

      {/* 06 · Credentials (Paper) */}
      <AboutCredentialsSection />

      {/* 07 · Closing (Deep) */}
      <AboutClosingSection />
    </main>
  );
}

// ============================================================
//  Sidenav
// ============================================================

function AboutSidenav() {
  /** Construit dynamiquement la liste des ancres à partir des données. */
  const items = [
    ...ABOUT.chapters.map((c) => ({ id: c.id, num: c.num, label: c.label })),
    {
      id: ABOUT.pullQuote.id,
      num: ABOUT.pullQuote.num,
      label: ABOUT.pullQuote.label,
    },
    {
      id: ABOUT.founder.id,
      num: ABOUT.founder.num,
      label: ABOUT.founder.label,
    },
    {
      id: ABOUT.teamLabel.id,
      num: ABOUT.teamLabel.num,
      label: ABOUT.teamLabel.label,
    },
    {
      id: ABOUT.credentialsLabel.id,
      num: ABOUT.credentialsLabel.num,
      label: ABOUT.credentialsLabel.label,
    },
  ];

  return (
    <aside
      className={styles.sidenavWrap}
      aria-label="Sommaire de la page"
    >
      <ul className="sidenav">
        {items.map((it, i) => (
          <li key={it.id} className={i === 0 ? "active" : undefined}>
            {i === 0 && <Spark size={14} />}
            <a href={`#${it.id}`}>
              <span className="sidenav__num">{it.num}</span>
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// ============================================================
//  01 · Cover
// ============================================================

function AboutCover() {
  const c = ABOUT.cover;
  const titleParts = renderTitleWithEmphasis(c.titleLines, c.emphasizedWord);

  return (
    <Tier
      variant="light"
      as="section"
      rhythmIndex={1}
      className={styles.cover}
    >
      <div className="container">
        <span className="tier__eyebrow" style={{ marginBottom: 28 }}>
          <Spark size={14} />
          {c.eyebrow}
        </span>
        <div className={styles.coverGrid}>
          <div className={styles.coverHeading}>
            <h1>{titleParts}</h1>
            <p className={styles.coverLede}>{c.lede}</p>
          </div>
          <div className={styles.coverPortrait}>
            <span>{c.portraitInitials}</span>
            <span className={styles.coverPortraitCaption}>
              {c.portraitCaption}
            </span>
          </div>
        </div>
        <div className={styles.coverMeta}>
          {c.meta.map((m) => (
            <div key={m.label}>
              <strong>{m.label}</strong>
              {m.value}
            </div>
          ))}
        </div>
      </div>
    </Tier>
  );
}

/** Affiche le H1 sur 3 lignes avec mot en italique émeraude. */
function renderTitleWithEmphasis(
  lines: readonly [string, string, string],
  emphasized?: string,
): React.ReactNode {
  return lines.map((line, i) => {
    const isLast = i === lines.length - 1;
    if (emphasized && line.includes(emphasized)) {
      const [before, after] = line.split(emphasized);
      return (
        <span key={i}>
          {before}
          <em>{emphasized}</em>
          {after}
          {!isLast && <br />}
        </span>
      );
    }
    return (
      <span key={i}>
        {line}
        {!isLast && <br />}
      </span>
    );
  });
}

// ============================================================
//  Chapitres génériques (01, etc.)
// ============================================================

function AboutChapter({
  chapter,
  variant,
}: {
  chapter: typeof ABOUT.chapters[number];
  variant: "light" | "paper";
}) {
  return (
    <Tier
      variant={variant}
      as="section"
      rhythmIndex={2}
      id={chapter.id}
      className={styles.chapterSection}
    >
      <div className="container">
        <div className="chapter">
          <span className="chapter__num">{chapter.num}</span>
          <span>{chapter.label}</span>
          <span className="chapter__line" />
        </div>
        <div className={styles.chapterTwocol}>
          <h2>{chapter.h2}</h2>
          <div className={styles.bodyFirst}>
            {chapter.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {chapter.puces && chapter.puces.length > 0 && (
              <ul className="bullets-spark">
                {chapter.puces.map((b) => (
                  <li key={b}>
                    <Spark size={14} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Tier>
  );
}

// ============================================================
//  02 · Pull-quote (Editorial)
// ============================================================

function AboutPullQuoteSection() {
  const pq = ABOUT.pullQuote;
  return (
    <Tier
      variant="editorial"
      as="section"
      rhythmIndex={3}
      id={pq.id}
      className="pullquote"
    >
      <div className="container">
        <div className="chapter">
          <span className="chapter__num">{pq.num}</span>
          <span>{pq.label}</span>
          <span className="chapter__line" />
        </div>
        <div className="pullquote__sep">
          <Spark size={18} />
        </div>
        <blockquote>«&nbsp;{pq.citation}&nbsp;»</blockquote>
        <div className="pullquote__attr">{pq.attribution}</div>
        <p
          style={{
            maxWidth: "48ch",
            marginTop: 32,
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--cr-pearl-700)",
          }}
        >
          {pq.body}
        </p>
      </div>
    </Tier>
  );
}

// ============================================================
//  03 · Founder (Paper)
// ============================================================

function AboutFounderSection() {
  const f = ABOUT.founder;
  return (
    <Tier
      variant="paper"
      as="section"
      rhythmIndex={4}
      id={f.id}
      className={styles.founder}
    >
      <div className="container">
        <div className="chapter">
          <span className="chapter__num">{f.num}</span>
          <span>{f.label}</span>
          <span className="chapter__line" />
        </div>
        <div className={styles.founderGrid}>
          <div className={styles.founderMedia}>
            <span className={styles.founderMediaCaption}>
              Portrait du fondateur — photo à fournir
            </span>
          </div>
          <div className={styles.bodyFirst}>
            <h2 className={styles.chapterSection + " "}>
              {/* style appliqué via une heading h2 dans le tier paper */}
              {f.h2}
            </h2>
            {f.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className={styles.founderSig}>
              <span
                className={[
                  styles.founderSigAvatar,
                  f.avatarVariant === "navy"
                    ? styles.founderSigAvatarNavy
                    : f.avatarVariant === "emerald"
                      ? styles.founderSigAvatarEmerald
                      : styles.founderSigAvatarPearl,
                ].join(" ")}
                aria-hidden
              >
                {f.initials}
              </span>
              <div>
                <div className={styles.founderSigName}>{f.name}</div>
                <div className={styles.founderSigRole}>{f.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tier>
  );
}

// ============================================================
//  04 · Team (Light)
// ============================================================

function AboutTeamSection() {
  const t = ABOUT.teamLabel;
  return (
    <Tier
      variant="light"
      as="section"
      rhythmIndex={5}
      id={t.id}
      className={styles.team}
    >
      <div className="container">
        <div className="chapter">
          <span className="chapter__num">{t.num}</span>
          <span>{t.label}</span>
          <span className="chapter__line" />
        </div>
        <h2 style={{ fontSize: "clamp(28px, 3vw + 1rem, 40px)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--cr-navy-950)", margin: "0 0 12px", maxWidth: "22ch", textWrap: "balance" }}>
          {t.h2}
        </h2>
        <p className={styles.teamIntro}>{t.intro}</p>
        <div className={styles.teamGrid}>
          {ABOUT.team.map((m, i) => (
            <div key={i} className={styles.teamCard}>
              <div
                className={[
                  styles.teamPortrait,
                  m.variant === "navy"
                    ? styles.teamPortraitNavy
                    : m.variant === "emerald"
                      ? styles.teamPortraitEmerald
                      : m.variant === "alt"
                        ? styles.teamPortraitAlt
                        : styles.teamPortraitPearl,
                ].join(" ")}
                aria-hidden
              >
                {m.initials}
              </div>
              <div>
                <div className={styles.teamName}>{m.name}</div>
                <div className={styles.teamRole}>{m.role}</div>
              </div>
              <p className={styles.teamQuote}>«&nbsp;{m.citation}&nbsp;»</p>
            </div>
          ))}
        </div>
      </div>
    </Tier>
  );
}

// ============================================================
//  05 · Credentials (Paper)
// ============================================================

function AboutCredentialsSection() {
  const c = ABOUT.credentialsLabel;
  return (
    <Tier
      variant="paper"
      as="section"
      rhythmIndex={6}
      id={c.id}
      className={styles.creds}
    >
      <div className="container">
        <div className="chapter">
          <span className="chapter__num">{c.num}</span>
          <span>{c.label}</span>
          <span className="chapter__line" />
        </div>
        <h2 style={{ fontSize: "clamp(28px, 3vw + 1rem, 40px)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--cr-navy-950)", margin: "0 0 32px", maxWidth: "22ch", textWrap: "balance" }}>
          {c.h2}
        </h2>
        <div className={styles.credsGrid}>
          {/* Réparti en 2 colonnes : moitié à gauche, moitié à droite */}
          {[0, 1].map((col) => (
            <ul key={col} className={styles.credsList}>
              {ABOUT.credentials
                .filter((_, i) => i % 2 === col)
                .map((cred) => (
                  <li key={cred.key}>
                    <span className={styles.credsKey}>{cred.key}</span>
                    <span className={styles.credsVal}>{cred.value}</span>
                  </li>
                ))}
            </ul>
          ))}
        </div>
      </div>
    </Tier>
  );
}

// ============================================================
//  06 · Closing (Deep) — manifeste + CTAs + end-mark
// ============================================================

function AboutClosingSection() {
  const cl = ABOUT.closing;
  return (
    <Tier
      variant="deep"
      as="aside"
      rhythmIndex={7}
      className={styles.closing}
    >
      <div className="container">
        <span
          className="tier__eyebrow"
          style={{ justifyContent: "center", marginBottom: 24 }}
        >
          <Spark size={14} variant="light" />
          {cl.eyebrow}
        </span>
        <h2>{cl.h2}</h2>
        <p>{cl.body}</p>
        <div className={styles.closingActions}>
          <a className="btn btn--primary btn--lg" href={cl.ctaPrimary.href}>
            {cl.ctaPrimary.label}
            <Icon name="arrow-right" size={18} />
          </a>
          <a
            className="btn btn--ghost btn--lg"
            href={cl.ctaSecondary.href}
            style={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            {cl.ctaSecondary.label}
          </a>
        </div>
        <div className={styles.closingEndmark}>
          <Spark size={24} variant="light" />
        </div>
      </div>
    </Tier>
  );
}
