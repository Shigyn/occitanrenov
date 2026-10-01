// ===================================================================
//  Occitan Rénov — generateur du site (LocWeb, 2026-10-02).
//  Node, sans dependance :
//     node build.mjs          -> apercu (noindex, robots ferme)
//     PROD=1 node build.mjs   -> mise en ligne sur occitanrenov.fr
//
//  LA REGLE : les adresses de l'ancien site WordPress sont gardees a
//  l'identique (/produit/..., /blog/, les articles, la FAQ, la page
//  decennale...). Google les connait : les renommer reviendrait a
//  repartir de zero. Ce qui disparait (boutique, panier, compte) est
//  redirige — vraie 301 via _redirects en production, page de renvoi
//  pour l'apercu sur github.io.
//
//  L'apercu est en noindex : le site actuel est toujours en ligne, et
//  deux copies du meme site indexees se feraient concurrence.
// ===================================================================
import fs from 'node:fs';
import path from 'node:path';
import { ENTREPRISE as E, AVIS, ZONE, SERVICES, REALISATIONS, FAQ } from './_source/contenu.mjs';

const ICI = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const PROD = process.env.PROD === '1';
const PHOTOS = JSON.parse(fs.readFileSync(path.join(ICI, '_source', 'photos.json'), 'utf8'));
const ARTICLES = JSON.parse(fs.readFileSync(path.join(ICI, '_source', 'articles.json'), 'utf8'));
const V = '1';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (chemin) => E.url + chemin;

