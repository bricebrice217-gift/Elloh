// Moteur Central IA de Génération de Sites Web & Applications — GBADIA UNIVERTY

export const THEME_PALETTES = [
  {
    id: 'cyber-cyan',
    name: 'Cyber Cyan & Cobalt',
    primary: '#06B6D4',
    secondary: '#2563EB',
    accent: '#38BDF8'
  },
  {
    id: 'royal-gold',
    name: 'Or Impérial & Onyx',
    primary: '#F59E0B',
    secondary: '#D97706',
    accent: '#FBBF24'
  },
  {
    id: 'emerald-pulse',
    name: 'Émeraude Néo-Tech',
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399'
  },
  {
    id: 'crimson-flame',
    name: 'Rouge Énergie & Corail',
    primary: '#EF4444',
    secondary: '#EA580C',
    accent: '#F97316'
  },
  {
    id: 'royal-sapphire',
    name: 'Bleu Saphir Pro',
    primary: '#2563EB',
    secondary: '#1D4ED8',
    accent: '#0EA5E9'
  },
  {
    id: 'sunset-amber',
    name: ' Cuivre & Ambre',
    primary: '#EA580C',
    secondary: '#B45309',
    accent: '#F59E0B'
  }
];

export const BLOCK_CATALOG = [
  {
    type: 'hero',
    label: 'Bannière Hero Principale',
    desc: 'Accroche forte, carte visuelle interactive et appels à l’action.',
    create: (brand = 'Mon Projet') => ({
      id: `blk-${Date.now()}-hero`,
      type: 'hero',
      enabled: true,
      badge: 'Disponible 24h/24 • Web & Mobile',
      title: `${brand} — Une expérience digitale rapide et moderne`,
      subtitle: 'Accédez à l’ensemble de nos services en ligne en quelques clics depuis votre téléphone ou votre ordinateur.',
      primaryCta: 'Commencer maintenant',
      secondaryCta: 'En savoir plus'
    })
  },
  {
    type: 'catalog',
    label: 'Boutique E-Commerce + Panier Actif',
    desc: 'Produits illustrés, filtres par catégorie, code promo et panier coulissant.',
    create: () => ({
      id: `blk-${Date.now()}-cat`,
      type: 'catalog',
      enabled: true,
      title: 'Catalogue & Commande Rapide',
      subtitle: 'Filtrez les articles et ajoutez-les au panier avec calcul instantané du total.',
      currency: 'FCFA',
      items: [
        { id: 'item-1', category: 'Populaire', title: 'Pack Édition Signature', price: 29000, desc: 'Qualité supérieure garantie, expédition express sous 24h.' },
        { id: 'item-2', category: 'Nouveau', title: 'Formule Pro Intégrale', price: 45000, desc: 'Équipement complet prêt à l’emploi avec assistance dédiée.' },
        { id: 'item-3', category: 'Populaire', title: 'Coffret Essentiel', price: 18500, desc: 'Idéal au quotidien avec garantie satisfait ou remboursé.' },
        { id: 'item-4', category: 'VIP', title: 'Édition Prestige Sur-Mesure', price: 68000, desc: 'Personnalisation complète et livraison prioritaire offerte.' }
      ]
    })
  },
  {
    type: 'dashboard_app',
    label: 'Module Application Métier / SaaS',
    desc: 'Indicateurs temps réel, recherche et ajout/suppression de données sauvegardées.',
    create: () => ({
      id: `blk-${Date.now()}-dash`,
      type: 'dashboard_app',
      enabled: true,
      title: 'Tableau de Gestion en Temps Réel',
      subtitle: 'Ajoutez de nouvelles entrées, filtrez et pilotez votre activité directement.',
      recordLabel: 'Opération',
      items: [
        { ref: 'OP-901', client: 'Client Entreprise Alpha', amount: '450 000 FCFA', status: 'Payé' },
        { ref: 'OP-902', client: 'Boutique Riviera Sud', amount: '215 000 FCFA', status: 'En attente' },
        { ref: 'OP-903', client: 'Groupe Atlantique Express', amount: '890 000 FCFA', status: 'Payé' }
      ]
    })
  },
  {
    type: 'community_feed',
    label: 'Fil Social / Espace Communauté Live',
    desc: 'Publication de messages en direct, compteur de mentions J’aime et fil d’actualité.',
    create: (brand = 'Communauté') => ({
      id: `blk-${Date.now()}-feed`,
      type: 'community_feed',
      enabled: true,
      title: `Fil d’Actualité & Communauté ${brand}`,
      subtitle: 'Publiez une annonce en direct et interagissez avec les membres.',
      items: [
        { author: 'Équipe Officielle', role: 'Admin', time: 'Il y a 10 min', content: `Bienvenue sur l’espace officiel ${brand} ! Partagez vos avis et suivez nos nouveautés en direct.`, likes: 24 },
        { author: 'Marc K.', role: 'Membre vérifié', time: 'Il y a 1 h', content: 'Interface super fluide sur mobile, bravo à toute l’équipe pour la rapidité du service !', likes: 15 }
      ]
    })
  },
  {
    type: 'booking',
    label: 'Réservation & Prise de Rendez-vous',
    desc: 'Choix de prestation, calendrier, créneau horaire et ticket de confirmation.',
    create: () => ({
      id: `blk-${Date.now()}-book`,
      type: 'booking',
      enabled: true,
      title: 'Réserver un Créneau en Ligne',
      subtitle: 'Sélectionnez le service, la date et l’heure souhaités : confirmation immédiate.',
      services: ['Prestation Standard Express', 'Formule Complète Prioritaire', 'Accompagnement VIP Personnalisé']
    })
  },
  {
    type: 'features',
    label: 'Grille de Services & Points Forts',
    desc: 'Présentation claire de vos services phares et avantages concurrentiels.',
    create: () => ({
      id: `blk-${Date.now()}-feat`,
      type: 'features',
      enabled: true,
      title: 'Nos Services & Engagements',
      subtitle: 'Tout est pensé pour vous offrir rapidité, fiabilité et simplicité.',
      items: [
        { tag: 'Rapidité', title: 'Exécution instantanée', desc: 'Prise en charge immédiate de votre demande sans file d’attente.' },
        { tag: 'Sécurité', title: 'Fiabilité 100% vérifiée', desc: 'Protection complète de vos opérations et suivi transparent.' },
        { tag: 'Support 24/7', title: 'Assistance dédiée réactive', desc: 'Une équipe joignable par téléphone, WhatsApp et e-mail.' }
      ]
    })
  },
  {
    type: 'stats',
    label: 'Compteurs de Chiffres Clés',
    desc: '4 indicateurs d’impact visuels à fort taux de confiance.',
    create: () => ({
      id: `blk-${Date.now()}-stats`,
      type: 'stats',
      enabled: true,
      title: 'Chiffres Clés & Performances',
      items: [
        { value: '5 200+', label: 'Utilisateurs actifs' },
        { value: '99,2%', label: 'Satisfaction client' },
        { value: '< 5 min', label: 'Prise en charge' },
        { value: '24h/7j', label: 'Service continu' }
      ]
    })
  },
  {
    type: 'pricing',
    label: 'Plans & Abonnements (Mensuel / Annuel)',
    desc: 'Comparatif de 3 offres avec remise annuelle interactive de -20%.',
    create: () => ({
      id: `blk-${Date.now()}-price`,
      type: 'pricing',
      enabled: true,
      title: 'Nos Formules & Tarifs Transparents',
      subtitle: 'Choisissez le pack adapté à vos besoins, sans frais cachés.',
      currency: 'FCFA/mois',
      items: [
        { title: 'Essentiel', price: 10000, featured: false, desc: 'Pour démarrer simplement.', perks: ['Accès standard complet', 'Support client réactif', 'Application mobile incluse'] },
        { title: 'Pro Populaire', price: 25000, featured: true, desc: 'Le meilleur rapport performance/prix.', perks: ['Fonctionnalités illimitées', 'Support prioritaire WhatsApp', 'Statistiques avancées', ' Zéro commission'] },
        { title: 'Entreprise VIP', price: 60000, featured: false, desc: 'Sur mesure multi-utilisateurs.', perks: ['Comptes équipe illimités', 'Gestionnaire dédié', 'Garantie SLA 99,9%'] }
      ]
    })
  },
  {
    type: 'faq',
    label: 'Questions Fréquentes (Accordéon)',
    desc: 'Réponses dépliables aux questions les plus posées.',
    create: () => ({
      id: `blk-${Date.now()}-faq`,
      type: 'faq',
      enabled: true,
      title: 'Questions Fréquentes',
      items: [
        { q: 'Comment commander ou réserver en ligne ?', a: 'Sélectionnez directement votre offre sur cette page et validez : vous recevez votre confirmation instantanément.' },
        { q: 'Quels moyens de paiement sont acceptés ?', a: 'Orange Money, Wave, MTN MoMo, Moov Money, cartes Visa/Mastercard ainsi que le paiement à la livraison.' },
        { q: 'Puis-je installer cette application sur mon téléphone ?', a: 'Oui ! Ouvrez le menu de votre navigateur mobile puis appuyez sur « Installer l’application » ou « Sur l’écran d’accueil ».' }
      ]
    })
  },
  {
    type: 'contact',
    label: 'Formulaire de Contact & Coordonnées',
    desc: 'Formulaire interactif avec confirmation + adresse, téléphone et e-mail.',
    create: (brand = 'Contact') => ({
      id: `blk-${Date.now()}-contact`,
      type: 'contact',
      enabled: true,
      title: `Contacter ${brand}`,
      subtitle: 'Envoyez-nous un message direct : notre équipe vous répond rapidement.',
      address: 'Abidjan, Côte d’Ivoire',
      phone: '+225 07 00 00 00 00',
      email: `contact@${brand.toLowerCase().replace(/[^a-z0-9]/g, '') || 'app'}.com`
    })
  }
];

