/**
 * Every string, link, roster and metric on the page lives here.
 * Sections map over this data — nothing hard-codes copy in JSX.
 *
 * NOTE: all `src` values point at a third-party GitHub Pages host and are
 * placeholders. Replace with client-supplied assets before launch.
 */

const IMG = "https://ajaystark.github.io/odd_planet/ad-agency/img";

export const site = {
  name: "Odd Planet",
  wordmark: "ODD PLANET",
  tagline: "WHERE ODDS ALIGN",
  founded: 2023,
  city: "New Delhi, India",
  email: "tushar@oddplanet.in",
  instagram: "https://www.instagram.com/oddplanet.in/",
  linkedin: "https://www.linkedin.com/company/odd-planet",
  founderLinkedin: "https://www.linkedin.com/in/ojamaduji/",
} as const;

export const navItems = [
  { id: "media", label: "Media" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "creators", label: "Creators" },
] as const;

export type NavItem = (typeof navItems)[number];

export const hero = {
  eyebrow: "Where odds align.",
  lines: ["WE MAKE BRANDS"],
  accentLine: "HARD TO IGNORE.",
  disciplines:
    "Influencer Marketing · Creator Partnerships · Content · Digital Amplification",
  body:
    "Influence, content & distribution built for brands that want attention and know what to do with it.",
  // Hero renders only on "/", so these stay bare anchors — a root-relative
  // href in a plain <a> would trigger a full reload instead of a scroll.
  primaryCta: { label: "View Our Work", href: "#work" },
  secondaryCta: { label: "Book a Discovery Call", href: "#contact" },
} as const;

/**
 * Client-confirmed figures. Written compactly to hold the type scale —
 * 500,000,000+ set at 50px would break the four-up band.
 */
export const stats = [
  { value: 500, suffix: "M+", label: "Content views" },
  { value: 50, suffix: "+", label: "Brands partnered" },
  { value: 100, suffix: "K+", label: "Creators in network" },
  { value: 1000, suffix: "+", label: "Campaigns delivered" },
] as const;

export type Stat = (typeof stats)[number];

/** `cap` is the logo's max height on its plate, banded by aspect. */
export const brands = [
  { name: "Starbucks", src: "/brands/starbucks.png", cap: "70%" },
  { name: "Michael Kors", src: "/brands/michael-kors.png", cap: "70%" },
  { name: "Converse", src: "/brands/converse.png", cap: "70%" },
  { name: "Domino's", src: "/brands/dominos.png", cap: "72%" },
  { name: "POND'S", src: "/brands/ponds.png", cap: "42%" },
  { name: "MG Motor", src: "/brands/mg-motor.png", cap: "72%" },
  { name: "KFC", src: "/brands/kfc.png", cap: "50%" },
  { name: "Swiggy Instamart", src: "/brands/instamart.png", cap: "72%" },
  { name: "Embassy of Sweden", src: "/brands/embassy-of-sweden.png", cap: "50%" },
  { name: "Max Fashion", src: "/brands/max-fashion.png", cap: "42%" },
  { name: "Allen Solly", src: "/brands/allen-solly.png", cap: "72%" },
  { name: "Sunsilk", src: "/brands/sunsilk.png", cap: "72%" },
  { name: "Epigamia", src: "/brands/epigamia.png", cap: "42%" },
  { name: "Bevzilla", src: "/brands/bevzilla.png", cap: "70%" },
  { name: "SoTrue", src: "/brands/sotrue.png", cap: "42%" },
  { name: "Scitron", src: "/brands/scitron.png", cap: "42%" },
  { name: "Fixderma", src: "/brands/fixderma.png", cap: "72%" },
] as const;

export type Brand = (typeof brands)[number];

export type PressItem = {
  year: string;
  outlet: string;
  headline: string;
  context?: string;
  href?: string;
  stats?: { value: string; label: string }[];
  /**
   * Artwork for the hover preview card. Left unset until the client supplies
   * screenshots — a live <iframe> of these outlets is not an option, they all
   * send X-Frame-Options / frame-ancestors and would render blank.
   */
  preview?: { src: string };
};

