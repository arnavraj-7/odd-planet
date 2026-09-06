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
  lines: ["BUILDING", "ATTENTION,", "INFLUENCE &"],
  accentLine: "CULTURE.",
  disciplines: "Influencer Marketing · Content Production · Digital Amplification",
  body:
    "We help brands connect with the right creators, produce impactful content and amplify it to the right audience.",
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
  { value: 500, suffix: "M+", label: "Views generated" },
  { value: 50, suffix: "+", label: "Brands served" },
  { value: 100, suffix: "K+", label: "Creator network" },
  { value: 1000, suffix: "+", label: "Campaigns executed" },
] as const;

export type Stat = (typeof stats)[number];

export const brands = [
  { name: "Starbucks", src: `${IMG}/brands_extracted/starbucks.png`, height: 28 },
  { name: "Michael Kors", src: `${IMG}/brands_extracted/michael_kors.png`, height: 21 },
  { name: "Converse", src: `${IMG}/brands_extracted/converse.png`, height: 24 },
  { name: "Domino's", src: `${IMG}/brands_extracted/dominos.png`, height: 26 },
  { name: "POND'S", src: `${IMG}/brands_extracted/ponds.png`, height: 24 },
  { name: "MG Motor", src: `${IMG}/brands_extracted/mg_motor.png`, height: 28 },
  { name: "Flipkart", src: `${IMG}/brands_extracted/flipkart.png`, height: 22 },
  { name: "KFC", src: `${IMG}/brands_extracted/kfc.png`, height: 28 },
  { name: "OPPO", src: `${IMG}/brands_extracted/oppo.png`, height: 21 },
  { name: "Swiggy Instamart", src: `${IMG}/brands_extracted/instamart.png`, height: 24 },
  { name: "Embassy of Sweden", src: `${IMG}/brands_extracted/embassy_of_sweden.png`, height: 32 },
  { name: "Ministry of Textiles", src: `${IMG}/brands_extracted/ministry_of_textiles.png`, height: 32 },
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
    href: "https://www.indiatodaygaming.com/amp/news/national/story/sweden-india-gaming-day-unites-nations-in-a-virtual-gaming-spectacle-3232",
  },
  {
    year: "2026",
    outlet: "Indian Startup Times",
    headline: "Trailblazing founders powering influencer agencies",
    context: "Founder feature",
    href: "https://www.indianstartuptimes.com/news/trailblazing-founders-powering-influencer-agencies-2026-edition/",
  },
  {
    year: "2025",
    outlet: "Tata Tele Business Services",
    headline: "Spotlighted in the #RozBanateHainNayaKal campaign",
    context: "MSME Day",
    href: "https://www.linkedin.com/posts/ojamaduji_rozbanatehainnayakal-msmeday-rozbanatehainnayakal-activity-7476900293880737792-0oM1",
  },
  {
    year: "2024",
    outlet: "Shark Tank India · PR mandate",
    headline: "Shaily Mehrotra, Fixderma — founder PR programme",
    stats: [
      { value: "15M+", label: "Views" },
      { value: "150+", label: "Deliverables" },
    ],
  },
];

export type Service = {
  index: string;
  name: string;
  description: string;
  model: string;
  bullets: string[];
  /** Card artwork. Unset until the client supplies it — the card then draws
   *  a hairline plate in its place. */
  image?: string;
};

