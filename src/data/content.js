import shot41 from '@/assets/work/41devs.jpg';
import shot41m from '@/assets/work/41devs-m.jpg';
import shotEtchite from '@/assets/work/etchite.jpg';
import shotEtchiteM from '@/assets/work/etchite-m.jpg';
import shotOremi from '@/assets/work/oremi-mli.jpg';
import shotOremiM from '@/assets/work/oremi-mli-m.jpg';
import shotOremiBj from '@/assets/work/oremi-bj.jpg';
import shotOremiCi from '@/assets/work/oremi-ci.jpg';
import shotOremiCmr from '@/assets/work/oremi-cmr.jpg';
import shotOremiMdg from '@/assets/work/oremi-mdg.jpg';
import shotOremiCom from '@/assets/work/oremi-com.jpg';
import shotAsa from '@/assets/work/asa.jpg';
import shotVeep from '@/assets/work/veep.jpg';
import shotVeepM from '@/assets/work/veep-m.jpg';
import shotVeepOrg from '@/assets/work/veep-org.jpg';
import shotRema from '@/assets/work/rema.jpg';
import shotRemaM from '@/assets/work/rema-m.jpg';
import shotDietiva from '@/assets/work/dietiva.jpg';
import shotDietivaM from '@/assets/work/dietiva-m.jpg';
import shotDietivaApp from '@/assets/work/dietiva-app.jpg';
import shotSicca from '@/assets/work/sicca.jpg';
import shotMvmc from '@/assets/work/mvmc-admin.jpg';
import shotCarex from '@/assets/work/carex.jpg';
import shotKasua from '@/assets/work/kasua.jpg';
import shotKinetiva from '@/assets/work/kinetiva.jpg';
import shotBoutique from '@/assets/work/boutique.jpg';
import shotFames from '@/assets/work/fames.jpg';

export const EMAIL = 'mohamedchefickmhchefick@gmail.com';

