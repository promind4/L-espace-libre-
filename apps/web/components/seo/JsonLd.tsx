/**
 * <JsonLd> — injecte un (ou plusieurs) blocs JSON-LD dans le <head>
 * via une balise <script type="application/ld+json">.
 *
 * Utilisation cote Server Component : Next.js serialise correctement
 * la chaine JSON dans le HTML rendu, garantissant que Googlebot la
 * trouve sans executer de JavaScript (Constitution P4.3 + P4.7).
 */

export interface JsonLdProps {
  data: object | object[];
}

export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: safeStringify(item) }}
        />
      ))}
    </>
  );
}

/**
 * Serialisation JSON securisee : neutralise les sequences `</script>`
 * et les caracteres de fin de ligne JSON (U+2028, U+2029) qui peuvent
 * casser un script inline.
 */
const U2028 = String.fromCharCode(0x2028);
const U2029 = String.fromCharCode(0x2029);

function safeStringify(obj: unknown): string {
  return JSON.stringify(obj)
    .split("<").join("\\u003c")
    .split(U2028).join("\\u2028")
    .split(U2029).join("\\u2029");
}