export const services: Service[] = [
  {
    index: "01",
    name: "Influence",
    description:
      "Influencer marketing, creator partnerships, celebrity endorsements and long-term talent management.",
    model: "Always-on",
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
    description:
      "Content production, brand films, events and experiences, plus original IPs and series built for owned channels.",
    model: "Per project",
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
    description:
      "Social strategy, meme marketing, paid and organic digital campaigns, community building and PR outreach.",
    model: "Monthly retainer",
    bullets: [
      "Social media strategy",
      "Meme marketing",
      "Digital campaigns",
      "Community building",
      "PR & outreach",
    ],
  },
  {
    index: "04",
    name: "Quick commerce",
    description:
      "Consultancy and end-to-end management across marketplaces and dark stores, from listing to demand generation.",
    model: "Consult + manage",
    bullets: [
      "Consultancy & management",
      "End-to-end solutions",
      "Marketplace & dark-store growth",
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
    image: { src: `${IMG}/pdf_extracted/page13_img3.jpeg`, alt: "Maharani music video" },
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
    image: { src: `${IMG}/pdf_extracted/page18_img4.jpeg`, alt: "Sweden India Gaming Day" },
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
    image: { src: `${IMG}/reels_showcase/bevzilla_case.jpg`, alt: "Bevzilla campaign" },
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
    image: { src: `${IMG}/pdf_extracted/page14_img4.jpeg`, alt: "Starbucks campaign" },
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
    image: { src: `${IMG}/culture_collegerivals.jpg`, alt: "College Rivals" },
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
    image: { src: `${IMG}/culture_comiccon.jpg`, alt: "Comic Con India" },
    metrics: [
      { label: "SCOPE", value: "Build + talent" },
      { label: "FORMAT", value: "Festival" },
    ],
  },
  {
    index: "07",
    category: "Government",
    title: "Ministry of Textiles",
    description: "National handloom and heritage storytelling at scale.",
    variant: "logo",
    image: { src: `${IMG}/brands_extracted/ministry_of_textiles.png`, alt: "Ministry of Textiles" },
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

const realCreators: Creator[] = [
  {
    name: "Siddharth Nigam",
    role: "Actor & creator",
    brands: "Domino's · Max Fashion",
    socials: [], // TODO: profile URLs from the client
    image: `${IMG}/pdf_extracted/page6_img3.jpeg`,
  },
  {
    name: "Priyank Sharma",
    role: "Actor & creator",
    brands: "Allen Solly",
    socials: [], // TODO: profile URLs from the client
    image: `${IMG}/reels_showcase/priyank_creator.jpg`,
  },
  {
    name: "Vaibhav Arora",
    role: "Artist & creator",
    brands: "Michael Kors · AJIO",
    socials: [], // TODO: profile URLs from the client
    image: `${IMG}/reels_showcase/vaibhav_creator.jpg`,
  },
  {
    name: "Tanvi Malhara",
    role: "Fashion & dance",
    brands: "POND'S · Sunsilk",
    socials: [], // TODO: profile URLs from the client
    image: `${IMG}/pdf_extracted/page10_img1.jpeg`,
  },
  {
    name: "Tisca Chopra",
    role: "Actor & creator",
    brands: "SoTrue",
    socials: [], // TODO: profile URLs from the client
    image: `${IMG}/reels_showcase/tisca_creator.jpg`,
  },
  {
    name: "Mohit Chhetri",
    role: "Lifestyle creator",
    brands: "Flipkart · OPPO",
    socials: [], // TODO: profile URLs from the client
    image: `${IMG}/reels_showcase/mohit_creator.jpg`,
  },
  {
    name: "Karun & Nanku",
    role: "Music artists",
    brands: "Converse",
    socials: [], // TODO: profile URLs from the client
    image: `${IMG}/pdf_extracted/page9_img1.jpeg`,
  },
  {
    name: "Ishita Arora",
    role: "Food & lifestyle",
    brands: "Epigamia · Instamart",
    socials: [], // TODO: profile URLs from the client
    image: `${IMG}/pdf_extracted/page11_img1.jpeg`,
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
 * Once the design is approved and the client supplies assets, flip
 * USE_REAL_CONTENT to true.
 * ------------------------------------------------------------------ */

export const USE_REAL_CONTENT = false;

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

export const work: WorkCard[] = USE_REAL_CONTENT ? realWork : placeholderWork;

export const creators: Creator[] = USE_REAL_CONTENT
  ? realCreators
  : placeholderCreators;

export const founder = {
  name: "Tushar Goyal",
  title: "Founder & CEO",
  image: `${IMG}/team/oja.jpg`,
  // Icons render only for the URLs that exist. Instagram appears the moment
  // the client sends the handle.
  instagram: "",
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
    { ratio: "4 / 5", label: "Campaign 01" },
    { ratio: "1 / 1", label: "Campaign 02" },
    { ratio: "3 / 4", label: "Campaign 03" },
    { ratio: "4 / 3", label: "Campaign 04" },
    { ratio: "9 / 14", label: "Campaign 05" },
  ],
  [
    { ratio: "9 / 16", label: "Creator 01" },
    { ratio: "4 / 3", label: "Creator 02" },
    { ratio: "1 / 1", label: "Creator 03" },
    { ratio: "3 / 4", label: "Creator 04" },
    { ratio: "4 / 5", label: "Creator 05" },
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
