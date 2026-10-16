/*
  PROJECTS — edit this file to change the cards and project pages.

  To show real work: put images in  assets/projects/<slug>/  and list them in
  `images`, e.g. images: ['assets/projects/krizzo-snacks/01.webp', ...].
  While `images` is empty, the project page shows grain mood tiles instead.

  `icon`  → the grain element on the card (any file name from assets/img/)
  `hero`  → the big grain illustration at the top of the project page
*/
window.PROJECTS = [
  {
    slug: 'krizzo-snacks',
    name: 'Krizzo Snacks',
    category: 'Packaging & Branding',
    year: '2026',
    role: 'Lead Packaging Designer',
    tools: ['Illustrator', 'Photoshop', 'Blender 3D'],
    feeling: 'Joy',
    icon: 'flame',
    hero: 'emotion-joy',
    intro: 'A crunchy, spicy snack brand that needed packs loud enough to win a crowded shelf in a single glance.',
    challenge: 'Twelve flavours, one family. Every pack had to feel instantly “Krizzo” while letting each flavour shout its own heat level.',
    approach: 'A bold wordmark, a flame-grade heat scale, and illustrated ingredients rendered in Blender for the hero pack shots. A strict grid kept 12 SKUs consistent.',
    outcome: 'A full pack system, shelf mock-ups and a launch social kit — ready for print and e-commerce.',
    deliverables: ['Logo & wordmark', 'Pack system ×12', '3D pack renders', 'Shelf mock-ups', 'Launch social kit'],
    images: []
  },
  {
    slug: 'lumina-tech-ui',
    name: 'Lumina Tech UI',
    category: 'UI / UX Design',
    year: '2026',
    role: 'UI / UX Designer',
    tools: ['Figma', 'Illustrator', 'AI design tools'],
    feeling: 'Insight',
    icon: 'eye-open',
    hero: 'emotion-fear',
    intro: 'A calm, light-filled dashboard for a smart-home tech company — complex data made easy to read.',
    challenge: 'Power users wanted every metric; new users wanted one clear answer. The interface had to serve both without feeling crowded.',
    approach: 'Research-led flows, a token-based design system in Figma, progressive disclosure and soft luminous states for device activity.',
    outcome: 'A clickable prototype, 60+ components and a dark/light design system handed off with full specs.',
    deliverables: ['User flows', 'Design system', 'Dashboard UI', 'Mobile app screens', 'Interactive prototype'],
    images: []
  },
  {
    slug: 'seinna-arts',
    name: 'Seinna Arts',
    category: 'Branding & Illustration',
    year: '2025',
    role: 'Brand Designer & Illustrator',
    tools: ['Illustrator', 'Procreate', 'InDesign'],
    feeling: 'Love',
    icon: 'flower-red',
    hero: 'emotion-love',
    intro: 'An identity for an art studio and gallery — soft, hand-drawn and full of feeling.',
    challenge: 'The studio’s artists work in very different styles. The brand had to frame their work, never compete with it.',
    approach: 'A floral monogram, a quiet type pairing and a set of hand-drawn botanical illustrations used as frames, stamps and patterns.',
    outcome: 'A complete identity: logo suite, stationery, exhibition posters and an illustration library.',
    deliverables: ['Logo suite', 'Illustration library', 'Stationery', 'Exhibition posters', 'Brand guidelines'],
    images: []
  },
  {
    slug: 'fluffy-beans',
    name: 'Fluffy Beans',
    category: 'Social Media',
    year: '2025',
    role: 'Social Media Designer',
    tools: ['Photoshop', 'Canva', 'Illustrator'],
    feeling: 'Calm',
    icon: 'cloud',
    hero: 'emotion-calm',
    intro: 'A cosy café and coffee brand whose feed now feels as soft as their cloud-foam lattes.',
    challenge: 'An inconsistent feed with low engagement and no recognisable look.',
    approach: 'A pastel, cloud-inspired content system: reusable post templates, story frames, menu carousels and illustrated stickers.',
    outcome: 'Template library for the in-house team and a consistent, recognisable feed across platforms.',
    deliverables: ['Feed templates', 'Story frames', 'Menu carousels', 'Sticker set', 'Content calendar look'],
    images: []
  },
  {
    slug: 'ergonxlu',
    name: 'Ergonxlu',
    category: 'Brand & Web Identity',
    year: '2026',
    role: 'Designer',
    tools: ['Figma', 'WordPress', 'WooCommerce', 'Blender 3D'],
    feeling: 'Balance',
    icon: 'arch-window',
    hero: 'emotion-calm',
    intro: 'Ergonomic furniture with warm, natural craftsmanship — brand visuals, product renders and a WooCommerce storefront.',
    challenge: 'Show comfort and craft online, where customers can’t sit on the chair or touch the wood.',
    approach: 'Clean product renders, lifestyle compositions, a calm visual language and a WooCommerce store designed for clarity.',
    outcome: 'Brand visuals, product imagery and a live e-commerce experience across web and social.',
    deliverables: ['Brand visuals', 'Product renders', 'Web design', 'WooCommerce store', 'Social creatives'],
    images: []
  },
  {
    slug: 'moonleaf-tea',
    name: 'Moonleaf Tea',
    category: 'Print & Typography',
    year: '2025',
    role: 'Print Designer',
    tools: ['InDesign', 'Illustrator', 'Corel Draw'],
    feeling: 'Dream',
    icon: 'moon',
    hero: 'emotion-sadness',
    intro: 'Night-time herbal teas, with labels and print made to feel like a quiet moonlit ritual.',
    challenge: 'A small batch brand with a premium price — the print had to feel crafted and worth it.',
    approach: 'A custom moon-phase type lock-up, foil and deboss print specs, and a lunar calendar insert in every box.',
    outcome: 'Label system, gift box, tasting cards and a print-ready lunar calendar.',
    deliverables: ['Type lock-up', 'Label system', 'Gift box', 'Tasting cards', 'Print specs'],
    images: []
  },
  {
    slug: 'ember-quest',
    name: 'Ember Quest',
    category: 'Game Assets & 3D',
    year: '2024',
    role: 'Game Artist',
    tools: ['Spine 2D', 'Blender 3D', 'Photoshop'],
    feeling: 'Anger',
    icon: 'crystal-red',
    hero: 'emotion-anger',
    intro: 'A fantasy mobile game of fire crystals and brave little heroes — characters, props and UI.',
    challenge: 'Assets had to stay crisp on small phones and animate smoothly without heavy file sizes.',
    approach: 'Rigged 2D characters in Spine, low-poly crystal props in Blender, and an in-game UI kit built around ember reds.',
    outcome: 'Animated character set, 40+ props and a complete in-game UI kit.',
    deliverables: ['Character rigs', 'Prop set', 'In-game UI kit', 'Icons', 'Store screenshots'],
    images: []
  }
];
