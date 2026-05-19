/**
 * HomeFAQ — 3 questions essentielles en texte brut.
 *
 * Pas d'accordéon : les réponses sont visibles immédiatement pour
 * favoriser l'indexation Google (FAQPage JSON-LD + texte visible
 * direct) et réduire la friction utilisateur sur des questions
 * critiques (prix, délai, éthique).
 *
 * Une FAQ exhaustive (35+ questions, sommaire, ancres) est disponible
 * sur la page dédiée `/faq` accessible depuis le header et le
 * footer.
 */
import { Icon } from "@/components/ui/Icon";
import { Spark } from "@/components/ui/Spark";
import { Tier } from "@/components/ui/Tier";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqPageJsonLd } from "@/lib/seo";

const ITEMS = [
  {
    q: "Combien coûte un débarras à Bordeaux ou en Gironde ?",
    a: "Le tarif dépend du **volume à évacuer**, du type de bien (cave, appartement, maison), de l'**accessibilité** (étage, ascenseur, stationnement) et de la valeur éventuelle des objets revendables. Pour un appartement T3 standard en Bordeaux Métropole, comptez entre **940 € et 1 270 €** ; pour une cave de 15 m², la fourchette descend à **290 €–390 €**. Le devis ferme est gratuit et arrive **sous 2 heures** après envoi de quelques photos. <a href=\"/contact\">Demandez votre estimation</a> en quelques secondes via notre formulaire.",
  },
  {
    q: "Sous combien de temps intervenez-vous en Gironde et en Nouvelle-Aquitaine ?",
    a: "Nous intervenons de **48 heures à 10 jours** après acceptation du devis, parfois le jour même pour les urgences (vente notariée, fin de bail, situation sanitaire). Le déplacement est programmé avec un calendrier convenu à l'avance pour optimiser les trajets sur toute notre zone (Gironde, Landes, Lot-et-Garonne). Le devis ferme par photo arrive systématiquement **sous 2 heures ouvrées**.",
  },
  {
    q: "Que devient ce que vous emportez ? Comment se passe le tri ?",
    a: "Nous appliquons une **charte 0 gaspillage** signée. Les biens en bon état (mobilier, électroménager, livres, vinyles, vaisselle) sont remis à des **associations locales** : Emmaüs Gironde, Le Relais 33, ressourceries girondines. Les déchets d'équipements électriques et électroniques rejoignent les **filières DEEE agréées 33**. Les meubles non valorisables et les encombrants sont orientés vers les **déchèteries professionnelles** girondines. Seul l'irrécupérable rejoint la filière déchets. Sur demande, nous vous fournissons un **récapitulatif écrit des dons** réalisés — utile pour votre conscience comme pour vos démarches notariales.",
  },
];

// Pour le JSON-LD, on fournit du texte brut (sans HTML)
const FAQ_FOR_LD = ITEMS.map((it) => ({
  q: it.q,
  a: it.a.replace(/<[^>]+>/g, "").replace(/\*\*/g, ""),
}));

export function HomeFAQ() {
  return (
    <Tier
      variant="paper"
      as="section"
      rhythmIndex={9}
      id="faq"
      className="faq-home"
      ariaLabelledby="home-faq-title"
    >
      <JsonLd data={buildFaqPageJsonLd(FAQ_FOR_LD)} />
      <div className="container">
        <div className="section__head">
          <div
            className="tier__eyebrow"
            style={{ justifyContent: "center" }}
          >
            <Spark size={14} />
            Questions essentielles
          </div>
          <h2 id="home-faq-title" className="section__title">
            Les trois questions que tout le monde nous pose en premier.
          </h2>
          <p className="section__lead">
            Le prix, le délai, le devenir des biens. Pour aller plus loin,
            consultez notre FAQ détaillée.
          </p>
        </div>

        <div className="faq-plain">
          {ITEMS.map((it, i) => (
            <article key={i} className="faq-plain__item">
              <h3 className="faq-plain__q">{it.q}</h3>
              <p
                className="faq-plain__a"
                // Le contenu vient d'une constante interne (pas d'input
                // utilisateur), donc dangerouslySetInnerHTML est OK ici.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: renderInline(it.a),
                }}
              />
            </article>
          ))}
        </div>

        <p className="faq-home__footer">
          <a href="/faq">
            Voir la FAQ complète (35+ questions)
            <Icon name="arrow-right" size={14} />
          </a>
          <span style={{ display: "block", marginTop: 6 }}>
            Une question qui n&apos;y figure pas&nbsp;?{" "}
            <a href="/contact">Écrivez-nous</a>, nous répondons sous 2 heures
            ouvrées.
          </span>
        </p>
      </div>
    </Tier>
  );
}

/**
 * Mini parseur inline : convertit `**texte**` en `<strong>texte</strong>`.
 * Les balises `<a>` sont déjà au format HTML dans le source.
 */
function renderInline(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
