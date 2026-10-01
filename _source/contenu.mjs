// ===================================================================
//  Occitan Rénov — le contenu du site.
//
//  Tout ce qui est affirme ici vient de l'artisan (ancien site,
//  echanges) : depuis 2016, base a Nimes, tout le Gard, assurance
//  decennale, devis gratuit envoye si possible dans la journee,
//  intervention rapide en cas de fuite, revetement anti-chaleur Cool
//  Roof, produits Sika. Aucun chiffre ni aucun avis n'est invente : la
//  note Google et les avis s'affichent seulement une fois renseignes
//  dans AVIS (voir plus bas).
// ===================================================================

export const ENTREPRISE = {
  nom: 'Occitan Rénov',
  slogan: 'Votre toit, notre expertise',
  metier: 'Couvreur à Nîmes',
  tel: '07 49 87 98 91',
  telLien: '+33749879891',
  email: 'occita.renov@gmail.com',
  ville: 'Nîmes',
  departement: 'Gard',
  codePostal: '30000',
  depuis: 2016,
  url: 'https://occitanrenov.fr/',
  fiche: 'https://share.google/BhaSAd9d8Zfchy8ep',
  facebook: 'https://www.facebook.com/profile.php?id=100064052772438',
  instagram: 'https://www.instagram.com/occitan_renov/',
  // Pas d'horaires d'ouverture inventes : seul le 7 j/7 pour les urgences
  // vient de l'artisan. A completer s'il donne ses horaires.
  urgences: 'Urgences fuite 7 j/7',
};

/* Les avis Google. Vides tant que l'artisan ne les a pas confirmes :
   le site affiche alors un renvoi vers sa fiche, jamais des avis
   inventes. Pour les afficher, remplir NOTE, NOMBRE et LISTE avec les
   avis reels, mot pour mot. */
export const AVIS = {
  note: null,       // ex. 4.9
  nombre: null,     // ex. 47
  liste: [],        // [{ nom, date, texte }]
};

export const ZONE = [
  'Nîmes', 'Marguerittes', 'Caveirac', 'Milhaud', 'Bouillargues', 'Rodilhan',
  'Manduel', 'Redessan', 'Garons', 'Saint-Gilles', 'Bernis', 'Uchaud',
  'Vergèze', 'Vauvert', 'Langlade', 'Clarensac', 'Saint-Côme-et-Maruéjols',
  'Calvisson', 'Sommières', 'Poulx', 'Cabrières', 'Saint-Chaptes', 'Uzès',
  'Remoulins', 'Beaucaire', 'Bellegarde',
];

/* ------------------------------------------------------------------
   Les six prestations. Les adresses (/produit/...) sont celles de
   l'ancien site, gardees a l'identique : ce sont elles que Google
   connait deja. Ne jamais les renommer.
   ------------------------------------------------------------------ */