// Modèles de démonstration variés dans la Galerie GBADIA UNIVERTY
export const GALLERY_PRESETS = [
  {
    id: 'preset-food-pwa',
    title: 'Burger & Grill Express — App Mobile Livraison',
    typeLabel: 'Application Mobile PWA',
    targetPlatform: 'mobile',
    prompt: 'Application mobile sombre de livraison rapide de burgers et grillades appelée Braise Express avec panier et suivi',
    accent: '#EF4444'
  },
  {
    id: 'preset-shop-luxe',
    title: 'ChronoLuxe — Boutique Montres & Tech',
    typeLabel: 'Site E-Commerce',
    targetPlatform: 'ecommerce',
    prompt: 'Boutique e-commerce haut de gamme de montres connectées et accessoires tech appelée ChronoLuxe avec panier et code promo',
    accent: '#F59E0B'
  },
  {
    id: 'preset-auto-rent',
    title: 'AutoDrive VIP — Location & Vente Auto',
    typeLabel: 'Web & Réservation',
    targetPlatform: 'web',
    prompt: 'Plateforme moderne de location et vente de voitures SUV et berlines appelée AutoDrive VIP à Abidjan avec réservation en ligne',
    accent: '#06B6D4'
  },
  {
    id: 'preset-saas-fin',
    title: 'NovaGest Pro — Logiciel SaaS Facturation & Stock',
    typeLabel: 'Application Web SaaS',
    targetPlatform: 'saas',
    prompt: 'Application web SaaS de gestion commerciale, caisse et facturation appelée NovaGest Pro avec tableau de bord temps réel',
    accent: '#10B981'
  },
  {
    id: 'preset-social-app',
    title: 'VibeConnect — Application Réseau Social & Musique',
    typeLabel: 'Application Mobile Sociale',
    targetPlatform: 'mobile',
    prompt: 'Application mobile sociale et communautaire appelée VibeConnect avec fil d’actualité interactif et publications live',
    accent: '#3B82F6'
  },
  {
    id: 'preset-clinic',
    title: 'MédiCare 24 — Clinique & Téléconsultation',
    typeLabel: 'Portail Santé',
    targetPlatform: 'web',
    prompt: 'Site et application médicale pour la clinique MédiCare 24 avec spécialités et prise de rendez-vous médecin en ligne',
    accent: '#0EA5E9'
  },
  {
    id: 'preset-immo',
    title: 'Immo Horizon — Villas & Résidences Meublées',
    typeLabel: 'Immobilier & Hôtellerie',
    targetPlatform: 'ecommerce',
    prompt: 'Plateforme immobilière de location de résidences meublées et vente de villas appelée Immo Horizon avec visite en ligne',
    accent: '#D97706'
  },
  {
    id: 'preset-fitness',
    title: ' TitanFit Club — Salle de Sport & Coaching App',
    typeLabel: 'App Fitness & Abonnements',
    targetPlatform: 'mobile',
    prompt: 'Application mobile de coaching sportif et salle de gym appelée TitanFit Club avec programmes, abonnements et réservation',
    accent: '#EA580C'
  }
];