export const press: PressItem[] = [
  {
    year: "2025",
    outlet: "India Today Gaming",
    headline: "Sweden–India Gaming Day unites nations in a virtual gaming spectacle",
    context: "Embassy of Sweden",
    preview: { src: "/press/india-today-gaming.jpg" },
    href: "https://www.indiatodaygaming.com/amp/news/national/story/sweden-india-gaming-day-unites-nations-in-a-virtual-gaming-spectacle-3232",
  },
  {
    year: "2026",
    outlet: "Indian Startup Times",
    headline: "Trailblazing founders powering influencer agencies",
    context: "Founder feature",
    preview: { src: "/press/indian-startup-times.jpg" },
    href: "https://www.indianstartuptimes.com/news/trailblazing-founders-powering-influencer-agencies-2026-edition/",
  },
  {
    year: "2025",
    outlet: "Tata Tele Business Services",
    headline: "Spotlighted in the #RozBanateHainNayaKal campaign",
    context: "MSME Day",
    preview: { src: "/press/tata-tele.jpg" },
    href: "https://www.linkedin.com/posts/ojamaduji_rozbanatehainnayakal-msmeday-rozbanatehainnayakal-activity-7476900293880737792-0oM1",
  },
];

export type Service = {
  index: string;
  name: string;
  /** Always on the card. */
  tagline: string;
  /** Revealed with the bullets. */
  description: string;
  bullets: string[];
  /** Card artwork. Unset until the client supplies it — the card then draws
   *  a hairline plate in its place. */
  image?: string;
};

export const services: Service[] = [
  {
    index: "01",
    name: "Influence",
    tagline: "Creators that move attention.",
    description: "Put the right people behind the brand.",
    bullets: [
      "Influencer marketing",
      "Creator partnerships",
      "Celebrity endorsements",
      "Talent management",
    ],
  },
  {
    index: "02",
    name: "Create",
    image: "/services/create.jpg",
    tagline: "Content people want to watch.",
    description: "Turn a brief into something worth watching.",
    bullets: [
      "Content production",
      "Brand films",
      "Events & experiences",
      "Original IPs & series",
    ],
  },
  {
    index: "03",
    name: "Amplify",
    tagline: "Distribution that keeps it moving.",
    description: "Make good work travel further.",
    bullets: [
      "Narrative control",
      "Meme marketing",
      "Buzz marketing",
      "Community building",
      "PR & outreach",
    ],
  },
  {
    index: "04",
    name: "Manage",
    tagline: "An always-on team for the brand.",
    description:
      "Build, manage and scale your brand across the new retail ecosystem.",
    bullets: [
      "Quick-commerce strategy",
      "Marketplace management",
      "Catalogue optimisation",
      "Dark-store growth",
    ],
  },
];

export type WorkMetric = { label: string; value: string; href?: string };

export type WorkCard = {
  index: string;
  category: string;
  title: string;
  description: string;
  /** Omitted on placeholder cards — the card then draws a hairline plate. */
  image?: { src: string; alt: string };
  /** Logo cards render the image contained on a hairline plate instead of a cover crop. */
  variant?: "cover" | "logo";
  metrics: WorkMetric[];
};