export const socials = [
  { name: 'GitHub', url: 'https://github.com/mohamedchefick' },
  { name: 'Instagram', url: 'https://www.instagram.com/mh_chefick' },
  { name: 'WhatsApp', url: 'https://wa.me/+24102390936' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100089825846100' },
];

/**
 * Selected work — feeds both the 3D showreel and the case list.
 * Translatable fields are `{ en, fr }`. `url: null` = private product.
 */
export const projects = [
  {
    id: '41devs',
    title: '41DEVS',
    kind: { en: 'Corporate website', fr: 'Site institutionnel' },
    layer: 'Front-end · 3D',
    year: '2026',
    summary: {
      en: 'Full redesign of the 41DEVS studio site: real-time 3D scenes built with Three.js and TresJS, GSAP-driven storytelling, bilingual FR / EN content and a careers module wired to the API.',
      fr: 'Refonte complète du site du studio 41DEVS : scènes 3D temps réel avec Three.js et TresJS, narration animée avec GSAP, contenu bilingue FR / EN et module carrière branché sur l’API.',
    },
    stack: ['Vue 3', 'Three.js', 'TresJS', 'GSAP', 'Tailwind', 'i18n'],
    url: 'https://www.41devs.com',
    domain: '41devs.com',
    image: shot41,
    mobile: shot41m,
  },
  {
    id: 'etchite',
    title: 'e-Tchité',
    kind: { en: 'Fintech · Marketing site', fr: 'Fintech · Site vitrine' },
    layer: 'Front-end',
    year: '2026',
    summary: {
      en: 'Marketing site for the CCI Bénin financial-management platform used by 15,000+ SMEs and 600+ accounting firms. Pixel-perfect from Figma, statically exported Next.js with motion throughout.',
      fr: 'Site vitrine de la plateforme de gestion financière de la CCI Bénin, utilisée par plus de 15 000 PME et 600 cabinets comptables. Fidèle au pixel près à la maquette Figma, Next.js en export statique, animé de bout en bout.',
    },
    stack: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'GSAP'],
    url: 'https://www.e-tchite.bj',
    domain: 'e-tchite.bj',
    image: shotEtchite,
    mobile: shotEtchiteM,
  },
  {
    id: 'oremi',
    title: 'Oremi',
    kind: { en: 'Insurtech · 6 countries', fr: 'Insurtech · 6 pays' },
    layer: { en: 'Front-end · API integration', fr: 'Front-end · Intégration API' },
    year: '2024 — 26',
    summary: {
      en: 'Paperless insurance subscription for AFG Assurances, deployed in Benin, Côte d’Ivoire, Mali, Cameroon, Madagascar and the Comoros: auto, moto, travel and home quotes, multi-step underwriting, claims, e-signature, document upload and payment.',
      fr: 'Souscription d’assurance 100 % digitale pour AFG Assurances, déployée au Bénin, en Côte d’Ivoire, au Mali, au Cameroun, à Madagascar et aux Comores : devis auto, moto, voyage et habitation, parcours de souscription, sinistres, signature électronique, pièces justificatives et paiement.',
    },
    stack: ['Vue 3', 'Pinia', 'Tailwind', 'REST / Swagger', 'Cypress', 'Docker'],
    url: 'https://oremi.afgassurances.bj',
    domain: { en: 'oremi · 6 countries', fr: 'oremi · 6 pays' },
    image: shotOremi,
    mobile: shotOremiM,
    countries: [
      { name: { en: 'Benin', fr: 'Bénin' }, code: 'BJ', url: 'https://oremi.afgassurances.bj', image: shotOremiBj },
      { name: { en: 'Côte d’Ivoire', fr: 'Côte d’Ivoire' }, code: 'CI', url: 'https://oremi.ci.41devs.co', image: shotOremiCi },
      { name: { en: 'Mali', fr: 'Mali' }, code: 'ML', url: 'https://oremi.mli.41devs.co', image: shotOremi },
      { name: { en: 'Cameroon', fr: 'Cameroun' }, code: 'CM', url: 'https://oremi.cmr.41devs.co', image: shotOremiCmr },
      { name: { en: 'Madagascar', fr: 'Madagascar' }, code: 'MG', url: 'https://oremi.mdg.41devs.co', image: shotOremiMdg },
      { name: { en: 'Comoros', fr: 'Comores' }, code: 'KM', url: 'https://oremi.com.41devs.co', image: shotOremiCom },
    ],
  },
  {
    id: 'asa',
    title: 'ASA · Portail PV',
    kind: { en: 'Insurance · Accident reports', fr: 'Assurance · Procès-verbaux' },
    layer: { en: 'Front-end · New interface', fr: 'Front-end · Nouvelle interface' },
    year: '2026',
    summary: {
      en: 'New interface for the ASA-Bénin portal — the joint platform of Benin’s insurers for road-accident reports (procès-verbaux): secure sign-in, dashboard, search and follow-up of reports.',
      fr: 'Nouvelle interface du portail de l’ASA-Bénin — la plateforme commune des assureurs béninois pour les procès-verbaux d’accidents : connexion sécurisée, tableau de bord, recherche et suivi des PV.',
    },
    stack: ['Vue 3', 'Pinia', 'Vue Router', 'REST API'],
    url: 'https://asa-pv-frontend-v2-zgehvn-8a7ef6-66-228-56-150.sslip.io/connexion?suite=/tableau-de-bord',
    domain: 'asa · portail pv',
    image: shotAsa,
  },
  {
    id: 'veep',
    title: 'Veep',
    kind: { en: 'Event ticketing', fr: 'Billetterie événementielle' },
    layer: { en: 'Front-end · Organizer portal', fr: 'Front-end · Espace organisateur' },
    year: '2026',
    summary: {
      en: 'Discover concerts, workshops and afterworks around you and get a ticket in two minutes. I built the public portal and the organizer back-office used to create, sell and scan events.',
      fr: 'Découvrir concerts, ateliers et afterworks autour de soi et prendre un billet en deux minutes. J’ai réalisé le portail public et le back-office organisateur pour créer, vendre et contrôler les événements.',
    },
    stack: ['Vue 3', 'TypeScript', 'shadcn-vue', 'Vite', 'Maps'],
    url: 'https://veep.fun',
    domain: 'veep.fun',
    image: shotVeep,
    mobile: shotVeepM,
    extra: shotVeepOrg,
    extraCaption: { en: 'organizer back-office', fr: 'back-office organisateur' },
  },
  {
    id: 'rema',
    title: 'REMA',
    kind: { en: 'Medical community', fr: 'Communauté médicale' },
    layer: { en: 'Front-end · Web', fr: 'Front-end · Web' },
    year: '2025',
    summary: {
      en: 'Africa’s largest medical community: thousands of verified health professionals network, discuss clinical cases and train continuously. Multilingual website companion to the iOS and Android apps.',
      fr: 'La plus grande communauté médicale d’Afrique : des milliers de professionnels de santé vérifiés échangent, discutent de cas cliniques et se forment en continu. Site multilingue qui accompagne les applis iOS et Android.',
    },
    stack: ['Vue 3', 'Pinia', 'Vue Router', 'vue-i18n', 'Vite'],
    url: 'https://remaapp.com',
    domain: 'remaapp.com',
    image: shotRema,
    mobile: shotRemaM,
  },
  {
    id: 'dietiva',
    title: 'Dietiva',
    kind: { en: 'SaaS for nutritionists', fr: 'SaaS pour nutritionnistes' },
    layer: 'Full-stack',
    year: '2026',
    summary: {
      en: 'From assessment to meal plan: client follow-up, local food database, automatic 7-day meal plans matched to energy needs, and PDF plans sent over WhatsApp.',
      fr: 'Du bilan au plan alimentaire : suivi des clients, base d’aliments locaux, plans de 7 jours générés selon le besoin énergétique, et plans PDF envoyés par WhatsApp.',
    },
    stack: ['React', 'TypeScript', 'Node / Express', 'Prisma', 'PostgreSQL', 'Puppeteer'],
    url: 'https://dietiva.app',
    domain: 'dietiva.app',
    image: shotDietiva,
    mobile: shotDietivaM,
    extra: shotDietivaApp,
    extraCaption: { en: 'nutritionist workspace', fr: 'espace nutritionniste' },
  },
  {
    id: 'sicca',
    title: 'Sicca',
    kind: { en: 'AI recruitment', fr: 'Recrutement par IA' },
    layer: { en: 'Full-stack · Voice AI', fr: 'Full-stack · IA vocale' },
    year: '2026',
    summary: {
      en: 'A recruitment platform where candidates are interviewed by a conversational voice agent, then scored with skill tests and résumé analysis. Companies get a structured report for every candidate.',
      fr: 'Une plateforme de recrutement où les candidats passent un entretien avec un agent vocal conversationnel, puis sont évalués par des tests de compétences et l’analyse de leur CV. L’entreprise reçoit un compte rendu structuré pour chacun.',
    },
    stack: ['React 19', 'Cloudflare Workers', 'D1 / Drizzle', 'LiveKit', 'GSAP'],
    url: 'https://sicca.surge.sh',
    domain: 'sicca.surge.sh',
    image: shotSicca,
  },
  {
    id: 'mvmc',
    title: 'Ma Vie Mon Choix',
    kind: { en: 'Health · Mobile + API', fr: 'Santé · Mobile + API' },
    layer: { en: 'Back-end · Mobile · Dashboard', fr: 'Back-end · Mobile · Dashboard' },
    year: '2025 — 26',
    summary: {
      en: 'Sexual and reproductive health app for young people in Benin: a Flutter app (cycle tracking, FAQ, health-centre map, notifications), a NestJS API and a Vue admin dashboard.',
      fr: 'Appli de santé sexuelle et reproductive pour les jeunes au Bénin : une appli Flutter (suivi du cycle, FAQ, carte des centres de santé, notifications), une API NestJS et un dashboard d’administration Vue.',
    },
    stack: ['NestJS', 'PostgreSQL', 'Flutter', 'Firebase FCM', 'Vue 3', 'Google Maps'],
    url: 'https://mvmc.surge.sh',
    domain: 'mvmc.surge.sh',
    image: shotMvmc,
  },
  {
    id: 'carex',
    title: 'careX',
    kind: { en: 'Sexual health · Admin', fr: 'Santé sexuelle · Admin' },
    layer: { en: 'Front-end · Back-office', fr: 'Front-end · Back-office' },
    year: '2025',
    summary: {
      en: '“Live your sexuality better” — the administration platform of careX for ABPF (Benin’s family-planning association): content, users and services management behind the public app.',
      fr: '« Vivez mieux votre sexualité » — la plateforme d’administration de careX pour l’ABPF (Association Béninoise pour la Promotion de la Famille) : gestion des contenus, des utilisateurs et des services derrière l’appli grand public.',
    },
    stack: ['Vue 3', 'REST API', 'Tailwind'],
    url: 'https://admin.carex.bj',
    domain: 'admin.carex.bj',
    image: shotCarex,
  },
  {
    id: 'kasua',
    title: 'Kasua Lite',
    kind: { en: 'Admin dashboard', fr: 'Dashboard d’administration' },
    layer: { en: 'Front-end · Back-office', fr: 'Front-end · Back-office' },
    year: '2026',
    summary: {
      en: 'Administration dashboard for Kasua Lite: secured access, management screens and data tables connected to the platform API.',
      fr: 'Dashboard d’administration de Kasua Lite : accès sécurisé, écrans de gestion et tableaux de données connectés à l’API de la plateforme.',
    },
    stack: ['Vue 3', 'Vue Router', 'REST API'],
    url: 'https://admin.dev.kasua.lite.41devs.co/login',
    domain: 'kasua lite',
    image: shotKasua,
  },
  {
    id: 'kinetiva',
    title: 'Kinetiva',
    kind: { en: 'Physiotherapy SaaS', fr: 'SaaS kinésithérapie' },
    layer: 'Full-stack',
    year: '2026',
    summary: {
      en: 'Rehab follow-up for physiotherapists: patient records, assessments, illustrated and animated exercise programmes, account-free patient page shared over WhatsApp, real adherence tracking.',
      fr: 'Suivi de rééducation pour kinés : dossier patient, bilans, programmes d’exercices illustrés et animés, page patient sans compte partagée par WhatsApp, observance réelle.',
    },
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'React 19', 'GSAP'],
    url: null,
    domain: { en: 'Private beta', fr: 'Bêta privée' },
    image: shotKinetiva,
  },
];

