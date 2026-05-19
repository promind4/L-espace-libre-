/**
 * BlogContent — rend la liste de blocs typés d'un article.
 *
 * Server Component (pas d'état, pas d'interaction). Chaque type de
 * bloc devient un élément sémantique HTML approprié pour l'accessibilité
 * et le référencement.
 */
import type { BlogBlock } from "@/content/blog/types";
import { Spark } from "@/components/ui/Spark";
import styles from "./BlogContent.module.css";

export interface BlogContentProps {
  blocks: readonly BlogBlock[];
}

export function BlogContent({ blocks }: BlogContentProps) {
  return (
    <div className={styles.prose}>
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

function renderBlock(block: BlogBlock, key: number): React.ReactNode {
  switch (block.type) {
    case "p":
      return <p key={key} dangerouslySetInnerHTML={{ __html: block.content }} />;
    case "h2":
      return <h2 key={key}>{block.content}</h2>;
    case "h3":
      return <h3 key={key}>{block.content}</h3>;
    case "ul":
      // Remplacement de l'icône Spark par un numéro selon la demande
      return (
        <ul key={key} className="bullets-spark" style={{ listStyleType: "none", paddingLeft: 0 }}>
          {block.items.map((item, j) => (
            <li key={j} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "8px" }}>
              <span style={{ color: "var(--cr-emerald-500)", fontWeight: "bold", fontSize: "0.9em", marginTop: "2px", minWidth: "18px" }}>
                {j + 1}.
              </span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key} className={styles.listOrdered}>
          {block.items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside
          key={key}
          className={`${styles.callout} ${
            block.tone === "warning" ? styles.calloutWarning : styles.calloutInfo
          }`}
          role="note"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      );
    case "quote":
      return (
        <blockquote key={key} className={styles.quote}>
          <p>{block.content}</p>
          {block.attribution && (
            <footer className={styles.quoteAttribution}>
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
  }
}