const realWork: WorkCard[] = [
  {
    index: "01",
    category: "Music",
    title: "Maharani",
    description: "Spotify #1 viral song in India.",
    image: { src: "/work/maharani.jpg", alt: "Maharani music video" },
    metrics: [
      { label: "YOUTUBE", value: "42M+" },
      { label: "INSTAGRAM", value: "37M+" },
      { label: "STREAMS", value: "7.5M+" },
    ],
  },
  {
    index: "02",
    category: "Government",
    title: "Embassy of Sweden",
    description: "Sweden–India Gaming Day with a live influencer tournament.",
    image: { src: "/work/embassy-of-sweden.jpg", alt: "Sweden India Gaming Day" },
    metrics: [
      { label: "ATTENDEES", value: "500+" },
      { label: "PRESS", value: "India Today" },
      { label: "FORMAT", value: "On-ground" },
    ],
  },
  {
    index: "03",
    category: "Creator network",
    title: "Bevzilla",
    description: "Podcast, lifestyle and coffee creators activated at scale.",
    image: { src: "/campaigns/bevzilla.jpg", alt: "Bevzilla campaign creative" },
    metrics: [
      { label: "CREATORS / MO", value: "250+" },
      { label: "NICHES", value: "5+" },
      { label: "MODEL", value: "Retainer" },
    ],
  },
  {
    index: "04",
    category: "Experiential",
    title: "Starbucks",
    description: "Store launch campaign and social resonance.",
    image: { src: "/work/starbucks.jpg", alt: "Starbucks campaign" },
    metrics: [
      { label: "VIEWS", value: "100K+" },
      { label: "ENGAGEMENT", value: "3.1K+" },
      { label: "FORMAT", value: "Launch" },
    ],
  },
  {
    index: "05",
    category: "Gaming",
    title: "College Rivals",
    description: "Gaming creators plugged into student communities nationwide.",
    image: { src: "/work/college-rivals.jpg", alt: "College Rivals" },
    metrics: [
      { label: "VIEWS", value: "10M+" },
      { label: "LIKES", value: "80K+" },
      { label: "CAMPUSES", value: "Multi-city" },
    ],
  },
  {
    index: "06",
    category: "On-ground",
    title: "Comic Con India",
    description: "Booth production, brand activations and creator integrations.",
    image: { src: "/work/comic-con.jpg", alt: "Comic Con India" },
    metrics: [
      { label: "SCOPE", value: "Build + talent" },
      { label: "FORMAT", value: "Festival" },
    ],
  },
  {
    index: "07",
    category: "Brand movement",
    title: "Men Skincare Janta Party",
    description:
      "A three-phase guerrilla movement for Fixderma's men's range, staged as a protest with the brand hidden until the reveal. #SkincareKarleBhai trended on Twitter.",
    image: { src: "/campaigns/msjp.jpg", alt: "Men Skincare Janta Party campaign" },
    metrics: [
      { label: "VIEWS", value: "50M+" },
      { label: "ENGAGEMENT", value: "821K+" },
      { label: "DELIVERABLES", value: "649" },
    ],
  },
  {
    index: "08",
    category: "Creator network",
    title: "Fit Feast",
    description: "Lifestyle and fitness creators activated month on month.",
    image: { src: "/campaigns/fitfeast.jpg", alt: "Fit Feast campaign creative" },
    metrics: [
      { label: "MODEL", value: "Creators / month" },
      { label: "NICHES", value: "Lifestyle · Fitness" },
      { label: "SCOPE", value: "Always-on" },
    ],
  },
  {
    index: "09",
    category: "Government",
    title: "Ministry of Textiles",
    description: "National handloom and heritage storytelling at scale.",
    image: {
      src: "/campaigns/textiles-handloom.jpg",
      alt: "Textiles Committee handloom campaign creative",
    },
    metrics: [
      { label: "REEL 01", value: "423K+", href: "https://www.instagram.com/reel/DMuuOv1NrXv/" },
      { label: "REEL 02", value: "181K+", href: "https://www.instagram.com/reel/DM0BeCQt7H2/" },
      { label: "REEL 03", value: "309K+", href: "https://www.instagram.com/reel/DMpJRfZJ8hr/" },
    ],
  },
];

export type CreatorSocial = { label: string; href?: string };

export type Creator = {
  name: string;
  role: string;
  city?: string;
  /** Brand collaborations. Unlike a follower count, this does not go stale. */
  brands?: string;
  /**
   * Follower counts are deliberately not stored. A number baked into the page
   * is wrong the day after it is written, and reads badly when a creator's
   * audience moves. Link the profile and let the platform show the live figure.
   */
  socials: CreatorSocial[];
  /** Omitted on placeholder cards — the card then draws a hairline plate. */
  image?: string;
};

const ig = (handle: string) => `https://www.instagram.com/${handle}/`;
const yt = (handle: string) => `https://www.youtube.com/@${handle}`;

/**
 * The client's creator roster sheet, in full.
 *
 * Display names follow whichever of the sheet's NAME / SCREEN NAME columns the
 * Instagram handle actually matches — the two columns disagree on some rows.
 * Follower counts are in the sheet but deliberately not rendered; the profile
 * links carry the live figure instead. Portraits are the sheet's own cell
 * images, cropped to 3:4 and served from /public/creators.
 */