export const archive = [
  { title: 'LaboutiqueChine', kind: { en: 'E-commerce', fr: 'E-commerce' }, year: '2023', stack: 'Vue · Firebase', image: shotBoutique },
  { title: 'FAMES Bénin', kind: { en: 'Association website', fr: 'Site associatif' }, year: '2023', stack: 'Vue · Tailwind', image: shotFames },
];

export const capabilities = [
  {
    key: 'front',
    index: '01',
    title: 'Front-end',
    note: { en: 'Where I started — and still my obsession.', fr: 'Là où j’ai commencé — et toujours mon obsession.' },
    body: {
      en: 'Interfaces that feel fast and look exactly like the design. Component systems, motion, 3D and accessibility treated as features, not extras.',
      fr: 'Des interfaces rapides et fidèles à la maquette. Systèmes de composants, animation, 3D et accessibilité traités comme des fonctionnalités, pas des options.',
    },
    items: ['Vue 3 · Nuxt', 'React · Next.js', 'Angular', 'TypeScript', 'Tailwind CSS', 'GSAP · Three.js · TresJS', 'Pinia · TanStack Query', 'Vitest · Cypress'],
  },
  {
    key: 'back',
    index: '02',
    title: 'Back-end',
    note: { en: 'APIs designed for the screens that consume them.', fr: 'Des API pensées pour les écrans qui les consomment.' },
    body: {
      en: 'Typed, documented and tested services with NestJS. Auth, roles, file storage, notifications and real-time — deployed in containers.',
      fr: 'Des services NestJS typés, documentés et testés. Authentification, rôles, fichiers, notifications et temps réel — déployés en conteneurs.',
    },
    items: ['NestJS · Express', 'PostgreSQL', 'Prisma · TypeORM', 'REST · Swagger / OpenAPI', 'JWT · RBAC', 'WebSockets', 'Docker · Nginx', 'Firebase'],
  },
  {
    key: 'mobile',
    index: '03',
    title: 'Mobile',
    note: { en: 'One codebase, two stores, native feel.', fr: 'Un seul code, deux stores, une sensation native.' },
    body: {
      en: 'Cross-platform apps with Flutter: offline-friendly data, push notifications, maps and geolocation, PDF and sharing — connected to the same API.',
      fr: 'Des applis multiplateformes avec Flutter : données hors ligne, notifications push, cartes et géolocalisation, PDF et partage — connectées à la même API.',
    },
    items: ['Flutter · Dart', 'State management', 'Firebase Messaging', 'Google Maps · Geolocation', 'Local storage · SQLite', 'Play Store · App Store'],
  },
];

