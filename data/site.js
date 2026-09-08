// ---------------------------------------------------------------------------
// Orgix Media — central content file.
// Edit text, links and stats here — every page reads from this single source.
// ---------------------------------------------------------------------------

// Media: local /public/images (WebP, pre-sized — see scripts/optimize-images.mjs).
// Set NEXT_PUBLIC_MEDIA_REMOTE=1 to serve instead from the Cloudinary CDN
// (orgix-media/<subfolder>/<name>, f_auto,q_auto). If you do, upload the
// current /public/images tree (including .webp files) to the same paths.
const CLOUD_BASE = "https://res.cloudinary.com/dwjr5yrir/image/upload/f_auto,q_auto/orgix-media/";

export function imgSrc(p) {
  if (!p) return "";
  if (p.startsWith("http")) return p;
  if (process.env.NEXT_PUBLIC_MEDIA_REMOTE === "1") {
    return CLOUD_BASE + p.replace(/^\/images\//, "");
  }
  // Normalise path to local public image asset
  return p.startsWith("/") ? p : `/${p}`;
}

export const company = {
  name: "Orgix Media",
  tagline: "Build the Brand Behind You.",
  email: "info@orgixmedia.com",
  phone: "+91 82875 28395",
  whatsapp: "https://wa.me/918287528395",
  instagram: "https://www.instagram.com/orgixmedia",
  youtube: "https://www.youtube.com/@orgixmedia",
  location: "Rohini, Delhi · Serving creators & founders worldwide",
  address: "Block D, 17/67, Sector 3, Rohini, Delhi, 110085",
  responseTime: "Free 1:1 strategy call — zero obligation",
};

export const stats = [
  { value: 1, suffix: "B+", decimals: 0, label: "Views generated", sub: "across Instagram & YouTube" },
  { value: 85, suffix: "+", decimals: 0, label: "Creators & founders scaled", sub: "from 0 to millions of followers" },
  { value: 100, suffix: "%", decimals: 0, label: "Organic growth", sub: "no ads, no bots, no shortcuts" },
];

// The "wall" — case studies with images
export const stories = [
  {
    name: "Pari Jain",
    role: "Founder",
    handle: "@officialparijain",
    followers: "129K+",
    img: "/images/founders/pari-jain.jpg",
    work: "Built from 0 → 129K, 100% organic.",
    verified: true,
    cat: "Founders",
  },
  {
    name: "Shivam Careers",
    role: "Career & AI Creator",
    handle: "@shivamcareer",
    followers: "100K+",
    img: "/images/creators/shivam.jpg",
    work: "Scaling production with AI to 100K in 80 posts.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Akash Pandey",
    role: "Tech & Career Coach",
    handle: "@growithakash",
    followers: "120K+",
    img: "/images/creators/akash-pandey.jpg",
    work: "Leads generated, growth accelerated.",
    verified: true,
    cat: "Founders",
  },
  {
    name: "CA Jyoti Goyal",
    role: "Finance Creator",
    handle: "@ca.jyotigoyal",
    followers: "36.7K+",
    img: "/images/creators/jyoti-goyal.jpg",
    work: "Turned influence into brand collaborations.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Tools Fact",
    role: "Content Brand",
    handle: "@toolsfact",
    followers: "97.6K+",
    img: "/images/creators/shopcasence.jpg",
    work: "From content to ₹35L in sales.",
    verified: false,
    cat: "Brands",
  },
  {
    name: "Taranveer Jaura",
    role: "Tech Creator",
    handle: "@techknowbee",
    followers: "280K+",
    img: "/images/creators/taranveer-jaura.jpg",
    work: "High-retention content that compounds.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Amit Arora",
    role: "Import-Export Expert",
    handle: "@amit_aroraa",
    followers: "23.6K+",
    img: "/images/creators/amit-arora.webp",
    work: "Built funnels that generate leads.",
    verified: false,
    cat: "Founders",
  },
  {
    name: "Ruchira Pokhriyal",
    role: "Cybersecurity Creator",
    handle: "@cyberwithru",
    followers: "70.9K+",
    img: "/images/creators/ruchira.jpg",
    work: "High-retention edits that perform.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Cellbell",
    role: "D2C Brand · Gaming chairs",
    handle: "@cell_bell",
    followers: "19.7K+",
    img: "/images/creators/cellbell.jpg",
    work: "Elevated the brand perception.",
    verified: false,
    cat: "Brands",
  },
  {
    name: "Roshnii Deshmukkh",
    role: "Entrepreneur",
    handle: "@growwithroshnii",
    followers: "16.4K+",
    img: "/images/creators/daisy-morgan.jpg",
    work: "Turned jewellery into a brand.",
    verified: false,
    cat: "Founders",
  },
  {
    name: "Royston Dias",
    role: "Indian Cricketer",
    handle: "@royston_dias313",
    followers: "31.1K+",
    img: "/images/creators/royston-dias.jpg",
    work: "Turned reach into quality leads.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Alisha Chettri",
    role: "Lifestyle Influencer",
    handle: "@alishaa_chettri",
    followers: "25.5K+",
    img: "/images/creators/garima-barnoliya.jpg",
    work: "Conversations that close deals.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Bhavit Patil",
    role: "Spiritual Guide",
    handle: "@bhavitpatil",
    followers: "20.3K+",
    img: "/images/creators/bhavit-patil.jpg",
    work: "From reels to 180 event attendees.",
    verified: false,
    cat: "Founders",
  },
  {
    name: "Pawan & Chirag Demla",
    role: "Founders · Cellbell (Shark Tank)",
    handle: "@demlabrothers",
    followers: "23.1K+",
    img: "/images/creators/demla-brothers.jpg",
    work: "Shark Tank brand scale · 100% organic.",
    verified: true,
    cat: "Founders",
  },
  {
    name: "Kanikka Dewanii",
    role: "Founder · Mintree (Shark Tank)",
    handle: "@kanikkadewanii",
    followers: "66.7K",
    img: "/images/creators/kanikka-dewanii.webp",
    work: "Shark Tank featured beauty brand.",
    verified: true,
    cat: "Founders",
  },
  {
    name: "Daisy Morgan",
    role: "Founder · 9SKIN",
    handle: "@daisymorgan",
    followers: "30.6K+",
    img: "/images/creators/daisy-morgan.jpg",
    work: "Celebrity skincare brand expansion.",
    verified: true,
    cat: "Brands",
  },
  {
    name: "Gaurav Mahawar",
    role: "Finance Creator",
    handle: "@gauravmahawar",
    followers: "358K+",
    img: "/images/creators/gaurav-mahawar.jpg",
    work: "Complex finance simplified into viral scripts.",
    verified: true,
    cat: "Creators",
  },
  {
    name: "Aarti Malhotra",
    role: "Internet Mom",
    handle: "@aartimalhotra",
    followers: "459K+",
    img: "/images/creators/aarti-malhotra.jpg",
    work: "Relatable family storytelling that converts.",
    verified: true,
    cat: "Creators",
  },
  {
    name: "Radical Era",
    role: "Business Breakdown",
    handle: "@radicalera",
    followers: "185K+",
    img: "/images/creators/radical-era.jpg",
    work: "Deep business teardowns & case studies.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Anuj Chhajerh",
    role: "Skincare Specialist",
    handle: "@anujchhajerh",
    followers: "516K+",
    img: "/images/creators/anuj-chhajerh.jpg",
    work: "Clinical authority to half-million audience.",
    verified: true,
    cat: "Creators",
  },
  {
    name: "Simran Balar Jain",
    role: "Lifestyle & Social Impact",
    handle: "@simranbalarjain",
    followers: "1.4M+",
    img: "/images/creators/simran-balraj.jpg",
    work: "Seven-figure community with compounding reach.",
    verified: true,
    cat: "Creators",
  },
  {
    name: "Imarticus Learning",
    role: "Education Channel",
    handle: "@imarticus",
    followers: "177K",
    img: "/images/creators/imarticus.jpg",
    work: "YouTube long-form educational authority.",
    verified: true,
    cat: "Brands",
  },
  {
    name: "Garima Barnoliya",
    role: "Fitness Coach",
    handle: "@garimabarnoliya",
    followers: "244K+",
    img: "/images/creators/garima-barnoliya.jpg",
    work: "High-retention fitness reels & coaching leads.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Ekta Dahiya",
    role: "Content Creator",
    handle: "@ektadahiya",
    followers: "66.6K+",
    img: "/images/creators/ekta-dahiya.webp",
    work: "Authentic lifestyle storytelling engine.",
    verified: false,
    cat: "Creators",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Deep-Dive Research",
    kicker: "Strategy before content",
    text: "We don't guess what will work. Our team analyses your niche, target audience, competitors, trends and content opportunities to build a data-backed personal branding strategy designed for long-term growth.",
    img: "/images/process/01-research.webp",
  },
  {
    n: "02",
    title: "Viral Scripting",
    kicker: "Scripts that stop the scroll",
    text: "We turn your expertise, ideas and experiences into well-researched scripts with powerful hooks and clear messaging that capture attention, keep viewers watching and strengthen your personal brand.",
    img: "/images/process/02-scripting.webp",
  },
  {
    n: "03",
    title: "Guided Shooting",
    kicker: "2 days of recording · 30 days of content",
    text: "We handle everything behind the camera. From planning and shot lists to real-time shoot guidance, we make recording easy while keeping your personal brand consistent.",
    img: "/images/process/03-shooting.webp",
  },
  {
    n: "04",
    title: "High-Retention Editing",
    kicker: "Every frame earns the next",
    text: "We transform raw footage into high-retention content using sharp cuts, dynamic captions, strategic B-roll and attention-grabbing visuals. Every frame is crafted to hold attention.",
    img: "/images/process/04-editing.webp",
  },
  {
    n: "05",
    title: "Strategic Posting",
    kicker: "Discoverability, handled",
    text: "Captions, hashtags, SEO optimisation and posting times — every piece of content is strategically prepared to reach the right audience and maximise your personal brand's growth.",
    img: "/images/process/05-posting.webp",
  },
  {
    n: "06",
    title: "Growth Management",
    kicker: "Community that converts",
    text: "We manage your community, engage with your audience and respond to comments to keep conversations active. Smart DM automation and lead nurturing turn engagement into relationships, qualified leads and business.",
    img: "/images/process/06-growth.webp",
  },
];

export const services = [
  {
    id: "instagram",
    index: "01",
    name: "Social Media Growth",
    title: "Instagram Management",
    tag: "Reels-first growth",
    desc: "From Instagram profile to personal brand. Strategy first — content that connects, grows and converts followers into customers.",
    features: [
      "Profile optimization",
      "Hook-based reels",
      "Script writing",
      "Growth analytics",
      "Community engagement",
      "Content calendar",
    ],
    stat: { value: "129K+", label: "followers built from zero — Pari Jain" },
    img: "/images/founders/pari-jain.jpg",
    accent: "lime",
  },
  {
    id: "youtube",
    index: "02",
    name: "Words That Convert",
    title: "YouTube Management",
    tag: "Long-form authority",
    desc: "We craft compelling hooks and scripts for long-form YouTube videos that keep viewers watching and build your personal brand's authority.",
    features: [
      "Viral hook writing",
      "YouTube scriptwriting",
      "Brand voice guide",
      "Content calendars",
      "Title & thumbnail strategy",
      "Retention editing",
    ],
    stat: { value: "177K+", label: "YouTube subscribers — Imarticus Learning" },
    img: "/images/creators/taranveer-jaura.jpg",
    accent: "violet",
  },
  {
    id: "video-editing",
    index: "03",
    name: "Post-Production Systems",
    title: "High-Retention Video Editing",
    tag: "Every frame earns the next",
    desc: "Transform raw footage into viral retention assets. Motion graphics, custom sound design, kinetic typography, and precision pacing built for algorithmic discovery.",
    features: [
      "Dynamic kinetic captions",
      "Pacing & retention curve optimization",
      "Sound design & audio mastery",
      "Custom 2D/3D motion graphics",
      "B-roll sourcing & color grading",
      "Format re-versioning (9:16, 16:9)",
    ],
    stat: { value: "1.0B+", label: "organic views across edited reels & shorts" },
    img: "/images/creators/shivam.jpg",
    accent: "accent",
  },
  {
    id: "linkedin",
    index: "04",
    name: "Executive Positioning",
    title: "LinkedIn Thought Leadership",
    tag: "B2B pipeline & authority",
    desc: "Position founders and C-suite leaders as undisputed industry authorities. Intellectual property extraction, ghostwritten essays, and high-converting carousels.",
    features: [
      "Executive voice & narrative design",
      "Contrarian framework essays",
      "High-converting carousel design",
      "Network reach & comment strategy",
      "Inbound deal flow optimization",
      "Profile & banner architectural revamp",
    ],
    stat: { value: "85+", label: "founders & executives positioned" },
    img: "/images/creators/amit-arora.webp",
    accent: "accent",
  },
];

export const team = [
  {
    name: "Pari Jain",
    role: "Co-Founder",
    focus: "Personal Branding Expert",
    img: "/images/founders/pari-jain.jpg",
    bio: "Pari is the face of our creative team — bringing ideas to life through sharp scripts, scroll-stopping hooks, storytelling and creative direction. She turns raw ideas into content that feels authentic and built to connect.",
    socials: {
      instagram: "https://www.instagram.com/officialparijain",
      linkedin: "https://www.linkedin.com/in/pari-jain-/",
      youtube: "https://www.youtube.com/@official.parijain",
    },
  },
  {
    name: "Anant Jain",
    role: "Co-Founder",
    focus: "Growth Strategist",
    img: "/images/founders/anant-jain.jpg",
    bio: "Anant leads Orgix with a sharp focus on people, culture and execution. From hiring the right talent to driving the office forward, his leadership keeps the entire organisation aligned, motivated and growing.",
    socials: {
      instagram: "https://www.instagram.com/orgixcreate",
      linkedin: "https://www.linkedin.com/in/-anant-jain",
    },
  },
  {
    name: "Deepak Jain",
    role: "Co-Founder",
    focus: "Content Strategist",
    img: "/images/founders/deepak-jain.jpg",
    bio: "Deepak oversees every piece of content before it goes live. From refining scripts to reviewing final videos, he ensures every piece aligns with the personal branding strategy, content quality and growth goals.",
    socials: {
      instagram: "https://www.instagram.com/_digitaldeepak",
      linkedin: "https://www.linkedin.com/in/-digitaldeepak",
    },
  },
];

export const teamStat = {
  headline: "We're not just 3 faces.",
  highlight: "25–30 people",
  rest: "work under one roof — strategists, scriptwriters, editors and shooters.",
};

export const faqs = [
  {
    q: "What does a personal branding agency actually do?",
    a: "We help founders, creators, professionals and experts build a strong personal brand through strategy, content creation, social media and consistent storytelling — so your expertise gets noticed, trusted and remembered, and turns into inbound opportunity.",
  },
  {
    q: "How long until I see real traction?",
    a: "Most clients see their first algorithmic breakout within 30–45 days of the first engineered reels. Compounding authority — where each post lifts the next — typically shows up between month 2 and month 3. We don't sell a one-reel miracle; we build an engine that gets stronger every week.",
  },
  {
    q: "How much of my time does this take?",
    a: "Minimal. Our guided shooting model is built around 1–2 recording days per month, after which we handle scripting, editing, posting and community management. You show up, deliver your expertise on camera, and review content before it goes live. The rest is us.",
  },
  {
    q: "What do I actually get each month?",
    a: "A complete organic content ecosystem: research-backed content pillars, viral scripting, 1–2 guided shoot days, high-retention editing, a content calendar, strategic posting, and community/lead management. Everything is designed around your category and what you want to be known for.",
  },
  {
    q: "Is this for me if I'm camera-shy?",
    a: "Most of our clients start out camera-shy. We handle the scripting, direction and recording coaching — you deliver your real expertise, and we make it feel natural on camera. Comfort comes fast once you see the first videos perform.",
  },
  {
    q: "What niches do you work in — and not work in?",
    a: "We focus on founders, CEOs, tech/AI, finance and CA professionals, D2C founders, career and education creators, health and fitness, and expert commentators. We don't take gambling, crypto-promise, or reputation-risky categories. If your expertise is real and defensible, we can probably build around it.",
  },
  {
    q: "Can you build my brand from zero?",
    a: "Yes — several clients on this page started with little or no online presence and reached five to six figures in followers organically. Starting from scratch is often cleaner than fixing a broken, inconsistent profile.",
  },
  {
    q: "How is success measured?",
    a: "Follower growth and reach matter, but we weight them against what actually pays: inbound leads, speaking and partnership opportunities, premium perception, and watch-time/retention. We share a monthly performance brief with the numbers that matter to your business, not just vanity metrics.",
  },
  {
    q: "What's the engagement model — and how do we start?",
    a: "Every engagement begins with a free 1:1 strategy audit where we review your current presence, identify the fastest growth levers, and map a 90-day organic trajectory. If it's a fit, we move to a guided monthly engagement. There's no ad-spend pitch and no obligation to continue.",
  },
];

// Real trusted-by roster — every photo verified pixel-identical to the
// one orgixmedia.com shows for that person (see scripts/verify-client-photos.mjs).
export const trustedBy = [
  { name: "Royston Dias", tag: "Indian Cricketer", followers: "30.8K+", img: "/images/creators/royston-dias.jpg" },
  { name: "Radical Era", tag: "Business Breakdown", followers: "185K+", img: "/images/creators/radical-era.jpg" },
  { name: "Demla Brothers", tag: "Founders · Cellbell (Shark Tank)", followers: "23.1K+", img: "/images/creators/demla-brothers.jpg" },
  { name: "Aarti Malhotra", tag: "Internet Mom", followers: "459K+", img: "/images/creators/aarti-malhotra.jpg" },
  { name: "Daisy Morgan", tag: "Founder · 9SKIN", followers: "30.6K+", img: "/images/creators/daisy-morgan.jpg" },
  { name: "Ruchira", tag: "Cybersecurity (US)", followers: "70.8K+", img: "/images/creators/ruchira.jpg" },
  { name: "Imarticus Learning", tag: "Education · YouTube", followers: "177K", img: "/images/creators/imarticus.jpg" },
  { name: "Kanikka Dewanii", tag: "Founder · Mintree (Shark Tank)", followers: "66.7K", img: "/images/creators/kanikka-dewanii.webp" },
  { name: "Akash Pandey", tag: "Career Coach", followers: "119K+", img: "/images/creators/akash-pandey.jpg" },
  { name: "Anuj Chhajerh", tag: "Skincare Specialist", followers: "516K+", img: "/images/creators/anuj-chhajerh.jpg" },
  { name: "Simran Balar Jain", tag: "Influencer", followers: "1.4M+", img: "/images/creators/simran-balraj.jpg" },
  { name: "Jyoti Goyal", tag: "Chartered Accountant", followers: "37.6K+", img: "/images/creators/jyoti-goyal.jpg" },
  { name: "Shivam", tag: "Career & AI Creator", followers: "100K+", img: "/images/creators/shivam.jpg" },
  { name: "9SKIN", tag: "Celebrity-Owned Brand", followers: "154K+", img: "/images/creators/9skin.jpg" },
  { name: "Amit Arora", tag: "Investor · Intl. Trade", followers: "23.6K+", img: "/images/creators/amit-arora.webp" },
  { name: "Cellbell", tag: "Shark Tank Featured Brand", followers: "19K+", img: "/images/creators/cellbell.jpg" },
  { name: "Gaurav Mahawar", tag: "Personal Finance", followers: "358K+", img: "/images/creators/gaurav-mahawar.jpg" },
  { name: "Ekta Dahiya", tag: "Content Creator", followers: "66.6K+", img: "/images/creators/ekta-dahiya.webp" },
  { name: "Raj Vadhu", tag: "Clothing Brand", followers: "31.3K", img: "/images/creators/raj-vadhu.jpg" },
  { name: "Rahis", tag: "Fitness Coach", followers: "20.9K+", img: "/images/creators/rahis.jpg" },
  { name: "Bhavit Patil", tag: "Founder", followers: "21.8K+", img: "/images/creators/bhavit-patil.jpg" },
  { name: "Shopcasence", tag: "Entrepreneur", followers: "55.9K+", img: "/images/creators/shopcasence.jpg" },
  { name: "Garima Barnoliya", tag: "Fitness Coach", followers: "244K+", img: "/images/creators/garima-barnoliya.jpg" },
];

export const heroCreators = [
  { img: "/images/founders/pari-jain.jpg", handle: "@officialparijain", followers: "129K+", role: "Founder" },
  { img: "/images/creators/taranveer-jaura.jpg", handle: "@techknowbee", followers: "280K+", role: "Tech Creator" },
  { img: "/images/creators/daisy-morgan.jpg", handle: "@daisymorgan", followers: "30.6K+", role: "Founder · 9SKIN" },
  { img: "/images/creators/gaurav-mahawar.jpg", handle: "@gauravmahawar", followers: "358K+", role: "Finance Creator" },
];

export const timelineJourney = [
  {
    year: "2022",
    title: "The Beginning",
    kicker: "A small room, big conviction",
    text: "Two passionate minds, Anant and Deepak, started brainstorming organic content strategies in a modest room. No outside funding, no big office — just the unshakable conviction that authentic, organic personal branding beats paid ads every time. The creators they scaled grew rapidly with zero ad spend.",
  },
  {
    year: "2023",
    title: "Building Blocks",
    kicker: "Word of mouth explodes",
    text: "Word spread across creator circles. More founders, doctors, and CAs reached out. Instagram reels strategy, YouTube long-form scripting, and organic funnels became our signature discipline.",
  },
  {
    year: "2024",
    title: "Official Agency Launch",
    kicker: "Full-stack personal branding studio",
    text: "Orgix Media expanded into a full-scale agency. We established end-to-end studio operations: scriptwriting, guided shooting, high-retention post-production, and community management.",
  },
  {
    year: "2025–2026",
    title: "The Impact Era",
    kicker: "1B+ views · 25–30 under one roof",
    text: "Today, 25–30 strategists, writers, editors, and shooters work under one roof at our Delhi headquarters. We have generated over 1 Billion+ organic views and scaled 85+ creators and founders into respected industry authorities.",
  },
];

// Point every image field at the Cloudinary CDN (single source of truth for media).
const IMAGE_ARRAYS = [stories, processSteps, services, team, heroCreators, trustedBy];
for (const arr of IMAGE_ARRAYS) {
  for (const item of arr) {
    if (item && item.img) item.img = imgSrc(item.img);
  }
}