function extractBrandName(prompt, defaultBrand) {
  if (!prompt) return defaultBrand;
  const quoted = prompt.match(/[«"“]([^»"”]{2,34})[»"”]/);
  if (quoted && quoted[1]) return quoted[1].trim();

  const named = prompt.match(/(?:appel[ée]e?|nomm[ée]e?|marque|enseigne|du nom de)\s+([A-ZÀ-Ÿ0-9][A-Za-zÀ-ÿ0-9'’& -]{1,28})/i);
  if (named && named[1]) {
    return named[1].trim().replace(/\s+(à|qui|avec|pour|dans|sur|en).*$/i, '').trim();
  }
  return defaultBrand;
}

function cleanTopicPhrase(prompt, fallback) {
  if (!prompt) return fallback;
  const c = prompt
    .replace(/^(cr[ée]e?r?|g[ée]n[ée]rer|fais|faire|construire|concevoir|je\s+veux|un|une|le|la)\s+/gi, '')
    .replace(/^(site\s+web|site\s+internet|site|application\s+mobile|application\s+web|application|app|boutique\s+en\s+ligne|boutique\s+e-?commerce|boutique|plateforme|portail|logiciel)\s*(sombre|moderne|complet|complète|pro)?\s*(de|d['’]|pour)?\s*/i, '')
    .replace(/\s+(?:appel[ée]e?|nomm[ée]e?)\s+[A-Za-zÀ-ÿ0-9'’&-]+(?:\s+(?!avec\b|à\b|pour\b|qui\b|et\b|en\b|dans\b)[A-Za-zÀ-ÿ0-9'’&-]+){0,2}/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!c || c.length < 4) return fallback;
  const s = c.charAt(0).toUpperCase() + c.slice(1);
  return s.length > 74 ? s.slice(0, 71).replace(/\s+\S*$/, '') : s;
}

function detectDomainPack(lower) {
  if (/(voiture|auto|véhicule|vehicule|suv|taxi|vtc|location.*auto|concession)/.test(lower)) {
    return {
      key: 'auto',
      defaultBrand: 'AutoDrive VIP',
      palette: THEME_PALETTES[0],
      badge: 'Flotte Vérifiée • Réservation Express 24h/7j',
      heroTitle: 'Louez ou achetez votre véhicule en toute confiance',
      itemsTitle: 'Véhicules Disponibles Immédiatement',
      items: [
        { id: 'au-1', category: 'SUV 4x4', title: 'SUV Exécutif Automatique Climatisé', price: 65000, desc: 'Assurance tous risques incluse, chauffeur en option, kilométrage souple.' },
        { id: 'au-2', category: 'Berlines', title: 'Berline Confort Business Class', price: 40000, desc: 'Idéale rendez-vous professionnels et transferts aéroport.' },
        { id: 'au-3', category: 'Citadines', title: 'Citadine Économique Récente', price: 25000, desc: 'Faible consommation, stationnement agile en centre-ville.' },
        { id: 'au-4', category: 'VIP Cortège', title: '4x4 Prestige Blindé / Cortège Mariage', price: 120000, desc: 'Chauffeur professionnel en costume et décoration sur demande.' }
      ],
      services: ['Location Courte Durée (Jour / Semaine)', 'Transfert Aéroport VIP 24h/24', 'Essai & Achat Véhicule Garanti']
    };
  }

  if (/(burger|pizza|restaurant|maquis|livraison|repas|plat|cuisine|pâtisserie|patisserie|boulangerie|café|grill)/.test(lower)) {
    return {
      key: 'food',
      defaultBrand: 'Braise & Saveurs',
      palette: THEME_PALETTES[3],
      badge: 'Cuisine Fraîche • Livraison Express 25 min',
      heroTitle: 'Vos plats préférés préparés minute et livrés tout chauds',
      itemsTitle: 'Menu & Spécialités du Jour',
      items: [
        { id: 'fd-1', category: 'Menus Signatures', title: 'Menu Double Burger Braise + Frites Maison', price: 6500, desc: 'Viande grillée sur flamme, cheddar fondant, sauce secrète et boisson fraîche.' },
        { id: 'fd-2', category: 'Grillades', title: 'Poisson Braisé Entier + Attiéké & Alloco', price: 8500, desc: 'Mariné aux épices naturelles, servi chaud avec sauces maison.' },
        { id: 'fd-3', category: 'Box Partage', title: 'Box Mix Grill Famille (4 personnes)', price: 22000, desc: 'Assortiment poulet braisé, brochettes, frites dorées et 4 boissons.' },
        { id: 'fd-4', category: 'Boissons & Desserts', title: 'Cocktail Fruits Pressés & Fondant Chocolat', price: 4000, desc: '100% naturel préparé à la commande.' }
      ],
      services: ['Livraison Express à Domicile / Bureau', 'Retrait Rapide Sans Attente', 'Réservation Table & Service Traiteur']
    };
  }

  if (/(réseau social|reseau social|communaut|chat|messagerie|musique|streaming|blog|forum|buzz)/.test(lower)) {
    return {
      key: 'social',
      defaultBrand: 'VibeConnect',
      palette: THEME_PALETTES[0],
      badge: 'Communauté En Direct • Web & Mobile PWA',
      heroTitle: 'Partagez, échangez et vibrez avec votre communauté en temps réel',
      itemsTitle: 'Tendances & Contenus Populaires',
      items: []
    };
  }

  if (/(saas|gestion|factur|stock|caisse|comptab|fintech|banque|tontine|crypto|logiciel|erp|crm|dashboard)/.test(lower)) {
    return {
      key: 'saas',
      defaultBrand: 'NovaGest Pro',
      palette: THEME_PALETTES[2],
      badge: 'Cloud Temps Réel • Multi-Appareils',
      heroTitle: 'Pilotez vos ventes, stocks et encaissements depuis un seul écran',
      itemsTitle: 'Opérations & Flux en Direct',
      items: []
    };
  }

  if (/(clinique|santé|sante|médecin|medecin|hôpital|hopital|pharmacie|dentaire|coiffure|beauté|beaute|salon|spa|barber)/.test(lower)) {
    const isBeauty = /(coiffure|beauté|beaute|salon|spa|barber)/.test(lower);
    return {
      key: 'booking',
      defaultBrand: isBeauty ? 'Éclat Royal Studio' : 'MédiCare Plus',
      palette: isBeauty ? THEME_PALETTES[1] : THEME_PALETTES[4],
      badge: 'Réservation En Ligne • Zéro File d’Attente',
      heroTitle: isBeauty
        ? 'Sublimez votre style avec nos experts beauté & bien-être'
        : 'Prenez rendez-vous avec un spécialiste en moins de 60 secondes',
      itemsTitle: isBeauty ? 'Carte des Soins & Forfaits' : 'Consultations & Bilans',
      items: isBeauty
        ? [
            { id: 'bt-1', category: 'Coiffure', title: 'Coupe Signature & Soin Kératine', price: 15000, desc: 'Diagnostic capillaire personnalisé et coiffage haute tenue.' },
            { id: 'bt-2', category: 'Bien-être', title: 'Rituel Spa Relaxant 60 min', price: 25000, desc: 'Massage aux huiles chaudes naturelles et soin visage éclat.' },
            { id: 'bt-3', category: 'VIP', title: 'Forfait Prestige Mariage / Événement', price: 55000, desc: 'Mise en beauté complète avec essai préalable inclus.' }
          ]
        : [
            { id: 'md-1', category: 'Consultations', title: 'Consultation Générale & Bilan Vitalité', price: 15000, desc: 'Prise en charge ponctuelle sur rendez-vous avec compte-rendu.' },
            { id: 'md-2', category: 'Spécialistes', title: 'Consultation Spécialisée & Imagerie', price: 25000, desc: 'Équipement de diagnostic numérique dernière génération.' },
            { id: 'md-3', category: ' Prévention', title: 'Check-up Santé Complet Express', price: 45000, desc: 'Analyses biologiques + avis médical en une demi-journée.' }
          ],
      services: isBeauty
        ? ['Rendez-vous Coiffure / Barber', 'Soin Visage & Spa Détente', 'Forfait VIP Domicile']
        : ['Consultation Médecine Générale', 'Rendez-vous Médecin Spécialiste', 'Analyses Laboratoire sans attente']
    };
  }

  if (/(immobilier|villa|appartement|hôtel|hotel|résidence|residence|meublé|terrain|btp|architect)/.test(lower)) {
    return {
      key: 'real_estate',
      defaultBrand: 'Immo Horizon',
      palette: THEME_PALETTES[1],
      badge: 'Biens Vérifiés • Visite & Réservation Directe',
      heroTitle: 'Trouvez la résidence, l’hôtel ou le bien immobilier idéal',
      itemsTitle: 'Sélection de Biens & Résidences',
      items: [
        { id: 're-1', category: 'Résidences Meublées', title: 'Suite Haut Standing Climatisée — Wi-Fi Fibre', price: 55000, desc: 'Tarif nuitée, sécurité 24h/24, groupe électrogène et parking privé.' },
        { id: 're-2', category: 'Appartements', title: 'Appartement Moderne 4 Pièces Vue Dégagée', price: 650000, desc: 'Location mensuelle, cuisine équipée et gardiennage permanent.' },
        { id: 're-3', category: 'Villas', title: 'Villa Duplex Contemporaine avec Piscine', price: 1450000, desc: 'Jardin arboré, 4 chambres autonomes, quartier résidentiel calme.' },
        { id: 're-4', category: 'Terrains', title: 'Terrain Viabilisé 500 m² avec ACD Vérifié', price: 18500000, desc: 'Accès bitumé immédiat, dossier notarié complet.' }
      ],
      services: ['Réservation Séjour / Résidence Meublée', 'Visite Guidée sur Place', 'Visite Vidéo Directe WhatsApp']
    };
  }

  if (/(sport|fitness|gym|musculation|coach|foot)/.test(lower)) {
    return {
      key: 'fitness',
      defaultBrand: 'TitanFit Club',
      palette: THEME_PALETTES[3],
      badge: 'Coaching Pro • Application & Salle Haute Performance',
      heroTitle: 'Transformez votre condition physique avec un suivi intelligent',
      itemsTitle: 'Programmes & Boutique Nutrition',
      items: [
        { id: 'ft-1', category: 'Programmes', title: 'Pass Mensuel Accès Illimité Machines & Cardio', price: 25000, desc: 'Accès 7j/7 de 06h à 22h + bilan corporel offert.' },
        { id: 'ft-2', category: 'Coaching', title: 'Suivi Coach Personnel 12 Séances', price: 60000, desc: 'Programme nutritionnel et séances individuelles sur mesure.' },
        { id: 'ft-3', category: 'Boutique', title: 'Pack Énergie & Hydratation Sport', price: 18000, desc: 'Shaker isotherme + électrolytes récupération.' }
      ],
      services: ['Séance d’Essai Découverte', 'Bilan Physique & Objectifs', 'Coaching Individuel Sur-Mesure']
    };
  }

  return {
    key: 'commerce_or_showcase',
    defaultBrand: 'Nova Projet',
    palette: THEME_PALETTES[0],
    badge: 'Plateforme Officielle • Web & Mobile',
    heroTitle: 'Une solution digitale performante pensée pour vos clients',
    itemsTitle: 'Nos Offres & Produits Phares',
    items: [
      { id: 'gn-1', category: 'Populaire', title: 'Offre Standard Clé en Main', price: 25000, desc: 'Service complet rapide avec garantie de satisfaction.' },
      { id: 'gn-2', category: 'Premium', title: 'Formule Avancée Haute Performance', price: 49000, desc: 'Accompagnement prioritaire et options étendues incluses.' },
      { id: 'gn-3', category: 'Sur-Mesure', title: 'Pack Entreprise Personnalisé', price: 95000, desc: 'Solution dédiée adaptée exactement à votre volume.' }
    ],
    services: ['Demande de Prestation Express', 'Rendez-vous Conseil Personnalisé', 'Devis Groupe / Entreprise']
  };
}

export function generateFromPrompt(promptText, options = {}) {
  const raw = String(promptText || '').trim();
  const lower = raw.toLowerCase();
  const pack = detectDomainPack(lower);

  const target = options.targetPlatform || (
    /(application mobile|app mobile|android|ios|pwa)/.test(lower) ? 'mobile'
      : /(saas|logiciel|tableau de bord|dashboard|gestion|factur)/.test(lower) ? 'saas'
        : /(boutique|e-?commerce|panier|vente|shop|magasin)/.test(lower) ? 'ecommerce'
          : 'web'
  );

  const isMobileApp = target === 'mobile' || pack.key === 'food' || pack.key === 'social';
  const prefersDark =
    options.darkMode !== undefined
      ? Boolean(options.darkMode)
      : /(sombre|dark|nuit|cyber|gaming|luxe|futur)/.test(lower) || target === 'mobile' || target === 'saas';

  const brandName =
    (options.brandName && options.brandName.trim()) ||
    extractBrandName(raw, pack.defaultBrand);

  const tagline = cleanTopicPhrase(raw, `${brandName} — Service rapide en ligne`);
  const palette = options.palette || pack.palette || THEME_PALETTES[0];

  const sections = [
    {
      id: 'sec-hero',
      type: 'hero',
      enabled: true,
      badge: pack.badge,
      title: `${brandName} — ${pack.heroTitle}`,
      subtitle: `${tagline}. Profitez d’une interface fluide sur smartphone, tablette et ordinateur avec validation immédiate.`,
      primaryCta: isMobileApp ? 'Lancer maintenant' : 'Découvrir nos offres',
      secondaryCta: 'Contact direct'
    }
  ];

  if (target === 'saas' || pack.key === 'saas') {
    sections.push(
      BLOCK_CATALOG.find((b) => b.type === 'stats').create(),
      BLOCK_CATALOG.find((b) => b.type === 'dashboard_app').create(),
      BLOCK_CATALOG.find((b) => b.type === 'pricing').create()
    );
  } else if (pack.key === 'social') {
    sections.push(
      BLOCK_CATALOG.find((b) => b.type === 'community_feed').create(brandName),
      BLOCK_CATALOG.find((b) => b.type === 'features').create()
    );
  } else if (target === 'ecommerce' || pack.items.length > 0) {
    sections.push({
      id: 'sec-catalog',
      type: 'catalog',
      enabled: true,
      title: pack.itemsTitle,
      subtitle: 'Filtrez par catégorie et ajoutez directement vos choix au panier actif.',
      currency: 'FCFA',
      items: pack.items
    });
    if (pack.services) {
      sections.push({
        id: 'sec-booking',
        type: 'booking',
        enabled: true,
        title: 'Réservation & Demande Rapide en Ligne',
        subtitle: 'Choisissez le service, la date et le créneau souhaité.',
        services: pack.services
      });
    }
    sections.push(BLOCK_CATALOG.find((b) => b.type === 'features').create());
  } else {
    sections.push(
      BLOCK_CATALOG.find((b) => b.type === 'stats').create(),
      BLOCK_CATALOG.find((b) => b.type === 'features').create(),
      BLOCK_CATALOG.find((b) => b.type === 'pricing').create()
    );
  }

  sections.push(
    BLOCK_CATALOG.find((b) => b.type === 'faq').create(),
    BLOCK_CATALOG.find((b) => b.type === 'contact').create(brandName)
  );

  return {
    brandName,
    tagline,
    logoDataUrl: options.logoDataUrl || '',
    targetPlatform: target,
    appMode: isMobileApp,
    darkMode: prefersDark,
    whatsappEnabled: true,
    whatsappNumber: '+2250700000000',
    radius: isMobileApp ? 'pill' : 'modern',
    palette,
    sections
  };
}

// Moteur conversationnel en direct dans le Studio GBADIA UNIVERTY
export function applyConversationalEdit(currentConfig, rawMessage) {
  const msg = String(rawMessage || '').trim();
  const lower = msg.toLowerCase();
  const next = JSON.parse(JSON.stringify(currentConfig));
  const changes = [];
  let suggestedViewport = null;

  // Si l'utilisateur demande un tout nouveau site/app complet ("crée un site de...", "génère une application de...")
  const isNewCreationRequest =
    /^(cr[ée]e?r?|g[ée]n[ée]re?r?|construis|fais[- ]moi)\s+(un|une)\s+(site|application|app|boutique|plateforme|logiciel)/i.test(msg);

  if (isNewCreationRequest) {
    const fresh = generateFromPrompt(msg, { logoDataUrl: next.logoDataUrl });
    return {
      config: fresh,
      viewport: fresh.appMode ? 'mobile' : 'desktop',
      reply: `J’ai généré une toute nouvelle architecture complète pour « ${fresh.brandName} » (${fresh.appMode ? 'Application Mobile PWA' : 'Site Web Responsive'}) avec ${fresh.sections.length} modules interactifs.`
    };
  }

  // Renommage
  const renameMatch = msg.match(/(?:renomme|change\s+le\s+nom|appelle[- ]le|nom\s*:)\s+(?:en\s+|par\s+)?([A-ZÀ-Ÿa-zà-ÿ0-9'’& -]{2,34})/i);
  if (renameMatch && renameMatch[1]) {
    const newName = renameMatch[1].trim();
    next.brandName = newName;
    if (next.sections[0]?.type === 'hero') {
      next.sections[0].title = `${newName} — Votre référence digitale en ligne`;
    }
    changes.push(`nom mis à jour en « ${newName} »`);
  }

  // Mode sombre / clair
  if (/(mode\s+sombre|fond\s+sombre|fond\s+noir|dark\s*mode|th[èe]me\s+sombre)/.test(lower)) {
    next.darkMode = true;
    changes.push('passage en thème Sombre');
  } else if (/(mode\s+clair|fond\s+clair|fond\s+blanc|light\s*mode|th[èe]me\s+clair)/.test(lower)) {
    next.darkMode = false;
    changes.push('passage en thème Clair lumineux');
  }

  // Couleurs
  if (/(vert|émeraude|emeraude)/.test(lower)) {
    next.palette = THEME_PALETTES[2];
    changes.push('palette Vert Émeraude appliquée');
  } else if (/(or|dor[ée]|jaune|luxe)/.test(lower)) {
    next.palette = THEME_PALETTES[1];
    changes.push('palette Or Impérial appliquée');
  } else if (/(rouge|corail|flamme)/.test(lower)) {
    next.palette = THEME_PALETTES[3];
    changes.push('palette Rouge Énergie appliquée');
  } else if (/(orange|ambre|cuivre)/.test(lower)) {
    next.palette = THEME_PALETTES[5];
    changes.push('palette Orange Ambre appliquée');
  } else if (/(cyan|turquoise|futur)/.test(lower)) {
    next.palette = THEME_PALETTES[0];
    changes.push('palette Cyber Cyan appliquée');
  } else if (/(bleu|saphir)/.test(lower)) {
    next.palette = THEME_PALETTES[4];
    changes.push('palette Bleu Saphir appliquée');
  }

  // Transformation Application Mobile / Web
  if (/(application\s+mobile|mode\s+mobile|barre\s+mobile|version\s+mobile|android|iphone|pwa)/.test(lower)) {
    next.appMode = true;
    next.targetPlatform = 'mobile';
    suggestedViewport = 'mobile';
    changes.push('mode Application Mobile PWA activé avec barre d’onglets tactile');
  } else if (/(site\s+bureau|mode\s+web\s+classique|enl[èe]ve\s+la\s+barre\s+mobile)/.test(lower)) {
    next.appMode = false;
    suggestedViewport = 'desktop';
    changes.push('affichage Site Web grand écran activé');
  }

  // WhatsApp
  if (/whatsapp/.test(lower)) {
    next.whatsappEnabled = !/(supprime|enl[èe]ve|masque|d[ée]sactive)/.test(lower);
    changes.push(next.whatsappEnabled ? 'bouton WhatsApp Direct activé' : 'bouton WhatsApp masqué');
  }

  // Ajout de modules fonctionnels à la volée
  const insertBeforeContact = (blockObj) => {
    const idx = next.sections.findIndex((s) => s.type === 'contact');
    if (idx !== -1) next.sections.splice(idx, 0, blockObj);
    else next.sections.push(blockObj);
  };

  if (/(panier|boutique|catalogue|produit|article)/.test(lower) && !next.sections.some((s) => s.type === 'catalog')) {
    insertBeforeContact(BLOCK_CATALOG.find((b) => b.type === 'catalog').create());
    changes.push('module Boutique E-Commerce & Panier actif ajouté');
  }
  if (/(r[ée]serv|rendez-vous|rdv|calendrier|cr[ée]neau)/.test(lower) && !next.sections.some((s) => s.type === 'booking')) {
    insertBeforeContact(BLOCK_CATALOG.find((b) => b.type === 'booking').create());
    changes.push('module de Prise de Rendez-vous en ligne ajouté');
  }
  if (/(tarif|prix|abonnement|forfait|plan)/.test(lower) && !next.sections.some((s) => s.type === 'pricing')) {
    insertBeforeContact(BLOCK_CATALOG.find((b) => b.type === 'pricing').create());
    changes.push('grille Tarifaire Mensuel / Annuel ajoutée');
  }
  if (/(tableau\s+de\s+bord|dashboard|gestion|statistique|facture)/.test(lower) && !next.sections.some((s) => s.type === 'dashboard_app')) {
    insertBeforeContact(BLOCK_CATALOG.find((b) => b.type === 'dashboard_app').create());
    changes.push('module Application SaaS de gestion temps réel ajouté');
  }
  if (/(social|communaut|fil\s+d|publication|post|forum)/.test(lower) && !next.sections.some((s) => s.type === 'community_feed')) {
    insertBeforeContact(BLOCK_CATALOG.find((b) => b.type === 'community_feed').create(next.brandName));
    changes.push('fil d’actualité communautaire interactif ajouté');
  }
  if (/faq|question/.test(lower) && !next.sections.some((s) => s.type === 'faq')) {
    insertBeforeContact(BLOCK_CATALOG.find((b) => b.type === 'faq').create());
    changes.push('section Questions Fréquentes ajoutée');
  }

  // Si aucune commande structurelle précise n'est détectée, regénérer intelligemment selon le message
  if (changes.length === 0) {
    const regenerated = generateFromPrompt(msg, {
      brandName: next.brandName,
      darkMode: next.darkMode,
      appMode: next.appMode,
      palette: next.palette,
      logoDataUrl: next.logoDataUrl
    });
    return {
      config: regenerated,
      viewport: suggestedViewport,
      reply: `J’ai mis à jour le contenu et les fonctionnalités de « ${regenerated.brandName} » selon votre instruction : "${msg}".`
    };
  }

  return {
    config: next,
    viewport: suggestedViewport,
    reply: `Modifications appliquées en direct : ${changes.join(', ')}.`
  };
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function compileProjectFiles(config) {
  const pal = config.palette || THEME_PALETTES[0];
  const isDark = Boolean(config.darkMode);
  const bg = isDark ? '#070B14' : '#F8FAFC';
  const surface = isDark ? '#111827' : '#FFFFFF';
  const surfaceAlt = isDark ? '#1E293B' : '#F1F5F9';
  const text = isDark ? '#F8FAFC' : '#0F172A';
  const muted = isDark ? '#94A3B8' : '#475569';
  const border = isDark ? 'rgba(148, 163, 184, 0.16)' : '#E2E8F0';
  const radius = config.radius === 'sharp' ? '8px' : config.radius === 'pill' ? '22px' : '14px';
  const btnRadius = config.radius === 'sharp' ? '8px' : config.radius === 'pill' ? '9999px' : '11px';

  const initials =
    (config.brandName || 'GB')
      .split(/\s+/)
      .map((w) => w[0] || '')
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'GB';

  const enabledSections = (config.sections || []).filter((s) => s.enabled !== false);
  const hasCatalog = enabledSections.some((s) => s.type === 'catalog');

  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${pal.primary}"/>
      <stop offset="100%" stop-color="${pal.secondary || pal.primary}"/>
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="56" fill="url(#g)"/>
  <text x="128" y="152" font-family="Arial, sans-serif" font-size="96" font-weight="800" fill="#ffffff" text-anchor="middle">${escapeHtml(initials)}</text>
</svg>`;

  const css = `/* Généré par GBADIA UNIVERTY — Studio de Sites Web & Applications */
:root {
  --primary: ${pal.primary};
  --secondary: ${pal.secondary || pal.primary};
  --accent: ${pal.accent || pal.primary};
  --bg: ${bg};
  --surface: ${surface};
  --surface-alt: ${surfaceAlt};
  --text: ${text};
  --muted: ${muted};
  --border: ${border};
  --radius: ${radius};
  --btn-radius: ${btnRadius};
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  padding-bottom: ${config.appMode ? '78px' : '0'};
}

.container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }

.topbar {
  position: sticky;
  top: 0;
  z-index: 45;
  background: ${isDark ? 'rgba(7, 11, 20, 0.88)' : 'rgba(255, 255, 255, 0.92)'};
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.topbar-inner {
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
  font-weight: 800;
  font-size: 1.06rem;
}
.brand-logo {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.88rem;
  overflow: hidden;
  flex-shrink: 0;
}
.brand-logo img { width: 100%; height: 100%; object-fit: cover; }

.nav-menu { display: flex; align-items: center; gap: 20px; }
.nav-menu a {
  text-decoration: none;
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.15s;
}
.nav-menu a:hover { color: var(--primary); }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  gap: 8px;
  padding: 11px 20px;
  border-radius: var(--btn-radius);
  font-weight: 700;
  font-size: 0.92rem;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.14s ease, opacity 0.15s ease;
}
.btn:active { transform: scale(0.97); }
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #ffffff;
  box-shadow: 0 6px 20px color-mix(in srgb, var(--primary) 30%, transparent);
}
.btn-outline {
  background: var(--surface);
  color: var(--text);
  border-color: var(--border);
}
.btn-outline:hover { border-color: var(--primary); }
.btn-sm { padding: 8px 14px; font-size: 0.82rem; }

section { padding: 66px 0; border-bottom: 1px solid var(--border); }
.sec-head { max-width: 680px; margin-bottom: 34px; }
.sec-head h2 {
  font-size: clamp(1.55rem, 3vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: 8px;
}
.sec-head p { color: var(--muted); font-size: 0.98rem; }

.hero-wrap {
  padding: 72px 0;
  background: radial-gradient(circle at top right, color-mix(in srgb, var(--primary) 16%, transparent), transparent 52%);
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 36px;
  align-items: center;
}
.pill-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  background: color-mix(in srgb, var(--primary) 16%, transparent);
  color: var(--primary);
  margin-bottom: 16px;
}
.hero-h1 {
  font-size: clamp(1.95rem, 4vw, 3.05rem);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}
.hero-lead {
  color: var(--muted);
  font-size: 1.03rem;
  margin-bottom: 26px;
  max-width: 580px;
}
.glass-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 26px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 18px;
}
.stat-tile {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
}
.stat-num { font-size: 1.95rem; font-weight: 900; color: var(--primary); }

.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));
  gap: 20px;
}
.item-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.16s ease, border-color 0.16s ease;
}
.item-card:hover { transform: translateY(-3px); border-color: var(--primary); }
.card-visual {
  height: 128px;
  background: linear-gradient(135deg, color-mix(in srgb, var(--primary) 24%, var(--surface-alt)), color-mix(in srgb, var(--secondary) 28%, var(--surface)));
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
}
.card-body { padding: 20px; flex: 1; }
.card-body h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 8px; }
.card-body p { color: var(--muted); font-size: 0.9rem; }
.card-foot {
  padding: 14px 20px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.price-val { font-size: 1.25rem; font-weight: 900; }

.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
.chip {
  padding: 7px 15px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  font-size: 0.83rem;
  font-weight: 700;
  cursor: pointer;
}
.chip.active { background: var(--primary); border-color: var(--primary); color: #fff; }

.input {
  width: 100%;
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface-alt);
  color: var(--text);
  font-size: 0.92rem;
  font-family: inherit;
}
.input:focus { outline: 2px solid var(--primary); background: var(--surface); }

.table-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow-x: auto;
}
table { width: 100%; border-collapse: collapse; text-align: left; }
th, td { padding: 13px 16px; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
th { font-size: 0.76rem; text-transform: uppercase; color: var(--muted); }
.badge-ok { padding: 4px 10px; border-radius: 999px; font-size: 0.76rem; font-weight: 700; background: rgba(16,185,129,0.16); color: #10B981; }
.badge-wait { padding: 4px 10px; border-radius: 999px; font-size: 0.76rem; font-weight: 700; background: rgba(245,158,11,0.18); color: #F59E0B; }

.cart-drawer {
  position: fixed;
  top: 0;
  right: -420px;
  width: min(390px, 94vw);
  height: 100vh;
  background: var(--surface);
  border-left: 1px solid var(--border);
  z-index: 90;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: -14px 0 40px rgba(0,0,0,0.35);
  transition: right 0.25s ease;
}
.cart-drawer.open { right: 0; }

.wa-float {
  position: fixed;
  right: 18px;
  bottom: ${config.appMode ? '82px' : '22px'};
  z-index: 65;
  background: #25D366;
  color: #ffffff;
  padding: 11px 16px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.84rem;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.mobile-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 66px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 60;
}
.mobile-bar a {
  text-decoration: none;
  color: var(--muted);
  font-size: 0.73rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.mobile-bar a:hover, .mobile-bar a.active { color: var(--primary); }

.faq-row {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 10px;
}
.faq-btn {
  width: 100%;
  padding: 16px 20px;
  background: none;
  border: none;
  color: var(--text);
  font-weight: 700;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.faq-ans { display: none; padding: 0 20px 16px; color: var(--muted); font-size: 0.9rem; }
.faq-row.open .faq-ans { display: block; }

.toast-pop {
  position: fixed;
  left: 50%;
  bottom: ${config.appMode ? '84px' : '26px'};
  transform: translateX(-50%) translateY(14px);
  background: var(--primary);
  color: #fff;
  padding: 11px 20px;
  border-radius: 999px;
  font-size: 0.86rem;
  font-weight: 700;
  opacity: 0;
  pointer-events: none;
  z-index: 120;
  transition: all 0.2s ease;
}
.toast-pop.show { opacity: 1; transform: translateX(-50%) translateY(0); }

footer { padding: 40px 0; text-align: center; color: var(--muted); font-size: 0.85rem; }

@media (max-width: 768px) {
  .hero-grid { grid-template-columns: 1fr; }
  .nav-menu { display: none; }
  section { padding: 46px 0; }
}
`;

  const renderSec = (sec, i) => {
    const idAttr = `s-${i}`;
    if (sec.type === 'hero') {
      return `
  <section id="${idAttr}" class="hero-wrap">
    <div class="container hero-grid">
      <div>
        <div class="pill-badge">${escapeHtml(sec.badge || 'Disponible en direct')}</div>
        <h1 class="hero-h1">${escapeHtml(sec.title)}</h1>
        <p class="hero-lead">${escapeHtml(sec.subtitle)}</p>
        <div style="display:flex;flex-wrap:wrap;gap:12px;">
          <a href="#s-1" class="btn btn-primary">${escapeHtml(sec.primaryCta || 'Commencer')}</a>
          <a href="#contact-sec" class="btn btn-outline">${escapeHtml(sec.secondaryCta || 'Contact')}</a>
          <button type="button" id="pwa-install-btn" class="btn btn-outline" style="display:none;">📲 Installer l’App</button>
        </div>
      </div>
      <div class="glass-panel">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <span style="font-size:0.78rem;font-weight:800;text-transform:uppercase;color:var(--primary);">${escapeHtml(config.brandName)}</span>
          <span class="badge-ok">● En ligne</span>
        </div>
        <h3 style="font-size:1.15rem;margin-bottom:8px;">${escapeHtml(config.tagline || 'Accès Web & Mobile instantané')}</h3>
        <p style="font-size:0.88rem;color:var(--muted);margin-bottom:18px;">Application optimisée pour smartphone Android, iPhone et ordinateur.</p>
        <div style="display:grid;gap:10px;border-top:1px solid var(--border);padding-top:14px;font-size:0.88rem;">
          <div style="display:flex;justify-content:space-between;"><span style="color:var(--muted);">Traitement</span><strong>Instantané</strong></div>
          <div style="display:flex;justify-content:space-between;"><span style="color:var(--muted);">Paiement & Confirmation</span><strong>Sécurisé ✓</strong></div>
          <div style="display:flex;justify-content:space-between;"><span style="color:var(--muted);">Compatibilité</span><strong>Web + App PWA</strong></div>
        </div>
      </div>
    </div>
  </section>`;
    }

    if (sec.type === 'catalog') {
      const curr = sec.currency || 'FCFA';
      const cats = ['Tous', ...Array.from(new Set((sec.items || []).map((x) => x.category).filter(Boolean)))];
      return `
  <section id="${idAttr}">
    <div class="container">
      <div class="sec-head">
        <h2>${escapeHtml(sec.title)}</h2>
        <p>${escapeHtml(sec.subtitle || '')}</p>
      </div>
      <div class="chips">
        ${cats.map((c, idx) => `<button type="button" class="chip ${idx === 0 ? 'active' : ''}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}
      </div>
      <div class="grid-cards">
        ${(sec.items || []).map((it, k) => `
        <div class="item-card prod-card" data-category="${escapeHtml(it.category || 'Tous')}">
          <div>
            <div class="card-visual">
              <span style="font-size:0.74rem;font-weight:800;padding:4px 10px;border-radius:999px;background:var(--surface);">${escapeHtml(it.category || 'Offre')}</span>
              <span style="font-size:1.5rem;font-weight:900;opacity:0.35;">0${k + 1}</span>
            </div>
            <div class="card-body">
              <h3>${escapeHtml(it.title)}</h3>
              <p>${escapeHtml(it.desc)}</p>
            </div>
          </div>
          <div class="card-foot">
            <span class="price-val">${Number(it.price || 0).toLocaleString('fr-FR')} <small style="font-size:0.75rem;color:var(--muted);">${escapeHtml(curr)}</small></span>
            <button type="button" class="btn btn-primary btn-sm add-cart"
              data-title="${escapeHtml(it.title)}"
              data-price="${Number(it.price || 0)}"
              data-curr="${escapeHtml(curr)}">+ Panier</button>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
    }

    if (sec.type === 'dashboard_app') {
      return `
  <section id="${idAttr}">
    <div class="container">
      <div class="sec-head">
        <h2>${escapeHtml(sec.title)}</h2>
        <p>${escapeHtml(sec.subtitle || '')}</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;margin-bottom:16px;">
        <input id="dash-filter" class="input" style="max-width:290px;" placeholder="Rechercher un dossier ou client..." />
        <form id="dash-form" style="display:flex;flex-wrap:wrap;gap:8px;">
          <input id="dash-client" class="input" style="width:185px;" placeholder="Client / Libellé" required />
          <input id="dash-amount" class="input" style="width:155px;" placeholder="Montant" required />
          <button type="submit" class="btn btn-primary btn-sm">+ Ajouter</button>
        </form>
      </div>
      <div class="table-card">
        <table id="dash-table">
          <thead><tr><th>Réf.</th><th>Client / Libellé</th><th>Montant</th><th>Statut</th></tr></thead>
          <tbody>
            ${(sec.items || []).map((r) => `
            <tr>
              <td><strong>${escapeHtml(r.ref)}</strong></td>
              <td>${escapeHtml(r.client)}</td>
              <td><strong>${escapeHtml(r.amount)}</strong></td>
              <td><span class="${r.status === 'Payé' ? 'badge-ok' : 'badge-wait'}">${escapeHtml(r.status)}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;
    }

    if (sec.type === 'community_feed') {
      return `
  <section id="${idAttr}">
    <div class="container" style="max-width:780px;">
      <div class="sec-head">
        <h2>${escapeHtml(sec.title)}</h2>
        <p>${escapeHtml(sec.subtitle || '')}</p>
      </div>
      <form id="post-form" class="glass-panel" style="margin-bottom:20px;display:grid;gap:10px;">
        <input id="post-author" class="input" placeholder="Votre pseudo ou nom" required />
        <textarea id="post-text" class="input" rows="2" placeholder="Publiez un message ou une annonce en direct..." required></textarea>
        <button type="submit" class="btn btn-primary btn-sm" style="justify-self:end;">Publier en direct</button>
      </form>
      <div id="feed-list" style="display:grid;gap:14px;">
        ${(sec.items || []).map((p) => `
        <div class="glass-panel">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.84rem;">
            <strong>${escapeHtml(p.author)} <span style="color:var(--primary);">• ${escapeHtml(p.role || 'Membre')}</span></strong>
            <span style="color:var(--muted);">${escapeHtml(p.time || 'À l’instant')}</span>
          </div>
          <p style="margin-bottom:12px;">${escapeHtml(p.content)}</p>
          <button type="button" class="btn btn-outline btn-sm like-btn" data-likes="${Number(p.likes || 1)}">♥ J’aime (${Number(p.likes || 1)})</button>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
    }

    if (sec.type === 'booking') {
      return `
  <section id="${idAttr}">
    <div class="container">
      <div class="sec-head">
        <h2>${escapeHtml(sec.title)}</h2>
        <p>${escapeHtml(sec.subtitle || '')}</p>
      </div>
      <form class="glass-panel booking-form" style="max-width:660px;display:grid;gap:14px;">
        <div>
          <label style="font-size:0.83rem;font-weight:700;display:block;margin-bottom:6px;">Choisir le service</label>
          <select class="input" name="service">
            ${(sec.services || ['Réservation Standard']).map((s) => `<option>${escapeHtml(s)}</option>`).join('')}
          </select>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <input class="input" type="text" placeholder="Votre nom complet" required />
          <input class="input" type="tel" placeholder="Téléphone / WhatsApp" required />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <input class="input" type="date" required />
          <select class="input">
            <option>09h00</option>
            <option>11h30</option>
            <option>15h00</option>
            <option>17h30</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Valider ma réservation</button>
        <div class="form-msg" style="display:none;padding:12px;border-radius:10px;background:rgba(16,185,129,0.16);color:#10B981;font-weight:700;font-size:0.88rem;"></div>
      </form>
    </div>
  </section>`;
    }

    if (sec.type === 'stats') {
      return `
  <section id="${idAttr}">
    <div class="container">
      <div class="stats-row">
        ${(sec.items || []).map((st) => `
        <div class="stat-tile">
          <div class="stat-num">${escapeHtml(st.value)}</div>
          <div style="color:var(--muted);font-size:0.88rem;font-weight:600;">${escapeHtml(st.label)}</div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
    }

    if (sec.type === 'features') {
      return `
  <section id="${idAttr}">
    <div class="container">
      <div class="sec-head">
        <h2>${escapeHtml(sec.title)}</h2>
        <p>${escapeHtml(sec.subtitle || '')}</p>
      </div>
      <div class="grid-cards">
        ${(sec.items || []).map((f) => `
        <div class="glass-panel">
          <div style="font-size:0.75rem;font-weight:800;text-transform:uppercase;color:var(--primary);margin-bottom:8px;">${escapeHtml(f.tag || 'Avantage')}</div>
          <h3 style="font-size:1.1rem;margin-bottom:8px;">${escapeHtml(f.title)}</h3>
          <p style="color:var(--muted);font-size:0.9rem;">${escapeHtml(f.desc)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
    }

    if (sec.type === 'pricing') {
      const curr = sec.currency || 'FCFA/mois';
      return `
  <section id="${idAttr}">
    <div class="container">
      <div class="sec-head">
        <h2>${escapeHtml(sec.title)}</h2>
        <p>${escapeHtml(sec.subtitle || '')}</p>
        <div class="chips" style="margin-top:14px;margin-bottom:0;">
          <button type="button" class="chip active bill-btn" data-annual="0">Mensuel</button>
          <button type="button" class="chip bill-btn" data-annual="1">Annuel (-20%)</button>
        </div>
      </div>
      <div class="grid-cards">
        ${(sec.items || []).map((pl) => `
        <div class="glass-panel" style="display:flex;flex-direction:column;justify-content:space-between;gap:18px;${pl.featured ? 'border:2px solid var(--primary);' : ''}">
          <div>
            <h3 style="font-size:1.15rem;margin-bottom:6px;">${escapeHtml(pl.title)}</h3>
            <p style="color:var(--muted);font-size:0.88rem;margin-bottom:14px;">${escapeHtml(pl.desc)}</p>
            <div class="price-val dyn-price" data-base="${Number(pl.price || 0)}" data-curr="${escapeHtml(curr)}" style="margin-bottom:16px;">
              ${Number(pl.price || 0).toLocaleString('fr-FR')} <small style="font-size:0.78rem;color:var(--muted);">${escapeHtml(curr)}</small>
            </div>
            <ul style="list-style:none;display:grid;gap:8px;font-size:0.88rem;">
              ${(pl.perks || []).map((pk) => `<li>✓ ${escapeHtml(pk)}</li>`).join('')}
            </ul>
          </div>
          <a href="#contact-sec" class="btn ${pl.featured ? 'btn-primary' : 'btn-outline'}">Choisir ${escapeHtml(pl.title)}</a>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
    }

    if (sec.type === 'faq') {
      return `
  <section id="${idAttr}">
    <div class="container" style="max-width:800px;">
      <div class="sec-head"><h2>${escapeHtml(sec.title)}</h2></div>
      ${(sec.items || []).map((fq, idx) => `
      <div class="faq-row ${idx === 0 ? 'open' : ''}">
        <button type="button" class="faq-btn"><span>${escapeHtml(fq.q)}</span><span>+</span></button>
        <div class="faq-ans">${escapeHtml(fq.a)}</div>
      </div>`).join('')}
    </div>
  </section>`;
    }

    if (sec.type === 'contact') {
      return `
  <section id="contact-sec">
    <div class="container hero-grid">
      <div>
        <div class="sec-head" style="margin-bottom:18px;">
          <h2>${escapeHtml(sec.title)}</h2>
          <p>${escapeHtml(sec.subtitle || '')}</p>
        </div>
        <div style="display:grid;gap:10px;font-size:0.92rem;">
          <div><strong>Adresse :</strong> <span style="color:var(--muted);">${escapeHtml(sec.address || 'Abidjan')}</span></div>
          <div><strong>Téléphone :</strong> <span style="color:var(--muted);">${escapeHtml(sec.phone || '')}</span></div>
          <div><strong>E-mail :</strong> <span style="color:var(--muted);">${escapeHtml(sec.email || '')}</span></div>
        </div>
      </div>
      <form class="glass-panel contact-form" style="display:grid;gap:12px;">
        <input class="input" type="text" placeholder="Votre nom" required />
        <input class="input" type="text" placeholder="Votre téléphone ou e-mail" required />
        <textarea class="input" rows="3" placeholder="Votre demande..." required></textarea>
        <button type="submit" class="btn btn-primary">Envoyer le message</button>
        <div class="form-msg" style="display:none;padding:12px;border-radius:10px;background:rgba(16,185,129,0.16);color:#10B981;font-weight:700;font-size:0.88rem;"></div>
      </form>
    </div>
  </section>`;
    }
    return '';
  };

  const navLinks = enabledSections.slice(0, 5).map((s, idx) => {
    const lbl = s.type === 'hero' ? 'Accueil'
      : s.type === 'catalog' ? 'Boutique'
        : s.type === 'dashboard_app' ? 'Gestion'
          : s.type === 'community_feed' ? 'Communauté'
            : s.type === 'booking' ? 'Réserver'
              : s.type === 'pricing' ? 'Tarifs'
                : s.type === 'faq' ? 'FAQ'
                  : s.type === 'contact' ? 'Contact' : 'Services';
    return `<a href="${s.type === 'contact' ? '#contact-sec' : `#s-${idx}`}">${lbl}</a>`;
  }).join('');

  const logoInner = config.logoDataUrl
    ? `<img src="${config.logoDataUrl}" alt="Logo" />`
    : escapeHtml(initials);

  const bodyHtml = `
  <header class="topbar">
    <div class="container topbar-inner">
      <a href="#s-0" class="brand-link">
        <span class="brand-logo">${logoInner}</span>
        <span>${escapeHtml(config.brandName)}</span>
      </a>
      <nav class="nav-menu">${navLinks}</nav>
      <div style="display:flex;align-items:center;gap:8px;">
        ${hasCatalog ? `<button type="button" id="open-cart" class="btn btn-outline btn-sm">🛒 Panier (<span id="cart-qty">0</span>)</button>` : ''}
        <a href="#contact-sec" class="btn btn-primary btn-sm">Action</a>
      </div>
    </div>
  </header>

  <main>
    ${enabledSections.map((s, i) => renderSec(s, i)).join('\n')}
  </main>

  ${hasCatalog ? `
  <aside id="cart-panel" class="cart-drawer">
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:14px;border-bottom:1px solid var(--border);">
        <strong style="font-size:1.05rem;">Panier d’achat</strong>
        <button type="button" id="close-cart" class="btn btn-outline btn-sm">✕</button>
      </div>
      <div id="cart-lines" style="max-height:52vh;overflow-y:auto;margin:14px 0;">
        <p style="color:var(--muted);font-size:0.9rem;">Votre panier est vide.</p>
      </div>
      <div style="display:flex;gap:6px;margin-top:8px;">
        <input id="promo-code" class="input" placeholder="Code promo (ex: PROMO20)" />
        <button type="button" id="apply-promo" class="btn btn-outline btn-sm">OK</button>
      </div>
    </div>
    <div style="border-top:1px solid var(--border);padding-top:14px;">
      <div style="display:flex;justify-content:space-between;font-weight:900;font-size:1.1rem;margin-bottom:12px;">
        <span>Total</span>
        <span id="cart-sum">0 FCFA</span>
      </div>
      <button type="button" id="validate-order" class="btn btn-primary" style="width:100%;">Confirmer la commande</button>
    </div>
  </aside>` : ''}

  ${config.whatsappEnabled ? `
  <a class="wa-float" href="#contact-sec" id="wa-trigger">💬 WhatsApp Direct</a>` : ''}

  ${config.appMode ? `
  <nav class="mobile-bar">
    <a href="#s-0" class="active"><span>⌂</span><span>Accueil</span></a>
    <a href="#s-1"><span>⚡</span><span>Explorer</span></a>
    ${hasCatalog ? `<a href="#panier" id="mob-cart"><span>🛒</span><span>Panier</span></a>` : `<a href="#s-2"><span>★</span><span>Services</span></a>`}
    <a href="#contact-sec"><span>✉</span><span>Contact</span></a>
  </nav>` : ''}

  <footer>
    <div class="container">
      <p>© ${new Date().getFullYear()} <strong>${escapeHtml(config.brandName)}</strong> — Tous droits réservés.</p>
      <p style="margin-top:4px;font-size:0.78rem;opacity:0.8;">Propulsé par <strong>GBADIA UNIVERTY</strong></p>
    </div>
  </footer>

  <div id="toast" class="toast-pop"> Prêt </div>`;

  const js = `// Logique Interactive Web & Application — GBADIA UNIVERTY Engine
(function () {
  var cart = [];
  var discount = 1;
  var toast = document.getElementById('toast');

  function notify(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__t);
    window.__t = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  // PWA Install Prompt
  var deferredPrompt;
  var installBtn = document.getElementById('pwa-install-btn');
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.style.display = 'inline-flex';
  });
  if (installBtn) {
    installBtn.addEventListener('click', function () {
      if (deferredPrompt) deferredPrompt.prompt();
    });
  }

  // Panier
  var drawer = document.getElementById('cart-panel');
  var qtyEl = document.getElementById('cart-qty');
  var linesEl = document.getElementById('cart-lines');
  var sumEl = document.getElementById('cart-sum');

  function syncCart() {
    if (!qtyEl || !linesEl || !sumEl) return;
    var q = cart.reduce(function (a, b) { return a + b.qty; }, 0);
    var total = Math.round(cart.reduce(function (a, b) { return a + b.qty * b.price; }, 0) * discount);
    var curr = cart[0] ? cart[0].curr : 'FCFA';
    qtyEl.textContent = String(q);
    sumEl.textContent = total.toLocaleString('fr-FR') + ' ' + curr;
    if (!cart.length) {
      linesEl.innerHTML = '<p style="color:var(--muted);font-size:0.9rem;">Votre panier est vide.</p>';
      return;
    }
    linesEl.innerHTML = cart.map(function (it, idx) {
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);gap:8px;">' +
        '<div><strong style="font-size:0.88rem;">' + it.title + '</strong><div style="font-size:0.78rem;color:var(--muted);">' + it.qty + ' × ' + it.price.toLocaleString('fr-FR') + ' ' + it.curr + '</div></div>' +
        '<button type="button" data-del="' + idx + '" class="btn btn-outline btn-sm">✕</button></div>';
    }).join('');
  }

  document.addEventListener('click', function (e) {
    var add = e.target.closest('.add-cart');
    if (add) {
      var title = add.getAttribute('data-title');
      var price = Number(add.getAttribute('data-price') || 0);
      var curr = add.getAttribute('data-curr') || 'FCFA';
      var found = cart.find(function (x) { return x.title === title; });
      if (found) found.qty += 1;
      else cart.push({ title: title, price: price, curr: curr, qty: 1 });
      syncCart();
      if (drawer) drawer.classList.add('open');
      notify('Ajouté : ' + title);
      return;
    }

    var del = e.target.closest('[data-del]');
    if (del) {
      cart.splice(Number(del.getAttribute('data-del')), 1);
      syncCart();
      return;
    }

    if (e.target.closest('#open-cart') || e.target.closest('#mob-cart')) {
      e.preventDefault();
      if (drawer) drawer.classList.add('open');
      return;
    }
    if (e.target.closest('#close-cart')) {
      if (drawer) drawer.classList.remove('open');
      return;
    }
    if (e.target.closest('#apply-promo')) {
      var codeInput = document.getElementById('promo-code');
      if (codeInput && codeInput.value.trim().toUpperCase() === 'PROMO20') {
        discount = 0.8;
        syncCart();
        notify('Code PROMO20 activé (-20%) !');
      } else {
        notify('Astuce : essayez le code PROMO20');
      }
      return;
    }
    if (e.target.closest('#validate-order')) {
      if (!cart.length) { notify('Votre panier est vide.'); return; }
      var num = 'CMD-' + Math.floor(1000 + Math.random() * 9000);
      cart = [];
      discount = 1;
      syncCart();
      if (drawer) drawer.classList.remove('open');
      notify('Commande ' + num + ' validée avec succès !');
      return;
    }

    var catBtn = e.target.closest('.chip[data-cat]');
    if (catBtn) {
      var cat = catBtn.getAttribute('data-cat');
      var sec = catBtn.closest('section');
      sec.querySelectorAll('.chip[data-cat]').forEach(function (b) { b.classList.remove('active'); });
      catBtn.classList.add('active');
      sec.querySelectorAll('.prod-card').forEach(function (card) {
        var c = card.getAttribute('data-category');
        card.style.display = (cat === 'Tous' || c === cat) ? 'flex' : 'none';
      });
      return;
    }

    var bill = e.target.closest('.bill-btn');
    if (bill) {
      var annual = bill.getAttribute('data-annual') === '1';
      var pSec = bill.closest('section');
      pSec.querySelectorAll('.bill-btn').forEach(function (b) { b.classList.remove('active'); });
      bill.classList.add('active');
      pSec.querySelectorAll('.dyn-price').forEach(function (el) {
        var b = Number(el.getAttribute('data-base') || 0);
        var cr = el.getAttribute('data-curr') || '';
        el.innerHTML = (annual ? Math.round(b * 0.8) : b).toLocaleString('fr-FR') + ' <small style="font-size:0.78rem;color:var(--muted);">' + cr + '</small>';
      });
      return;
    }

    var likeBtn = e.target.closest('.like-btn');
    if (likeBtn) {
      var n = Number(likeBtn.getAttribute('data-likes') || 0) + 1;
      likeBtn.setAttribute('data-likes', String(n));
      likeBtn.textContent = '♥ J’aime (' + n + ')';
      return;
    }

    var faq = e.target.closest('.faq-btn');
    if (faq) {
      faq.parentElement.classList.toggle('open');
      return;
    }

    if (e.target.closest('#wa-trigger')) {
      notify('Assistance WhatsApp prête — laissez votre numéro dans Contact !');
    }
  });

  // Recherche & Ajout SaaS
  var df = document.getElementById('dash-filter');
  if (df) {
    df.addEventListener('input', function () {
      var q = df.value.toLowerCase();
      document.querySelectorAll('#dash-table tbody tr').forEach(function (tr) {
        tr.style.display = tr.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
      });
    });
  }
  var dForm = document.getElementById('dash-form');
  if (dForm) {
    dForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var cl = document.getElementById('dash-client');
      var am = document.getElementById('dash-amount');
      var tb = document.querySelector('#dash-table tbody');
      if (!cl || !am || !tb) return;
      var ref = 'OP-' + Math.floor(100 + Math.random() * 900);
      var tr = document.createElement('tr');
      tr.innerHTML = '<td><strong>' + ref + '</strong></td><td>' + cl.value + '</td><td><strong>' + am.value + '</strong></td><td><span class="badge-ok">Payé</span></td>';
      tb.insertBefore(tr, tb.firstChild);
      cl.value = '';
      am.value = '';
      notify('Ligne ' + ref + ' enregistrée !');
    });
  }

  // Publication Communauté Live
  var pForm = document.getElementById('post-form');
  if (pForm) {
    pForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var au = document.getElementById('post-author');
      var tx = document.getElementById('post-text');
      var list = document.getElementById('feed-list');
      if (!au || !tx || !list) return;
      var card = document.createElement('div');
      card.className = 'glass-panel';
      card.innerHTML = '<div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:0.84rem;"><strong>' + au.value + ' <span style="color:var(--primary);">• En direct</span></strong><span style="color:var(--muted);">À l’instant</span></div><p style="margin-bottom:12px;">' + tx.value + '</p><button type="button" class="btn btn-outline btn-sm like-btn" data-likes="1">♥ J’aime (1)</button>';
      list.insertBefore(card, list.firstChild);
      tx.value = '';
      notify('Publication partagée en direct !');
    });
  }

  document.querySelectorAll('.booking-form, .contact-form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var box = f.querySelector('.form-msg');
      var code = 'REF-' + Math.floor(1000 + Math.random() * 9000);
      if (box) {
        box.style.display = 'block';
        box.textContent = '✓ Demande confirmée (' + code + '). Merci pour votre confiance !';
      }
      f.reset();
      notify('Confirmé : ' + code);
    });
  });

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('./sw.js').catch(function () {});
  }
})();
`;

  const sw = `const CACHE_NAME = 'gbadia-app-v1';
const ASSETS = ['./', './index.html', './css/styles.css', './js/app.js', './manifest.json', './icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
`;

  const manifest = JSON.stringify(
    {
      name: config.brandName,
      short_name: (config.brandName || 'App').slice(0, 15),
      description: config.tagline || 'Créé avec GBADIA UNIVERTY',
      start_url: './index.html',
      display: 'standalone',
      background_color: bg,
      theme_color: pal.primary,
      icons: [
        {
          src: './icon.svg',
          sizes: '256x256',
          type: 'image/svg+xml',
          purpose: 'any maskable'
        }
      ]
    },
    null,
    2
  );

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="${pal.primary}" />
  <title>${escapeHtml(config.brandName)} — ${escapeHtml(config.tagline || 'Application Officielle')}</title>
  <link rel="manifest" href="manifest.json" />
  <link rel="icon" type="image/svg+xml" href="icon.svg" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
${bodyHtml}
  <script src="js/app.js"></script>
</body>
</html>
`;

  const standaloneHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(config.brandName)} — ${escapeHtml(config.tagline || 'Application Officielle')}</title>
  <style>
${css}
  </style>
</head>
<body>
${bodyHtml}
  <script>
${js}
  </script>
</body>
</html>
`;

  const readme = `# ${config.brandName}

> Généré avec **GBADIA UNIVERTY — Générateur Intelligent de Sites Web & Applications**.

## Fichiers inclus dans ce pack

- \`index.html\` — Interface Web & Mobile responsive
- \`css/styles.css\` — Thème moderne personnalisable
- \`js/app.js\` — Modules dynamiques (Panier, Réservation, SaaS, Communauté, WhatsApp)
- \`manifest.json\` & \`sw.js\` & \`icon.svg\` — Progressive Web App installable sur **Android & iOS** hors connexion !

## Comment mettre en ligne ou convertir en APK Android

1. **Mise en ligne Web gratuite en 30 secondes** : glissez-déposez ce dossier sur **app.netlify.com/drop** ou **vercel.com**.
2. **Conversion en fichier Android \`.apk\` / \`.aab\`** : collez l'URL publiée sur **pwabuilder.com** puis cliquez sur *Package for Stores -> Android*.
`;

  return { html, css, js, manifest, sw, iconSvg, standaloneHtml, readme };
}
