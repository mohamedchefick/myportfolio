import { ref, watch } from 'vue';

function initialLocale() {
  try {
    const saved = localStorage.getItem('locale');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch { /* storage blocked */ }
  return (navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export const locale = ref(typeof window === 'undefined' ? 'en' : initialLocale());

watch(
  locale,
  (l) => {
    document.documentElement.lang = l;
    try { localStorage.setItem('locale', l); } catch { /* ignore */ }
  },
  { immediate: true },
);

export function setLocale(l) { locale.value = l; }

/** Resolves a `{ en, fr }` value for the active locale; plain values pass through. */
export function tr(v) {
  if (v && typeof v === 'object' && !Array.isArray(v) && 'en' in v) return v[locale.value] ?? v.en;
  return v;
}

/** UI strings */
const messages = {
  // header / nav
  'nav.about': { en: 'About', fr: 'À propos' },
  'nav.work': { en: 'Work', fr: 'Projets' },
  'nav.stack': { en: 'Stack', fr: 'Stack' },
  'nav.experience': { en: 'Experience', fr: 'Parcours' },
  'nav.contact': { en: 'Contact', fr: 'Contact' },
  'nav.available': { en: 'Available', fr: 'Disponible' },
  'nav.menu': { en: 'Menu', fr: 'Menu' },
  'nav.close': { en: 'Close', fr: 'Fermer' },
  'nav.top': { en: 'Top', fr: 'Haut' },

  // loader
  'loader.w1': { en: 'Interfaces.', fr: 'Interfaces.' },
  'loader.w2': { en: 'APIs.', fr: 'APIs.' },
  'loader.w3': { en: 'Mobile apps.', fr: 'Apps mobiles.' },

  // hero
  'hero.role': { en: 'Front-end → Full-stack', fr: 'Front-end → Full-stack' },
  'hero.aside': { en: 'the developer behind the pixels', fr: 'le développeur derrière les pixels' },
  'hero.intro': {
    en: 'Front-end developer by craft, full-stack by choice. I design and ship interfaces people enjoy, the NestJS APIs behind them and the Flutter apps in their pocket.',
    fr: 'Développeur front-end de métier, full-stack par choix. Je conçois et livre des interfaces qu’on aime utiliser, les API NestJS derrière elles et les applis Flutter dans votre poche.',
  },
  'hero.ctaWork': { en: 'Selected work', fr: 'Voir les projets' },
  'hero.ctaContact': { en: 'Start a project', fr: 'Lancer un projet' },
  'hero.scroll': { en: 'Scroll', fr: 'Défiler' },

  // about
  'about.label': { en: '(01) About', fr: '(01) À propos' },
  'about.sub': { en: 'Who’s behind the screen', fr: 'Qui est derrière l’écran' },
  'about.statement': {
    en: 'I started as a front-end developer obsessed with pixels and motion. Today I build the whole product — the interface people touch, the API that feeds it and the mobile app in their pocket.',
    fr: 'J’ai commencé comme développeur front-end obsédé par les pixels et le mouvement. Aujourd’hui je construis tout le produit — l’interface qu’on touche, l’API qui l’alimente et l’appli mobile dans la poche.',
  },
  'about.p1': {
    en: 'Three years at <strong>41DEVS</strong> — from intern to full-stack developer — shipping for insurers, fintechs, health and institutions taught me one thing: the best interface is useless if the API behind it is slow, fragile or unclear.',
    fr: 'Trois ans chez <strong>41DEVS</strong> — de stagiaire à développeur full-stack — à livrer pour des assureurs, des fintechs, la santé et des institutions m’ont appris une chose : la meilleure interface ne sert à rien si l’API derrière est lente, fragile ou floue.',
  },
  'about.p2': {
    en: 'So I went down the stack. I now design data models and write <strong>NestJS</strong> services, then ship <strong>Flutter</strong> apps on top of them — while keeping the eye for detail that made me a front-end developer in the first place.',
    fr: 'Alors je suis descendu dans la stack. Je conçois maintenant les modèles de données, j’écris les services <strong>NestJS</strong>, puis je livre les applis <strong>Flutter</strong> par-dessus — sans perdre le sens du détail qui a fait de moi un développeur front-end.',
  },
  'about.fig': { en: 'Fig. 02 — La Nuit des Devs', fr: 'Fig. 02 — La Nuit des Devs' },
  'about.now': { en: 'Currently', fr: 'Actuellement' },
  'about.nowText': { en: 'Full-stack developer at 41DEVS — NestJS · Flutter · Vue', fr: 'Développeur full-stack chez 41DEVS — NestJS · Flutter · Vue' },
  'about.f.name': { en: 'Name', fr: 'Nom' },
  'about.f.role': { en: 'Role', fr: 'Rôle' },
  'about.f.roleV': { en: 'Full-stack developer', fr: 'Développeur full-stack' },
  'about.f.focus': { en: 'Focus', fr: 'Spécialité' },
  'about.f.focusV': { en: 'Interfaces · APIs · Mobile', fr: 'Interfaces · API · Mobile' },
  'about.f.edu': { en: 'Education', fr: 'Formation' },
  'about.f.eduV': { en: 'Bachelor’s — Business Computing', fr: 'Licence — Informatique de gestion' },
  'about.s4': { en: 'Layers: UI · API · Mobile', fr: 'Couches : UI · API · Mobile' },
  'about.cta': { en: 'See the work', fr: 'Voir les projets' },
  'about.s1': { en: 'Years at 41DEVS', fr: 'Ans chez 41DEVS' },
  'about.s2': { en: 'Products shipped', fr: 'Produits livrés' },
  'about.s3': { en: 'Countries live', fr: 'Pays en production' },

  // showreel
  'reel.label': { en: '(02) Selected work', fr: '(02) Projets choisis' },
  'reel.hint': { en: 'Scroll to spin', fr: 'Défilez pour tourner' },
  'reel.t1': { en: 'Things I’ve', fr: 'Ce que j’ai' },
  'reel.t2a': { en: 'built', fr: 'construit' },
  'reel.t2b': { en: '& shipped', fr: '& livré' },
  'reel.visit': { en: 'Visit', fr: 'Voir' },

  // case list
  'work.index': { en: 'Case index', fr: 'Index des projets' },
  'work.lead': {
    en: 'Twelve products in production or private beta — for insurers in six countries, a chamber of commerce, health professionals, event organizers and recruiters. Each public one links to the live product.',
    fr: 'Douze produits en production ou en bêta privée — pour des assureurs dans six pays, une chambre de commerce, des professionnels de santé, des organisateurs d’événements et des recruteurs. Chaque produit public renvoie vers le site en ligne.',
  },
  'work.visit': { en: 'Visit', fr: 'Visiter' },
  'work.private': { en: 'Private product — demo on request', fr: 'Produit privé — démo sur demande' },
  'work.countries': { en: 'Live in 6 countries', fr: 'En ligne dans 6 pays' },
  'work.earlier': { en: 'Earlier work', fr: 'Premiers projets' },
  'early.t1': { en: 'Where it', fr: 'Là où tout' },
  'early.t2': { en: 'all started.', fr: 'a commencé.' },
  'early.lead': {
    en: 'My first shipped websites — small teams, real users, and the start of an obsession with clean interfaces.',
    fr: 'Mes premiers sites livrés — petites équipes, vrais utilisateurs, et le début d’une obsession pour les interfaces soignées.',
  },
  'early.archived': { en: 'Archived', fr: 'Archivé' },
  'work.also': { en: 'Also shipped', fr: 'Aussi livré' },

  // stack
  'stack.label': { en: '(03) Stack', fr: '(03) Stack' },
  'stack.sub': { en: 'One developer, the whole product', fr: 'Un développeur, tout le produit' },
  'stack.t1': { en: 'Front-end at heart.', fr: 'Front-end de cœur.' },
  'stack.t2a': { en: 'Full-stack', fr: 'Full-stack' },
  'stack.t2b': { en: 'in practice.', fr: 'en pratique.' },
  'stack.process': { en: 'How a project runs', fr: 'Comment se déroule un projet' },

  // experience
  'xp.label': { en: '(04) Experience', fr: '(04) Parcours' },
  'xp.sub': { en: '3 years at 41DEVS', fr: '3 ans chez 41DEVS' },
  'xp.t1': { en: 'From pixels', fr: 'Des pixels' },
  'xp.t2a': { en: 'to', fr: 'à la' },
  'xp.t2b': { en: 'production', fr: 'production' },

  // contact
  'ct.label': { en: '(05) Contact', fr: '(05) Contact' },
  'ct.sub': { en: 'Replies within 24h', fr: 'Réponse sous 24 h' },
  'ct.t1': { en: 'Let’s build', fr: 'Construisons' },
  'ct.t2': { en: 'something that', fr: 'quelque chose qui' },
  'ct.t3': { en: 'ships.', fr: 'sort.' },
  'ct.pitch': {
    en: 'A landing page with motion, a full web platform, a NestJS API or a Flutter app — tell me what you’re building and I’ll tell you how I’d ship it.',
    fr: 'Une landing page animée, une plateforme web complète, une API NestJS ou une appli Flutter — dites-moi ce que vous construisez, je vous dis comment je le livrerais.',
  },
  'ct.email': { en: 'Email', fr: 'Email' },
  'ct.copy': { en: 'Copy address', fr: 'Copier l’adresse' },
  'ct.copied': { en: 'Copied ✓', fr: 'Copié ✓' },
  'ct.name': { en: 'Name', fr: 'Nom' },
  'ct.namePh': { en: 'Your name', fr: 'Votre nom' },
  'ct.emailPh': { en: 'you@company.com', fr: 'vous@entreprise.com' },
  'ct.website': { en: 'Website', fr: 'Site web' },
  'ct.optional': { en: '(optional)', fr: '(facultatif)' },
  'ct.project': { en: 'Project', fr: 'Projet' },
  'ct.projectPh': { en: 'What are we building?', fr: 'Que construit-on ?' },
  'ct.note': { en: 'Sent straight to my inbox — no newsletter, ever.', fr: 'Directement dans ma boîte — jamais de newsletter.' },
  'ct.send': { en: 'Send', fr: 'Envoyer' },
  'ct.sending': { en: 'Sending…', fr: 'Envoi…' },
  'ct.errName': { en: 'Please tell me your name.', fr: 'Indiquez votre nom.' },
  'ct.errEmail': { en: 'An email is required.', fr: 'L’email est requis.' },
  'ct.errEmailBad': { en: 'This email looks invalid.', fr: 'Cet email semble invalide.' },
  'ct.errUrl': { en: 'This URL looks invalid.', fr: 'Cette URL semble invalide.' },
  'ct.errDesc': { en: 'A few words about the project?', fr: 'Quelques mots sur le projet ?' },
  'ct.ok': { en: 'Message sent — talk soon!', fr: 'Message envoyé — à très vite !' },
  'ct.fail': { en: 'Couldn’t send the message:', fr: 'Échec de l’envoi :' },

  // footer
  'ft.nav': { en: 'Navigation', fr: 'Navigation' },
  'ft.else': { en: 'Elsewhere', fr: 'Ailleurs' },
  'ft.hello': { en: 'Say hello', fr: 'Écrivez-moi' },
  'ft.top': { en: 'Back to top ↑', fr: 'Retour en haut ↑' },
  'ft.built': { en: 'Designed & built by me — Vue · GSAP · Three.js', fr: 'Conçu et développé par moi — Vue · GSAP · Three.js' },
};

export function t(key) {
  const m = messages[key];
  return m ? tr(m) : key;
}