/* Une photo en deux largeurs : le navigateur prend la bonne. */
function img(r, nom, alt, { eager = false, sizes = '(min-width: 900px) 50vw, 100vw', cls = '' } = {}) {
  const p = PHOTOS[nom];
  if (!p) throw new Error('photo inconnue : ' + nom);
  return `<img${cls ? ` class="${cls}"` : ''} src="${r}photos/${nom}-800.webp" srcset="${r}photos/${nom}-800.webp 800w, ${r}photos/${nom}-1600.webp ${p.l}w" sizes="${sizes}" alt="${esc(alt)}" width="${p.l}" height="${p.h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

const ICONES = {
  tel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>',
  devis: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 7V3.5L18.5 9zM8 13h8v2H8zm0 4h5v2H8z"/></svg>',
  fleche: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/></svg>',
  bouclier: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5zm-1.2 13.6-3.5-3.5 1.4-1.4 2.1 2.1 4.8-4.8 1.4 1.4z"/></svg>',
  casque: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 0 0-8 8v2H2v3h20v-3h-2v-2a8 8 0 0 0-8-8zm-1 2.1V11h2V6.1A6 6 0 0 1 18 12v2H6v-2a6 6 0 0 1 5-5.9z"/></svg>',
  etoile: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.5l-6.4 3.7 1.6-7.1L1.8 9.3 9 8.6z"/></svg>',
  calendrier: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3zm-2 8v9h14v-9z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.3L4.4 7H19.6z"/></svg>',
  goutte: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2s7 7.6 7 12.5a7 7 0 0 1-14 0C5 9.6 12 2 12 2z"/></svg>',
  gouttiere: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h20v3a4 4 0 0 1-4 4h-3v7h-3v-7H6a4 4 0 0 1-4-4z"/></svg>',
  jet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 9 9h6zM6 11l-2 4h4zm12 0-2 4h4zM11 12h2v9h-2z"/></svg>',
  soleil: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM11 1h2v3h-2zm0 19h2v3h-2zM1 11h3v2H1zm19 0h3v2h-3zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zm12.1 12.1 1.4-1.4 2.1 2.1-1.4 1.4zM16.3 6.3l2.1-2.1 1.4 1.4-2.1 2.1zM4.2 18.4l2.1-2.1 1.4 1.4-2.1 2.1z"/></svg>',
  pinceau: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.7 4.3a1 1 0 0 0-1.4 0L10 13.6l1.4 1.4 9.3-9.3a1 1 0 0 0 0-1.4zM8.5 15a3 3 0 0 0-3 3c0 1.3-1 2-2.5 2 1 1.3 2.6 2 4.5 2a4 4 0 0 0 4-4 3 3 0 0 0-3-3z"/></svg>',
  panneau: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h18l-2 11H5zm2.3 2 .5 3h3.9l-.3-3zm6 0 .2 3h3.4l.4-3zM6.1 11l.5 2h3l-.2-2zm6 0v2h3.2l.4-2zM11 16h2v4h3v2H8v-2h3z"/></svg>',
};
const ICONE_SERVICE = {
  'etancheite-et-reparation-de-fuite': 'goutte',
  'pose-et-entretien-de-gouttiere': 'gouttiere',
  'nettoyage-et-traitement-hydrofuge': 'jet',
  'revetement-reflechissant-anti-chaleur': 'soleil',
  'peinture-toiture-facade-murets': 'pinceau',
  'etancheite-des-panneaux-solaires': 'panneau',
};
const ic = (n) => `<span class="ic">${ICONES[n]}</span>`;

/* ---------------- donnees structurees ---------------- */
const ENTITE = {
  '@type': 'RoofingContractor',
  '@id': E.url + '#entreprise',
  name: E.nom,
  slogan: E.slogan,
  url: E.url,
  logo: E.url + 'photos/logo-occitan-renov.png',
  image: E.url + 'photos/couvreur-nimes-occitan-renov-1600.webp',
  telephone: '+33 7 49 87 98 91',
  email: E.email,
  foundingDate: String(E.depuis),
  address: { '@type': 'PostalAddress', addressLocality: 'Nîmes', postalCode: E.codePostal, addressRegion: 'Occitanie', addressCountry: 'FR' },
  areaServed: [{ '@type': 'AdministrativeArea', name: 'Gard' }, ...ZONE.map((v) => ({ '@type': 'City', name: v }))],
  sameAs: [E.facebook, E.instagram, E.fiche],
  makesOffer: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.nom, url: abs('produit/' + s.slug + '/') } })),
  ...(AVIS.note && AVIS.nombre ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: AVIS.note, reviewCount: AVIS.nombre, bestRating: 5 } } : {}),
};
const fil = (etapes) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [['Accueil', ''], ...etapes].map(([nom, ch], i) => ({ '@type': 'ListItem', position: i + 1, name: nom, item: abs(ch) })),
});
const faqSchema = (liste) => ({
  '@type': 'FAQPage',
  mainEntity: liste.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
});

/* ---------------- gabarit commun ---------------- */
function page(chemin, { titre, description, corps, schemas = [], ariane = null, image = 'couvreur-nimes-occitan-renov', classe = '' }) {
  const r = '../'.repeat(chemin.split('/').filter(Boolean).length);
  const titreComplet = chemin === '' || titre.length > 48 ? titre : `${titre} | ${E.nom}`;
  const graphe = { '@context': 'https://schema.org', '@graph': [ENTITE, ...schemas] };
  const lienActif = (ch) => (chemin === ch || (ch && chemin.startsWith(ch)) ? ' aria-current="page"' : '');
  const sousMenu = SERVICES.map((s) => `<a href="${r}produit/${s.slug}/">${ic(ICONE_SERVICE[s.slug])}${esc(s.court)}</a>`).join('');

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(titreComplet)}</title>
<meta name="description" content="${esc(description)}">
${PROD ? '' : '<meta name="robots" content="noindex,nofollow">\n'}<link rel="canonical" href="${abs(chemin)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${E.nom}">
<meta property="og:title" content="${esc(titreComplet)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(chemin)}">
<meta property="og:image" content="${E.url}photos/${image}-1600.webp">
<meta name="theme-color" content="#0f2740">
<link rel="icon" href="${r}photos/logo-toit.png">
<link rel="apple-touch-icon" href="${r}photos/logo-occitan-renov.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/style.css?v=${V}">
<script type="application/ld+json">${JSON.stringify(graphe)}</script>
</head>
<body class="${classe}">
<a class="evitement" href="#contenu">Aller au contenu</a>

<header class="entete" data-entete>
  <div class="entete-in">
    <a class="marque" href="${r || './'}" aria-label="${E.nom}, accueil">
      <img src="${r}photos/logo-toit.png" alt="" width="240" height="96">
      <span><b>Occitan <em>Rénov</em></b><small>${E.slogan}</small></span>
    </a>
    <nav class="nav" aria-label="Navigation principale">
      <a href="${r || './'}"${chemin === '' ? ' aria-current="page"' : ''}>Accueil</a>
      <div class="nav-deroule">
        <a href="${r}services/"${lienActif('services/') || lienActif('produit/')}>Services</a>
        <div class="nav-sous">${sousMenu}</div>
      </div>
      <a href="${r}realisations/"${lienActif('realisations/')}>Réalisations</a>
      <a href="${r}occitan-renov/"${lienActif('occitan-renov/')}>L’entreprise</a>
      <a href="${r}blog/"${lienActif('blog/')}>Conseils</a>
      <a href="${r}contactez-nous/"${lienActif('contactez-nous/')}>Contact</a>
    </nav>
    <a class="entete-tel" href="tel:${E.telLien}">${ICONES.tel}<span><b>${E.tel}</b><small>Appel direct</small></span></a>
    <a class="bouton bouton-orange entete-cta" href="${r}contactez-nous/#devis">Demander un devis</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="menu-mobile" aria-label="Ouvrir le menu"><span></span><span></span><span></span></button>
  </div>
  <div class="menu-mobile" id="menu-mobile" hidden>
    <a href="${r || './'}">Accueil</a>
    <a href="${r}services/">Nos services</a>
    <div class="menu-mobile-services">${sousMenu}</div>
    <a href="${r}realisations/">Réalisations</a>
    <a href="${r}occitan-renov/">L’entreprise</a>
    <a href="${r}zone-intervention/">Zone d’intervention</a>
    <a href="${r}blog/">Conseils</a>
    <a href="${r}foire-aux-questions-faq/">Questions fréquentes</a>
    <a href="${r}contactez-nous/">Contact</a>
    <a class="bouton bouton-orange" href="tel:${E.telLien}">${ICONES.tel} ${E.tel}</a>
  </div>
</header>

<main id="contenu">
${ariane ? `<nav class="ariane" aria-label="Fil d’Ariane"><div class="cadre"><a href="${r || './'}">Accueil</a>${ariane.map(([n, ch], i) => (i === ariane.length - 1 ? `<span aria-current="page">${esc(n)}</span>` : `<a href="${r}${ch}">${esc(n)}</a>`)).join('')}</div></nav>` : ''}
${corps(r)}
</main>

<footer class="pied">
  <div class="cadre pied-haut">
    <div class="pied-marque">
      <a class="marque marque-claire" href="${r || './'}"><img src="${r}photos/logo-toit.png" alt="" width="240" height="96"><span><b>Occitan <em>Rénov</em></b><small>${E.slogan}</small></span></a>
      <p>Couvreur à Nîmes depuis ${E.depuis}. Réparation de fuite, étanchéité, gouttières aluminium, nettoyage et traitement hydrofuge, revêtement anti-chaleur, dans tout le Gard.</p>
      <div class="reseaux">
        <a href="${E.facebook}" target="_blank" rel="noopener">Facebook</a>
        <a href="${E.instagram}" target="_blank" rel="noopener">Instagram</a>
        <a href="${E.fiche}" target="_blank" rel="noopener">Avis Google</a>
      </div>
    </div>
    <div>
      <h2 class="pied-titre">Services</h2>
      <ul>${SERVICES.map((s) => `<li><a href="${r}produit/${s.slug}/">${esc(s.court)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="pied-titre">Occitan Rénov</h2>
      <ul>
        <li><a href="${r}occitan-renov/">L’entreprise</a></li>
        <li><a href="${r}realisations/">Réalisations</a></li>
        <li><a href="${r}zone-intervention/">Zone d’intervention</a></li>
        <li><a href="${r}assurance-decennale-des-travaux-en-toute-serenite/">Assurance décennale</a></li>
        <li><a href="${r}blog/">Conseils toiture</a></li>
        <li><a href="${r}foire-aux-questions-faq/">Questions fréquentes</a></li>
      </ul>
    </div>
    <div>
      <h2 class="pied-titre">Contact</h2>
      <ul class="pied-contact">
        <li>${ICONES.tel}<a href="tel:${E.telLien}">${E.tel}</a></li>
        <li>${ICONES.mail}<a href="mailto:${E.email}">${E.email}</a></li>
        <li>${ICONES.pin}<span>Nîmes et tout le Gard</span></li>
      </ul>
      <a class="bouton bouton-orange" href="${r}contactez-nous/#devis">Devis gratuit</a>
    </div>
  </div>
  <div class="cadre pied-bas">
    <span>© ${new Date().getFullYear()} ${E.nom} — Couvreur à Nîmes</span>
    <span><a href="${r}mentions-legales/">Mentions légales</a> · <a href="${r}politique-de-confidentialite/">Confidentialité</a>${PROD ? ' · Site réalisé par <a href="https://locweb.fr" target="_blank" rel="noopener">LocWeb</a>' : ''}</span>
  </div>
</footer>

<div class="barre-mobile">
  <a href="tel:${E.telLien}">${ICONES.tel}<span>Appeler</span></a>
  <a href="${r}contactez-nous/#devis" class="barre-devis">${ICONES.devis}<span>Devis gratuit</span></a>
</div>

<script>
  window.LOCWEB_CONFIG = {
    supabaseUrl: 'https://ibqawtgnucakzdldnitj.supabase.co',
    supabaseAnonKey: 'sb_publishable_rpLrUo4Cqnfl8zSohDqO0A_Q5Vkj2Hk',
    clientId: '',
    ga4Id: ''
  };
</script>
<script src="${r}contenu-loader.js" defer></script>
<script src="${r}leads-form.js" defer></script>
<script src="${r}mesure.js" defer></script>
<script src="${r}assets/site.js?v=${V}" defer></script>
</body>
</html>
`;
}

/* ---------------- blocs reutilises ---------------- */
const carteService = (r, s) => `
<a class="carte-service reveler" href="${r}produit/${s.slug}/">
  <span class="carte-photo">${img(r, s.photo, s.nom, { sizes: '(min-width: 1100px) 360px, (min-width: 700px) 45vw, 100vw' })}</span>
  <span class="carte-corps">
    ${ic(ICONE_SERVICE[s.slug])}
    <b>${esc(s.court)}</b>
    <span>${esc(s.carte)}</span>
    <span class="lien-fleche">En savoir plus ${ICONES.fleche}</span>
  </span>
</a>`;

const formulaireDevis = (id, titre = 'Demandez votre devis gratuit') => `
<form class="devis" id="${id}" data-devis novalidate>
  <h2>${titre}</h2>
  <p class="devis-intro">Une question, un projet ? Nous vous rappelons rapidement, et le devis est gratuit.</p>
  <label><span>Nom et prénom</span><input name="nom" autocomplete="name" required></label>
  <label><span>Téléphone</span><input name="telephone" type="tel" autocomplete="tel" inputmode="tel" required></label>
  <label><span>Commune</span><input name="ville" autocomplete="address-level2" placeholder="Nîmes, Marguerittes…"></label>
  <label><span>Votre besoin</span>
    <select name="besoin">
      <option value="">Choisir…</option>
      ${SERVICES.map((s) => `<option>${esc(s.court)}</option>`).join('')}
      <option>Autre demande</option>
    </select>
  </label>
  <label><span>Votre projet</span><textarea name="message" rows="3" placeholder="Ex. : fuite au plafond après l’orage, gouttières à remplacer…"></textarea></label>
  <button class="bouton bouton-orange" type="submit">Demander un devis ${ICONES.fleche}</button>
  <p class="devis-note" data-note hidden></p>
</form>`;

const bandeauAppel = (r) => `
<section class="appel">
  <div class="cadre appel-in reveler">
    <div>
      <h2>Une fuite, un projet de toiture ?</h2>
      <p>Diagnostic et devis gratuits, intervention rapide à Nîmes et dans tout le Gard.</p>
    </div>
    <div class="appel-actions">
      <a class="bouton bouton-orange" href="tel:${E.telLien}">${ICONES.tel} ${E.tel}</a>
      <a class="bouton bouton-blanc" href="${r}contactez-nous/#devis">${ICONES.devis} Demander un devis</a>
    </div>
  </div>
</section>`;

const blocAvis = (r) => AVIS.liste.length
  ? `<div class="avis-liste">${AVIS.liste.map((a) => `<figure class="avis reveler"><div class="etoiles" aria-label="5 étoiles sur 5">★★★★★</div><blockquote>${esc(a.texte)}</blockquote><figcaption><b>${esc(a.nom)}</b> · ${esc(a.date)}</figcaption></figure>`).join('')}</div>`
  : `<div class="avis-fiche reveler">
      <div class="etoiles etoiles-grandes" aria-hidden="true">★★★★★</div>
      <p>Nos clients donnent leur avis sur notre fiche Google : lisez-les avant de nous appeler, c’est fait pour ça.</p>
      <a class="bouton bouton-contour" href="${E.fiche}" target="_blank" rel="noopener">Lire les avis Google ${ICONES.fleche}</a>
    </div>`;

const noteAvis = AVIS.note ? `${String(AVIS.note).replace('.', ',')}/5 sur Google` : 'Avis clients Google';
const sousNoteAvis = AVIS.nombre ? `Plus de ${AVIS.nombre} avis vérifiés` : 'Lisez-les sur notre fiche';

const reassurance = () => `
<div class="reassurance">
  <div>${ic('bouclier')}<p><b>Assurance décennale</b><span>Vos travaux couverts 10 ans</span></p></div>
  <div>${ic('casque')}<p><b>Entreprise déclarée et assurée</b><span>Responsabilité civile professionnelle</span></p></div>
  <div>${ic('etoile')}<p><b>${noteAvis}</b><span>${sousNoteAvis}</span></p></div>
  <div>${ic('calendrier')}<p><b>Artisan depuis ${E.depuis}</b><span>Basé à Nîmes, tout le Gard</span></p></div>
</div>`;

const faqHtml = (liste) => `<div class="faq">${liste.map((x, i) => `
  <details class="reveler"${i === 0 ? ' open' : ''}>
    <summary><span>${esc(x.q)}</span><i aria-hidden="true"></i></summary>
    <p>${esc(x.a)}</p>
  </details>`).join('')}</div>`;

const carrousel = (r, liste, id) => `
<div class="carrousel" data-carrousel>
  <button class="carrousel-fl carrousel-prec" type="button" aria-label="Réalisations précédentes" data-prec>${ICONES.fleche}</button>
  <div class="carrousel-piste" id="${id}" tabindex="0">
    ${liste.map((x) => `
    <figure class="realisation">
      <span class="realisation-photo">${img(r, x.photo, x.titre, { sizes: '(min-width: 900px) 360px, 80vw' })}<span class="pastille">Avant / après</span></span>
      <figcaption><b>${esc(x.titre)}</b><span>${esc(x.type)}</span></figcaption>
    </figure>`).join('')}
  </div>
  <button class="carrousel-fl" type="button" aria-label="Réalisations suivantes" data-suiv>${ICONES.fleche}</button>
</div>`;

/* ===================================================================
   LES PAGES
   =================================================================== */
const PAGES = [];
const ajouter = (chemin, opts) => PAGES.push([chemin, opts]);

/* ---------------- accueil ---------------- */
ajouter('', {
  titre: 'Couvreur à Nîmes — Réparation & rénovation de toiture | Occitan Rénov',
  description: `Couvreur à Nîmes depuis ${E.depuis} : réparation de fuite, faîtage, étanchéité, gouttières aluminium, démoussage. Tout le Gard, devis gratuit, garantie décennale.`,
  schemas: [{ '@type': 'WebSite', '@id': E.url + '#site', url: E.url, name: E.nom, inLanguage: 'fr-FR', publisher: { '@id': E.url + '#entreprise' } }],
  classe: 'accueil',
  corps: (r) => `
<section class="hero">
  <div class="hero-fond" data-parallaxe>${img(r, 'couvreur-nimes-occitan-renov', 'Couvreur d’Occitan Rénov sur une toiture à Nîmes, son numéro de téléphone au dos', { eager: true, sizes: '(min-width: 760px) 55vw, 100vw' })}</div>
  <div class="cadre hero-in">
    <p class="surtitre hero-anim">Artisan couvreur · Nîmes &amp; Gard</p>
    <h1 class="hero-anim">Couvreur à Nîmes —<br>réparation &amp; rénovation de toiture</h1>
    <p class="hero-liste hero-anim">Fuite <i></i> Étanchéité <i></i> Faîtage <i></i> Gouttières aluminium <i></i> Nettoyage &amp; hydrofuge</p>
    <p class="hero-promesse hero-anim">${ICONES.devis}<span><b>Devis gratuit</b> — intervention rapide dans tout le Gard</span></p>
    <div class="hero-actions hero-anim">
      <a class="bouton bouton-orange" href="tel:${E.telLien}">${ICONES.tel} Appeler maintenant</a>
      <a class="bouton bouton-blanc" href="${r}contactez-nous/#devis">${ICONES.devis} Demander un devis</a>
    </div>
  </div>
  <p class="hero-signature">Artisan local<br>à Nîmes <span>et dans tout le Gard</span></p>
</section>

<div class="cadre">${reassurance()}</div>

<section class="section">
  <div class="cadre">
    <div class="tete-section reveler">
      <h2>Nos services de <em>couverture</em> à Nîmes et dans le Gard</h2>
      <a class="lien-fleche" href="${r}services/">Toutes nos prestations ${ICONES.fleche}</a>
    </div>
    <div class="grille-services">${SERVICES.map((s) => carteService(r, s)).join('')}</div>
  </div>
</section>

<section class="section section-claire">
  <div class="cadre presentation">
    <figure class="presentation-photo reveler">
      ${img(r, 'remplacement-tuiles-couvreur-gard', 'Artisan couvreur Occitan Rénov remplaçant des tuiles sur une toiture du Gard', { sizes: '(min-width: 900px) 40vw, 100vw' })}
      <figcaption><small>Depuis</small><b>${E.depuis}</b><span>couvreur à Nîmes</span></figcaption>
    </figure>
    <div class="presentation-texte reveler">
      <p class="surtitre">Votre couvreur de proximité</p>
      <h2>Un artisan nîmois, du diagnostic jusqu’à la dernière tuile</h2>
      <p>Occitan Rénov est une entreprise de couverture basée à Nîmes, qui intervient depuis ${E.depuis} dans tout le Gard. Réparation de fuite, réfection de faîtage, étanchéité de toit-terrasse, pose de gouttières aluminium, démoussage et traitement hydrofuge : nous prenons en charge l’entretien et la rénovation de votre toiture de bout en bout.</p>
      <p>Ici, les toits travaillent dur. Les orages cévenols de l’automne, le mistral qui soulève les tuiles et les étés brûlants qui fendent les mortiers mettent la couverture à l’épreuve. Nous connaissons ces toitures en tuiles canal du Gard, leurs faiblesses et la façon de les réparer pour de bon.</p>
      <ul class="liste-coche">
        <li>Déplacement et devis gratuits, envoyés si possible dans la journée</li>
        <li>Intervention rapide en cas de fuite, 7 j/7</li>
        <li>Matériaux et produits professionnels, conformes aux normes</li>
        <li>Assurance décennale : attestation remise avant le chantier</li>
      </ul>
      <a class="lien-fleche" href="${r}occitan-renov/">Découvrir l’entreprise ${ICONES.fleche}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="cadre">
    <div class="tete-section reveler">
      <h2>Nos <em>réalisations</em></h2>
      <a class="lien-fleche" href="${r}realisations/">Voir toutes nos réalisations ${ICONES.fleche}</a>
    </div>
    ${carrousel(r, REALISATIONS.slice(0, 8), 'piste-accueil')}
  </div>
</section>

<section class="section section-marine">
  <div class="cadre">
    <div class="tete-section tete-centree reveler">
      <p class="surtitre">Comment ça se passe</p>
      <h2>Quatre étapes, aucune surprise</h2>
    </div>
    <ol class="etapes">
      <li class="reveler"><b>Vous nous appelez</b><span>Par téléphone ou via le formulaire. Nous vous rappelons rapidement pour comprendre le problème.</span></li>
      <li class="reveler"><b>Diagnostic gratuit</b><span>Nous venons voir la toiture, sur place, et nous vous expliquons ce que nous constatons.</span></li>
      <li class="reveler"><b>Devis clair</b><span>Un devis détaillé et gratuit, envoyé si possible dans la journée. Vous décidez sans pression.</span></li>
      <li class="reveler"><b>Travaux garantis</b><span>Chantier propre, photos avant / après, et l’assurance décennale sur les travaux.</span></li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="cadre coolroof">
    <div class="coolroof-texte reveler">
      <p class="surtitre">Confort d’été</p>
      <h2>Cool Roof : un toit qui renvoie la chaleur</h2>
      <p>À Nîmes, un toit sombre dépasse facilement 60 °C en plein été, et cette chaleur descend dans la maison. Le revêtement anti-chaleur Cool Roof est une peinture blanche réfléchissante qui renvoie une grande partie du rayonnement solaire : la toiture chauffe beaucoup moins, la climatisation tourne moins.</p>
      <p>Idéal pour les toits-terrasses, le bac acier, les garages et les locaux professionnels.</p>
      <a class="bouton bouton-orange" href="${r}produit/revetement-reflechissant-anti-chaleur/">Découvrir le Cool Roof ${ICONES.fleche}</a>
    </div>
    <figure class="coolroof-photo reveler">${img(r, 'revetement-anti-chaleur-cool-roof', 'Application d’un revêtement anti-chaleur blanc sur un toit-terrasse', { sizes: '(min-width: 900px) 50vw, 100vw' })}</figure>
  </div>
</section>

<section class="section section-claire" id="avis">
  <div class="cadre avis-devis">
    <div>
      <div class="tete-section reveler"><h2>Avis <em>clients</em></h2><a class="lien-fleche" href="${E.fiche}" target="_blank" rel="noopener">Tous les avis ${ICONES.fleche}</a></div>
      ${blocAvis(r)}
      <div class="zone-courte reveler">
        <h3>${ICONES.pin} Nous intervenons à</h3>
        <p>${ZONE.slice(0, 14).join(' · ')}… <a href="${r}zone-intervention/">et dans tout le Gard</a>.</p>
      </div>
    </div>
    <div class="devis-carte reveler">
      ${formulaireDevis('quick-form')}
      <ul class="devis-coord">
        <li>${ICONES.tel}<span><a href="tel:${E.telLien}"><b>${E.tel}</b></a><small>Appel gratuit</small></span></li>
        <li>${ICONES.mail}<span><a href="mailto:${E.email}"><b>${E.email}</b></a><small>Réponse rapide</small></span></li>
        <li>${ICONES.pin}<span><b>Nîmes et tout le Gard</b><small>${E.urgences}</small></span></li>
      </ul>
    </div>
  </div>
</section>

<section class="section">
  <div class="cadre etroit">
    <div class="tete-section tete-centree reveler"><h2>Questions fréquentes</h2></div>
    ${faqHtml(FAQ.slice(0, 5))}
    <p class="centre reveler"><a class="lien-fleche" href="${r}foire-aux-questions-faq/">Toutes les questions ${ICONES.fleche}</a></p>
  </div>
</section>`,
});

/* ---------------- liste des services ---------------- */
ajouter('services/', {
  titre: 'Nos services de couverture à Nîmes',
  description: 'Les services d’Occitan Rénov, couvreur à Nîmes : fuite, étanchéité, gouttières aluminium, démoussage, anti-chaleur, façade et panneaux solaires.',
  ariane: [['Services', 'services/']],
  schemas: [fil([['Services', 'services/']])],
  corps: (r) => `
<section class="tete-page">
  <div class="cadre">
    <h1>Nos services de couverture à Nîmes et dans le Gard</h1>
    <p>De la tuile cassée à la rénovation complète, nous entretenons, réparons et protégeons votre toiture et vos façades. Chaque intervention commence par un diagnostic gratuit sur place.</p>
  </div>
</section>
<section class="section">
  <div class="cadre"><div class="grille-services">${SERVICES.map((s) => carteService(r, s)).join('')}</div></div>
</section>
${bandeauAppel(r)}`,
});

/* ---------------- les six services ---------------- */
for (const s of SERVICES) {
  const ch = `produit/${s.slug}/`;
  const autres = SERVICES.filter((x) => x !== s);
  ajouter(ch, {
    titre: s.titre,
    description: s.description,
    image: s.photo,
    ariane: [['Services', 'services/'], [s.court, ch]],
    schemas: [
      fil([['Services', 'services/'], [s.court, ch]]),
      { '@type': 'Service', name: s.nom, serviceType: s.nom, description: s.description, url: abs(ch), image: E.url + `photos/${s.photo}-1600.webp`, provider: { '@id': E.url + '#entreprise' }, areaServed: [{ '@type': 'City', name: 'Nîmes' }, { '@type': 'AdministrativeArea', name: 'Gard' }] },
      faqSchema(s.faq),
    ],
    corps: (r) => `
<section class="tete-service">
  <div class="cadre tete-service-in">
    <div class="reveler">
      <p class="surtitre">${ic(ICONE_SERVICE[s.slug])} ${esc(s.court)}</p>
      <h1>${esc(s.h1)}</h1>
      <p class="chapo">${esc(s.chapo)}</p>
      <div class="hero-actions">
        <a class="bouton bouton-orange" href="tel:${E.telLien}">${ICONES.tel} ${E.tel}</a>
        <a class="bouton bouton-blanc" href="#devis">${ICONES.devis} Devis gratuit</a>
      </div>
    </div>
    <figure class="tete-service-photo reveler">${img(r, s.photo, s.h1, { eager: true, sizes: '(min-width: 900px) 45vw, 100vw' })}</figure>
  </div>
</section>

<div class="cadre">${reassurance()}</div>

<div class="cadre article-service">
  <article class="texte-riche">
    ${s.sections.map((sec) => `
    <section class="reveler">
      <h2>${esc(sec.h)}</h2>
      ${(sec.p || []).map((p) => `<p>${esc(p)}</p>`).join('')}
      ${sec.li ? `<ul class="liste-coche">${sec.li.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    </section>`).join('')}

    <section class="reveler">
      <h2>Nos chantiers en images</h2>
      <div class="galerie">${s.galerie.map((g) => `<figure>${img(r, g, `${s.court} — chantier Occitan Rénov`, { sizes: '(min-width: 900px) 30vw, 50vw' })}</figure>`).join('')}</div>
    </section>

    <section class="reveler">
      <h2>Vos questions</h2>
      ${faqHtml(s.faq)}
    </section>

    <section class="reveler">
      <h2>Où intervenons-nous ?</h2>
      <p>Basés à Nîmes, nous intervenons dans tout le Gard : ${ZONE.slice(1, 12).join(', ')} et les communes voisines. <a href="${r}zone-intervention/">Voir toute la zone d’intervention</a>.</p>
    </section>
  </article>

  <aside class="cote">
    <div class="cote-collant">
      <div class="devis-carte" id="devis">${formulaireDevis('quick-form', 'Devis gratuit')}</div>
      <nav class="cote-services" aria-label="Nos autres services">
        <h2>Nos autres services</h2>
        ${autres.map((x) => `<a href="${r}produit/${x.slug}/">${ic(ICONE_SERVICE[x.slug])}${esc(x.court)}</a>`).join('')}
      </nav>
    </div>
  </aside>
</div>
${bandeauAppel(r)}`,
  });
}

/* ---------------- realisations ---------------- */
ajouter('realisations/', {
  titre: 'Nos réalisations — Toitures et façades à Nîmes',
  description: 'Photos avant / après des chantiers d’Occitan Rénov à Nîmes et dans le Gard : faîtages, démoussage, façades, gouttières aluminium, toits-terrasses.',
  ariane: [['Réalisations', 'realisations/']],
  schemas: [fil([['Réalisations', 'realisations/']])],
  corps: (r) => `
<section class="tete-page">
  <div class="cadre">
    <h1>Nos réalisations à Nîmes et dans le Gard</h1>
    <p>Des photos de nos propres chantiers, prises avant et après les travaux. Pas d’images de catalogue : ce que vous voyez, c’est ce que nous faisons.</p>
  </div>
</section>
<section class="section">
  <div class="cadre grille-realisations">
    ${REALISATIONS.map((x) => `
    <figure class="realisation reveler">
      <span class="realisation-photo">${img(r, x.photo, x.titre, { sizes: '(min-width: 900px) 33vw, 100vw' })}${/avant|apres/.test(x.photo) ? '<span class="pastille">Avant / après</span>' : ''}</span>
      <figcaption><b>${esc(x.titre)}</b><span>${esc(x.type)}</span></figcaption>
    </figure>`).join('')}
    <figure class="realisation reveler"><span class="realisation-photo">${img(r, 'chantier-facade-echafaudage', 'Chantier de façade sur échafaudage', { sizes: '(min-width: 900px) 33vw, 100vw' })}</span><figcaption><b>Chantier de façade en cours</b><span>Peinture &amp; façade</span></figcaption></figure>
    <figure class="realisation reveler"><span class="realisation-photo">${img(r, 'occitan-renov-chantier-termine', 'Artisan Occitan Rénov devant un chantier terminé', { sizes: '(min-width: 900px) 33vw, 100vw' })}</span><figcaption><b>Chantier terminé</b><span>Occitan Rénov</span></figcaption></figure>
  </div>
</section>
${bandeauAppel(r)}`,
});

/* ---------------- l'entreprise (adresse de l'ancien site) ---------------- */
ajouter('occitan-renov/', {
  titre: 'L’entreprise — Votre artisan couvreur à Nîmes depuis 2016',
  description: `Occitan Rénov, artisan couvreur à Nîmes depuis ${E.depuis} : rénovation et entretien de toitures et façades dans tout le Gard. Proximité, réactivité, travaux garantis.`,
  ariane: [['L’entreprise', 'occitan-renov/']],
  schemas: [fil([['L’entreprise', 'occitan-renov/']])],
  corps: (r) => `
<section class="tete-page">
  <div class="cadre">
    <h1>Occitan Rénov, votre artisan couvreur à Nîmes</h1>
    <p>Depuis ${E.depuis}, nous accompagnons les particuliers et les professionnels du Gard dans l’entretien et la rénovation de leurs toitures et façades.</p>
  </div>
</section>
<section class="section">
  <div class="cadre presentation">
    <figure class="presentation-photo reveler">${img(r, 'occitan-renov-chantier-termine', 'L’artisan d’Occitan Rénov devant un chantier terminé', { sizes: '(min-width: 900px) 40vw, 100vw' })}<figcaption><small>Depuis</small><b>${E.depuis}</b><span>au service du Gard</span></figcaption></figure>
    <div class="presentation-texte texte-riche reveler">
      <h2>Une entreprise locale, un interlocuteur unique</h2>
      <p>Occitan Rénov est née à Nîmes en ${E.depuis}. Depuis, l’entreprise intervient sur les toitures et les façades de tout le Gard : revêtement anti-chaleur, peinture de toiture et de façade, nettoyage et traitement hydrofuge, étanchéité et réparation des fuites, pose et entretien de gouttières, et petits travaux de maçonnerie.</p>
      <p>Chez nous, la personne qui vient faire le diagnostic est celle qui suit votre chantier. Pas de sous-traitance en cascade, pas de commercial qui disparaît une fois le devis signé.</p>
      <p>Nous privilégions des matériaux de qualité pour que les travaux durent, et nous portons des valeurs simples : la proximité, la réactivité et le respect de l’environnement.</p>
    </div>
  </div>
</section>
<section class="section section-claire">
  <div class="cadre">
    <div class="tete-section tete-centree reveler"><h2>Nos engagements</h2></div>
    <div class="valeurs">
      <div class="reveler">${ic('bouclier')}<h3>Un travail soigné</h3><p>Un service complet et soigné, avec des matériaux et des équipements de qualité, durables dans le temps, et des peintures conformes aux normes en vigueur.</p></div>
      <div class="reveler">${ic('tel')}<h3>À votre écoute</h3><p>Votre artisan vous répond directement, par téléphone, mail ou message. Et pour éclaircir un projet, il se déplace chez vous.</p></div>
      <div class="reveler">${ic('calendrier')}<h3>Réactif</h3><p>En cas de fuite ou d’incident, nous intervenons directement pour régler le problème. Et nous nous efforçons d’envoyer les devis dans la journée.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="cadre">
    <div class="tete-section reveler"><h2>Quelques <em>chantiers</em></h2><a class="lien-fleche" href="${r}realisations/">Toutes nos réalisations ${ICONES.fleche}</a></div>
    ${carrousel(r, REALISATIONS, 'piste-entreprise')}
  </div>
</section>
${bandeauAppel(r)}`,
});

/* ---------------- zone d'intervention ---------------- */
ajouter('zone-intervention/', {
  titre: 'Zone d’intervention — Couvreur à Nîmes et dans le Gard',
  description: 'Couvreur basé à Nîmes, Occitan Rénov intervient dans tout le Gard : Marguerittes, Caveirac, Milhaud, Saint-Gilles, Vauvert, Sommières, Uzès…',
  ariane: [['Zone d’intervention', 'zone-intervention/']],
  schemas: [fil([['Zone d’intervention', 'zone-intervention/']])],
  corps: (r) => `
<section class="tete-page">
  <div class="cadre">
    <h1>Couvreur à Nîmes et dans tout le Gard</h1>
    <p>Basés à Nîmes, nous nous déplaçons dans tout le Gard pour vos travaux de toiture, de gouttières et de façade. Le déplacement et le devis sont gratuits.</p>
  </div>
</section>
<section class="section">
  <div class="cadre etroit texte-riche">
    <h2 class="reveler">Les communes où nous intervenons</h2>
    <ul class="communes reveler">${ZONE.map((v) => `<li>${ICONES.pin}${esc(v)}</li>`).join('')}</ul>
    <p class="reveler">Votre commune n’est pas dans la liste ? Appelez-nous au <a href="tel:${E.telLien}">${E.tel}</a> : nous intervenons dans tout le département.</p>
    <h2 class="reveler">Pourquoi choisir un couvreur local</h2>
    <p class="reveler">Un artisan installé à Nîmes connaît les toitures de la région : tuiles canal sur faible pente, toits-terrasses, faîtages scellés au mortier. Il sait comment elles réagissent aux orages cévenols, au mistral et aux fortes chaleurs. Et quand une fuite se déclare un soir d’orage, il est sur place rapidement, au lieu d’attendre qu’une entreprise lointaine trouve un créneau.</p>
  </div>
</section>
${bandeauAppel(r)}`,
});

/* ---------------- FAQ ---------------- */
ajouter('foire-aux-questions-faq/', {
  titre: 'Questions fréquentes — Couvreur à Nîmes',
  description: 'Réponses aux questions sur nos travaux de toiture à Nîmes : urgences, devis gratuit, délais, assurance décennale, entretien, zone d’intervention.',
  ariane: [['Questions fréquentes', 'foire-aux-questions-faq/']],
  schemas: [fil([['Questions fréquentes', 'foire-aux-questions-faq/']]), faqSchema(FAQ)],
  corps: (r) => `
<section class="tete-page">
  <div class="cadre">
    <h1>Questions fréquentes</h1>
    <p>Tout ce qu’on nous demande le plus souvent avant des travaux de toiture. Une autre question ? Appelez-nous, on répond directement.</p>
  </div>
</section>
<section class="section"><div class="cadre etroit">${faqHtml(FAQ)}</div></section>
${bandeauAppel(r)}`,
});

/* ---------------- decennale (adresse de l'ancien site) ---------------- */
ajouter('assurance-decennale-des-travaux-en-toute-serenite/', {
  titre: 'Assurance décennale — Des travaux en toute sérénité',
  description: 'Occitan Rénov, couvreur à Nîmes, est couvert par une assurance décennale : vos travaux de toiture garantis 10 ans, attestation remise avant le chantier.',
  ariane: [['Assurance décennale', 'assurance-decennale-des-travaux-en-toute-serenite/']],
  schemas: [fil([['Assurance décennale', 'assurance-decennale-des-travaux-en-toute-serenite/']])],
  corps: (r) => `
<section class="tete-page">
  <div class="cadre">
    <h1>Assurance décennale : des travaux en toute sérénité</h1>
    <p>Faire appel à une entreprise couverte par une assurance décennale est une obligation légale. C’est surtout une garantie indispensable pour votre tranquillité.</p>
  </div>
</section>
<section class="section">
  <div class="cadre etroit texte-riche">
    <h2 class="reveler">Qu’est-ce que l’assurance décennale ?</h2>
    <p class="reveler">C’est une assurance obligatoire pour les professionnels du bâtiment. Pendant 10 ans après la réception des travaux, elle couvre les dommages qui pourraient :</p>
    <ul class="liste-coche reveler"><li>compromettre la solidité de l’ouvrage ;</li><li>compromettre la stabilité de la construction ;</li><li>rendre le bâtiment impropre à son usage.</li></ul>
    <h2 class="reveler">Chez Occitan Rénov, ce n’est pas une formalité</h2>
    <p class="reveler">Votre chantier est couvert pendant 10 ans après la réception des travaux, et nous vous remettons l’attestation avant le début du chantier. Que vous soyez particulier, entreprise, syndic ou collectivité, vous bénéficiez :</p>
    <ul class="liste-coche reveler"><li>d’une protection sur le long terme ;</li><li>d’une sécurité financière en cas de sinistre ;</li><li>d’un chantier réalisé par une entreprise sérieuse et déclarée ;</li><li>d’une vraie tranquillité d’esprit après la fin des travaux.</li></ul>
    <p class="reveler"><a class="bouton bouton-orange" href="${r}contactez-nous/#devis">Demander un devis ${ICONES.fleche}</a></p>
  </div>
</section>`,
});

/* ---------------- contact (adresse de l'ancien site) ---------------- */
ajouter('contactez-nous/', {
  titre: 'Contact et devis gratuit — Couvreur à Nîmes',
  description: `Contactez Occitan Rénov, couvreur à Nîmes : ${E.tel}. Devis gratuit pour vos travaux de toiture, gouttières et façade dans tout le Gard.`,
  ariane: [['Contact', 'contactez-nous/']],
  schemas: [fil([['Contact', 'contactez-nous/']]), { '@type': 'ContactPage', url: abs('contactez-nous/'), about: { '@id': E.url + '#entreprise' } }],
  corps: (r) => `
<section class="tete-page">
  <div class="cadre">
    <h1>Contact et devis gratuit</h1>
    <p>Décrivez-nous votre besoin, nous vous rappelons rapidement. En cas de fuite, appelez directement : c’est le plus rapide.</p>
  </div>
</section>
<section class="section">
  <div class="cadre contact">
    <div class="contact-infos reveler">
      <a class="contact-tel" href="tel:${E.telLien}">${ICONES.tel}<span><small>Appel direct</small><b>${E.tel}</b></span></a>
      <a class="contact-ligne" href="mailto:${E.email}">${ICONES.mail}<span>${E.email}</span></a>
      <p class="contact-ligne">${ICONES.pin}<span>Basés à Nîmes, intervention dans tout le Gard</span></p>
      <p class="contact-ligne">${ICONES.calendrier}<span>${E.urgences}</span></p>
      <p>Une question générale ? Consultez d’abord <a href="${r}foire-aux-questions-faq/">nos questions fréquentes</a>, vous y trouverez sûrement la réponse.</p>
    </div>
    <div class="devis-carte reveler" id="devis">${formulaireDevis('contact-form')}</div>
  </div>
</section>`,
});

/* ---------------- blog (adresses de l'ancien site) ---------------- */
const resume = (a) => (a.blocs.find((b) => b.t === 'p') || { x: '' }).x.slice(0, 152).replace(/\s+\S*$/, '') + '…';
const dateFr = (d) => new Date(d + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
const PHOTO_ARTICLE = {
  'pourquoi-entretenir-regulierement-sa-toiture': 'reparation-tuiles-toiture-nimes',
  'comment-un-revetement-anti-chaleur-peut-reduire-vos-factures-delectricite': 'revetement-anti-chaleur-cool-roof',
  'pourquoi-lentretien-regulier-des-gouttieres-est-indispensable-pour-votre-maison': 'bandeau-gouttiere-aluminium',
  'preparer-sa-toiture-pour-lhiver-les-bons-gestes-a-adopter': 'nettoyage-toiture-haute-pression',
};
const SERVICE_ARTICLE = {
  'pourquoi-entretenir-regulierement-sa-toiture': 'nettoyage-et-traitement-hydrofuge',
  'comment-un-revetement-anti-chaleur-peut-reduire-vos-factures-delectricite': 'revetement-reflechissant-anti-chaleur',
  'pourquoi-lentretien-regulier-des-gouttieres-est-indispensable-pour-votre-maison': 'pose-et-entretien-de-gouttiere',
  'preparer-sa-toiture-pour-lhiver-les-bons-gestes-a-adopter': 'etancheite-et-reparation-de-fuite',
};

ajouter('blog/', {
  titre: 'Conseils toiture — Le blog d’Occitan Rénov',
  description: 'Les conseils d’un couvreur nîmois pour entretenir votre toiture et vos gouttières, préparer l’hiver et garder la maison fraîche en été.',
  ariane: [['Conseils', 'blog/']],
  schemas: [fil([['Conseils', 'blog/']])],
  corps: (r) => `
<section class="tete-page">
  <div class="cadre">
    <h1>Conseils toiture</h1>
    <p>Les conseils d’un couvreur nîmois pour garder une toiture saine, des gouttières qui évacuent et une maison plus fraîche l’été.</p>
  </div>
</section>
<section class="section">
  <div class="cadre grille-articles">
    ${[...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).map((a) => `
    <a class="carte-article reveler" href="${r}${a.slug}/">
      <span class="carte-photo">${img(r, PHOTO_ARTICLE[a.slug], a.titre, { sizes: '(min-width: 900px) 45vw, 100vw' })}</span>
      <span class="carte-corps"><time datetime="${a.date}">${dateFr(a.date)}</time><b>${esc(a.titre)}</b><span>${esc(resume(a))}</span><span class="lien-fleche">Lire l’article ${ICONES.fleche}</span></span>
    </a>`).join('')}
  </div>
</section>`,
});

for (const a of ARTICLES) {
  const ch = a.slug + '/';
  const svc = SERVICES.find((s) => s.slug === SERVICE_ARTICLE[a.slug]);
  const blocs = [];
  for (const b of a.blocs) {
    if (b.t === 'li') {
      const dernier = blocs[blocs.length - 1];
      if (dernier && dernier.t === 'ul') dernier.items.push(b.x); else blocs.push({ t: 'ul', items: [b.x] });
    } else blocs.push(b);
  }
  // « Terme : definition » -> le terme en gras
  const puce = (x) => { const m = x.match(/^([^:]{3,60}) : (.+)$/); return m ? `<b>${esc(m[1])}</b> : ${esc(m[2])}` : esc(x); };
  ajouter(ch, {
    titre: a.titre,
    description: resume(a),
    image: PHOTO_ARTICLE[a.slug],
    ariane: [['Conseils', 'blog/'], [a.titre, ch]],
    schemas: [
      fil([['Conseils', 'blog/'], [a.titre, ch]]),
      { '@type': 'BlogPosting', headline: a.titre, datePublished: a.date, dateModified: a.date, url: abs(ch), image: E.url + `photos/${PHOTO_ARTICLE[a.slug]}-1600.webp`, author: { '@id': E.url + '#entreprise' }, publisher: { '@id': E.url + '#entreprise' }, inLanguage: 'fr-FR' },
    ],
    corps: (r) => `
<article class="article">
  <header class="tete-page">
    <div class="cadre etroit">
      <time datetime="${a.date}">${dateFr(a.date)}</time>
      <h1>${esc(a.titre)}</h1>
    </div>
  </header>
  <div class="cadre etroit">
    <figure class="article-photo">${img(r, PHOTO_ARTICLE[a.slug], a.titre, { eager: true, sizes: '(min-width: 800px) 760px, 100vw' })}</figure>
    <div class="texte-riche">
      ${blocs.map((b) => b.t === 'h2' ? `<h2>${esc(b.x)}</h2>` : b.t === 'ul' ? `<ul class="liste-coche">${b.items.map((x) => `<li>${puce(x)}</li>`).join('')}</ul>` : `<p>${esc(b.x)}</p>`).join('\n      ')}
    </div>
    ${svc ? `<aside class="article-service-lie"><p class="surtitre">Le service associé</p><a href="${r}produit/${svc.slug}/">${ic(ICONE_SERVICE[svc.slug])}<span><b>${esc(svc.nom)}</b><span>${esc(svc.carte)}</span></span>${ICONES.fleche}</a></aside>` : ''}
  </div>
</article>
${bandeauAppel(r)}`,
  });
}

/* ---------------- pages legales ---------------- */
ajouter('mentions-legales/', {
  titre: 'Mentions légales',
  description: `Mentions légales du site ${E.nom}, couvreur à Nîmes.`,
  ariane: [['Mentions légales', 'mentions-legales/']],
  corps: () => `
<section class="tete-page"><div class="cadre"><h1>Mentions légales</h1></div></section>
<section class="section"><div class="cadre etroit texte-riche">
  <h2>Éditeur du site</h2>
  <p>${E.nom} — entreprise de couverture et de rénovation<br>Nîmes (30)<br>SIRET : [à compléter]<br>Téléphone : ${E.tel}<br>E-mail : ${E.email}</p>
  <p>Directeur de la publication : [à compléter]</p>
  <h2>Hébergement</h2>
  <p>[Hébergeur à compléter à la mise en ligne]</p>
  <h2>Assurance professionnelle</h2>
  <p>Assurance décennale : [assureur et numéro de contrat à compléter]. Zone de couverture : France.</p>
  <h2>Propriété intellectuelle</h2>
  <p>Les textes et les photographies de ce site sont la propriété de ${E.nom}. Toute reproduction sans autorisation est interdite.</p>
</div></section>`,
});

ajouter('politique-de-confidentialite/', {
  titre: 'Politique de confidentialité',
  description: `Comment ${E.nom} traite les données transmises via son site.`,
  ariane: [['Confidentialité', 'politique-de-confidentialite/']],
  corps: () => `
<section class="tete-page"><div class="cadre"><h1>Politique de confidentialité</h1></div></section>
<section class="section"><div class="cadre etroit texte-riche">
  <h2>Les données que nous recueillons</h2>
  <p>Lorsque vous remplissez le formulaire de demande de devis, nous recueillons votre nom, votre téléphone, votre commune et la description de votre projet. Ces informations servent uniquement à vous recontacter et à établir votre devis.</p>
  <h2>Durée de conservation</h2>
  <p>Vos données sont conservées le temps nécessaire au traitement de votre demande, et au maximum trois ans après notre dernier échange si aucun chantier n’est engagé.</p>
  <h2>Mesure d’audience</h2>
  <p>Le site utilise Google Analytics pour mesurer sa fréquentation (pages consultées, provenance des visites). Ces statistiques sont anonymisées et ne servent qu’à améliorer le site.</p>
  <h2>Vos droits</h2>
  <p>Vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment en écrivant à <a href="mailto:${E.email}">${E.email}</a>. Vous pouvez également saisir la CNIL (cnil.fr).</p>
  <p>Aucune donnée n’est vendue ni cédée à des tiers.</p>
</div></section>`,
});

/* ===================================================================
   ECRITURE
   =================================================================== */
for (const [ch, opts] of PAGES) {
  fs.mkdirSync(path.join(ICI, ch), { recursive: true });
  fs.writeFileSync(path.join(ICI, ch, 'index.html'), page(ch, opts));
}

/* Les anciennes pages qui disparaissent. En production, _redirects
   donne de vraies 301 ; sur l'apercu (github.io, sans redirection
   serveur), une page de renvoi immediat fait le meme travail. */
const REDIRECTIONS = [
  ['boutique/', 'services/'], ['panier/', 'services/'], ['commander/', 'services/'], ['mon-compte/', 'services/'],
  ['categorie-produit/services/', 'services/'], ['category/articles/', 'blog/'], ['category/non-classe/', 'blog/'],
];
for (const [de, vers] of REDIRECTIONS) {
  const r = '../'.repeat(de.split('/').filter(Boolean).length);
  fs.mkdirSync(path.join(ICI, de), { recursive: true });
  fs.writeFileSync(path.join(ICI, de, 'index.html'), `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Page déplacée</title><meta name="robots" content="noindex"><link rel="canonical" href="${abs(vers)}"><meta http-equiv="refresh" content="0; url=${r}${vers}"></head><body><p>Cette page a été déplacée : <a href="${r}${vers}">continuer</a>.</p></body></html>\n`);
}
fs.writeFileSync(path.join(ICI, '_redirects'), REDIRECTIONS.map(([de, vers]) => `/${de}  /${vers}  301\n/${de.replace(/\/$/, '')}  /${vers}  301`).join('\n') + '\n/feed/  /blog/  301\n');

fs.writeFileSync(path.join(ICI, '404.html'), page('404/', {
  titre: 'Page introuvable',
  description: 'Cette page n’existe pas ou a été déplacée.',
  corps: () => `<section class="tete-page"><div class="cadre"><h1>Page introuvable</h1><p>Cette page n’existe pas ou a été déplacée. Revenez à <a href="/">l’accueil</a> ou appelez-nous au <a href="tel:${E.telLien}">${E.tel}</a>.</p></div></section>`,
}).replace('<meta name="robots" content="noindex,nofollow">\n', '').replace('<title>', '<meta name="robots" content="noindex">\n<title>'));

const indexables = PAGES.map(([ch]) => ch);
fs.writeFileSync(path.join(ICI, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexables.map((ch) => `  <url><loc>${abs(ch)}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(ICI, 'robots.txt'), PROD
  ? `User-agent: *\nAllow: /\n\nSitemap: ${E.url}sitemap.xml\n`
  : `# Apercu : le site actuel est toujours en ligne, celui-ci ne doit pas\n# etre indexe pour ne pas lui faire concurrence.\nUser-agent: *\nDisallow: /\n`);

console.log(`${PAGES.length} pages, ${REDIRECTIONS.length} redirections — ${PROD ? 'PRODUCTION' : 'apercu (noindex)'}`);
