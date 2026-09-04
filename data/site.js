// ---------------------------------------------------------------------------
// Orgix Media — central content file.
// Edit text, links and stats here — every page reads from this single source.
// ---------------------------------------------------------------------------

// Media CDN. All site images live on Cloudinary (orgix-media/<subfolder>/<name>)
// and are served optimized (f_auto,q_auto). Set MEDIA_LOCAL=1 to fall back to
// the local copies in /public/images instead.
const CLOUD_BASE = "https://res.cloudinary.com/dwjr5yrir/image/upload/f_auto,q_auto/orgix-media/";

export function imgSrc(p) {
  if (!p || process.env.NEXT_PUBLIC_MEDIA_LOCAL === "1") return p;
  if (p.startsWith("http")) return p;
  return CLOUD_BASE + p.replace(/^\/images\//, "");
}

export const company = {
  name: "Orgix Media",
  tagline: "Build the Brand Behind You.",
  email: "info@orgixmedia.com",
  instagram: "https://www.instagram.com/orgixmedia",
  youtube: "https://www.youtube.com/@orgixmedia",
  location: "Rohini, Delhi · Serving creators & founders worldwide",
  address: "Block D, 17/67, Sector 3, Rohini, Delhi, 110085",
  responseTime: "Free 1:1 strategy call — zero obligation",
};

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/#faq" },
];

export const stats = [
  { value: 1, suffix: "B+", decimals: 0, label: "Views generated", sub: "across Instagram & YouTube" },
  { value: 85, suffix: "+", decimals: 0, label: "Creators & founders scaled", sub: "from 0 to millions of followers" },
  { value: 100, suffix: "%", decimals: 0, label: "Organic growth", sub: "no ads, no bots, no shortcuts" },
];

// Marquee strip under the hero + "trusted by" band
export const marquee = [
  { name: "Simran Balar Jain", role: "Influencer", handle: "@simranbalraj", followers: "1.4M+", img: "/images/creators/simran-balraj.jpg" },
  { name: "Anuj Chhajerh", role: "Skincare Specialist", handle: "@anujchhajerh", followers: "516k+", img: "/images/creators/anuj-chhajerh.jpg" },
  { name: "Aarti Malhotra", role: "Internet Mom", handle: "@aartimalhotra", followers: "459k+", img: "/images/creators/aarti-malhotra.jpg" },
  { name: "Gaurav Mahawar", role: "Personal Finance", handle: "@gauravmahawar", followers: "358k+", img: "/images/creators/gaurav-mahawar.jpg" },
  { name: "Taranveer Jaura", role: "Tech Creator", handle: "@techknowbee", followers: "280k+", img: "/images/creators/taranveer-jaura.jpg" },
  { name: "Garima Barnoliya", role: "Fitness Coach", handle: "@garimabarnoliya", followers: "244k+", img: "/images/creators/garima-barnoliya.jpg" },
  { name: "Radical Era", role: "Business Breakdown", handle: "@radicalera", followers: "185k+", img: "/images/creators/radical-era.jpg" },
  { name: "9 Skin", role: "Celebrity-owned brand", handle: "@9skin", followers: "154k+", img: "/images/creators/9skin.jpg" },
  { name: "Shivam", role: "Career Creator", handle: "@shivamcareer", followers: "100k+", img: "/images/creators/shivam.jpg" },
  { name: "Ruchira", role: "Cyber Security", handle: "@cyberwithru", followers: "70.8k+", img: "/images/creators/ruchira.jpg" },
  { name: "Kanikka Dewanii", role: "Founder · Mintree", handle: "@kanikkadewanii", followers: "66.7k+", img: "/images/creators/kanikka-dewanii.png" },
  { name: "Daisy Morgan", role: "Founder · 9SKIN", handle: "@daisymorgan", followers: "30.6k+", img: "/images/creators/daisy-morgan.jpg" },
  { name: "Demla Brothers", role: "Founders · Cellbell", handle: "@demlabrothers", followers: "23.1k+", img: "/images/creators/demla-brothers.jpg" },
  { name: "Bhavit Patil", role: "Founder", handle: "@bhavitpatil", followers: "21.8k+", img: "/images/creators/bhavit-patil.jpg" },
  { name: "Cellbell", role: "Shark Tank featured", handle: "@cell_bell", followers: "19k+", img: "/images/creators/cellbell.jpg" },
];

