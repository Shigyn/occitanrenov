# Occitan Rénov — refonte sans perdre le référencement

Couvreur à Nîmes (toiture, gouttières, façade). Site actuel : https://occitanrenov.fr
(WordPress 7.1.2 + WooCommerce 11.1.2 + Site Kit). Fiche Google active depuis ~2 ans,
120+ avis, 4,9/5. A déjà été dans le top 10 sur « couvreur Nîmes », puis a reculé.
Déçu par ses deux précédents prestataires. A envoyé une maquette de ce qu'il veut.

**Objectif : comprendre la baisse, arrêter l'hémorragie, puis refondre sans rien perdre.**

---

## 1. Diagnostic mesuré le 2026-10-01 (sur le site en ligne)

### Ce qui va bien — à ne surtout pas casser
- `www` → non-www en 301, `http` → `https` en 301. Pas de doublon d'adresse.
- `rel=canonical` correct sur l'accueil.
- `robots.txt` propre, avec le lien vers `wp-sitemap.xml`.
- Serveur rapide à répondre : ~0,8 s jusqu'au premier octet.
- Toutes les images portent un `alt` (21/21).
- Fiche Google forte : 120+ avis, 4,9/5. C'est son meilleur actif.

### Ce qui explique la baisse
1. **Le site ne dit jamais ce qu'il fait.** Le mot « couvreur » apparaît **0 fois**
   sur l'accueil. « Nîmes » 2 fois, « Gard » 1 fois. Google ne peut pas le classer
   sur un métier que la page ne nomme pas.
2. **Titre de l'accueil = « Occitan Rénov »**, rien d'autre. C'est le signal le plus
   fort de toute la page, et il ne contient ni le métier ni la ville.
3. **Aucune meta description**, ni sur l'accueil ni sur les pages service. Google
   fabrique le résumé lui-même, souvent mal, et le taux de clic s'effondre.
4. **Aucun balisage LocalBusiness / RoofingContractor** (0 JSON-LD). Rien ne relie
   formellement le site à la fiche Google, aux avis, à la zone d'intervention.
5. **Images énormes** : la photo du haut de page pèse **933 Ko** (PNG), une autre
   725 Ko, une troisième 373 Ko. Sur un téléphone en 4G, la page met plusieurs
   secondes à s'afficher. Google mesure ça et le prend en compte.
6. **Contenu mince** : 767 mots sur l'accueil, 688 sur une page service, dont une
   seule occurrence de « Nîmes ». Les concurrents qui passent devant ont des pages
   de 1 200 à 2 000 mots par prestation.
7. **Structure WooCommerce détournée** : les 6 services sont des « produits », avec
   `/boutique/`, `/panier/`, `/commander/`, `/mon-compte/` indexables alors qu'il ne
   vend rien en ligne. Google explore des pages vides au lieu des pages utiles.
8. **Aucune page par ville** alors que ses réalisations citent Marguerittes,
   Caveirac, Nîmes. C'est exactement ce qui fait gagner un artisan en local.

### Hypothèse sur « j'étais top 10, puis j'ai reculé »
Le site n'a jamais été optimisé pour « couvreur Nîmes » : il tenait grâce à la fiche
Google, aux avis et à l'ancienneté. Quand des concurrents ont publié de vraies pages
métier, ils sont passés devant — Google n'a pas « puni » le site, il a simplement
trouvé mieux ailleurs. Les images lourdes et les pages boutique inutiles ont aggravé
la pente.

**À confirmer avec ses accès Search Console** (voir étape 2) : la date exacte de la
baisse dira si elle coïncide avec une refonte, un changement d'URLs, ou une mise à
jour de Google.

---

## 2. Avant de toucher à quoi que ce soit

- [ ] **Accès Search Console** (lecteur suffit) → exporter 16 mois : requêtes, pages,
      positions. Repérer le mois exact du décrochage.
- [ ] **Accès Google Analytics** s'il en a un, pour les mêmes dates.
- [ ] **Accès à sa fiche Google** en gestionnaire.
- [ ] **Copie complète de l'existant** : liste des URLs, titres, H1, contenus, images.
      C'est le filet de sécurité : on doit pouvoir prouver ce qu'il y avait avant.
