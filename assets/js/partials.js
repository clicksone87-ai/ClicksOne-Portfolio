(() => {
/* =========================================================================
   Clicksone — shared content & markup (single source of truth)
   Edit copy here; pages place blocks with <div data-partial="name"></div>.
   ========================================================================= */

const SITE = {
  name: 'Clicksone',
  email: 'hello@Clicksone.agency',
  phone: '+1 (943) 206-0047',
  phoneHref: '+19432060047',
  // Where every "Book a Call" goes. Swap for a Calendly/Cal.com link when ready.
  bookUrl: 'contact.html#contact',
  // Optional form endpoint (e.g. Formspree). Empty = the form opens the visitor's email app.
  formEndpoint: '',
  social: {
    linkedin: '#', whatsapp: '#', facebook: '#', behance: '#', instagram: '#',
  },
  // Placeholder avatars on the floating discovery bar and hero "Book an intro call" link.
  // Set img to a photo/logo path (e.g. 'assets/team/sara.jpg') to replace the initials.
  avatars: [
    { initials: 'A', img: '' },
    { initials: 'D', img: '' },
    { initials: 'J', img: '' },
  ],
};

/* ---------- Icons ---------- */
const I = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrowUR: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cross: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor"/></svg>',
  stack: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3z" fill="currentColor"/><path d="m3 6 9 7 9-7" fill="none" stroke="#000000" stroke-width="1.6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill="currentColor"/></svg>',
  pen: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l4-1L19 8l-3-3L5 16zM14 7l3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>',
  spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="currentColor"/></svg>',
  cursor: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 7-6 2-2 6z" fill="currentColor"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9h3v10H5zM6.5 4a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4zM10 9h3v1.4c.5-.9 1.6-1.6 3.1-1.6 3 0 3.4 2 3.4 4.4V19h-3v-5c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V19h-3z" fill="currentColor"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.4 12.4c-.2.5-1.1 1-1.6 1.1-.4 0-.9.1-2.9-.7-2.4-1-4-3.5-4.1-3.7-.1-.2-1-1.3-1-2.5s.6-1.8.9-2.1c.2-.2.5-.3.6-.3h.5c.1 0 .4 0 .6.4l.8 1.9c.1.1.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.6-.1 1.1z" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21z" fill="currentColor"/></svg>',
  behance: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h5.2c2 0 3.3 1 3.3 2.7 0 1.1-.6 1.9-1.5 2.3 1.3.3 2 1.3 2 2.6 0 2-1.5 3.4-3.8 3.4H3zm2.4 2v2.6h2.5c.9 0 1.4-.5 1.4-1.3S8.8 8 7.9 8zm0 4.5v3h2.8c1 0 1.6-.6 1.6-1.5s-.6-1.5-1.6-1.5zM15 7h5v1.3h-5zm2.5 2.3c2.4 0 3.8 1.7 3.6 4.4h-5.4c.1 1.3.9 2 2 2 .8 0 1.4-.4 1.6-1h1.7c-.4 1.6-1.7 2.5-3.4 2.5-2.3 0-3.8-1.6-3.8-4s1.5-3.9 3.7-3.9zm1.8 3.2c-.1-1-.8-1.7-1.8-1.7s-1.7.7-1.8 1.7z" fill="currentColor"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>',
};

/* ---------- Flags (inline SVG: emoji flags don't render on Windows) ---------- */
const FLAG = {
  us: '<svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="30" height="20" fill="#fff"/><g fill="#B22234">' + [0,2,4,6,8,10,12].map(i => `<rect y="${i*20/13}" width="30" height="${20/13}"/>`).join('') + '</g><rect width="12" height="10.8" fill="#3C3B6E"/></svg>',
  uk: '<svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0 0l60 40M60 0 0 40" stroke="#fff" stroke-width="8"/><path d="M0 0l60 40M60 0 0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="12"/><path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="7"/></svg>',
  ca: '<svg viewBox="0 0 40 20" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="40" height="20" fill="#fff"/><rect width="10" height="20" fill="#D52B1E"/><rect x="30" width="10" height="20" fill="#D52B1E"/><path d="M20 4l1.2 2.6 1.8-.6-.6 3.4 1.8-1.2.4 1.2 2-.4-.8 2 .8.6-3.6 2.6.4 1.4-2.8-.4V18h-1.2v-2.8l-2.8.4.4-1.4L13.4 11.6l.8-.6-.8-2 2 .4.4-1.2 1.8 1.2-.6-3.4 1.8.6z" fill="#D52B1E"/></svg>',
  ae: '<svg viewBox="0 0 30 15" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="30" height="5" fill="#00732F"/><rect y="5" width="30" height="5" fill="#fff"/><rect y="10" width="30" height="5" fill="#000"/><rect width="8" height="15" fill="#FF0000"/></svg>',
};

/* ---------- Data ---------- */
const SERVICES = [
  { id: 'branding', name: 'Branding & Visual Identity', short: 'Branding', cta: 'Build Your Brand', scene: 'brand',
    tags: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines', 'Rebranding'],
    desc: 'Brand identity design that gives your business a clear, recognizable look everywhere it shows up. We connect brand strategy, logo systems, color, typography and brand guidelines so your team communicates consistently from launch onward.' },
  { id: 'uiux', name: 'UI/UX Design', short: 'UI/UX', cta: 'Design Your Product', scene: 'ui',
    tags: ['UX Research', 'UI Design', 'Product Design', 'App Design', 'UX Audit'],
    desc: 'UI/UX design services that turn complex product ideas into interfaces people can use without friction. We combine user research, user flows, wireframes, prototypes and design systems for SaaS and digital product teams.' },
  { id: 'web', name: 'Web Design & Development', short: 'Web', cta: 'Build Your Website', scene: 'web',
    tags: ['Website Design', 'Web Development', 'Landing Pages', 'CMS Setup', 'Technical SEO'],
    desc: 'Website design and development that turns visitors into leads. We plan, design and build fast, responsive websites and landing pages your team can update without waiting on developers.' },
  { id: 'decks', name: 'Pitch Deck & Presentation Design', short: 'Pitch Decks', cta: 'Design Your Deck', scene: 'deck',
    tags: ['Pitch Decks', 'Investor Presentations', 'Keynote Decks', 'Sales Decks', 'Deck Templates'],
    desc: 'Pitch deck design that helps founders raise funding and win deals. We shape the story, structure and visuals of investor, sales and keynote presentations so every slide earns its place.' },
  { id: 'editorial', name: 'Book & Editorial Design', short: 'Editorial', cta: 'Design Your Book', scene: 'book',
    tags: ['Book Covers', 'Interior Layout', 'eBooks', 'Reports', 'Magazines'],
    desc: 'Book and editorial design that makes long-form content easy to read and good to look at. We design covers, interior layouts, eBooks, reports and magazines ready for print and digital.' },
  { id: 'video', name: 'Video Editing & Motion Graphics', short: 'Video', cta: 'Create Your Video', scene: 'video',
    tags: ['Video Editing', 'Motion Graphics', 'Explainer Videos', '2D Animation', 'AI Video'],
    desc: 'Video editing services that turn raw footage, scripts and product screens into finished videos for every channel. We handle short- and long-form editing, motion graphics, 2D and 3D animation, VFX and AI video.' },
];

const CATEGORIES = [
  ['all', 'All Work'], ['pitch', 'Pitch Decks'], ['uiux', 'UI/UX'], ['web', 'Web Design & Development'],
  ['branding', 'Branding'], ['editorial', 'Book & Editorial'], ['video', 'Video & Motion'],
];

// mock: monitor | laptop | phone | logo | book | reels   bg: imagery palette key (see style.css /* imagery */)
const PROJECTS = [
  { id: 'redbull', title: 'Red Bull', cat: 'pitch', mock: 'monitor', bg: 'navy', screen: 'dark',
    head: 'Red Bull Takes Energy Beyond Limits and Into Everyday Life', brand: 'Red Bull',
    desc: 'A bold, high-energy pitch deck designed to communicate RedBull’s vision, value, and brand identity.' },
  { id: 'nothing', title: 'Nothing', cat: 'uiux', mock: 'phone', bg: 'silver', screen: 'mono',
    head: 'Why Us', brand: 'NOTHING',
    desc: 'A minimalist smartphone design highlighting transparency, the Glyph Interface, and a more intuitive user experience' },
  { id: 'ageofai', title: 'Age of AI Keynote Deck', cat: 'pitch', mock: 'laptop', bg: 'green', screen: 'deepgreen',
    head: 'Leading With Our Minds in The Age Of AI', over: 'Deck Design',
    desc: 'A visual presentation exploring responsible AI use, mental engagement, and Saudi Arabia’s innovation efforts' },
  { id: 'cambridge', title: 'Cambridge Carbon', cat: 'pitch', mock: 'logo', bg: 'forest', logo: 'CAMBRIDGE<br>CARBON', mark: 'sphere',
    desc: 'A calm sustainability presentation using forest imagery and clear layouts to explain environmental ideas.' },
  { id: 'basedrop', title: 'BaseDrop', cat: 'uiux', mock: 'phone', bg: 'teal', screen: 'teal',
    head: 'Easily book your ride', brand: 'BaseDrop',
    desc: 'A ride-booking app and launch visuals built around one simple promise: easily book your ride.' },
  { id: 'remote', title: 'Remote Team Workspace', cat: 'web', mock: 'phone', bg: 'blackgreen', screen: 'light',
    head: 'Your Remote Team’s New Best Friend', brand: 'Features',
    desc: 'A SaaS website that explains a remote-work platform in one scroll, from the hero message to benefits and sign-up.' },
  { id: 'lending', title: 'Real Estate Lending Platform', cat: 'web', mock: 'monitor', bg: 'silver', screen: 'light',
    head: 'Fast, Flexible Loans for Real Estate Investors', brand: 'Lend',
    desc: 'A lending website for real estate investors with clear borrower and lender journeys and a fast application flow.' },
  { id: 'freight', title: 'Nigeria Freight Logistics', cat: 'web', mock: 'laptop', bg: 'yellow', screen: 'rail',
    head: 'The Future of Freight in Nigeria', brand: 'Freight',
    desc: 'A logistics website presenting rail and freight services in Nigeria with bold imagery and a clear quote path.' },
  { id: 'roshan', title: 'Roshan Studio', cat: 'branding', mock: 'logo', bg: 'magenta', logo: 'Roshan Studio', mark: 'r',
    desc: 'An identity system and app icon for a creative studio, built to stand out on screens of every size.' },
  { id: 'goldenline', title: 'GoldenLine', cat: 'branding', mock: 'laptop', bg: 'gold', screen: 'gold',
    head: 'The Line Between Possibility and Reality', brand: 'GoldenLine',
    desc: 'A premium black-and-gold brand and website direction, framing the line between possibility and reality.' },
  { id: 'editorial', title: 'Editorial Book Design', cat: 'editorial', mock: 'book', bg: 'sand',
    head: 'The Quiet Work', brand: 'A Novel',
    desc: 'Cover and interior layouts for a long-form book, designed for print and eBook with consistent typography.' },
  { id: 'reels', title: 'Talking-Head Video Series', cat: 'video', mock: 'reels', bg: 'violet',
    head: 'Fitness', brand: 'Lukas - Talking Head',
    desc: 'Short-form talking-head edits for finance, fitness and lifestyle creators, with captions and motion graphics.' },
];

// Places shown on the globe. review = index into TESTIMONIALS (-1 = location label only)
const GLOBE_PLACES = [
  { name: 'United States', short: 'US', lat: 39.8, lon: -98.6, review: 0, flag: 'us' },
  { name: 'United Kingdom', short: 'UK', lat: 52.5, lon: -1.5, review: 1, flag: 'uk', left: true },
  { name: 'Canada', short: 'CA', lat: 56.1, lon: -106.3, review: 2, flag: 'ca' },
  { name: 'Europe', short: 'EU', lat: 50.5, lon: 10.5, review: -1 },
  { name: 'UAE', short: 'UAE', lat: 24.3, lon: 54.4, review: -1, flag: 'ae' },
];

const TESTIMONIALS = [
  { flag: 'us', place: 'United States', label: 'Website project',
    text: 'I had a great experience working with this company on my website. Despite some language barriers and the fact that I was quite a demanding client, they remained patient, professional, and helpful throughout the entire process. We went through several revisions, and they always made sure my requests were addressed. In the end, the website turned out great, and I’m very happy with the result. Highly recommended!' },
  { flag: 'uk', place: 'United Kingdom', label: 'Websites, slide decks & design',
    text: 'I have used this group for over 2 years now with all sorts of different projects and everytime - it is exceptional! I highly recommend their service and know that whenever I need help with websites, slide decks, design work I can count on their team. Thanks!' },
  { flag: 'ca', place: 'Canada', label: 'Ongoing design partner',
    text: 'Exceptional - I will be using this company for all of our design needs. Amazing communication, prompt and brilliant attention to detail. They also were patient and understanding with a few issues we had on our side that delayed the delivery. Thanks team.' },
];

const LOGOS = [
  ['visa', '<span class="lg-visa">VISA</span>'],
  ['microsoft', '<span class="lg-ms"><i></i><i></i><i></i><i></i></span><span class="lg-ms-t">Microsoft</span>'],
  ['buddha', '<span class="lg-buddha-m">✦</span><span class="lg-buddha">SUPER BUDDHA<br>STUDIOS</span>'],
  ['remax', '<span class="lg-remax">RE/MAX</span>'],
  ['redbull', '<span class="lg-rb">Red Bull</span>'],
  ['warnert', '<span class="lg-warnert">WARNERT</span>'],
  ['nothing', '<span class="lg-nothing">NOTHING</span>'],
  ['scoreapp', '<span class="lg-score-m">S</span><span class="lg-score">ScoreApp</span>'],
  ['sony', '<span class="lg-sony">SONY</span>'],
];

const STATS = [
  { n: 50, pre: '$', suf: 'M+', label: 'Raised by clients using our pitch decks', tone: 'purple', art: 'chart' },
  { n: 500, suf: '+', label: 'Branding projects', tone: 'flame', art: 'swatch' },
  { n: 400, suf: '+', label: 'Web development projects', tone: 'leaf', art: 'browser' },
  { n: 300, suf: '+', label: 'Motion & post-production projects', tone: 'aqua', art: 'video' },
  { n: 90, suf: '%+', label: 'Client retention', tone: 'sky', art: 'retention' },
];

const PROCESS = [
  ['Align', 'We define the goal, audience, market context, product needs, and communication priorities.', ['Discovery call', 'Goals & audience brief', 'Success measures']],
  ['Plan', 'We map scope, milestones, owners and deliverables so everyone knows what ships and when.', ['Scope & milestones', 'Timeline & owners', 'Content plan']],
  ['Design', 'We explore directions, refine the strongest one and build the system across every touchpoint.', ['Creative directions', 'Design system', 'Feedback rounds']],
  ['Build & Produce', 'We develop, animate and produce final assets, with regular check-ins and quality reviews.', ['Development & motion', 'Quality reviews', 'Weekly check-ins']],
  ['Launch & Support', 'We hand over files, launch with you and stay on for updates, iterations and new requests.', ['Launch & handover', 'Editable source files', 'Ongoing iterations']],
];

const PLANS = [
  { name: 'Launch', price: '$1,500', blurb: 'For businesses beginning to build a consistent creative pipeline.', req: '1 Active Request', cta: 'Choose Launch',
    lead: '', items: ['Unlimited Request Queue', 'Presentation Design', 'Graphic Design', 'Social Creatives', 'Marketing Collateral', 'Shared Creative Support', 'Creative Workspace'] },
  { name: 'Growth', price: '$2,750', blurb: 'For teams with consistent weekly creative demand.', req: '2 Active Requests', cta: 'Choose Growth', popular: true,
    lead: 'Everything in Launch, plus:', items: ['Dedicated Creative Support', 'Website & Digital Design', 'UI/UX Support', 'Limited Motion', 'Slack / Teams', 'Monthly Creative Review', 'Priority Support'] },
  { name: 'Partner', price: '$4,500', blurb: 'For businesses that need an extension of their internal creative department.', req: '3 Active Requests', cta: 'Build Your Creative Department',
    lead: '', items: ['Dedicated Creative Team', 'Dedicated Creative Lead', 'Presentation Design', 'Branding Support', 'Graphic Design', 'Web & UI/UX', 'Video & Motion', 'Slack / Teams', 'Bi-weekly Creative Review', 'Priority Production'] },
];

/* ---------- Small builders ---------- */
const btn = (label, href, kind = 'primary', extra = '') =>
  `<a class="btn btn-${kind}" href="${href}" ${extra}><span>${label}</span><span class="btn-ico">${I.arrow}</span></a>`;

const eyebrow = t => `<p class="eyebrow">${t}</p>`;
const avatar = a => `<span class="avatar">${a.img ? `<img src="${a.img}" alt="">` : a.initials}</span>`;
const avatars = (n = 3, extra = '') => `<span class="avatars ${extra}" aria-hidden="true">${SITE.avatars.slice(0, n).map(avatar).join('')}</span>`;

function mock(p) {
  const screen = (cls = '') => `
    <div class="scr scr-${p.screen || 'dark'} ${cls}">
      <div class="scr-nav"><b>${p.brand || ''}</b><i></i><i></i><i></i></div>
      <p class="scr-h">${p.head || ''}</p>
      <div class="scr-lines"><i></i><i></i></div>
      <div class="scr-cta"><i></i><i></i></div>
    </div>`;
  let inner = '';
  switch (p.mock) {
    case 'monitor': inner = `<div class="dev dev-monitor">${screen()}<span class="stand"></span></div>`; break;
    case 'laptop': inner = `${p.over ? `<span class="mock-over">${p.over}</span>` : ''}<div class="dev dev-laptop">${screen()}<span class="base"></span></div>`; break;
    case 'phone': inner = `<div class="dev dev-phone"><span class="notch"></span>${screen('scr-tall')}</div>`; break;
    case 'logo': inner = `<div class="mock-logo mark-${p.mark}"><span class="mark"></span><p>${p.logo}</p></div>`; break;
    case 'book': inner = `<div class="dev dev-book"><div class="cover"><small>${p.brand}</small><p>${p.head}</p><span></span></div><div class="pages"></div></div>`; break;
    case 'reels': inner = `<div class="mock-reels"><div class="reel r1"><span>Finance</span></div><div class="reel r2"><span class="face"></span><p>${p.head}</p><em>${p.brand}</em></div><div class="reel r3"><span>Lifestyle</span></div></div>`; break;
  }
  return `<div class="mock bg-${p.bg}">${p.img ? `<img src="${p.img}" alt="${p.title}" loading="lazy">` : inner}</div>`;
}

const catLabel = k => (CATEGORIES.find(x => x[0] === k) || [k, k])[1]; // looked up at render time
const projectCard = p => `
  <article class="work-card" data-cat="${p.cat}" data-id="${p.id}">
    <button class="work-media" type="button" aria-label="View ${p.title}" data-cursor="View project">
      <span class="work-frame">${mock(p)}</span>
      <span class="work-tag"><span class="wt-label">${p.title} / ${catLabel(p.cat)}</span><span class="wt-view">View project ↗</span></span>
    </button>
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
  </article>`;

function serviceScene(s) {
  switch (s.scene) {
    case 'brand': return `
      <div class="scene scene-brand"><span class="branch b1"></span><span class="branch b2"></span>
        <div class="layer prod" data-depth="18"><div class="prod-top"><span class="dial">${'<svg viewBox="0 0 24 24"><path d="M12 5 6 18h2.5L12 10l3.5 8H18z" fill="currentColor"/></svg>'}</span></div><div class="prod-bot"><i></i><i></i><i></i><i></i><i></i></div></div>
        <div class="layer chip c1" data-depth="34"><span style="--c:#ff6a1a"></span><span style="--c:#111"></span><span style="--c:#f6f6f8"></span></div>
        <div class="layer chip c2" data-depth="42">Aa</div></div>`;
    case 'ui': return `
      <div class="scene scene-ui"><span class="rock"></span>
        <div class="layer dev dev-phone big" data-depth="20"><span class="notch"></span>
          <div class="scr scr-light scr-tall"><div class="scr-nav"><b>✺</b><i></i></div><span class="pill-tag">Features</span><p class="scr-h">Your Remote <em>Team’s</em> New Best Friend</p><div class="scr-cta"><i></i></div><div class="dash"><i></i><i></i><i></i><i></i></div></div></div>
        <div class="layer float-card fc1" data-depth="40">${I.cursor}<span>Prototype</span></div>
        <div class="layer float-card fc2" data-depth="30">${I.layers}<span>Design system</span></div></div>`;
    case 'web': return `
      <div class="scene scene-web">
        <div class="layer browser" data-depth="16"><div class="bar"><i></i><i></i><i></i><span>clicksone.agency</span></div>
          <div class="bw-body"><div class="bw-hero"><b></b><b></b><span></span></div><div class="bw-grid"><i></i><i></i><i></i></div></div></div>
        <div class="layer float-card fc1" data-depth="38">${I.chart}<span>+38% leads</span></div>
        <div class="layer float-card fc2" data-depth="28">${I.bolt}<span>98 performance</span></div></div>`;
    case 'deck': return `
      <div class="scene scene-deck">
        <div class="layer slide s3" data-depth="10"></div><div class="layer slide s2" data-depth="20"></div>
        <div class="layer slide s1" data-depth="32"><small>Series A</small><p>The Line Between Possibility and Reality</p><div class="bars"><i></i><i></i><i></i><i></i></div></div>
        <div class="layer float-card fc1" data-depth="44">${I.chart}<span>$3.2M raised</span></div></div>`;
    case 'book': return `
      <div class="scene scene-book">
        <div class="layer book3d" data-depth="22"><div class="cover"><small>A Novel</small><p>The Quiet Work</p><span></span></div><div class="pages"></div></div>
        <div class="layer page-spread" data-depth="12"><i></i><i></i><i></i><i></i><i></i></div></div>`;
    case 'video': return `
      <div class="scene scene-video">
        <div class="layer reel side l" data-depth="10"><span>Finance</span></div>
        <div class="layer reel mid" data-depth="26"><span class="face"></span><p>Fitness</p><em>Lukas - Talking Head</em><b class="playbtn">${I.play}</b></div>
        <div class="layer reel side r" data-depth="10"><span>Lifestyle</span></div></div>`;
  }
  return '';
}

const servicePanel = (s, i) => `
  <div class="svc-panel" id="${s.id}" data-index="${i}">
    <div class="svc-text">
      <p class="svc-count">0${i + 1} / 06</p>
      <h3>${s.name}</h3>
      <ul class="tags">${s.tags.map(t => `<li>${t}</li>`).join('')}</ul>
      <p class="svc-desc">${s.desc}</p>
      ${btn(s.cta, SITE.bookUrl)}
    </div>
    <div class="svc-visual" data-tilt>${serviceScene(s)}</div>
  </div>`;

// Service characters: one card each in "What We Do" (image in assets/characters/<img>.jpg)
const CHARACTERS = [
  { id: 'branding', img: 'branding', name: 'Branding & Brand Identity', cta: 'Build Your Brand',
    tags: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines', 'Rebranding'],
    desc: 'Brand identity design that gives your business a clear, recognizable look everywhere it shows up. We connect brand strategy, logo systems, color, typography and brand guidelines so your team communicates consistently from launch onward.' },
  { id: 'uiux', img: 'uiux', name: 'UI/UX Design', cta: 'Design Your Product',
    tags: ['UX Research', 'UI Design', 'Product Design', 'App Design', 'UX Audit'],
    desc: 'UI/UX design services that turn complex product ideas into interfaces people can use without friction. We combine user research, user flows, wireframes, prototypes and design systems for SaaS and digital product teams.' },
  { id: 'web', img: 'web', name: 'Website & Web Design', cta: 'Build Your Website',
    tags: ['Website Design', 'Web Development', 'Landing Pages', 'CMS Setup', 'Technical SEO'],
    desc: 'Website design and development that turns visitors into leads. We plan, design and build fast, responsive websites and landing pages your team can update without waiting on developers.' },
  { id: 'decks', img: 'presentation', name: 'Presentation Design', cta: 'Design Your Deck',
    tags: ['Pitch Decks', 'Investor Presentations', 'Keynote Decks', 'Sales Decks', 'Deck Templates'],
    desc: 'Pitch deck and presentation design that helps founders raise funding and win deals. We shape the story, structure and visuals of investor, sales and keynote presentations so every slide earns its place.' },
  { id: 'editorial', img: 'print', name: 'Print & Publication', cta: 'Design Your Publication',
    tags: ['Book Covers', 'Interior Layout', 'Magazines', 'Reports', 'Brochures'],
    desc: 'Print and editorial design that makes long-form content easy to read and good to look at. We design book covers, interior layouts, magazines, reports and brochures ready for print and digital.' },
  { id: 'motion', img: 'motion', name: 'Motion Graphics', cta: 'Animate Your Idea',
    tags: ['Explainer Animation', 'Logo Animation', '2D Motion', 'UI Motion', 'Kinetic Type'],
    desc: 'Motion graphics that make ideas move: animated explainers, logo animations, UI motion and social-ready loops that keep attention on your message from the first frame.' },
  { id: 'video', img: 'video', name: 'Video & Multimedia', cta: 'Create Your Video',
    tags: ['Video Editing', 'Talking-Head Edits', 'Reels & Shorts', 'Color & Sound', 'AI Video'],
    desc: 'Video editing services that turn raw footage, scripts and product screens into finished videos for every channel. We handle short- and long-form editing, motion graphics, 2D and 3D animation, VFX and AI video.' },
  { id: 'graphic', img: 'graphic', name: 'Graphic Design', cta: 'Start a Design Request',
    tags: ['Marketing Collateral', 'Infographics', 'Brochures', 'Posters', 'Brand Assets'],
    desc: 'Everyday design that keeps your brand consistent: marketing collateral, infographics, brochures, posters and brand assets, delivered quickly and always on-brand.' },
  { id: 'illustration', img: 'illustration', name: 'Illustration & Art', cta: 'Commission an Illustration',
    tags: ['Character Design', 'Icon Sets', 'Editorial Illustration', 'Product Illustration', 'Concept Art'],
    desc: 'Custom illustration that gives your brand a style no stock library can: characters, icons, editorial and product illustrations drawn for your story.' },
  { id: 'social', img: 'social', name: 'Social Media Design', cta: 'Grow Your Socials',
    tags: ['Post Templates', 'Carousels', 'Story Designs', 'Ad Creatives', 'Campaign Kits'],
    desc: 'Scroll-stopping social content: post and carousel templates, story designs, ad creatives and campaign kits that keep every channel looking like the same brand.' },
  { id: 'advertising', img: 'advertising', name: 'Advertising & Marketing', cta: 'Launch a Campaign',
    tags: ['Campaign Concepts', 'Paid Social Ads', 'Display Ads', 'Launch Assets', 'A/B Creative'],
    desc: 'Campaign creative built to convert: ad concepts, paid social and display creatives, and launch assets designed to be tested and improved across channels.' },
  { id: 'ecommerce', img: 'ecommerce', name: 'E-commerce Design', cta: 'Design Your Store',
    tags: ['Shopify Design', 'Product Pages', 'Store Banners', 'Checkout UX', 'Product Visuals'],
    desc: 'Online stores designed to sell: Shopify themes, product pages, store banners and checkout flows that make buying simple on every screen.' },
  { id: 'email', img: 'email', name: 'Email & Newsletter', cta: 'Design Your Emails',
    tags: ['Newsletter Templates', 'Email Campaigns', 'Automation Flows', 'Klaviyo & Mailchimp', 'Responsive Email'],
    desc: 'Emails people actually open: newsletter templates, product announcements and automated sequences designed to look right in every inbox.' },
  { id: 'fashion', img: 'fashion', name: 'Fashion & Apparel', cta: 'Design Your Collection',
    tags: ['Apparel Graphics', 'Lookbooks', 'Tech Packs', 'Labels & Tags', 'Campaign Visuals'],
    desc: 'Design for fashion brands: apparel graphics, lookbooks, tech packs, labels and campaign visuals that carry your collection from sketch to store.' },
];

// Our Work categories = the 14 service characters. Existing projects are mapped onto them.
const OLD_CAT = { pitch: 'decks', uiux: 'uiux', web: 'web', branding: 'branding', editorial: 'editorial', video: 'video' };
PROJECTS.forEach(p => { p.cat = OLD_CAT[p.cat] || p.cat; });
CATEGORIES.length = 0;
CATEGORIES.push(['all', 'All Work'], ...CHARACTERS.map(ch => [ch.id, ch.name]));
// Categories with fewer than four real projects are topped up with clearly labelled "coming soon" boxes.
const SOON_CARDS = CHARACTERS.flatMap(ch => {
  const have = PROJECTS.filter(p => p.cat === ch.id).length;
  return Array.from({ length: Math.max(0, 4 - have) }, (_, k) => ({ cat: ch.id, img: ch.img, name: ch.name, k }));
});
const soonCard = s => `
  <article class="work-card is-soon" data-cat="${s.cat}" data-soon>
    <a class="work-media soon-media" href="${SITE.bookUrl}" aria-label="Start a ${s.name} project" style="--pos:50% ${[14, 42, 70, 28][s.k % 4]}%">
      <span class="work-frame"><img src="assets/characters/${s.img}.jpg" alt="" loading="lazy" decoding="async"></span>
      <span class="work-tag"><span class="wt-label">${s.name}</span><span class="wt-view">Start a project ↗</span></span>
      <span class="soon-badge">Case study coming soon</span>
    </a>
    <h3>${s.name}</h3>
    <p>New ${s.name.toLowerCase()} work is being added here. Want your project to be next?</p>
  </article>`;

// "Meet the team" ring for the work section: characters circle slowly; clicking one shows its details
const workOrbit = () => `
  <div class="w-orbit reveal">
    <div class="wo-stage">
      <div class="wo-ring">
        ${CHARACTERS.map((ch, i) => `<button type="button" class="wo-dot${i === 0 ? ' is-active' : ''}" style="--a:${(i * 360 / CHARACTERS.length).toFixed(2)}deg" data-i="${i}" aria-label="${ch.name}" aria-pressed="${i === 0}"><span class="wo-face"><img src="assets/characters/${ch.img}.jpg" alt="" loading="lazy" decoding="async"></span></button>`).join('')}
      </div>
      <div class="wo-center"><img class="wo-hero" src="assets/characters/${CHARACTERS[0].img}.jpg" alt="" decoding="async"><span class="wo-center-ring" aria-hidden="true"></span></div>
    </div>
    <div class="wo-panel" aria-live="polite">
      <p class="eyebrow">Meet the team</p>
      <p class="wo-count">01 / ${String(CHARACTERS.length).padStart(2, '0')}</p>
      <h3 class="wo-name">${CHARACTERS[0].name}</h3>
      <p class="wo-desc">${CHARACTERS[0].desc}</p>
      <ul class="tags wo-tags">${CHARACTERS[0].tags.map(t => `<li>${t}</li>`).join('')}</ul>
      <div class="wo-actions">
        <button type="button" class="btn btn-primary wo-view"><span>See This Work</span><span class="btn-ico">${I.arrow}</span></button>
        <a class="btn btn-ghost btn-solo" href="${SITE.bookUrl}">Start a Project</a>
      </div>
      <p class="wo-hint">Click a character on the circle to meet them.</p>
    </div>
  </div>`;

const serviceCard = (s, i) => `
  <article class="svc-card char-card" id="${s.id}" style="--i:${i}">
    <div class="svc-card-in">
      <div class="svc-c-text">
        <p class="svc-c-n">${String(i + 1).padStart(2, '0')} / ${String(CHARACTERS.length).padStart(2, '0')}</p>
        <h3>${s.name}</h3>
        <ul class="tags">${s.tags.map(t => `<li>${t}</li>`).join('')}</ul>
        <p class="svc-desc">${s.desc}</p>
        ${btn(s.cta, SITE.bookUrl, 'primary')}
      </div>
      <div class="char-visual" data-tilt>
        <div class="layer char-layer" data-depth="22"><img src="assets/characters/${s.img}.jpg" alt="${s.name} character" width="1024" height="1536" loading="lazy" decoding="async"></div>
        <span class="char-glow" aria-hidden="true"></span>
        <span class="char-spark s1" aria-hidden="true"></span><span class="char-spark s2" aria-hidden="true"></span><span class="char-spark s3" aria-hidden="true"></span>
      </div>
    </div>
  </article>`;

/* ---------- Partials ---------- */
const PILLARS = [
  { cls: 'p-strategy', k: 'Strategy', h: 'Understand<br>the business', more: 'Goals, audience and market come first, so every design decision has a reason behind it.',
    pts: ['Business goals and audience', 'Market and competitor scan', 'A clear creative brief'],
    art: '<span class="beam"></span><span class="orbit o1"></span><span class="orbit o2"></span><span class="orbit o3"></span><span class="dot"></span>' },
  { cls: 'p-design', k: 'Design', h: 'Shape the<br>experience', more: 'Brand, product and content designed as one connected system that feels like the same company.',
    pts: ['Brand and visual system', 'Product and web interfaces', 'Decks, editorial and motion'],
    art: '<span class="disc"></span><span class="sq"></span><span class="gx"></span><span class="gy"></span><span class="node"></span>' },
  { cls: 'p-exec', k: 'Execution', h: 'Build and<br>deliver it', more: 'Developed, animated and delivered on schedule, with files your team can launch and keep using.',
    pts: ['Development and animation', 'Quality checks before launch', 'Files your team keeps using'],
    art: '<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="rib" x1="0" x2="1"><stop offset="0" stop-color="#7B2CBF"/><stop offset="1" stop-color="#8A2BE2"/></linearGradient></defs><path class="ribbon" d="M40 300 C 60 160, 120 40, 190 60 S 230 200, 300 150 S 360 110, 400 115" fill="none" stroke="url(#rib)" stroke-width="26" stroke-linecap="round"/></svg><span class="flare"></span><span class="ring"></span>' },
];
const fbLeft = k => { const x = PILLARS[k]; return `
  <div class="pillar ${x.cls} fb-pillar is-in">
    <div class="pillar-art">${x.art}</div>
    <p class="fb-num">0${k + 1}</p>
    <p class="pillar-k">${x.k}</p>
    <h3>${x.h}</h3>
  </div>`; };
const fbRight = k => { const x = PILLARS[k]; return `
  <div class="fb-text">
    <p class="fb-lead">${x.more}</p>
    <ul>${x.pts.map(t => `<li>${I.check}${t}</li>`).join('')}</ul>
    <p class="fb-foot"><span>${x.k}</span><span>${k + 1} / ${PILLARS.length}</span></p>
  </div>`; };

let ctaN = 0;
const PARTIALS = {
  header: (page) => {
    const link = (href, label, key) => `<a href="${href}" class="nav-link${page === key ? ' is-current' : ''}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`;
    return `
<header class="site-header" id="top">
  <div class="nav-bar">
    <div class="nav-in">
      <a class="logo" href="index.html" aria-label="Clicksone home"><img class="logo-img" src="assets/brand/wordmark-light.png" alt="Clicksone" width="141" height="36"></a>
      <nav class="nav" aria-label="Main">
        <span class="nav-glide" aria-hidden="true"></span>
        ${link('about.html', 'About Us', 'about')}
        <div class="nav-dd">
          <button class="nav-link dd-btn${page === 'services' ? ' is-current' : ''}" type="button" aria-expanded="false" aria-controls="dd-services">Services ${I.chev}</button>
          <div class="dd-panel" id="dd-services">
            ${SERVICES.map((s, i) => `<a href="services.html#${s.id}" style="--k:${i}"><span>0${i + 1}</span>${s.name}</a>`).join('')}
            <a class="dd-all" href="services.html" style="--k:6">All Services ${I.arrow}</a>
          </div>
        </div>
        ${link('work.html', 'Our Work', 'work')}
        ${link('app.html', 'App', 'app')}
        ${link('blogs.html', 'Blogs', 'blogs')}
        ${link('contact.html', 'Contact Us', 'contact')}
      </nav>
      <div class="header-cta">
        <a class="nav-book" href="${SITE.bookUrl}">${avatar(SITE.avatars[0])}<span>Book a call</span><i class="nb-dot" aria-hidden="true"></i></a>
        <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">${I.menu}</button>
      </div>
    </div>
    <span class="nav-progress" aria-hidden="true"></span>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden data-lenis-prevent>
    <nav class="container" aria-label="Mobile">
      <a href="index.html" style="--k:0">Home</a>
      <a href="about.html" style="--k:1">About Us</a>
      <details style="--k:2"><summary>Services ${I.chev}</summary>${SERVICES.map(s => `<a href="services.html#${s.id}">${s.name}</a>`).join('')}<a href="services.html">All Services</a></details>
      <a href="work.html" style="--k:3">Our Work</a>
      <a href="app.html" style="--k:4">App</a>
      <a href="blogs.html" style="--k:5">Blogs</a>
      <a href="contact.html" style="--k:6">Contact Us</a>
      ${btn('Book a Call', SITE.bookUrl, 'primary', 'style="--k:7"')}
    </nav>
  </div>
</header>`;
  },

  pill: () => `
<div class="book-pill is-hidden" role="complementary" aria-label="Book a call">
  <span class="bp-dot" aria-hidden="true"></span>
  <span class="bp-text">Let’s discuss your project.</span>
  ${avatars(3, 'bp-av')}
  <a class="bp-cta" href="${SITE.bookUrl}"><span>Book a call</span><span class="coin">${I.phone}</span></a>
  <button class="bp-x" type="button" aria-label="Hide this bar">${I.close}</button>
</div>`,

  // "Book an intro call" text link used in the home hero.
  'intro-link': () => `<a class="intro-link" href="${SITE.bookUrl}"><span class="avatars" aria-hidden="true"><span class="avatar logo-av"><img src="assets/brand/emblem.png" alt=""></span>${avatar(SITE.avatars[0])}</span><span>Book an intro call</span><span class="coin">${I.phone}</span></a>`,

  // Slim client marquee for the bottom of the home hero (separate from the shuffling logo wall).
  'hero-logos': () => `
<div class="hero-logos" aria-label="Clients: ${LOGOS.map(([k]) => k).join(', ')}">
  <div class="hl-track">${LOGOS.map(([k, html]) => `<span class="logo-inner lg-${k}" aria-hidden="true">${html}</span>`).join('')}${LOGOS.map(([k, html]) => `<span class="logo-inner lg-${k} dup" aria-hidden="true">${html}</span>`).join('')}</div>
</div>`,

  'cta-banner': () => {
    return `
<section class="section-tight">
  <div class="container">
    <div class="cta-pro reveal">
      <span class="cp-grid" aria-hidden="true"></span>
      <span class="cp-spot" aria-hidden="true"></span>
      <div class="cta-banner cp-inner">
        <p class="cp-pill"><span class="cp-dot" aria-hidden="true"></span>Book a call · Reply within 24 hours</p>
        <h2>Need More Than <span class="cp-hl">One Service?</span></h2>
        <p class="cp-text">Combine brand, product, web, presentations, editorial, and video support around one connected project.</p>
        <div class="cp-actions">
          ${btn('Start a Project', SITE.bookUrl, 'primary', 'data-magnetic')}
          <a class="btn btn-glass btn-solo" href="work.html">See Our Work</a>
        </div>
        <p class="cp-team"><span>14 specialists. One connected team.</span></p>
      </div>
    </div>
  </div>
</section>`;
  },

  slider: (o = {}) => {
    const rowA = ['redbull', 'basedrop', 'goldenline', 'roshan', 'freight', 'lending'];
    const rowB = ['ageofai', 'nothing', 'remote', 'cambridge', 'editorial', 'reels'];
    const icons = [I.pen, I.layers, I.play, I.spark, I.cursor, I.chart];
    const card = (id, k) => {
      const p = PROJECTS.find(x => x.id === id);
      const ic = k % 2 === 0 ? `<span class="float-ico fi-a" style="--fd:${k * .4}s">${icons[k % icons.length]}</span>` : '';
      const ic2 = k % 3 === 1 ? `<span class="float-ico fi-b" style="--fd:${k * .3}s">${icons[(k + 2) % icons.length]}</span>` : '';
      return `<a class="slide-card" href="work.html#${p.id}" tabindex="-1">${mock(p)}${ic}${ic2}<span class="sr-only">${p.title}</span></a>`;
    };
    const row = (ids, dir) => `
      <div class="marquee marquee-${dir}">
        <div class="marquee-track">${[...ids, ...ids].map((id, k) => card(id, k)).join('')}</div>
      </div>`;
    return `<section class="slider${o.showreel ? ' showreel' : ''}" aria-label="Selected projects">${row(rowA, 'left')}${row(rowB, 'right')}</section>`;
  },

  logos: () => `
<section class="section logos-sec">
  <div class="container">
    <div class="center-head reveal">
      <h2>A Full-Service Creative Agency, One Connected Team</h2>
      <p>One agency. One integrated workflow. More results, less vendor chaos.</p>
    </div>
    <ul class="logo-wall reveal" aria-label="Clients">
      ${LOGOS.map(([k, html]) => `<li class="logo-tile" data-logo="${k}"><span class="logo-inner lg-${k}">${html}</span></li>`).join('')}
    </ul>
  </div>
</section>`,

  work: (opts = {}) => `
<section class="section" id="work">
  <div class="container">
    ${opts.noHead ? '' : `<div class="split-head work-head">
      <div class="reveal">${eyebrow('Our Work')}<h2>Recent Work From Our <span class="muted">Creative Design Agency</span></h2></div>
      <p class="lead reveal" style="--d:.1s">Websites, brands, products and decks we’ve designed and built for startups and growing companies.</p>
    </div>`}
    ${opts.orbit ? workOrbit() : ''}
    <div class="tabs reveal" role="tablist" aria-label="Filter work by category">
      <span class="tab-ind" aria-hidden="true"></span>
      ${CATEGORIES.map(([k, l], i) => `<button role="tab" type="button" class="tab${i === 0 ? ' is-active' : ''}" aria-selected="${i === 0}" data-filter="${k}">${l}</button>`).join('')}
    </div>
    <div class="work-grid" data-limit="${opts.limit || 0}" data-per-page="${opts.perPage || 0}">${PROJECTS.map(projectCard).join('')}${SOON_CARDS.map(soonCard).join('')}</div>
    ${opts.limit ? `<div class="work-more"><a class="btn btn-ghost btn-solo" href="work.html">View More Work</a></div>`
      : opts.perPage ? `<div class="work-more"><button class="btn btn-ghost btn-solo work-load" type="button">View More Work</button></div>` : ''}
  </div>
</section>
<dialog class="work-modal" aria-label="Project details" data-lenis-prevent>
  <button class="modal-x" type="button" aria-label="Close">${I.close}</button>
  <div class="modal-media"></div>
  <div class="modal-body"><p class="eyebrow modal-cat"></p><h3></h3><p class="modal-desc"></p>${btn('Start a Similar Project', SITE.bookUrl)}</div>
</dialog>`,

  // Rotating "See more work" ring (replaces the old View More Work button on home)
  'more-work': () => {
    const ids = ['redbull', 'nothing', 'ageofai', 'basedrop', 'goldenline', 'roshan', 'freight', 'lending', 'cambridge', 'editorial', 'remote', 'reels'];
    return `
<section class="more-work" aria-label="See more work">
  <div class="mw-ring">${ids.map((id, i) => { const p = PROJECTS.find(x => x.id === id); return `<a class="mw-thumb" href="work.html#${id}" style="--a:${i * 360 / ids.length}deg" data-cursor="${p.title}" aria-label="${p.title}"><span class="mw-in">${mock(p)}</span></a>`; }).join('')}</div>
  <a class="mw-link" href="work.html"><span>See more</span><span>work</span></a>
</section>`;
  },

  about: () => `
<section class="section" id="about">
  <div class="container">
    <div class="split-head">
      <div class="reveal">
        ${eyebrow('About Us')}
        <h2>A Digital Creative Agency for <span class="muted">Branding, Websites, Digital Products, and Motion Design</span></h2>
        <a class="btn btn-ghost btn-solo" href="about.html">Learn More About Us</a>
      </div>
      <p class="lead reveal" style="--d:.1s"><strong>Clicksone®</strong>&nbsp; Founded in 2024 as a pitch deck studio, Clicksone is now a full-service creative agency of 20+ designers, developers and video editors. We help startups and growing companies raise funding, launch products, improve conversions and build stronger brands, through pitch decks, websites, product design, branding and video.</p>
    </div>
    <div class="fb-stage">
      <div class="flipbook" aria-hidden="true">
        <div class="fb-page fb-left">${fbLeft(0)}</div>
        <div class="fb-page fb-right">${fbRight(2)}</div>
        <div class="fb-leaf" style="z-index:3"><div class="fb-face fb-front">${fbRight(0)}</div><div class="fb-face fb-back">${fbLeft(1)}</div></div>
        <div class="fb-leaf" style="z-index:2"><div class="fb-face fb-front">${fbRight(1)}</div><div class="fb-face fb-back">${fbLeft(2)}</div></div>
        <span class="fb-spine"></span>
      </div>
      <div class="fb-steps" role="group" aria-label="Choose a page">${PILLARS.map((x, k) => `<button type="button" class="fb-step${k === 0 ? ' is-active' : ''}" aria-pressed="${k === 0}"><b>0${k + 1}</b>${x.k}</button>`).join('')}</div>
    </div>
    <div class="pillars-list">
      ${PILLARS.map((x, k) => `<article class="pl-item"><p class="pl-k"><b>0${k + 1}</b> ${x.k}</p><h3>${x.h.replace('<br>', ' ')}</h3><p>${x.more}</p><ul>${x.pts.map(t => `<li>${t}</li>`).join('')}</ul></article>`).join('')}
    </div>
  </div>
</section>`,

  // Six services as pinned, stacked cards (home + services page). Keeps #branding, #uiux … anchors.
  services: (opts = {}) => `
<section class="section" id="${opts.listId || 'services'}">
  <div class="container">
    ${opts.noHead ? '' : `<div class="split-head">
      <div class="reveal">${eyebrow('What We Do')}<h2>Specialist Services. <span class="muted">One Connected Creative Agency.</span></h2></div>
      <p class="lead reveal" style="--d:.1s">Clicksone brings brand, product, presentation, web, editorial and video specialists into one creative agency. Start with the service you need now, and add others as your project grows.</p>
    </div>`}
    <div class="svc-stack">${CHARACTERS.map(serviceCard).join('')}</div>
  </div>
</section>`,

  impact: () => `
<section class="section" id="impact">
  <div class="container">
    <div class="split-head">
      <div class="reveal">${eyebrow('Impact')}<h2>6,250+ Projects. <span class="muted">Built for Real Business Goals.</span></h2></div>
      <p class="lead reveal" style="--d:.1s">From investor presentations and brand systems to websites, digital products, and motion-led content, Clicksone has delivered creative work across industries and markets.</p>
    </div>
    <div class="impact-grid" data-shuffle="false">
      ${STATS.map((s, i) => `
      <article class="stat tone-${s.tone} reveal" style="--d:${i * .08}s" data-tilt-card>
        <div class="stat-top"><span class="stat-idx">(0${i + 1})</span><span class="stat-live"><i></i>Results</span></div>
        <p class="stat-n" data-count="${s.n}" data-pre="${s.pre || ''}" data-suf="${s.suf}">${s.pre || ''}${s.n}${s.suf}</p>
        <p class="stat-l">${s.label}</p>
        <div class="stat-art art-${s.art}" aria-hidden="true">${statArt(s.art)}</div>
      </article>`).join('')}
    </div>
  </div>
</section>`,

  compare: () => {
    const cols = ['Strategic Alignment', 'Delivery Speed', 'Creative Flexibility', 'Quality Consistency', 'Scalable Value'];
    const rows = [
      ['Clicksone', 'One connected team instead of multiple vendors.', [1, 1, 1, 1, 1], true],
      ['In-House Team', 'Aligned, but slow and costly to scale.', [1, 0, 0, 1, 0]],
      ['Traditional Agency', 'Polished output, rigid scope and timelines.', [0, 0, 0, 1, 0]],
      ['Freelancers', 'Fast and flexible, inconsistent quality.', [0, 1, 1, 0, 0]],
      ['DIY & AI Tools', 'Cheap and quick, but generic results.', [0, 1, 0, 0, 1]],
    ];
    return `
<section class="section compare-sec">
  <div class="container">
    <div class="center-head reveal on-dark"><p class="eyebrow eyebrow-logo">Why <img src="assets/brand/wordmark-light.png" alt="Clicksone" width="86" height="22"></p><h2>One Team Instead of Five Trade-offs</h2></div>
    <div class="compare reveal">
      <div class="compare-scroll">
        <table>
          <thead><tr><th scope="col"><span class="sr-only">Option</span></th>${cols.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(([n, d, v, us]) => `<tr${us ? ' class="us"' : ''}><th scope="row"><b>${n}</b><small>${d}</small></th>${v.map((x, j) => `<td data-label="${cols[j]}">${x ? `<span class="yes" aria-label="Yes">${I.check}</span>` : `<span class="no" aria-label="No">${I.cross}</span>`}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </div>
</section>`;
  },

  process: () => `
<section class="section process-sec" id="process">
  <div class="container">
    <div class="split-head">
      <div class="reveal">${eyebrow('Process')}<h2>From Strategy to Launch, <span class="muted">Built as One Workflow</span></h2></div>
      <p class="lead reveal" style="--d:.1s">Five clear stages, one team. Hover over a stage to see what happens in it.</p>
    </div>
    <div class="process reveal">
      ${PROCESS.map(([t, d, outs], i) => `
      <article class="step${i === 0 ? ' is-open' : ''}" tabindex="0">
        <span class="step-n">0${i + 1}</span>
        <span class="step-big" aria-hidden="true">0${i + 1}</span>
        <div class="step-body">
          <h3>${t}</h3>
          <p>${d}</p>
          <ul class="step-out">${outs.map(o => `<li>${o}</li>`).join('')}</ul>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`,

  reach: () => `
<section class="section-tight" id="reach">
  <div class="container">
    <div class="reach">
      <div class="reach-glow" aria-hidden="true"></div>
      <div class="split-head on-dark">
        <div class="reveal">${eyebrow('Global Reach')}<h2>Trusted by Startups and Brands <span class="muted">Across the Globe</span></h2></div>
        <p class="lead reveal" style="--d:.1s">Clicksone works with startups, founders, product teams and growing companies across the USA, UK, Canada, Europe and the Middle East. Our remote-first workflow keeps brand, website, product, pitch deck and video projects clear, structured and easy to manage across time zones.</p>
      </div>
      <div class="reach-cards">
        <div class="reach-card reveal"><small>Who we work with</small><p class="big">Startups, founders, product teams and growing companies.</p></div>
        <div class="reach-card reveal" style="--d:.08s"><small>Where we work</small><div class="flags-row"><span class="flags">${FLAG.us}${FLAG.uk}${FLAG.ca}${FLAG.ae}</span><p class="big">USA, UK, Canada, Europe &amp; the Middle East.</p></div></div>
        <div class="reach-card reveal" style="--d:.16s"><small>How we work</small><p>A remote-first workflow with clear milestones, regular updates and calls scheduled across time zones.</p></div>
      </div>
      <div class="reach-stage">
        <div class="globe-col">
          <div class="globe-wrap">
            <canvas class="globe-canvas" aria-hidden="true"></canvas>
            <div class="globe-fallback" aria-hidden="true"></div>
            <div class="g-labels">
              ${GLOBE_PLACES.map(g => g.review >= 0
                ? `<button type="button" class="g-label${g.left ? ' g-left' : ''}${g.review === 0 ? ' is-active' : ''}" data-i="${g.review}" aria-label="Show the review from ${g.name}"><i></i><span>${FLAG[g.flag] || ''}<b class="gl-full">${g.name}</b><b class="gl-short">${g.short}</b></span></button>`
                : `<span class="g-label g-static${g.left ? ' g-left' : ''}"><i></i><span><b class="gl-full">${g.name}</b><b class="gl-short">${g.short}</b></span></span>`).join('')}
            </div>
          </div>
          <p class="g-hint">Click a country on the globe to read its review.</p>
        </div>
        <div class="rv" aria-roledescription="carousel" aria-label="Client reviews">
          <h2 class="reviews-title">What Clients Say <span class="muted">About Clicksone</span></h2>
          <div class="rv-top"><span class="stars" aria-label="5 out of 5 stars">★★★★★</span><span class="rv-count"><b>01</b> / 0${TESTIMONIALS.length}</span></div>
          <div class="rv-slides" aria-live="polite">
            ${TESTIMONIALS.map((t, i) => `
            <figure class="rv-slide${i === 0 ? ' is-active' : ''}"${i ? ' aria-hidden="true"' : ''}>
              <blockquote>${t.text}</blockquote>
              <figcaption><span class="flag">${FLAG[t.flag]}</span><span><b>${t.place}</b><small>${t.label}</small></span></figcaption>
            </figure>`).join('')}
          </div>
          <div class="rv-nav">
            <button type="button" class="rv-btn rv-prev" aria-label="Previous review">${I.arrow}</button>
            <button type="button" class="rv-btn rv-next" aria-label="Next review">${I.arrow}</button>
            <span class="rv-prog" aria-hidden="true"><i></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,

  pricing: () => `
<section class="section" id="pricing">
  <div class="container">
    <div class="split-head">
      <div class="reveal">${eyebrow('Pricing')}<h2>Flexible Creative Subscription Plans <span class="muted">Designed to Grow With Your Business</span></h2></div>
      <p class="lead reveal" style="--d:.1s">Get access to the creative expertise, dedicated support, and production capacity your business needs, all through one predictable monthly subscription. Need a one-off project instead? Projects are quoted separately.</p>
    </div>
    <div class="plans">
      ${PLANS.map((p, i) => `
      <article class="plan${p.popular ? ' popular is-focus' : ''} reveal" style="--d:${i * .08}s" tabindex="0">
        ${p.popular ? `<p class="plan-flag">${I.bolt} Most Popular</p>` : ''}
        <div class="plan-in">
          <h3>${p.name}</h3>
          <p class="price"><b>${p.price}</b><span>/ month</span></p>
          <p class="plan-blurb">${p.blurb}</p>
          <p class="req">${I.stack} ${p.req}</p>
          ${btn(p.cta, SITE.bookUrl)}
          <p class="inc">Includes</p>
          ${p.lead ? `<p class="inc-lead">${p.lead}</p>` : ''}
          <ul>${p.items.map(x => `<li>${I.check}${x}</li>`).join('')}</ul>
        </div>
      </article>`).join('')}
    </div>
    <p class="plans-hint" aria-live="polite">Plans highlight in turn. Click a plan to keep it selected.</p>
    <p class="plans-note reveal">Not sure which plan? <a href="${SITE.bookUrl}">Book a call ${I.arrow}</a></p>
  </div>
</section>`,

  'ask-ai': () => {
    const q = encodeURIComponent('What do clients say about Clicksone, the creative design agency (clicksone.agency)? Summarise their services, reviews and what makes them different.');
    return `
<section class="section-tight">
  <div class="container">
    <div class="ask reveal">
      <div>${eyebrow('Ask AI')}<h2>Still Unsure About Clicksone</h2></div>
      <div class="ask-r">
        <p>Let ChatGPT or Claude explore Clicksone for you.</p>
        <p>Click a button and see what AI says about us.</p>
        <div class="ask-btns">
          <a class="ai-btn" href="https://claude.ai/new?q=${q}" target="_blank" rel="noopener"><span class="ai-ico ai-claude"><svg viewBox="0 0 24 24"><g stroke="#fff" stroke-width="2.2" stroke-linecap="round">${[0,30,60,90,120,150].map(a => `<path d="M12 4v16" transform="rotate(${a} 12 12)"/>`).join('')}</g></svg></span>Ask Claude</a>
          <a class="ai-btn" href="https://chatgpt.com/?q=${q}" target="_blank" rel="noopener" style="--fd:.6s"><span class="ai-ico ai-gpt"><svg viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-width="1.7">${[0,60,120].map(a => `<ellipse cx="12" cy="12" rx="8" ry="3.6" transform="rotate(${a} 12 12)"/>`).join('')}</g></svg></span>Ask ChatGPT</a>
          <a class="ai-btn" href="https://www.perplexity.ai/search?q=${q}" target="_blank" rel="noopener" style="--fd:1.2s"><span class="ai-ico ai-pplx"><svg viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3v18M5 7l7 5 7-5M5 7v9l7-4 7 4V7M8 4.5v5M16 4.5v5"/></g></svg></span>Ask Perplexity</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
  },

  contact: () => `
<section class="contact-sec" id="contact">
  <div class="container">
    <div class="contact reveal">
      <div class="contact-l">
        ${eyebrow('Get in Touch')}
        <h2>Build the Brand, Website, Product, and Visual Story Behind Your Next Move</h2>
        <p>Clicksone is a creative design agency for startups, founders, product teams and small businesses that need strategy, design, development and video working together. From brand identity and websites to pitch decks, digital products and motion graphics, we build the creative system behind your next stage of growth.</p>
        <ul class="chips">
          <li>Expect a response within 24 hours.</li><li>NDA available upon request.</li>
          <li>Dedicated team of product specialists.</li><li>Clear timelines before work starts.</li>
        </ul>
      </div>
      <form class="contact-form" novalidate>
        <div class="row2">
          <label>Name<input name="name" type="text" placeholder="Jane Smith" autocomplete="name" required></label>
          <label>Email<input name="email" type="email" placeholder="Email" autocomplete="email" required></label>
        </div>
        <label>Service Type<select name="service" required><option value="">Select...</option>${SERVICES.map(s => `<option>${s.name}</option>`).join('')}<option>Creative Subscription</option><option>Not sure yet</option></select></label>
        <label>Estimated Budget<select name="budget" required><option value="">Select...</option><option>Under $2,500</option><option>$2,500 – $5,000</option><option>$5,000 – $10,000</option><option>$10,000 – $25,000</option><option>$25,000+</option></select></label>
        <label>Company<input name="company" type="text" placeholder="Company ( Optional )" autocomplete="organization"></label>
        <label>Message<textarea name="message" rows="4" placeholder="Message" required></textarea></label>
        <p class="reply-note">We reply within 24 hours.</p>
        <button class="submit" type="submit">Send My Enquiry</button>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>`,

  footer: () => `
<footer class="site-footer">
  <div class="container">
    <div class="f-top">
      <div><a class="logo" href="index.html" aria-label="Clicksone home"><img class="logo-img" src="assets/brand/wordmark-light.png" alt="Clicksone" width="141" height="36"></a>
        <p class="f-tag">Creative Design, Development &amp; Video Agency for Brands Ready to Lead Their Market.</p></div>
      <nav class="f-legal" aria-label="Legal">
        <a href="legal.html#refund">Refund Return</a><a href="legal.html#disclaimer">Disclaimer</a>
        <a href="legal.html#privacy">Privacy Policy</a><a href="legal.html#terms">Terms &amp; Conditions</a>
      </nav>
    </div>
    <div class="f-mid">
      <nav class="f-nav" aria-label="Footer">
        <a href="about.html">About Us</a><a href="services.html">Services</a><a href="work.html">Our Work</a>
        <a href="app.html">App</a><a href="blogs.html">Blogs</a><a href="contact.html">Contact Us</a>
      </nav>
      <div class="f-col"><h3>Contact Us</h3>
        <a href="mailto:${SITE.email}">${I.mail}${SITE.email}</a>
        <a href="tel:${SITE.phoneHref}">${I.phone}${SITE.phone}</a></div>
      <div class="f-col"><h3>Locations</h3>
        <p>Studio: Clicksone, 4th Floor, Damcon Tower, Plot#73, Executive Block Gulberg Green, Islamabad, 04403, Pakistan</p>
        <p>US Office: 1309 COFFEEN AVE STE 1200, SHERIDAN, WY, 82801, USA</p></div>
    </div>
    <div class="f-bot">
      <div class="socials">${Object.entries(SITE.social).map(([k, u]) => `<a href="${u}" aria-label="${k}" target="_blank" rel="noopener">${I[k]}</a>`).join('')}</div>
      <p>Copyright © 2026 Clicksone.<br>All Rights Reserved.</p>
    </div>
    <a class="f-email" href="mailto:${SITE.email}">${SITE.email}</a>
  </div>
</footer>`,
};

function statArt(a) {
  switch (a) {
    case 'chart': return `<div class="mini-card"><b>$50M+</b><small>+ $3.2M</small><svg viewBox="0 0 200 80"><polyline class="chart-line" pathLength="1" points="0,70 35,55 70,52 105,38 140,40 175,22 200,10" fill="none" stroke="#7B2CBF" stroke-width="3"/>${[[35,55],[70,52],[105,38],[140,40],[175,22]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff" stroke="#7B2CBF" stroke-width="2"/>`).join('')}</svg><div class="months"><i>Jan</i><i>Mar</i><i>May</i><i>Jul</i></div></div>`;
    case 'swatch': return `<div class="mini-card sw"><small>Colors</small><div class="sw-grid"><i style="--c:#f6e27a"></i><i style="--c:#ff9a9e"></i><i style="--c:#6aa7ff"></i><i style="--c:#ff7a2f"></i><i style="--c:#2d6a4f"></i><i style="--c:#111"></i></div><div class="dots"><i></i><i></i><i></i><i></i></div></div>`;
    case 'browser': return `<div class="mini-card br"><div class="bar"><i></i><i></i><i></i></div><p>Your Remote <em>Team’s</em><br>New Best Friend</p><div class="rows"><i></i><i></i><i></i></div></div>`;
    case 'video': return `<div class="mini-card vd"><div class="vd-screen"><span>Your Video here</span></div><div class="tl"><i></i><i></i><i></i></div></div>`;
    case 'retention': return `<div class="mini-card rt"><b>90%</b><small>Client Retention Rate</small><div class="bar"><i></i></div><ol><li>Alicia <span>★★★★★</span></li><li>Daniel <span>★★★★☆</span></li><li>Jason <span>★★★★★</span></li></ol></div>`;
  }
  return '';
}

window.CS = { CHARACTERS, GLOBE_PLACES, SITE, I, FLAG, SERVICES, CATEGORIES, PROJECTS, TESTIMONIALS, LOGOS, STATS, PROCESS, PLANS, PARTIALS, btn, mock, servicePanel };
})();