const realCreators: Creator[] = [
  {
    name: "Asmita Arora",
    role: "Fashion / Lifestyle",
    city: "Delhi",
    socials: [{ label: "Instagram", href: ig("Asmitarora") }, { label: "YouTube", href: yt("Asmitarora") }],
    image: "/creators/asmita-arora.jpg",
  },
  {
    name: "Himanshi Sharma",
    role: "Fashion / Lifestyle / Travel / Fitness",
    city: "Mumbai / Delhi",
    socials: [{ label: "Instagram", href: ig("Himanshii21") }],
    image: "/creators/himanshi-sharma.jpg",
  },
  {
    name: "Ishita Arora",
    role: "Fashion / Model",
    city: "Delhi / Bangalore",
    socials: [{ label: "Instagram", href: ig("ishitaaroraaa") }],
    image: "/creators/ishita-arora.jpg",
  },
  {
    name: "Manjul Khattar",
    role: "Fashion / Lifestyle",
    city: "Delhi NCR",
    socials: [{ label: "Instagram", href: ig("Manjullll") }, { label: "YouTube", href: yt("Manjullll") }],
    image: "/creators/manjul-khattar.jpg",
  },
  {
    name: "Piyush Manwani",
    role: "Lifestyle / Actor",
    city: "MP / Delhi / Mumbai",
    socials: [{ label: "Instagram", href: ig("piyush") }],
    image: "/creators/piyush-manwani.jpg",
  },
  {
    name: "Praveen Chaudhary",
    role: "Gaming / Lifestyle",
    city: "Delhi",
    socials: [{ label: "Instagram", href: ig("godpraveenfb") }, { label: "YouTube", href: yt("godpraveenyt1") }],
    image: "/creators/praveen-chaudhary.jpg",
  },
  {
    name: "Ranvir Narula",
    role: "Lifestyle / Entertainment",
    city: "Delhi",
    socials: [{ label: "Instagram", href: ig("Ranvirnarula") }],
    image: "/creators/ranvir-narula.jpg",
  },
  {
    name: "Rishabh Jaiswal",
    role: "Actor / Lifestyle",
    city: "Mumbai / Varanasi",
    socials: [{ label: "Instagram", href: ig("Rishabhjaiswalll") }],
    image: "/creators/rishabh-jaiswal.jpg",
  },
  {
    name: "Simba Nagpal",
    role: "Lifestyle / Actor",
    city: "Delhi / Mumbai",
    socials: [{ label: "Instagram", href: ig("simbanagpal") }],
    image: "/creators/simba-nagpal.jpg",
  },
  {
    name: "Tanvi Malhara",
    role: "Lifestyle / Actor",
    city: "Mumbai",
    socials: [{ label: "Instagram", href: ig("tanvi_malhara") }],
    image: "/creators/tanvi-malhara.jpg",
  },
  {
    name: "Tisca Chopra",
    role: "Actor",
    city: "Mumbai",
    socials: [{ label: "Instagram", href: ig("Tiscaofficial") }],
    image: "/creators/tisca-chopra.jpg",
  },
  {
    name: "Vaibhav Arora",
    role: "Fashion / Lifestyle / Travel",
    city: "Mumbai / Delhi",
    socials: [{ label: "Instagram", href: ig("Vaibhav_aroraa") }],
    image: "/creators/vaibhav-arora.jpg",
  },
  {
    name: "Varun Verma",
    role: "Fashion / Fitness / Lifestyle",
    city: "Delhi / Mumbai",
    socials: [{ label: "Instagram", href: ig("Varunverma") }],
    image: "/creators/varun-verma.jpg",
  },
  {
    name: "Nishu Tiwari",
    role: "Talent partnership",
    city: "Delhi",
    socials: [{ label: "Instagram", href: ig("inishutiwari") }, { label: "YouTube", href: yt("inishutiwari") }],
  },
  {
    name: "Major Rishabh Singh Sambyal",
    role: "Fitness / Lifestyle / Adventure",
    city: "Delhi",
    socials: [{ label: "Instagram", href: ig("major_rs_sambyal") }, { label: "YouTube", href: yt("ferrox_4sam") }],
  },
  {
    name: "Karan Kundrra",
    role: "Talent partnership",
    socials: [{ label: "Instagram", href: ig("kkundrra") }],
  },
  {
    name: "Tejasswi Prakash",
    role: "Talent partnership",
    socials: [{ label: "Instagram", href: ig("tejasswiprakash") }],
  },
  {
    name: "Aly Goni",
    role: "Talent partnership",
    socials: [{ label: "Instagram", href: ig("alygoni") }],
  },
  {
    name: "Jasmin Bhasin",
    role: "Talent partnership",
    socials: [{ label: "Instagram", href: ig("jasminbhasin2806") }],
  },
  {
    name: "Abhishek Kumar",
    role: "Talent partnership",
    socials: [{ label: "Instagram", href: ig("aebyborntoshine") }],
  },
  {
    name: "Samarth Jurel",
    role: "Talent partnership",
    socials: [{ label: "Instagram", href: ig("samarthjurel") }],
  },
  {
    name: "Prince Narula",
    role: "Talent partnership",
    socials: [{ label: "Instagram", href: ig("princenarula") }],
  },
  {
    name: "Yuvika Chaudhary",
    role: "Talent partnership",
    socials: [{ label: "Instagram", href: ig("yuvikachaudhary") }],
  },
  {
    name: "Sanjay Dutt",
    role: "Talent partnership",
    socials: [],
  },
  {
    name: "Sonu Sood",
    role: "Talent partnership",
    socials: [],
  },
  {
    name: "Bella",
    role: "Talent partnership",
    socials: [],
  },
  {
    name: "Bali",
    role: "Talent partnership",
    socials: [],
  },
  {
    name: "Krystle Dsouza",
    role: "Talent partnership",
    socials: [{ label: "Instagram", href: ig("krystledsouza") }],
  },
  {
    name: "Ridhi Dogra",
    role: "Talent partnership",
    socials: [],
  },
  {
    name: "Sanaya Irani",
    role: "Talent partnership",
    socials: [],
  },
  {
    name: "Niki Walia",
    role: "Talent partnership",
    socials: [],
  },
];