export const SERVICES = [
  {
    slug: 'etancheite-et-reparation-de-fuite',
    nom: 'Réparation de fuite & étanchéité',
    court: 'Réparation de fuite',
    carte: 'Recherche et réparation de fuites, tuiles cassées, faîtage, rives et toits-terrasses.',
    titre: 'Réparation de fuite de toiture à Nîmes — Étanchéité',
    description: 'Fuite de toiture à Nîmes ou dans le Gard ? Nous localisons l’infiltration, remplaçons les tuiles, refaisons faîtage et rives. Devis gratuit.',
    h1: 'Réparation de fuite de toiture et étanchéité à Nîmes',
    chapo: 'Une tache au plafond, une auréole qui grandit après chaque orage : une fuite ne se répare pas toute seule. Nous trouvons d’où vient l’eau, nous réparons à la source et nous refaisons l’étanchéité pour que le problème ne revienne pas.',
    photo: 'remplacement-tuiles-couvreur-gard',
    galerie: ['faitage-avant-apres-2', 'faitage-reparation-mortier', 'rives-toiture-avant-apres', 'etancheite-toit-terrasse'],
    sections: [
      { h: 'Les signes qui doivent vous alerter', p: ['Une fuite de toiture se voit rarement sur le toit lui-même. Elle se voit dedans, souvent loin de l’endroit où l’eau entre : l’eau suit les liteaux, la charpente ou l’isolant avant de goutter.'],
        li: ['Des taches brunes ou des auréoles au plafond, surtout après une pluie', 'Une odeur d’humidité dans les combles, un isolant mouillé ou tassé', 'Des tuiles glissées, fendues ou manquantes, visibles depuis la rue', 'Un faîtage dont le mortier s’effrite ou dont des tuiles bougent', 'Des coulures sur la façade sous le bas de pente', 'Un toit-terrasse avec des flaques qui ne sèchent pas'] },
      { h: 'À Nîmes, les toitures sont mises à rude épreuve', p: ['Le climat nîmois est dur pour une couverture. Les épisodes cévenols de l’automne déversent en quelques heures ce qui tombe ailleurs en un mois : la moindre tuile déplacée laisse passer des litres d’eau. Le mistral soulève les tuiles mal tenues et fait travailler les faîtages. Et les étés brûlants dessèchent les mortiers, qui se fissurent puis se détachent.', 'C’est pour cela qu’une réparation sérieuse ne se limite jamais à « remettre une tuile » : on cherche pourquoi elle est partie.'] },
      { h: 'Notre méthode, étape par étape', li: ['Diagnostic sur place : inspection de la couverture, des faîtages, des rives, des solins et des points singuliers (cheminée, fenêtre de toit, raccords). Le diagnostic est gratuit.', 'Localisation de l’infiltration, depuis le toit et depuis les combles quand c’est possible.', 'Réparation à la source : remplacement des tuiles cassées, reprise du faîtage et des rives au mortier ou avec closoir ventilé, reprise des solins.', 'Traitement d’étanchéité adapté au support : membrane, résine ou joint, avec des produits professionnels (gamme Sika notamment).', 'Contrôle final et photos avant / après, pour que vous voyiez ce qui a été fait là où vous ne montez pas.'] },
      { h: 'Faîtage, rives et toits-terrasses', p: ['Une grande partie des fuites que nous traitons dans le Gard viennent du faîtage, la ligne de tuiles qui coiffe le sommet du toit. Le mortier vieillit, se fend, et l’eau s’infiltre au point le plus exposé de la maison. Nous refaisons le faîtage à neuf, au mortier traditionnel ou avec un closoir ventilé qui laisse respirer la toiture.', 'Les rives, en bordure de toit, posent le même problème. Et sur les toits-terrasses, fréquents dans la région, nous refaisons l’étanchéité par résine ou membrane, avec un relevé soigné sur les acrotères, là où l’eau finit toujours par passer.'] },
      { h: 'En cas d’urgence', p: ['Si l’eau entre chez vous, appelez-nous directement au 07 49 87 98 91. En cas de fuite, nous intervenons au plus vite pour mettre la toiture hors d’eau, puis nous revenons pour la réparation définitive.'] },
    ],
    faq: [
      { q: 'Combien de temps faut-il pour réparer une fuite de toiture ?', a: 'Une réparation localisée (quelques tuiles, un solin) se fait généralement en une demi-journée à une journée. Une reprise complète de faîtage ou une étanchéité de toit-terrasse demande plus de temps : nous vous donnons la durée exacte avec le devis.' },
      { q: 'Le diagnostic est-il payant ?', a: 'Non. Nous nous déplaçons gratuitement pour voir la toiture et vous remettre un devis, que nous essayons d’envoyer dans la journée.' },
      { q: 'Les travaux sont-ils couverts par l’assurance décennale ?', a: 'Oui. Nos travaux de couverture sont couverts par notre assurance décennale, et nous vous fournissons l’attestation avant le début du chantier.' },
    ],
  },
  {
    slug: 'pose-et-entretien-de-gouttiere',
    nom: 'Gouttières aluminium',
    court: 'Gouttières aluminium',
    carte: 'Pose et remplacement de gouttières aluminium sur mesure, nettoyage et réparation.',
    titre: 'Gouttières aluminium à Nîmes — Pose, remplacement, entretien',
    description: 'Pose de gouttières aluminium sur mesure à Nîmes et dans le Gard : sans soudure, choix des couleurs, descentes et entretien. Devis gratuit par Occitan Rénov.',
    h1: 'Pose et entretien de gouttières aluminium à Nîmes',
    chapo: 'Une gouttière qui déborde, c’est de l’eau qui coule le long de votre façade et s’accumule au pied des murs. Nous posons des gouttières aluminium sur mesure, et nous entretenons celles qui existent.',
    photo: 'gouttiere-aluminium-noire',
    galerie: ['bandeau-gouttiere-aluminium', 'gouttiere-aluminium-cuivre', 'gouttiere-aluminium-noire'],
    sections: [
      { h: 'Pourquoi les gouttières comptent autant', p: ['Les gouttières évacuent l’eau du toit loin de la maison. Quand elles sont bouchées, percées ou mal inclinées, l’eau déborde : elle tache et abîme l’enduit de la façade, détrempe le pied des murs, fragilise les fondations et finit parfois par entrer dans le bas de la toiture. Dans le Gard, où un seul orage peut déverser des dizaines de litres par mètre carré, une gouttière sous-dimensionnée ne suit tout simplement pas.'] },
      { h: 'Gouttières aluminium sur mesure', p: ['Nous posons principalement des gouttières en aluminium, façonnées sur place à la longueur exacte de votre façade. Elles sont sans soudure sur toute la longueur : moins de raccords, donc moins de points de fuite.'],
        li: ['Durables : l’aluminium ne rouille pas et supporte très bien les écarts de température du Sud', 'Légères : elles ne chargent pas la bordure du toit', 'Esthétiques : plusieurs couleurs pour s’accorder à vos menuiseries ou à votre façade', 'Complètes : descentes, coudes, crochets et habillage de bandeau (planche de rive) assortis'] },
      { h: 'Nettoyage et réparation', p: ['Feuilles, aiguilles de pin, mousses et débris s’accumulent dans les gouttières, surtout à l’automne. Nous les nettoyons, vérifions l’écoulement des descentes, reprenons les pentes et remplaçons les sections percées ou affaissées. Un entretien par an, idéalement avant la saison des pluies, évite la plupart des dégâts.'] },
      { h: 'Comment se passe un chantier', li: ['Visite et mesures sur place, choix du profil et de la couleur', 'Devis détaillé et gratuit', 'Dépose des anciennes gouttières si besoin', 'Façonnage et pose des gouttières aluminium sur mesure, raccordement des descentes', 'Contrôle de l’écoulement et nettoyage du chantier'] },
    ],
    faq: [
      { q: 'Quelle différence entre aluminium, zinc et PVC ?', a: 'Le PVC est le moins cher mais il se déforme et se fragilise au soleil. Le zinc est très durable mais plus coûteux. L’aluminium offre le meilleur compromis dans notre région : il ne rouille pas, reste léger, se pose sans soudure et existe en plusieurs couleurs.' },
      { q: 'À quelle fréquence faut-il nettoyer ses gouttières ?', a: 'Au moins une fois par an, idéalement à l’automne. Si votre maison est entourée d’arbres, deux fois par an est plus prudent.' },
      { q: 'Posez-vous aussi les descentes et l’habillage de bandeau ?', a: 'Oui : descentes, coudes, crochets et habillage aluminium des planches de rive, assortis à la gouttière.' },
    ],
  },
  {
    slug: 'nettoyage-et-traitement-hydrofuge',
    nom: 'Nettoyage & hydrofuge',
    court: 'Nettoyage & hydrofuge',
    carte: 'Démoussage, nettoyage haute pression et traitement hydrofuge des tuiles et façades.',
    titre: 'Démoussage et traitement hydrofuge de toiture à Nîmes',
    description: 'Démoussage, nettoyage et traitement hydrofuge de toiture et de façade à Nîmes et dans le Gard. Tuiles protégées, toiture qui dure plus longtemps. Devis gratuit.',
    h1: 'Nettoyage de toiture et traitement hydrofuge à Nîmes',
    chapo: 'Mousses, lichens et salissures ne sont pas qu’une question d’aspect : ils retiennent l’humidité et abîment les tuiles. Nous nettoyons votre toiture en profondeur, puis nous la protégeons avec un traitement hydrofuge.',
    photo: 'nettoyage-toiture-haute-pression',
    galerie: ['nettoyage-tuiles-avant-apres', 'demoussage-tuiles-avant-apres', 'reparation-tuiles-toiture-nimes'],
    sections: [
      { h: 'Pourquoi démousser sa toiture', p: ['La mousse agit comme une éponge. Elle garde l’eau contre la tuile, qui finit par devenir poreuse, se fendre et casser. Les racines des lichens s’accrochent dans les joints et soulèvent les tuiles. Et les débris bouchent les gouttières. Un toit encrassé vieillit beaucoup plus vite qu’un toit entretenu.', 'À Nîmes, les versants exposés au nord et les toitures à l’ombre des arbres sont les plus touchés.'] },
      { h: 'Notre intervention', li: ['Inspection préalable : nous vérifions l’état des tuiles avant de nettoyer, et nous vous signalons celles à remplacer', 'Démoussage et nettoyage à la pression adaptée au support, pour ne pas abîmer les tuiles', 'Application d’un traitement anti-mousse pour freiner la repousse', 'Traitement hydrofuge : une barrière invisible qui empêche l’eau de pénétrer la tuile, tout en la laissant respirer', 'Nettoyage des gouttières et du chantier'] },
      { h: 'Ce que change le traitement hydrofuge', p: ['Une tuile traitée ne boit plus l’eau. Elle reste plus propre, plus longtemps, les mousses ont plus de mal à s’installer, et le risque de fissure par infiltration ou par gel diminue. C’est un entretien qui prolonge nettement la durée de vie d’une couverture, pour une fraction du prix d’une rénovation.'] },
      { h: 'Aussi pour vos façades et dallages', p: ['Le même traitement s’applique aux façades, murets, terrasses et dallages : nettoyage en profondeur, puis protection hydrofuge pour garder l’éclat retrouvé et limiter les traces d’humidité.'] },
    ],
    faq: [
      { q: 'Le nettoyage haute pression abîme-t-il les tuiles ?', a: 'Pas s’il est bien fait. Nous adaptons la pression et la buse au type et à l’état des tuiles, et nous vérifions la couverture avant d’intervenir.' },
      { q: 'Combien de temps dure un traitement hydrofuge ?', a: 'Plusieurs années, selon l’exposition de la toiture et le produit employé. Nous vous indiquons la durée attendue avec le devis.' },
      { q: 'À quel moment de l’année faut-il le faire ?', a: 'Au printemps ou au début de l’automne, par temps sec : le traitement doit être appliqué sur un support propre et sec.' },
    ],
  },
  {
    slug: 'revetement-reflechissant-anti-chaleur',
    nom: 'Revêtement anti-chaleur Cool Roof',
    court: 'Cool Roof anti-chaleur',
    carte: 'Revêtement blanc réfléchissant qui limite la chaleur sous toiture en été.',
    titre: 'Cool Roof à Nîmes — Revêtement réfléchissant anti-chaleur',
    description: 'Revêtement anti-chaleur Cool Roof à Nîmes et dans le Gard : une peinture réfléchissante qui limite la chaleur sous toiture et la climatisation. Devis gratuit.',
    h1: 'Revêtement anti-chaleur Cool Roof à Nîmes',
    chapo: 'À Nîmes, l’été, un toit sombre dépasse facilement 60 °C en surface. Le Cool Roof est un revêtement blanc qui renvoie une grande partie du rayonnement solaire : moins de chaleur sous le toit, moins besoin de climatiser.',
    photo: 'revetement-anti-chaleur-cool-roof',
    galerie: ['etancheite-toit-terrasse', 'revetement-anti-chaleur-cool-roof', 'artisan-etancheite-toiture'],
    sections: [
      { h: 'Qu’est-ce que le Cool Roof ?', p: ['C’est un revêtement à haute réflexion solaire, appliqué comme une peinture sur la toiture. Au lieu d’absorber la chaleur du soleil, la surface claire la renvoie. La toiture chauffe beaucoup moins, et la chaleur transmise à l’intérieur du bâtiment diminue d’autant.'] },
      { h: 'Pour qui ?', li: ['Les toits-terrasses et toitures en bac acier ou fibrociment, qui accumulent énormément de chaleur', 'Les maisons et appartements sous toiture qui deviennent des fours en été', 'Les locaux professionnels, entrepôts et ateliers où la climatisation coûte cher', 'Les bâtiments agricoles et garages'] },
      { h: 'Les bénéfices', li: ['Une température intérieure plus supportable pendant les canicules', 'Une climatisation moins sollicitée, donc une facture d’électricité allégée', 'Une toiture protégée des UV et des écarts de température, qui vieillit moins vite', 'Selon le produit, une couche d’étanchéité supplémentaire'] },
      { h: 'Comment nous l’appliquons', li: ['Visite et vérification du support : un revêtement ne tient que sur une toiture saine', 'Nettoyage complet et réparation des défauts éventuels', 'Application d’un primaire d’accroche si le support l’exige', 'Application du revêtement réfléchissant en plusieurs couches', 'Contrôle de l’épaisseur et de l’uniformité'] },
    ],
    faq: [
      { q: 'Le Cool Roof s’applique-t-il sur des tuiles ?', a: 'Il est surtout pertinent sur les toits-terrasses, le bac acier et le fibrociment. Sur une toiture en tuiles, nous vous conseillons au cas par cas lors de la visite.' },
      { q: 'Le revêtement reste-t-il blanc ?', a: 'Il se patine avec le temps, comme toute surface extérieure. Un nettoyage périodique lui garde son pouvoir réfléchissant.' },
      { q: 'Combien de temps durent les travaux ?', a: 'Pour une maison, généralement de un à trois jours selon la surface, le nettoyage préalable et le temps de séchage entre les couches.' },
    ],
  },
  {
    slug: 'peinture-toiture-facade-murets',
    nom: 'Peinture toiture & façade',
    court: 'Peinture & façade',
    carte: 'Peinture de toiture, rénovation de façade, murets et portails, préparation comprise.',
    titre: 'Peinture de façade et de toiture à Nîmes — Rénovation',
    description: 'Peinture et rénovation de façade, toiture, murets et portails à Nîmes et dans le Gard. Préparation soignée, peintures résistantes au soleil. Devis gratuit.',
    h1: 'Peinture de toiture et rénovation de façade à Nîmes',
    chapo: 'Une façade fanée, farinée ou fissurée dévalorise toute la maison. Nous préparons le support comme il faut, puis nous appliquons des peintures faites pour tenir sous le soleil du Gard.',
    photo: 'artisan-peinture-facade',
    galerie: ['peinture-facade-avant-apres', 'renovation-facade-avant-apres', 'facade-maison-avant-apres', 'chantier-facade-echafaudage'],
    sections: [
      { h: 'La préparation fait tout', p: ['Une peinture qui cloque ou s’écaille au bout de deux ans, c’est presque toujours une préparation bâclée. Avant de peindre, nous nettoyons la façade en profondeur, traitons les fissures, rebouchons les éclats et appliquons un fixateur si l’enduit est poudreux. C’est la partie du travail qu’on ne voit pas, et celle qui fait durer le résultat.'] },
      { h: 'Ce que nous peignons', li: ['Façades enduites, crépis et murs de clôture', 'Toitures (bac acier, fibrociment) et éléments de couverture', 'Murets, portails, garde-corps et boiseries extérieures', 'Soubassements et bandeaux'] },
      { h: 'Des peintures faites pour le Sud', p: ['Nous utilisons des peintures professionnelles résistantes aux UV, aux moisissures et aux variations de température. Les teintes restent stables plus longtemps, et la façade est protégée des infiltrations. Nous vous aidons à choisir une couleur qui s’accorde à votre quartier et aux règles d’urbanisme de votre commune.'] },
      { h: 'Le déroulé d’un chantier', li: ['Visite, conseil sur les teintes et devis gratuit', 'Protection des abords, menuiseries et végétation', 'Nettoyage, traitement des fissures et préparation du support', 'Application de la peinture en deux couches minimum', 'Repli et nettoyage du chantier'] },
    ],
    faq: [
      { q: 'Faut-il une autorisation pour repeindre sa façade ?', a: 'Un changement de couleur nécessite souvent une déclaration préalable en mairie, surtout en secteur protégé. Nous vous indiquons la démarche selon votre commune.' },
      { q: 'Combien de temps tient une peinture de façade ?', a: 'Avec une bonne préparation et une peinture adaptée, une façade reste belle de longues années. L’exposition plein sud et la proximité de la route jouent sur la durée.' },
      { q: 'Peignez-vous aussi les portails et ferronneries ?', a: 'Oui, murets, portails, garde-corps et boiseries extérieures font partie de nos prestations.' },
    ],
  },
  {
    slug: 'etancheite-des-panneaux-solaires',
    nom: 'Étanchéité des panneaux solaires',
    court: 'Panneaux solaires',
    carte: 'Reprise de l’étanchéité autour des panneaux et des fixations, recherche de fuite.',
    titre: 'Étanchéité des panneaux solaires à Nîmes — Fuite sous panneaux',
    description: 'Fuite sous vos panneaux solaires à Nîmes ou dans le Gard ? Occitan Rénov reprend l’étanchéité des fixations, joints et abergements. Devis gratuit.',
    h1: 'Étanchéité des panneaux solaires à Nîmes',
    chapo: 'Les panneaux solaires percent la couverture à chaque fixation. Si la pose a été faite trop vite, l’eau finit par entrer. Nous recherchons la fuite et nous refaisons l’étanchéité autour des panneaux.',
    photo: 'panneaux-solaires-toiture',
    galerie: ['reparation-tuiles-toiture-nimes', 'artisan-etancheite-toiture'],
    sections: [
      { h: 'Pourquoi des fuites apparaissent', p: ['Une installation solaire, c’est des dizaines de points de fixation à travers la toiture, des tuiles découpées ou déplacées, et des abergements autour du champ de panneaux. Un joint qui vieillit, une tuile mal recalée ou un abergement mal posé suffisent pour qu’une fuite apparaisse, parfois des années après la pose.'] },
      { h: 'Intégré ou en surimposition', p: ['Sur une installation intégrée au bâti, ce sont les panneaux et leurs abergements qui assurent l’étanchéité : c’est là que nous intervenons. En surimposition, les panneaux sont posés au-dessus de la couverture existante, qui doit rester parfaitement étanche autour de chaque crochet.'] },
      { h: 'Notre intervention', li: ['Recherche de l’origine de l’infiltration autour du champ de panneaux', 'Contrôle des crochets et fixations, des tuiles autour et sous les rails', 'Reprise des joints, des membranes et des abergements', 'Recalage ou remplacement des tuiles abîmées pendant la pose', 'Vérification finale de l’écoulement de l’eau'] },
    ],
    faq: [
      { q: 'Intervenez-vous sur des panneaux posés par une autre entreprise ?', a: 'Oui. Nous intervenons sur l’étanchéité de la toiture autour des panneaux, quelle que soit l’entreprise qui les a installés. Nous ne touchons pas à la partie électrique.' },
      { q: 'Faut-il démonter les panneaux ?', a: 'Pas toujours. Selon l’origine de la fuite, nous pouvons intervenir autour du champ de panneaux sans dépose. Si un démontage est nécessaire, nous vous le disons dans le devis.' },
    ],
  },
];