export const steps = [
  { t: { en: 'Understand', fr: 'Comprendre' }, d: { en: 'Workshops, user flows and the real constraints: budget, network, devices.', fr: 'Ateliers, parcours utilisateurs et vraies contraintes : budget, réseau, appareils.' } },
  { t: { en: 'Model', fr: 'Modéliser' }, d: { en: 'Data model and API contract first — documented with Swagger before a pixel moves.', fr: 'Modèle de données et contrat d’API d’abord — documentés avec Swagger avant le moindre pixel.' } },
  { t: { en: 'Build', fr: 'Construire' }, d: { en: 'Interfaces from Figma to production, the NestJS API and the Flutter app in parallel.', fr: 'Interfaces de Figma à la prod, API NestJS et appli Flutter en parallèle.' } },
  { t: { en: 'Ship', fr: 'Livrer' }, d: { en: 'Docker, CI, store releases, analytics — then iterate on what people actually use.', fr: 'Docker, CI, publication sur les stores, analytics — puis on itère sur l’usage réel.' } },
];

export const experience = [
  {
    period: { en: 'Now', fr: 'Actuel' },
    role: { en: 'Full-stack Developer', fr: 'Développeur Full-stack' },
    company: '41DEVS',
    detail: {
      en: 'NestJS APIs, Flutter apps and the web front-ends on top of them — from data model to store release.',
      fr: 'API NestJS, applis Flutter et les front-ends web par-dessus — du modèle de données à la publication sur les stores.',
    },
    tags: ['NestJS', 'Flutter', 'Vue', 'React'],
  },
  {
    period: { en: '2 years', fr: '2 ans' },
    role: { en: 'Front-end Developer', fr: 'Développeur Front-end' },
    company: '41DEVS',
    detail: {
      en: 'Scalable web apps for insurance, fintech, health and institutional clients. UI architecture, REST / Swagger integration, performance and pixel-perfect delivery.',
      fr: 'Applications web pour l’assurance, la fintech, la santé et des institutions. Architecture UI, intégration REST / Swagger, performance et rendu au pixel près.',
    },
    tags: ['Vue', 'Angular', 'Next.js', 'TypeScript'],
  },
  {
    period: { en: 'Ongoing', fr: 'En cours' },
    role: { en: 'AI Development', fr: 'Développement IA' },
    company: 'Cerco IA',
    detail: {
      en: 'Expanding into AI-powered products: conversational agents, voice interfaces and LLM integrations.',
      fr: 'Ouverture vers les produits à base d’IA : agents conversationnels, interfaces vocales et intégrations de LLM.',
    },
    tags: ['LLM', 'Voice AI'],
  },
  {
    period: { en: '4 months', fr: '4 mois' },
    role: { en: 'Front-end Intern', fr: 'Stagiaire Front-end' },
    company: 'HELIS',
    detail: {
      en: 'Responsive interfaces with Vue, Tailwind and Firebase across several client projects.',
      fr: 'Interfaces responsives avec Vue, Tailwind et Firebase sur plusieurs projets clients.',
    },
    tags: ['Vue', 'Firebase'],
  },
  {
    period: { en: '3 years', fr: '3 ans' },
    role: { en: 'Bac+3 — Web Development', fr: 'Bac+3 — Développement web' },
    company: { en: 'Academic training', fr: 'Formation' },
    detail: {
      en: 'Foundations in programming, web engineering and software architecture.',
      fr: 'Bases solides en programmation, ingénierie web et architecture logicielle.',
    },
    tags: ['Engineering'],
  },
];