export const trusted = [
  { name: "Royston Dias", role: "Indian Cricketer", followers: "30.8k+", img: "/images/creators/royston-dias.jpg" },
  { name: "Radical Era", role: "Business Breakdown", followers: "185k+", img: "/images/creators/radical-era.jpg" },
  { name: "Demla Brothers", role: "Founders · Cellbell", followers: "23.1k+", img: "/images/creators/demla-brothers.jpg" },
  { name: "Aarti Malhotra", role: "Internet Mom", followers: "459k+", img: "/images/creators/aarti-malhotra.jpg" },
  { name: "Daisy Morgan", role: "Founder · 9SKIN", followers: "30.6k+", img: "/images/creators/daisy-morgan.jpg" },
  { name: "Ruchira", role: "Cyber Security", followers: "70.8k+", img: "/images/creators/ruchira.jpg" },
  { name: "Imarticus Learning", role: "Education · YouTube", followers: "177k subs", img: "/images/creators/imarticus.jpg" },
  { name: "Kanikka Dewanii", role: "Founder · Mintree", followers: "66.7k+", img: "/images/creators/kanikka-dewanii.png" },
  { name: "Akash Pandey", role: "Career Coach", followers: "119k+", img: "/images/creators/akash-pandey.jpg" },
  { name: "Anuj Chhajerh", role: "Skincare Specialist", followers: "516k+", img: "/images/creators/anuj-chhajerh.jpg" },
  { name: "Simran Balar Jain", role: "Influencer", followers: "1.4M+", img: "/images/creators/simran-balraj.jpg" },
  { name: "Jyoti Goyal", role: "Chartered Accountant", followers: "37.6k+", img: "/images/creators/jyoti-goyal.jpg" },
];

// The "wall" — case studies with images
export const stories = [
  {
    name: "Pari Jain",
    role: "Founder",
    handle: "@officialparijain",
    followers: "129K+",
    img: "/images/stories/pari-jain.jpg",
    work: "Built from 0 → 129K, 100% organic.",
    verified: true,
    cat: "Founders",
  },
  {
    name: "Shivam Careers",
    role: "Career & AI Creator",
    handle: "@shivamcareer",
    followers: "100K+",
    img: "/images/stories/shivam-careers.jpg",
    work: "Scaling production with AI to 100K in 80 posts.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Akash Pandey",
    role: "Tech & Career Coach",
    handle: "@growithakash",
    followers: "120K+",
    img: "/images/stories/akash-pandey.jpg",
    work: "Leads generated, growth accelerated.",
    verified: true,
    cat: "Founders",
  },
  {
    name: "CA Jyoti Goyal",
    role: "Finance Creator",
    handle: "@ca.jyotigoyal",
    followers: "36.7K+",
    img: "/images/stories/ca-jyoti-goyal.jpg",
    work: "Turned influence into brand collaborations.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Tools Fact",
    role: "Content Brand",
    handle: "@toolsfact",
    followers: "97.6K+",
    img: "/images/stories/tools-fact.jpg",
    work: "From content to ₹35L in sales.",
    verified: false,
    cat: "Brands",
  },
  {
    name: "Taranveer Jaura",
    role: "Tech Creator",
    handle: "@techknowbee",
    followers: "280K+",
    img: "/images/stories/taranveer-jaura.jpg",
    work: "High-retention content that compounds.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Amit Arora",
    role: "Import-Export Expert",
    handle: "@amit_aroraa",
    followers: "23.6K+",
    img: "/images/stories/amit-arora.jpg",
    work: "Built funnels that generate leads.",
    verified: false,
    cat: "Founders",
  },
  {
    name: "Ruchira Pokhriyal",
    role: "Cybersecurity Creator",
    handle: "@cyberwithru",
    followers: "70.9K+",
    img: "/images/stories/ruchira-pokhriyal.jpg",
    work: "High-retention edits that perform.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Cellbell",
    role: "D2C Brand · Gaming chairs",
    handle: "@cell_bell",
    followers: "19.7K+",
    img: "/images/stories/cellbell.jpg",
    work: "Elevated the brand perception.",
    verified: false,
    cat: "Brands",
  },
  {
    name: "Roshnii Deshmukkh",
    role: "Entrepreneur",
    handle: "@growwithroshnii",
    followers: "16.4K+",
    img: "/images/stories/roshnii-deshmukkh.jpg",
    work: "Turned jewellery into a brand.",
    verified: false,
    cat: "Founders",
  },
  {
    name: "Royston Dias",
    role: "Indian Cricketer",
    handle: "@royston_dias313",
    followers: "31.1K+",
    img: "/images/stories/royston-dias.jpg",
    work: "Turned reach into quality leads.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Alisha Chettri",
    role: "Lifestyle Influencer",
    handle: "@alishaa_chettri",
    followers: "25.5K+",
    img: "/images/stories/alisha-chettri.jpg",
    work: "Conversations that close deals.",
    verified: false,
    cat: "Creators",
  },
  {
    name: "Bhavit Patil",
    role: "Spiritual Guide",
    handle: "@bhavitpatil",
    followers: "20.3K+",
    img: "/images/stories/bhavit-patil.jpg",
    work: "From reels to 180 event attendees.",
    verified: false,
    cat: "Founders",
  },
  {
    name: "Pawan & Chirag Demla",
    role: "Founders · Cellbell",
    handle: "@demlabrothers",
    followers: "23.1K+",
    img: "/images/stories/demla-brothers.jpg",
    work: "Founder-led brand growth, done organically.",
    verified: true,
    cat: "Founders",
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
    img: "/images/stories/pari-jain.jpg",
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
    img: "/images/stories/taranveer-jaura.jpg",
    accent: "violet",
  },
];