/* Les realisations : photos avant / apres de ses chantiers. Les titres
   decrivent le travail, sans nom de commune : on n'en invente pas. */
export const REALISATIONS = [
  { photo: 'faitage-avant-apres', titre: 'Faîtage refait à neuf', type: 'Réparation de toiture' },
  { photo: 'nettoyage-tuiles-avant-apres', titre: 'Tuiles démoussées et traitées', type: 'Nettoyage & hydrofuge' },
  { photo: 'peinture-facade-avant-apres', titre: 'Façade rénovée et repeinte', type: 'Peinture & façade' },
  { photo: 'rives-toiture-avant-apres', titre: 'Rives reprises au mortier', type: 'Réparation de toiture' },
  { photo: 'renovation-facade-avant-apres', titre: 'Rénovation complète de façade', type: 'Peinture & façade' },
  { photo: 'demoussage-tuiles-avant-apres', titre: 'Démoussage de toiture', type: 'Nettoyage & hydrofuge' },
  { photo: 'faitage-avant-apres-2', titre: 'Reprise de faîtage et closoir', type: 'Réparation de toiture' },
  { photo: 'facade-maison-avant-apres', titre: 'Façade de maison remise à neuf', type: 'Peinture & façade' },
  { photo: 'revetement-anti-chaleur-cool-roof', titre: 'Toit-terrasse en revêtement anti-chaleur', type: 'Cool Roof' },
  { photo: 'gouttiere-aluminium-noire', titre: 'Gouttières aluminium noires', type: 'Gouttières' },
];

