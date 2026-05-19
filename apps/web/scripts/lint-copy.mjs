#!/usr/bin/env node
/**
 * lint-copy — vérifie le respect de la voix de marque
 * (Constitution I.2 — NON NÉGOCIABLE).
 *
 * Inspecte `content/**\/*.ts` et les chaînes littérales JSX/TSX
 * dans `components/**\/*.tsx` et `app/**\/*.tsx`. Signale :
 *   - les points d'exclamation
 *   - les emoji
 *   - les anglicismes interdits (quote, pricing, hey, etc.)
 *
 * Exit code 1 si une violation est trouvée.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

// ---------------------------------------------------------------
//  Règles
// ---------------------------------------------------------------
const RULES = [
  {
    id: "no-exclamation",
    severity: "error",
    label: "Point d'exclamation interdit (voix calme, factuelle)",
    test: (line) => /[!！]/.test(line),
  },
  {
    id: "no-emoji",
    severity: "error",
    label: "Emoji interdit",
    // Plage Emoji unicode étendue + symboles & dingbats + drapeaux.
    test: (line) =>
      /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u.test(
        line,
      ),
  },
  {
    id: "no-english-jargon",
    severity: "error",
    label: "Anglicisme à éviter — utiliser un équivalent français",
    test: (line) => {
      const banned = [
        "quote", // → devis
        "pricing", // → tarification
        "hey", // ton trop familier
        "awesome",
        "great",
        "amazing",
        "checkout", // → paiement
      ];
      const lower = line.toLowerCase();
      // Détection isolée (mot entier) — évite « pizza » à cause de « izza ».
      return banned.some((w) => new RegExp(`\\b${w}\\b`, "i").test(lower));
    },
  },
];

// ---------------------------------------------------------------
//  Patterns d'extraction par type de fichier
// ---------------------------------------------------------------
/**
 * Extrait les chaînes pertinentes :
 *  - .ts  → toutes les chaînes entre quotes/backticks (les fichiers
 *           content/**\/*.ts sont essentiellement des données copy)
 *  - .tsx → uniquement le texte JSX entre balises (>...<)
 *           + les chaînes après `placeholder=`, `aria-label=`, `alt=`,
 *           `title=`. Évite le bruit des classes CSS et des props
 *           techniques.
 */
function extractCopySegments(content, ext) {
  const segments = [];
  if (ext === ".ts") {
    // Toutes les chaînes "..." ou '...' ou `...`
    const re = /(['"`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
    let m;
    while ((m = re.exec(content))) {
      segments.push({
        offset: m.index,
        text: m[2],
      });
    }
  } else if (ext === ".tsx") {
    // 1. Texte JSX entre balises : >...<
    const jsxText = /(?<=>)([^<>{}\n]{4,})(?=<)/g;
    let m;
    while ((m = jsxText.exec(content))) {
      segments.push({ offset: m.index, text: m[1] });
    }
    // 2. Attributs visibles
    const attrs = /(?:placeholder|aria-label|alt|title)\s*=\s*(['"`])([^'"`]+)\1/g;
    while ((m = attrs.exec(content))) {
      segments.push({ offset: m.index, text: m[2] });
    }
  }
  return segments;
}

// ---------------------------------------------------------------
//  Collecte des fichiers à inspecter
// ---------------------------------------------------------------
const TARGET_DIRS = ["content", "components", "app"];
const SKIP_DIRS = new Set(["node_modules", ".next", "out", "tests"]);
const SKIP_FILES = new Set([
  // Ne pas inspecter le script lui-même.
  "scripts/lint-copy.mjs",
  // Validation Zod — les messages d'erreur français contiennent
  // intentionnellement des points (mais pas d'exclamations).
]);

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) await walk(full, out);
    } else if (entry.isFile()) {
      if (/\.(ts|tsx)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) {
        out.push(full);
      }
    }
  }
  return out;
}

// ---------------------------------------------------------------
//  Exécution
// ---------------------------------------------------------------
async function main() {
  const files = [];
  for (const dir of TARGET_DIRS) {
    const abs = path.join(ROOT, dir);
    try {
      await walk(abs, files);
    } catch {
      // dossier absent → on ignore
    }
  }

  const violations = [];

  for (const file of files) {
    const rel = path.relative(ROOT, file).replace(/\\/g, "/");
    if (SKIP_FILES.has(rel)) continue;

    const content = await fs.readFile(file, "utf8");
    const ext = path.extname(file);
    const segments = extractCopySegments(content, ext);

    for (const seg of segments) {
      const before = content.slice(0, seg.offset);
      const line = before.split("\n").length;

      for (const rule of RULES) {
        if (rule.test(seg.text)) {
          violations.push({
            file: rel,
            line,
            rule: rule.id,
            severity: rule.severity,
            label: rule.label,
            excerpt: seg.text.length > 80 ? seg.text.slice(0, 80) + "…" : seg.text,
          });
        }
      }
    }
  }

  if (violations.length === 0) {
    console.log("\x1b[32m✓ lint-copy: voix de marque conforme\x1b[0m");
    console.log(`  ${files.length} fichiers inspectés.`);
    process.exit(0);
  }

  console.error(
    `\x1b[31m✗ lint-copy: ${violations.length} violation(s) de la voix de marque\x1b[0m`,
  );
  for (const v of violations) {
    console.error(`\n  \x1b[31m${v.severity}\x1b[0m  ${v.file}:${v.line}`);
    console.error(`    rule:    ${v.rule}`);
    console.error(`    raison:  ${v.label}`);
    console.error(`    extrait: ${JSON.stringify(v.excerpt)}`);
  }
  console.error(
    "\nDocumentation : .specify/memory/constitution.md, principe I.2 (voix de marque, NON NÉGOCIABLE).",
  );
  process.exit(1);
}

main().catch((err) => {
  console.error("lint-copy failed:", err);
  process.exit(2);
});