export const testimonials = [
  {
    quote:
      "Working with Orgix Media has completely changed the way I approach content. Their team understands finance and knows how to turn complex topics into simple, engaging scripts that people actually want to watch. From content ideas and scripting to social media strategy, everything is well planned and executed. I've seen a clear improvement in my content quality, reach and overall personal brand. Highly recommended!",
    name: "Gaurav Mahawar",
    role: "Finance Creator · 287K+ followers",
    img: "/images/testimonials/gaurav-mahawar.jpg",
  },
  {
    quote:
      "Working with Orgix Media has been a great experience. They helped me increase my followers and, more importantly, attract valuable, high-quality leads through strategic content and personal branding. Their team understands how to create content that not only grows your audience but also brings real business opportunities.",
    name: "Royston Dias",
    role: "Indian Cricketer · 31.1K+ followers",
    img: "/images/testimonials/royston-dias.jpg",
  },
  {
    quote:
      "Orgix Media took my food content to the next level. Their editing made my videos more engaging, professional and enjoyable to watch. They understand social media and know exactly how to keep viewers hooked. Highly recommended!",
    name: "Neha",
    role: "Content Creator",
    img: "/images/testimonials/neha.jpg",
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

export const heroCreators = [
  { img: "/images/creators/aarti-malhotra.jpg", handle: "@aartimalhotra", followers: "459k+", role: "Internet Mom" },
  { img: "/images/creators/anuj-chhajerh.jpg", handle: "@anujchhajerh", followers: "516k+", role: "Skincare Specialist" },
  { img: "/images/creators/simran-balraj.jpg", handle: "@simranbalraj", followers: "1.4M+", role: "Influencer" },
];

export const videoTestimonials = [
  {
    name: "Demla Brothers",
    role: "Founders · Cellbell",
    badge: "Shark Tank Featured",
    followers: "23.1K+",
    handle: "@demlabrothers",
    poster: "https://orgixmedia.com/uploads/vid_client1_poster.jpg",
    videoUrl: "https://orgixmedia.com/uploads/vid_client1.mp4",
    quote: "Orgix scaled our founder personal brands organically and generated massive inbound brand trust.",
  },
  {
    name: "Shivam Careers",
    role: "Career & Tech Creator",
    badge: "100K in 80 Posts",
    followers: "100K+",
    handle: "@shivamcareer",
    poster: "https://orgixmedia.com/uploads/vid_client2_poster.jpg",
    videoUrl: "https://orgixmedia.com/uploads/vid_client2.mp4",
    quote: "Their scripting and hooks turned my expertise into videos that people actually watch till the end.",
  },
  {
    name: "CA Jyoti Goyal",
    role: "Chartered Accountant",
    badge: "Finance & Tax Authority",
    followers: "37.6K+",
    handle: "@ca.jyotigoyal",
    poster: "https://orgixmedia.com/uploads/img_6a8d49bc28c12.png",
    videoUrl: "https://orgixmedia.com/uploads/vid_client3.mp4",
    quote: "Turned technical tax laws into viral, engaging reels that consistently bring high-value client leads.",
  },
  {
    name: "Amit Arora",
    role: "Investor & International Trade",
    badge: "B2B Trade Funnel",
    followers: "23.6K+",
    handle: "@amit_aroraa",
    poster: "https://orgixmedia.com/uploads/vid_client4_poster.jpg",
    videoUrl: "https://orgixmedia.com/uploads/vid_client4.mp4",
    quote: "We don't chase random views — Orgix built a strategic funnel that creates real international trade deals.",
  },
  {
    name: "Pari Jain",
    role: "Co-Founder & Creator",
    badge: "0 → 129K Organic",
    followers: "129K+",
    handle: "@officialparijain",
    poster: "https://orgixmedia.com/uploads/img_6a8fdb40b555d.png",
    videoUrl: "https://orgixmedia.com/uploads/vid_6a86b1f254dda.mov",
    quote: "Proving our own method every day: genuine storytelling, scroll-stopping hooks, and 100% organic reach.",
  },
  {
    name: "Alisha Chettri",
    role: "Lifestyle & Content Creator",
    badge: "High-Ticket Collabs",
    followers: "25.5K+",
    handle: "@alishaa_chettri",
    poster: "https://orgixmedia.com/uploads/img_6a8d4a25881a7.png",
    videoUrl: "https://orgixmedia.com/uploads/vid_6a8d4a2588542.mp4",
    quote: "Orgix helped me build authority with premium brands and turn everyday engagement into closed deals.",
  },
];

export const mythBusters = [
  {
    id: "daily-posting",
    type: "MYTH",
    statement: "Posting every day guarantees Instagram growth.",
    verdict: "Quality, retention & storytelling drive distribution — not daily low-effort spam.",
    detail: "Instagram's recommendation algorithm rewards watch-time, completions, and replay rates. One high-retention reel generates more algorithmic compounding than 10 hurried posts.",
    badge: "Retention > Frequency",
  },
  {
    id: "hashtags",
    type: "MYTH",
    statement: "More hashtags make your posts go viral.",
    verdict: "Watch-time, DM shares, and saves matter 10x more than hashtag counts.",
    detail: "Instagram categorizes content using audio, speech-to-text, and visual AI. DM shares and saves signal genuine relevance to the algorithm far beyond 30 stuffed hashtags.",
    badge: "Shares > Tags",
  },
  {
    id: "youtube-retention",
    type: "FACT",
    statement: "Audience retention matters more than upload frequency on YouTube.",
    verdict: "YouTube actively pushes videos with 50%+ retention loops to browse & suggested feeds.",
    detail: "YouTube's business model is session time. If your video keeps viewers glued, YouTube continues suggesting it to hundreds of thousands of new viewers for months.",
    badge: "Session Watch Time",
  },
  {
    id: "flashy-editing",
    type: "MYTH",
    statement: "Great editing is about flashy transitions, zooming, and sound effects.",
    verdict: "Masterful editing is about pacing, narrative rhythm, and holding cognitive focus.",
    detail: "Over-edited reels feel like ads and increase drop-offs. Strategic B-roll, clean typography, and purposeful pacing hold attention without exhausting the viewer.",
    badge: "Pacing > Effects",
  },
  {
    id: "scripting-retention",
    type: "FACT",
    statement: "Structured scripting doubles audience completion rates.",
    verdict: "A calculated 3-second hook + open loops keep viewers watching to the final frame.",
    detail: "Without a structured script, creators ramble in the first 5 seconds where 70% of viewers drop off. Hook architecture and progressive payoff double retention.",
    badge: "Hook Architecture",
  },
  {
    id: "viral-luck",
    type: "MYTH",
    statement: "Viral videos happen by pure luck and cannot be engineered.",
    verdict: "Virality follows repeatable human psychology, tension, and relatable payoffs.",
    detail: "Every piece of content we build follows deep audience research, contrarian perspective, and emotional triggers. That is how Orgix has generated 1B+ organic views.",
    badge: "Psychology > Luck",
  },
];

export const agencyPillars = [
  {
    num: "01",
    title: "Absolute Specialisation",
    subtitle: "We don't do everything. We excel at one thing.",
    text: "Most agencies offering social media are actually ad agencies or influencer brokers who treat personal branding as an afterthought. We don't run paid ads or broker random sponsorships. We focus exclusively on compounding organic personal branding for founders and creators.",
    highlight: "100% Organic · Zero ad spend required",
  },
  {
    num: "02",
    title: "Strategy Before Production",
    subtitle: "Thinkers driving every cut and caption.",
    text: "Most agencies start with a camera and hope something sticks. We spend days researching your niche, identifying untapped content angles, and defining your narrative positioning before a single frame is recorded.",
    highlight: "Positioning & narrative architecture",
  },
  {
    num: "03",
    title: "Audiences, Not Algorithms",
    subtitle: "Built on human psychology, not fleeting hacks.",
    text: "Algorithms update every month, but human psychology has stayed the same for millennia. We design content that earns attention, respect, and deep trust — turning casual scrollers into loyal advocates, clients, and partners.",
    highlight: "Compounding authority & inbound leads",
  },
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
const IMAGE_ARRAYS = [marquee, trusted, stories, processSteps, services, testimonials, team, heroCreators];
for (const arr of IMAGE_ARRAYS) {
  for (const item of arr) {
    if (item && item.img) item.img = imgSrc(item.img);
  }
}