export const FAQ = [
  { q: 'Intervenez-vous en urgence pour une fuite ?', a: 'Oui. En cas de fuite importante, appelez-nous directement au 07 49 87 98 91 : nous intervenons au plus vite pour mettre la toiture hors d’eau, puis nous revenons pour la réparation définitive.' },
  { q: 'Le devis est-il gratuit ?', a: 'Oui, le déplacement et le devis sont gratuits et sans engagement. Nous faisons notre maximum pour vous envoyer le devis dans la journée qui suit la visite.' },
  { q: 'Quels sont vos délais d’intervention ?', a: 'Pour une urgence, nous intervenons au plus vite. Pour les autres travaux, le délai dépend de la saison et de l’ampleur du chantier : nous vous donnons une date précise avec le devis.' },
  { q: 'Êtes-vous assurés ?', a: 'Oui. Occitan Rénov est une entreprise déclarée, assurée en responsabilité civile professionnelle et en garantie décennale. L’attestation vous est remise avant le début des travaux.' },
  { q: 'À quelle fréquence faut-il faire entretenir sa toiture ?', a: 'Au moins une fois par an, idéalement au printemps ou à l’automne : retrait des mousses et débris, contrôle des tuiles, du faîtage et des gouttières. C’est le meilleur moyen d’éviter une grosse réparation.' },
  { q: 'Quels signes doivent faire penser à un problème de toiture ?', a: 'Des tuiles déplacées, fendues ou manquantes, des traces d’humidité au plafond ou sur les murs, des gouttières qui débordent, ou une forte présence de mousses et lichens. Dans tous ces cas, mieux vaut faire vérifier rapidement.' },
  { q: 'Vos matériaux sont-ils normés ?', a: 'Oui, nous utilisons des matériaux et des produits professionnels conformes aux normes en vigueur, notamment des produits d’étanchéité de la gamme Sika.' },
  { q: 'Dans quelles communes intervenez-vous ?', a: 'Nous sommes basés à Nîmes et intervenons dans tout le Gard : Marguerittes, Caveirac, Milhaud, Bouillargues, Saint-Gilles, Vauvert, Sommières, Uzès, Beaucaire et les communes voisines.' },
];