- [ ] **Relevé des positions actuelles** sur 15 requêtes cibles, avant/après.
- [ ] Lui demander **ce qui a changé** il y a 6-12 mois : nouveau prestataire,
      refonte, changement d'hébergeur ?

---

## 3. La règle qui protège son référencement

**On ne supprime jamais une adresse de page. On ne la change pas non plus.**

| Page actuelle | Devient |
|---|---|
| `/` | `/` — refondue, mêmes thèmes, plus riche |
| `/occitan-renov/` | page « L'entreprise », même adresse |
| `/contactez-nous/` | même adresse |
| `/foire-aux-questions-faq/` | même adresse + balisage FAQ |
| `/blog/` + les 4 articles | mêmes adresses, repris tels quels |
| `/assurance-decennale-.../` | même adresse |
| `/produit/<service>/` ×6 | **conservées**, transformées en vraies pages service |
| `/boutique/`, `/panier/`, `/commander/`, `/mon-compte/` | supprimées → **301 vers `/services/`** |
| `/category/non-classe/` | 301 vers `/blog/` |

Toute page retirée part en **redirection 301** vers la page la plus proche. Aucune
404. C'est ce qui fait qu'une refonte ne coûte rien en référencement — et c'est très
probablement ce que ses prestataires précédents n'ont pas fait.

---

## 4. Ce qu'on construit (maquette + SEO)

Le design suit sa maquette : bandeau couvreur sur les toits de Nîmes, bande de
réassurance (décennale, assurance, avis), 6 services en vignettes, réalisations
avant/après, avis clients, formulaire de devis. Moins de sections que le site
actuel, comme il le demande — mais **plus de pages**, ce qui n'est pas la même chose.

### Les nouveautés qui font remonter
1. **Titres et descriptions** sur chaque page, construits autour de
   « couvreur Nîmes », « réparation fuite toiture Nîmes », « gouttières Gard ».
2. **Balisage LocalBusiness / RoofingContractor** : nom, téléphone, zone
   d'intervention, horaires, note et nombre d'avis, lien vers la fiche Google.
3. **6 pages service** étoffées (1 200 mots minimum) : le problème, la méthode,
   les matériaux, les délais, le prix indicatif, les photos avant/après, la FAQ.
4. **Pages par ville** là où il travaille vraiment : Nîmes, Marguerittes, Caveirac,
   Saint-Gilles, Vauvert… Une page par ville où il a des chantiers à montrer, jamais
   de page vide créée pour faire du volume.
5. **Images en WebP**, 100 à 150 Ko au lieu de 900. Même qualité à l'œil.
6. **Maillage interne** : chaque service renvoie vers les villes, chaque ville vers
   les services, les articles de blog vers les services.
7. **Balisage FAQ** sur sa page questions, pour occuper plus de place dans Google.
8. **Mesure** : `mesure.js` + GA4, clics sur le téléphone comptés (c'est l'action qui
   compte chez un couvreur).

---

## 5. Mise en ligne et surveillance

1. Site complet préparé et validé par lui **avant** toute bascule.
2. Bascule DNS, puis dans l'heure : vérification des 301, du sitemap, du canonical.
3. Search Console : envoi du nouveau sitemap, inspection des 10 pages principales.
4. **Surveillance quotidienne pendant 2 semaines** : couverture, 404, positions.
5. Rapport à 30, 60 et 90 jours, chiffres avant/après à l'appui.

---

## 6. Ce qu'on lui dit, et quand

Ordre de présentation (ne pas inverser) :
1. **Le diagnostic chiffré** : « votre site ne contient pas le mot couvreur, votre
   titre ne dit pas votre métier, votre photo d'accueil pèse 933 Ko ». Des faits,
   vérifiables, pas des opinions.
2. **Ce qui va être protégé** : aucune adresse perdue, redirections pour tout ce qui
   bouge, ses 4 articles et sa page décennale conservés.
3. **Ce qui va être gagné** : pages métier, pages villes, balisage, vitesse.
4. **Le design** en dernier, parce que c'est la partie qu'il voit déjà.

Il a été déçu deux fois : ne rien promettre en positions ni en délais. Promettre la
méthode et la transparence, montrer les mesures avant/après.