/* ------------------------------------------------------------------ *
 * Placeholder rosters.
 *
 * Work and Creators ship as structure-only placeholders while the client
 * signs off on type, colour and motion. Card counts, copy lengths and
 * geometry match the real thing so the layout reads true; no campaign
 * data and no unlicensed photography is shown.
 *
 * Creators now carry the real roster and photography. Work stays on
 * placeholders until the client signs off — flip USE_REAL_WORK to true.
 * ------------------------------------------------------------------ */

export const USE_REAL_WORK = true;
export const USE_REAL_CREATORS = true;

const placeholderWork: WorkCard[] = Array.from({ length: 7 }, (_, i) => ({
  index: String(i + 1).padStart(2, "0"),
  category: "Category",
  title: "Campaign title",
  description: "One line on what the campaign did and where it travelled.",
  metrics: [
    { label: "METRIC 01", value: "—" },
    { label: "METRIC 02", value: "—" },
    { label: "METRIC 03", value: "—" },
  ],
}));

const placeholderCreators: Creator[] = Array.from({ length: 8 }, (_, i) => ({
  name: "Creator name",
  role: `Role ${String(i + 1).padStart(2, "0")}`,
  socials: [{ label: "Instagram" }, { label: "YouTube" }],
}));

export const work: WorkCard[] = USE_REAL_WORK ? realWork : placeholderWork;

export const creators: Creator[] = USE_REAL_CREATORS
  ? realCreators
  : placeholderCreators;

export const founder = {
  name: "Tushar Goyal",
  title: "Founder & CEO",
  image: `${IMG}/team/oja.jpg`,
  // Icons render only for the URLs that exist. Instagram appears the moment
  // the client sends the handle.
  instagram: "https://www.instagram.com/ojamaduji/",
  linkedin: site.founderLinkedin,
} as const;

export type HeroTile = {
  /** CSS aspect-ratio. Mixed proportions are what give the column its rhythm. */
  ratio: string;
  label: string;
  src?: string;
};

/**
 * The two vertical columns beside the hero copy. They scroll in opposite
 * directions. Artwork is unset until the client supplies campaign stills, so
 * each tile currently draws a labelled plate at its own proportion.
 */
export const heroTiles: [HeroTile[], HeroTile[]] = [
  [
    { ratio: "9 / 16", label: "Ministry of Textiles", src: "/campaigns/textiles-handloom.jpg" },
    { ratio: "1 / 1", label: "Bevzilla", src: "/campaigns/bevzilla.jpg" },
    { ratio: "3 / 4", label: "POCO", src: "/campaigns/poco.jpg" },
    { ratio: "4 / 5", label: "Campaign", src: "/campaigns/campaign-b.jpg" },
  ],
  [
    { ratio: "3 / 4", label: "FitFeast", src: "/campaigns/fitfeast.jpg" },
    { ratio: "9 / 14", label: "SoTrue", src: "/campaigns/sotrue.jpg" },
    { ratio: "1 / 1", label: "Ministry of Textiles", src: "/campaigns/textiles-couple.jpg" },
    { ratio: "3 / 4", label: "Campaign", src: "/campaigns/campaign-a.jpg" },
  ],
];

export const footerLinks = {
  sections: [
    { label: "Media coverage", href: "/#media" },
    { label: "Services", href: "/#services" },
    { label: "Our work", href: "/#work" },
    { label: "Creator network", href: "/#creators" },
  ],
  follow: [
    { label: "Instagram", href: site.instagram },
    { label: "LinkedIn", href: site.linkedin },
    { label: "Founder", href: site.founderLinkedin },
  ],
} as const;
