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

/**
 * `id` items are sections on the home page and drive the scroll-spy.
 * `href` items are pages of their own.
 */
export const navItems = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "creators", label: "Creators" },
  { id: "media", label: "Media" },
  { href: "/about", label: "About" },
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
  // Hero renders only on "/", so a hash href stays a bare anchor — a plain <a>
  // to a root-relative path would reload instead of scrolling. The secondary
  // CTA leaves the page, so the hero routes that one through <Link>.
  primaryCta: { label: "View Our Work", href: "#work" },
  secondaryCta: { label: "About Us", href: "/about" },
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
  {
    year: "2024",
    outlet: "India Today Gaming",
    headline:
      "Gaming fusion with music at the ‘Baapji’ music launch",
    context: "Mohito · Music launch",
    preview: { src: "/press/baapji-launch.jpg" },
    href: "https://www.indiatodaygaming.com/news/national/story/gaming-fusion-with-music-at-baapji-music-launch-event-featuring-mc-square-godpraveen-ytmackle-tv-odd-planet-full-power-and-more-1-3760",
  },
  {
    year: "2024",
    outlet: "India Today Gaming",
    headline:
      "Delhi’s thrilling FIFA 11:11 event: sports, gaming and excitement at Belisario",
    context: "Belisario · On-ground",
    preview: { src: "/press/fifa-belisario.jpg" },
    href: "https://www.indiatodaygaming.com/news/story/delhis-thrilling-fifa-1111-event-sports-gaming-and-excitement-at-belisario-4030",
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
    image: "/services/influence.jpg",
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
    image: "/services/amplify.jpg",
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
    image: "/services/manage.jpg",
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

export type WorkMetric = {
  label: string;
  value: string;
  /** Optional qualifier under the label. */
  note?: string;
  href?: string;
};

/** Keys into the icon set the campaign card draws for "what we did". */
export type WorkDiscipline =
  | "content"
  | "influencer"
  | "creator"
  | "amplification"
  | "events"
  | "meme"
  | "ugc"
  | "strategy"
  | "onground"
  | "buzz"
  | "pr"
  | "social"
  | "engagement"
  | "positioning"
  | "celebrity"
  | "integration"
  | "execution"
  | "commerce"
  | "filmconcept"
  | "adfilm"
  | "casting"
  | "post"
  | "video";

export const disciplineLabels: Record<WorkDiscipline, string> = {
  content: "Content",
  influencer: "Influencer",
  creator: "Creators",
  amplification: "Amplification",
  events: "Events",
  meme: "Meme Marketing",
  ugc: "UGC Content",
  strategy: "Strategy",
  onground: "On-Ground",
  buzz: "Buzz Marketing",
  pr: "Shark Tank PR",
  social: "Social",
  engagement: "Engagement",
  positioning: "Positioning",
  celebrity: "Celebrity",
  integration: "Integration",
  execution: "Execution",
  commerce: "Quick Commerce",
  filmconcept: "Film Concept",
  adfilm: "Ad Films",
  casting: "Casting",
  post: "Post-Production",
  video: "Video Production",
};

export type WorkCard = {
  index: string;
  category: string;
  title: string;
  /** One line under the title. */
  tagline: string;
  description: string;
  /** Drawn as the "what we did" icon row. */
  did: WorkDiscipline[];
  /**
   * The work itself — the reel, the track, the film. Given one, the whole card
   * becomes a link to it.
   */
  href?: string;
  /** Heading over the figures — "Results", "Impact (monthly)", and so on. */
  resultsLabel?: string;
  /** "themes" sets the entries as titled points rather than big figures. */
  resultsStyle?: "figures" | "themes";
  /**
   * Omitted on placeholder cards — the card then draws a hairline plate.
   * `fit: "contain"` shows the whole frame over a blurred copy of itself, for
   * artwork a landscape crop would destroy (a full-bleed portrait poster).
   * `fit: "logo"` sits a mark on the plate with breathing room, no blur.
   */
  image?: { src: string; alt: string; fit?: "cover" | "contain" | "logo" };
  /** Logo cards render the image contained on a hairline plate instead of a cover crop. */
  variant?: "cover" | "logo";
  metrics: WorkMetric[];
};

/**
 * Campaign case cards.
 *
 * Metrics come from the client's deck and campaign reports. Taglines and the
 * longer descriptions are written to the same shape as the Maharani card the
 * client supplied — worth a read-through before launch.
 */
const realWork: WorkCard[] = [
  {
    index: "01",
    category: "Music",
    title: "Maharani",
    tagline: "A release built to travel.",
    description:
      "From content production to creator-led amplification, we helped take Maharani from release to massive digital attention.",
    did: ["content", "influencer", "creator", "amplification"],
    href: "https://open.spotify.com/track/7unLxuzKpxbjASww1qi4br",
    image: { src: "/work/maharani.jpg", alt: "Maharani music video" },
    metrics: [
      { label: "YouTube Views", value: "42M+" },
      { label: "Instagram Views", value: "37M+" },
      { label: "Streams", value: "7.5M+" },
    ],
  },
  {
    index: "02",
    category: "D2C / Personal Care",
    title: "Fixderma",
    tagline: "#SkincareKarLeBhai, a new conversation.",
    description:
      "The launch campaign for Menskincare Janta Party by Fixderma, a buzz-led movement making skincare a mainstream, no-judgement conversation for men.",
    did: ["strategy", "onground", "creator", "buzz"],
    image: {
      src: "/campaigns/fixderma-msjp.jpg",
      alt: "Fixderma #SkincareKarLeBhai campaign",
    },
    metrics: [
      { value: "10M+", label: "Campaign Reach", note: "Across digital & on-ground" },
      { value: "100K+", label: "Organic Mentions", note: "#SkincareKarLeBhai" },
      { value: "2.5M+", label: "Video Views", note: "Across creator & street content" },
      { value: "High", label: "Brand Recall", note: "Strong positive sentiment" },
    ],
  },
  {
    index: "03",
    category: "Founder PR",
    title: "Shaily Mehrotra",
    tagline: "Building visibility beyond the pitch.",
    description:
      "We managed Shaily Mehrotra's digital presence around her Shark Tank journey, driving content, audience engagement and PR-led visibility across platforms.",
    did: ["pr", "social", "strategy", "engagement"],
    image: { src: "/campaigns/shaily-mehrotra.jpg", alt: "Shaily Mehrotra, Fixderma" },
    metrics: [
      { value: "15M+", label: "Total Views" },
      { value: "200K+", label: "Total Engagement" },
      { value: "150+", label: "Content Deliverables" },
    ],
  },
  {
    index: "04",
    category: "Beauty",
    title: "Tisca Chopra × Sotrue",
    tagline: "Celebrity-led beauty, made to stand out.",
    description:
      "A celebrity endorsement campaign featuring Tisca Chopra to drive awareness and desirability for Sotrue Strobe Cream.",
    did: ["celebrity", "content", "integration"],
    href: "https://www.instagram.com/reel/DZU1cx3JG4p/",
    resultsLabel: "Impact",
    image: { src: "/campaigns/tisca-sotrue.jpg", alt: "Tisca Chopra for Sotrue" },
    metrics: [{ value: "57K+", label: "Instagram Views" }],
  },
  {
    index: "05",
    category: "Fashion",
    title: "Priyank Sharma × Allen Solly",
    tagline: "Everyday style, made effortless.",
    description:
      "A lifestyle-led creator narrative for Allen Solly with Priyank Sharma, blending fashion, personality and everyday moments into an authentic brand integration.",
    did: ["celebrity", "content", "integration", "execution"],
    href: "https://www.instagram.com/reel/DMsSHXMStF_/",
    resultsLabel: "Impact",
    image: {
      src: "/campaigns/priyank-allen-solly.jpg",
      alt: "Priyank Sharma for Allen Solly",
    },
    metrics: [{ label: "Views", value: "300K+" }],
  },
  {
    index: "06",
    category: "FMCG",
    title: "Bevzilla",
    tagline: "Creators brewing real impact.",
    description:
      "Large-scale influencer marketing and UGC for Bevzilla, with 250+ creators every month across multiple categories, driving awareness, engagement and sales.",
    did: ["influencer", "ugc"],
    resultsLabel: "Impact (monthly)",
    image: { src: "/campaigns/bevzilla.jpg", alt: "Bevzilla campaign creative" },
    metrics: [
      { label: "Creators Onboarded", value: "250+" },
      {
        label: "Lifestyle · Fitness · Food · Comics & more",
        value: "Multi-Category",
      },
    ],
  },
  {
    index: "07",
    category: "Government / Awareness",
    title: "Ministry of Textiles",
    tagline: "Real People. Real Craft. A Stronger Tomorrow.",
    description:
      "Three ad films for the Ministry of Textiles promoting the Handloom Mark: India's handloom heritage, the artisans behind it, and the value of choosing authentic handloom.",
    did: ["filmconcept", "adfilm", "casting", "post"],
    href: "https://www.instagram.com/reel/DM0BeCQt7H2/",
    image: {
      src: "/campaigns/textiles-logo.png",
      alt: "DCHL and Ministry of Textiles",
      fit: "logo",
    },
    metrics: [
      { label: "Pieces", value: "3+" },
      { label: "Views", value: "1M+" },
    ],
  },
  {
    index: "08",
    category: "Retail & F&B",
    title: "Starbucks",
    tagline: "A store opening, told the Starbucks way.",
    description:
      "On-ground content for the Starbucks store opening. Two films showing the brand experience, the ambience and the community, bringing in-store energy to digital.",
    did: ["onground", "video"],
    image: { src: "/work/starbucks.jpg", alt: "Starbucks campaign" },
    resultsLabel: "The impact",
    metrics: [
      { value: "2", label: "Signature Films", note: "Capturing the store experience" },
      { value: "200K+", label: "Total Organic Views", note: "Across both videos" },
    ],
  },
  {
    index: "09",
    category: "Nutrition / Influencer",
    title: "FitFeast",
    tagline: "Real Nutrition. Real People.",
    description:
      "Large-scale influencer marketing and UGC across fitness and lifestyle, showing how FitFeast fits real, everyday routines, from workouts to workdays.",
    did: ["influencer", "ugc", "content"],
    image: {
      src: "/campaigns/fitfeast.jpg",
      alt: "Fit Feast on the Shark Tank India set",
      fit: "contain",
    },
    resultsLabel: "Impact (monthly)",
    metrics: [
      { label: "Creators activated every month", value: "Creator Network" },
      { label: "Lifestyle · Fitness", value: "Multi-Category" },
    ],
  },
  {
    index: "10",
    category: "Fashion / Luxury",
    title: "Vaibhav Arora × Michael Kors",
    tagline: "Luxury, worn like it is nothing.",
    description:
      "A creator-led fashion narrative for Michael Kors with Vaibhav Arora, putting the label inside his own everyday style rather than beside it.",
    did: ["celebrity", "content", "integration"],
    href: "https://www.instagram.com/reel/DSKeW2kjP97/",
    resultsLabel: "Impact",
    image: {
      src: "/campaigns/vaibhav-michael-kors.jpg",
      alt: "Vaibhav Arora for Michael Kors",
    },
    metrics: [{ value: "700K+", label: "Views" }],
  },
  {
    index: "11",
    category: "Beauty",
    title: "Tanvi Malhara × Pond's",
    tagline: "Skin first, everything else after.",
    description:
      "A beauty integration for Pond's with Tanvi Malhara, kept honest and everyday. Routine, not performance.",
    did: ["celebrity", "content", "integration"],
    resultsLabel: "Impact",
    image: {
      src: "/campaigns/tanvi-ponds.jpg",
      alt: "Tanvi Malhara for Pond's",
    },
    metrics: [{ value: "22.6M+", label: "Views" }],
  },
  {
    index: "12",
    category: "E-commerce",
    title: "Mohit Chettri × Flipkart",
    tagline: "Shopping, told as a story.",
    description:
      "Creator-led content for Flipkart with Mohit Chettri, turning a shopping moment into something worth watching to the end.",
    did: ["creator", "content", "integration"],
    href: "https://www.instagram.com/reel/DMrreJ4xmWD/",
    resultsLabel: "Impact",
    image: {
      src: "/campaigns/mohit-flipkart.jpg",
      alt: "Mohit Chettri for Flipkart",
    },
    metrics: [{ value: "50K+", label: "Views" }],
  },
  {
    index: "13",
    category: "Beauty",
    title: "Tanvi Malhara × Sunsilk",
    tagline: "Hair that carries the frame.",
    description:
      "A hair-care campaign for Sunsilk with Tanvi Malhara, built around the one thing the camera cannot fake.",
    did: ["celebrity", "content", "integration"],
    resultsLabel: "Impact",
    image: {
      src: "/campaigns/tanvi-sunsilk.jpg",
      alt: "Tanvi Malhara for Sunsilk",
    },
    metrics: [{ value: "220K+", label: "Views" }],
  },
  {
    index: "14",
    category: "Tech",
    title: "Mohit Chettri × Oppo",
    tagline: "A phone, shown in use.",
    description:
      "A device integration for Oppo with Mohit Chettri, built around what the camera actually does rather than what the spec sheet says.",
    did: ["creator", "content", "integration"],
    href: "https://www.instagram.com/reel/DI1LbEqSo4k/",
    resultsLabel: "Impact",
    image: {
      src: "/campaigns/mohit-oppo.jpg",
      alt: "Mohit Chettri for Oppo",
    },
    metrics: [{ value: "450K+", label: "Views" }],
  },
  {
    // Awaiting copy, artwork and figures from the client.
    index: "15",
    category: "Nutrition",
    title: "Scitron",
    tagline: "Campaign details to follow.",
    description: "Copy and figures to come from the client.",
    did: [],
    image: {
      src: "/campaigns/scitron.jpg",
      alt: "Scitron whey protein range",
    },
    metrics: [],
  },
  {
    // Awaiting copy, artwork and figures from the client.
    index: "16",
    category: "Tech",
    title: "Ranvir Narula × Oppo",
    tagline: "Campaign details to follow.",
    description: "Copy, artwork and figures to come from the client.",
    did: [],
    metrics: [],
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
    image: "/creators/nishu-tiwari.jpg",
  },
  {
    name: "Major Rishabh Singh Sambyal",
    role: "Fitness / Lifestyle / Adventure",
    city: "Delhi",
    socials: [{ label: "Instagram", href: ig("major_rs_sambyal") }, { label: "YouTube", href: yt("ferrox_4sam") }],
    // Sat in the sheet as a floating image, not a cell image, so it was not in
    // the row-mapped export.
    image: "/creators/major-rishabh-singh-sambyal.jpg",
  },
  {
    name: "Karan Kundrra",
    role: "Actor / Lifestyle / Entertainment",
    socials: [{ label: "Instagram", href: ig("kkundrra") }],
    image: "/creators/karan-kundrra.jpg",
  },
  {
    name: "Tejasswi Prakash",
    role: "Actor / Fashion / Lifestyle",
    socials: [{ label: "Instagram", href: ig("tejasswiprakash") }],
    image: "/creators/tejasswi-prakash.jpg",
  },
  {
    name: "Aly Goni",
    role: "Actor / Lifestyle / Entertainment",
    socials: [{ label: "Instagram", href: ig("alygoni") }],
    image: "/creators/aly-goni.jpg",
  },
  {
    name: "Jasmin Bhasin",
    role: "Actor / Fashion / Beauty",
    socials: [{ label: "Instagram", href: ig("jasminbhasin2806") }],
    image: "/creators/jasmin-bhasin.jpg",
  },
  {
    name: "Abhishek Kumar",
    role: "Actor / Lifestyle / Entertainment",
    socials: [{ label: "Instagram", href: ig("aebyborntoshine") }],
    image: "/creators/abhishek-kumar.jpg",
  },
  {
    name: "Samarth Jurel",
    role: "Actor / Lifestyle / Fashion",
    socials: [{ label: "Instagram", href: ig("samarthjurel") }],
    image: "/creators/samarth-jurel.jpg",
  },
  {
    name: "Prince Narula",
    role: "Entertainer / Lifestyle / Music",
    socials: [{ label: "Instagram", href: ig("princenarula") }],
    image: "/creators/prince-narula.jpg",
  },
  {
    name: "Yuvika Chaudhary",
    role: "Actor / Lifestyle / Fashion",
    socials: [{ label: "Instagram", href: ig("yuvikachaudhary") }],
    image: "/creators/yuvika-chaudhary.jpg",
  },
  {
    name: "Sanjay Dutt",
    role: "Actor / Entertainment",
    socials: [],
    image: "/creators/sanjay-dutt.jpg",
  },
  {
    name: "Sonu Sood",
    role: "Actor / Entertainment",
    socials: [],
    image: "/creators/sonu-sood.jpg",
  },
  {
    name: "Bella",
    role: "Lifestyle / Fashion",
    socials: [],
    image: "/creators/bella.jpg",
  },
  {
    name: "Bali",
    role: "Lifestyle / Entertainment",
    socials: [],
    image: "/creators/bali.jpg",
  },
  {
    name: "Krystle D'Souza",
    role: "Actor / Fashion / Lifestyle",
    socials: [{ label: "Instagram", href: ig("krystledsouza") }],
    image: "/creators/krystle-dsouza.jpg",
  },
  {
    name: "Ridhi Dogra",
    role: "Actor / Lifestyle / Fashion",
    socials: [],
    image: "/creators/ridhi-dogra.jpg",
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
  tagline: "A line about the campaign.",
  description: "One line on what the campaign did and where it travelled.",
  did: ["content", "influencer", "creator"],
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

/** Client testimonials, verbatim from the agency's own deck. */
export const testimonials = [
  {
    quote:
      "They understood our brand and created a campaign that went beyond our expectations. Fantastic team!",
    name: "Aashna Sharma",
    role: "Brand Manager, POND'S",
  },
  {
    quote:
      "From ideation to execution, Odd Planet is our go-to partner for content and influencer marketing.",
    name: "Rohit Naik",
    role: "Marketing Lead, Red Bull",
  },
  {
    quote:
      "Odd Planet is a strong and influencer-friendly marketing agency. They have the most innovative ideas and are definitely one of the best organisations in the industry.",
    name: "Dr. Yashwanth A R",
    role: "TrueRippers Esports LLP",
  },
] as const;

export const founder = {
  name: "Tushar Goyal",
  title: "Founder & CEO",
  previously: "Former Program Manager, Meta Gaming",
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
 * The two vertical columns beside the hero copy, scrolling in opposite
 * directions. Every tile is campaign artwork, and each `ratio` matches its
 * image exactly so nothing is ever cropped in the column.
 */
export const heroTiles: [HeroTile[], HeroTile[]] = [
  [
    { ratio: "9 / 16", label: "Ministry of Textiles", src: "/hero/textiles-handloom.jpg" },
    { ratio: "16 / 9", label: "Fixderma", src: "/campaigns/fixderma-msjp.jpg" },
    { ratio: "9 / 16", label: "Sotrue", src: "/hero/sotrue.jpg" },
    { ratio: "17 / 10", label: "Starbucks", src: "/hero/starbucks.jpg" },
  ],
  [
    { ratio: "9 / 16", label: "Bevzilla", src: "/hero/bevzilla.jpg" },
    { ratio: "16 / 9", label: "Maharani", src: "/hero/maharani.jpg" },
    { ratio: "4 / 3", label: "Fit Feast", src: "/hero/fitfeast.jpg" },
    { ratio: "16 / 9", label: "Shaily Mehrotra", src: "/hero/shaily.jpg" },
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
