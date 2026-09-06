"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { sound } from "@/lib/sound";

// ============================================================================
// ALL 8 FREESTANDING 3D FIGURINE HEROES
// ============================================================================
const FIGURINES = [
  {
    id: "strategist",
    name: "The Strategist",
    role: "Moat Architect · Lvl 5",
    avatar: "/images/figurines/strategist.png",
    themeColor: "#EA580C",
    intro: "I engineer non-linear category moats. Paid ads expire; organic monopolies compound forever.",
  },
  {
    id: "creator",
    name: "The Creator",
    role: "Hook Architect · Lvl 4",
    avatar: "/images/figurines/creator.png",
    themeColor: "#16A34A",
    intro: "I design scroll-stopping hooks. The first 1.2 seconds decides if your reel gets 1K or 1M views.",
  },
  {
    id: "director",
    name: "The Director",
    role: "Camera Commander · Lvl 5",
    avatar: "/images/figurines/director.png",
    themeColor: "#DB2777",
    intro: "I guide 2-day shoots in our Delhi studio that produce 30 days of high-authority content.",
  },
  {
    id: "alchemist",
    name: "The Alchemist",
    role: "Sound Foley Master · Lvl 5",
    avatar: "/images/figurines/alchemist.png",
    themeColor: "#0891B2",
    intro: "I craft kinetic subtitles & sound foley that keep 73% of mute viewers watching till the end.",
  },
  {
    id: "analyst",
    name: "The Analyst",
    role: "Algorithm Scientist · Lvl 5",
    avatar: "/images/figurines/analyst.png",
    themeColor: "#7C3AED",
    intro: "I track Average Percentage Viewed & retention curves. Data before drama, always.",
  },
  {
    id: "whisperer",
    name: "The Whisperer",
    role: "Conversion Sage · Lvl 6",
    avatar: "/images/figurines/whisperer.png",
    themeColor: "#059669",
    intro: "I engineer comment-to-DM funnels and automated inbound flows that turn views into high-ticket contracts.",
  },
  {
    id: "catalyst",
    name: "The Catalyst",
    role: "Trend Igniter · Lvl 5",
    avatar: "/images/figurines/catalyst.png",
    themeColor: "#D97706",
    intro: "I identify cultural momentum and algorithmic triggers to explode your reach across Explore feeds.",
  },
  {
    id: "builder",
    name: "The Builder",
    role: "Scale General · Lvl 6",
    avatar: "/images/figurines/builder.png",
    themeColor: "#2E5BFF",
    intro: "I scale empires from 0 to 1M+ followers. All 8 minds work under one roof at our Delhi headquarters.",
  },
];

// ============================================================================
// PAGE-BY-PAGE LINE-BY-LINE QUEST DEFINITIONS
// Alternating LEFT and RIGHT depending on where the user's eye focus is!
// ============================================================================
const PAGE_QUESTS = {
  "/": [
    {
      id: "home-1",
      stepNum: 1,
      side: "left",
      character: "The Strategist",
      role: "Moat Architect · Lvl 5",
      avatar: "/images/figurines/strategist.png",
      themeColor: "#EA580C",
      kicker: "STEP 01 · THE ORGANIC RULE",
      dialogue:
        "Chief! Look right here at our founding rule: '100% Organic Growth · No Ads · No Bots'. Paid ads rent attention that leaves when your budget ends. Organic authority builds a compound monopoly!",
      target: ".hero-rise-1",
      targetLabel: "Inspect Organic Rule",
      actionHint: "👉 Pointing right at our No-Ad guarantee!",
    },
    {
      id: "home-2",
      stepNum: 2,
      side: "right",
      character: "The Creator",
      role: "Hook Architect · Lvl 4",
      avatar: "/images/figurines/creator.png",
      themeColor: "#16A34A",
      kicker: "STEP 02 · VERIFIED SOCIAL PROOF",
      dialogue:
        "Chief! Switched over to your right side! Inspect this proof pill: 85+ creator partners and 1.0B+ organic views. Every view earned purely through storytelling and retention hooks!",
      target: ".hero-rise-5",
      targetLabel: "Inspect 1.0B Views",
      actionHint: "👈 Pointing left at our 1.0B views stat!",
    },
    {
      id: "home-3",
      stepNum: 3,
      side: "left",
      character: "The Catalyst",
      role: "Trend Igniter · Lvl 5",
      avatar: "/images/figurines/catalyst.png",
      themeColor: "#D97706",
      kicker: "STEP 03 · THE CREATOR PROOF WALL",
      dialogue:
        "Chief! Flying down to our Results Wall! Look at these 24 real creators — Shark Tank brands like Cellbell, cricketer Royston Dias, and finance creator Gaurav Mahawar. Tap 'Inspect' to fly directly to their verified metrics!",
      target: "#results",
      targetLabel: "Inspect 24 Creator Proofs",
      actionHint: "👉 Check each creator card & growth numbers!",
    },
    {
      id: "home-4",
      stepNum: 4,
      side: "right",
      character: "The Director",
      role: "Camera Commander · Lvl 5",
      avatar: "/images/figurines/director.png",
      themeColor: "#DB2777",
      kicker: "STEP 04 · DELHI STUDIO ENGINE",
      dialogue:
        "Back on your right, Chief! Look at our 6-step engine. We are not freelancers on laptops — we operate a 25-30 member dedicated team under one roof in Delhi HQ. Check out our real studio operations!",
      target: "#process",
      targetLabel: "Tour Delhi Studio HQ",
      actionHint: "👈 Pointing at our real in-house studio team!",
    },
    {
      id: "home-5",
      stepNum: 5,
      side: "left",
      character: "The Alchemist",
      role: "Sound Foley Master · Lvl 5",
      avatar: "/images/figurines/alchemist.png",
      themeColor: "#0891B2",
      kicker: "STEP 05 · RETENTION CUTS & SOUND",
      dialogue:
        "Chief! Jumped over to the left! In short-form video, 73% watch on mute. We inject kinetic typography, audio foley, and micro-cuts so viewers never scroll away. Test our retention edits!",
      target: "#editing",
      targetLabel: "Test Retention Edits",
      actionHint: "👉 Inspect our audio foley & micro-pacing!",
    },
    {
      id: "home-6",
      stepNum: 6,
      side: "right",
      character: "The Whisperer",
      role: "Conversion Sage · Lvl 6",
      avatar: "/images/figurines/whisperer.png",
      themeColor: "#059669",
      kicker: "STEP 06 · HIGH-TICKET MONETIZATION",
      dialogue:
        "Chief! I'm on your right! A million views means nothing without pipeline. We build automated DM funnels and lead nurturing so every viral post converts into high-ticket clients and deals!",
      target: "#cast",
      targetLabel: "Inspect 8-Mind Cast",
      actionHint: "👈 Meet all 8 minds working in your corner!",
    },
    {
      id: "home-7",
      stepNum: 7,
      side: "left",
      character: "The Analyst",
      role: "Algorithm Scientist · Lvl 5",
      avatar: "/images/figurines/analyst.png",
      themeColor: "#7C3AED",
      kicker: "STEP 07 · THE UNFAIR ADVANTAGE MATRIX",
      dialogue:
        "Chief! Check the data telemetry on your left! Inspect our Comparison Matrix — see how Orgix gives you a 100% in-house studio, proprietary research, and custom DM funnels that amateur agencies can't touch!",
      target: "#comparison",
      targetLabel: "Inspect Moat Matrix",
      actionHint: "👉 See our 6 unfair competitive advantages!",
    },
    {
      id: "home-8",
      stepNum: 8,
      side: "right",
      character: "The Builder",
      role: "Scale General · Lvl 6",
      avatar: "/images/figurines/builder.png",
      themeColor: "#2E5BFF",
      kicker: "FINAL STEP · MOBILIZE YOUR EMPIRE",
      dialogue:
        "Final Quest, Chief! All 8 studio minds are assembled and standing by. Viral reach means nothing without revenue. Tap 'Book Free Strategy Call' to claim your 90-day trajectory slot!",
      target: "#cta",
      targetLabel: "Claim 90-Day Slot",
      actionHint: "👈 Tap Deploy to assemble the squad behind you!",
    },
  ],

  "/work": [
    {
      id: "work-1",
      stepNum: 1,
      side: "left",
      character: "The Strategist",
      role: "Moat Architect · Lvl 5",
      avatar: "/images/figurines/strategist.png",
      themeColor: "#EA580C",
      kicker: "STEP 01 · CATEGORY FILTERS",
      dialogue:
        "Chief! Welcome to the Work Vault! Use these filter tabs — 'All', 'Founders', 'Creators', and 'Brands' — to explore 24 authentic creator profiles scaled 100% organically!",
      target: ".filters",
      targetLabel: "Inspect Filter Tabs",
      actionHint: "👉 Tap tabs to switch between Founders and Brands!",
    },
    {
      id: "work-2",
      stepNum: 2,
      side: "right",
      character: "The Analyst",
      role: "Algorithm Scientist · Lvl 5",
      avatar: "/images/figurines/analyst.png",
      themeColor: "#7C3AED",
      kicker: "STEP 02 · SHARK TANK PROOF",
      dialogue:
        "Over on your right, Chief! Check out Shark Tank brand Cellbell (23.1k followers) and Mintree! Real founder-led authority built purely through organic video retention!",
      target: ".wall-grid",
      targetLabel: "Inspect Shark Tank Case Studies",
      actionHint: "👈 Check verified metrics on client cards!",
    },
    {
      id: "work-3",
      stepNum: 3,
      side: "left",
      character: "The Catalyst",
      role: "Trend Igniter · Lvl 5",
      avatar: "/images/figurines/catalyst.png",
      themeColor: "#D97706",
      kicker: "STEP 03 · CELEBRITY & NICHE REACH",
      dialogue:
        "Jumped to the left! Look at cricketer Royston Dias (31.1k), CA Jyoti Goyal (36.7k), and 9SKIN (30.6k)! We build authority in high-ticket niches that generate high-paying clients!",
      target: ".wall-grid",
      targetLabel: "Inspect Niche Authorities",
      actionHint: "👉 Notice the Instagram handles and growth stats!",
    },
    {
      id: "work-4",
      stepNum: 4,
      side: "right",
      character: "The Whisperer",
      role: "Conversion Sage · Lvl 6",
      avatar: "/images/figurines/whisperer.png",
      themeColor: "#059669",
      kicker: "STEP 04 · REVENUE CONVERSIONS",
      dialogue:
        "Chief! Look at Tools Fact — scaled from short reels to ₹35L in direct revenue! Every piece of content is engineered to drive discoverability and real business inbound!",
      target: ".wall-grid",
      targetLabel: "Inspect Revenue Proof",
      actionHint: "👈 Pointing at commercial growth outcomes!",
    },
    {
      id: "work-5",
      stepNum: 5,
      side: "left",
      character: "The Builder",
      role: "Scale General · Lvl 6",
      avatar: "/images/figurines/builder.png",
      themeColor: "#2E5BFF",
      kicker: "STEP 05 · NEXT CAN BE YOU",
      dialogue:
        "Chief! The final card in this vault is reserved for your personal brand! Every founder here started with one conversation. Tap 'Claim Your Slot' to start!",
      target: ".wall-card--next",
      targetLabel: "Claim Your Slot",
      actionHint: "👉 Tap this card to open your consultation!",
    },
  ],

  "/services": [
    {
      id: "svc-1",
      stepNum: 1,
      side: "left",
      character: "The Creator",
      role: "Hook Architect · Lvl 4",
      avatar: "/images/figurines/creator.png",
      themeColor: "#16A34A",
      kicker: "STEP 01 · INSTAGRAM MANAGEMENT",
      dialogue:
        "Chief! Pillar 01 is Instagram Management! We optimize your profile, script viral hooks, and engineer high-retention reels that turn random scrollers into lifelong brand advocates!",
      target: ".audiences-grid, .card",
      targetLabel: "Inspect Capabilities",
      actionHint: "👉 Pointing at our Reels-first architecture!",
    },
    {
      id: "svc-2",
      stepNum: 2,
      side: "right",
      character: "The Director",
      role: "Camera Commander · Lvl 5",
      avatar: "/images/figurines/director.png",
      themeColor: "#DB2777",
      kicker: "STEP 02 · YOUTUBE AUTHORITY",
      dialogue:
        "Over on your right, Chief! Pillar 02 is YouTube Management: Compelling long-form storytelling, retention-curved scripts, and strategic thumbnails that build deep intellectual authority!",
      target: ".section",
      targetLabel: "Inspect YouTube Pillar",
      actionHint: "👈 Long-form compounding authority!",
    },
    {
      id: "svc-3",
      stepNum: 3,
      side: "left",
      character: "The Alchemist",
      role: "Sound Foley Master · Lvl 5",
      avatar: "/images/figurines/alchemist.png",
      themeColor: "#0891B2",
      kicker: "STEP 03 · RETENTION EDITING",
      dialogue:
        "Jumped to your left! Pillar 03 is High-Retention Video Editing: Dynamic kinetic typography, custom sound design, and precision cuts designed for algorithmic discovery!",
      target: ".section",
      targetLabel: "Inspect Editing Post-Production",
      actionHint: "👉 Pacing engineered for the 73% mute viewers!",
    },
    {
      id: "svc-4",
      stepNum: 4,
      side: "right",
      character: "The Strategist",
      role: "Moat Architect · Lvl 5",
      avatar: "/images/figurines/strategist.png",
      themeColor: "#EA580C",
      kicker: "STEP 04 · LINKEDIN LEADERSHIP",
      dialogue:
        "Back on your right, Chief! Pillar 04 is LinkedIn Executive Positioning: Transforming founders and C-suite leaders into respected industry titans who attract high-ticket B2B deals!",
      target: ".section",
      targetLabel: "Inspect Executive Positioning",
      actionHint: "👈 B2B pipeline & intellectual property extraction!",
    },
    {
      id: "svc-5",
      stepNum: 5,
      side: "left",
      character: "The Whisperer",
      role: "Conversion Sage · Lvl 6",
      avatar: "/images/figurines/whisperer.png",
      themeColor: "#059669",
      kicker: "STEP 05 · ASSEMBLE SQUAD",
      dialogue:
        "Chief! Whether you are a Founder, Consultant, Creator, or Coach, all 8 studio minds are ready to mobilize behind your name. Tap Deploy to book your free strategy audit!",
      target: "#cta, .audiences-grid",
      targetLabel: "Deploy Studio Squad",
      actionHint: "👉 Ready to claim your organic distribution moat!",
    },
  ],

  "/about": [
    {
      id: "abt-1",
      stepNum: 1,
      side: "left",
      character: "The Strategist",
      role: "Moat Architect · Lvl 5",
      avatar: "/images/figurines/strategist.png",
      themeColor: "#EA580C",
      kicker: "STEP 01 · THE MANIFESTO",
      dialogue:
        "Chief! Read our manifesto on the left: 'Everyone has expertise. Few command attention.' We treat your personal brand like an enterprise asset that survives every algorithm change!",
      target: ".editorial-display-anchor",
      targetLabel: "Inspect Studio Manifesto",
      actionHint: "👉 Pure organic ethos · No shortcuts!",
    },
    {
      id: "abt-2",
      stepNum: 2,
      side: "right",
      character: "The Creator",
      role: "Hook Architect · Lvl 4",
      avatar: "/images/figurines/creator.png",
      themeColor: "#16A34A",
      kicker: "STEP 02 · MEET THE 3 CO-FOUNDERS",
      dialogue:
        "Over on your right, Chief! Meet our leadership: Pari Jain (Creative Face & Hook Lead), Anant Jain (Growth & Culture), and Deepak Jain (Content Quality Gatekeeper)!",
      target: ".team-section, .editorial-quote-card",
      targetLabel: "Meet the Founders",
      actionHint: "👈 3 minds leading India's top branding agency!",
    },
    {
      id: "abt-3",
      stepNum: 3,
      side: "left",
      character: "The Director",
      role: "Camera Commander · Lvl 5",
      avatar: "/images/figurines/director.png",
      themeColor: "#DB2777",
      kicker: "STEP 03 · 25-30 UNDER ONE ROOF",
      dialogue:
        "Chief! We are NOT freelancers scattered in cafes. 25–30 specialists work under one roof at our Delhi headquarters — strategists, scriptwriters, directors, and editors aligned in single focus!",
      target: ".editorial-anchor-stats, .team-stat",
      targetLabel: "Inspect Delhi HQ Setup",
      actionHint: "👉 100% in-house production studio in Delhi!",
    },
    {
      id: "abt-4",
      stepNum: 4,
      side: "right",
      character: "The Analyst",
      role: "Algorithm Scientist · Lvl 5",
      avatar: "/images/figurines/analyst.png",
      themeColor: "#7C3AED",
      kicker: "STEP 04 · TIMELINE JOURNEY",
      dialogue:
        "Chief! Look at our journey on the right: From two passionate minds brainstorming in a modest room in 2022 to 1.0 Billion+ views and 85+ scaled authorities in 2026!",
      target: ".journey-timeline, #journey",
      targetLabel: "Inspect 2022-2026 Timeline",
      actionHint: "👈 Zero external funding · Pure organic results!",
    },
    {
      id: "abt-5",
      stepNum: 5,
      side: "left",
      character: "The Builder",
      role: "Scale General · Lvl 6",
      avatar: "/images/figurines/builder.png",
      themeColor: "#2E5BFF",
      kicker: "STEP 05 · VISIT DELHI STUDIO",
      dialogue:
        "Chief! Visit our headquarters in Rohini, Delhi or book a free 1:1 strategy audit to see how we build your organic engine!",
      target: "#cta",
      targetLabel: "Book Strategy Call",
      actionHint: "👉 Let's connect directly with our founders!",
    },
  ],

  "/contact": [
    {
      id: "cnt-1",
      stepNum: 1,
      side: "left",
      character: "The Strategist",
      role: "Moat Architect · Lvl 5",
      avatar: "/images/figurines/strategist.png",
      themeColor: "#EA580C",
      kicker: "STEP 01 · ZERO-RISK AUDIT",
      dialogue:
        "Chief! You're one step away from your customized 90-day organic growth blueprint. No ad spend pitches, no spam — pure high-leverage strategic insight!",
      target: "h1, .page-hero",
      targetLabel: "Inspect Free Strategy Audit",
      actionHint: "👉 100% free 1:1 consultation with lead strategist!",
    },
    {
      id: "cnt-2",
      stepNum: 2,
      side: "right",
      character: "The Creator",
      role: "Hook Architect · Lvl 4",
      avatar: "/images/figurines/creator.png",
      themeColor: "#16A34A",
      kicker: "STEP 02 · PROFILE DETAILS",
      dialogue:
        "Chief! Enter your details, your current Instagram or YouTube handle, and your core category. We'll analyze your retention bottlenecks before we even hop on the call!",
      target: "form",
      targetLabel: "Inspect Intake Form",
      actionHint: "👈 Enter handle and growth objectives!",
    },
    {
      id: "cnt-3",
      stepNum: 3,
      side: "left",
      character: "The Alchemist",
      role: "Sound Foley Master · Lvl 5",
      avatar: "/images/figurines/alchemist.png",
      themeColor: "#0891B2",
      kicker: "STEP 03 · INSTANT WHATSAPP",
      dialogue:
        "Need immediate VIP communication, Chief? You can also message our Delhi team directly on WhatsApp for same-day scheduling!",
      target: "a[href*='wa.me']",
      targetLabel: "Inspect WhatsApp VIP Line",
      actionHint: "👉 Direct line to Delhi HQ production desk!",
    },
    {
      id: "cnt-4",
      stepNum: 4,
      side: "right",
      character: "The Builder",
      role: "Scale General · Lvl 6",
      avatar: "/images/figurines/builder.png",
      themeColor: "#2E5BFF",
      kicker: "STEP 04 · LOCK YOUR SLOT",
      dialogue:
        "Chief! We only onboard 3 new creator partners each month to protect production quality. Hit Submit to lock your slot!",
      target: "button[type='submit']",
      targetLabel: "Lock Your Strategy Slot",
      actionHint: "👈 Tap submit to mobilize the Orgix squad!",
    },
  ],
};

const CHIEF_TIPS = [
  "Chief! 73% of viewers watch reels on mute — always demand kinetic subtitles with contrast!",
  "Chief! The first 1.2 seconds decides if your reel hits 1K views or 1M views!",
  "Chief! 2 shoot days per month gives you a full 30-day content moat with zero daily stress!",
  "Chief! Organic followers buy your products. Paid ad followers vanish when your ad budget ends!",
  "Chief! Audio foley and subtle whooshes trigger dopamine hits that hold retention past 30 seconds!",
  "Chief! Contrarian angles get 4.2x more comments than generic motivational quotes!",
  "Chief! A high-converting DM funnel converts 10x better than putting links in bio!",
  "Chief! Ride cultural trend waves in the first 4 hours to index on the Explore page!",
];

export default function StudioTourBar() {
  const pathname = usePathname() || "/";
  const currentSteps = useMemo(() => {
    return PAGE_QUESTS[pathname] || PAGE_QUESTS["/"];
  }, [pathname]);

  const [stepIdx, setStepIdx] = useState(0);
  const [bubbleOpen, setBubbleOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [sparkles, setSparkles] = useState(false);
  const [easterEgg, setEasterEgg] = useState(null);
  const timeoutRef = useRef(null);

  // AI Mascot Chat Drawer State
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedFigurine, setSelectedFigurine] = useState(FIGURINES[0]);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "mascot",
      text: "Chief! I am The Strategist. Ask me anything about building an organic brand moat, viral hooks, or our Delhi studio!",
    },
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [engineTag, setEngineTag] = useState("Tactical Engine Active");

  // Reset step on page navigation
  useEffect(() => {
    setStepIdx(0);
    setBubbleOpen(true);
  }, [pathname]);

  const currentStep = currentSteps[stepIdx] || currentSteps[0];
  const isLeft = currentStep.side === "left";

  // Global listener from Hero or buttons
  useEffect(() => {
    const handleStartTour = () => {
      sound.playFanfare();
      setBubbleOpen(true);
      setStepIdx(0);
      setBounce(true);
      setSparkles(true);
      setTimeout(() => {
        setBounce(false);
        setSparkles(false);
      }, 700);

      const targetEl = document.querySelector(currentSteps[0].target);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        highlightTarget(currentSteps[0].target);
      }
    };

    window.addEventListener("start-studio-tour", handleStartTour);
    return () => window.removeEventListener("start-studio-tour", handleStartTour);
  }, [currentSteps]);

  const highlightTarget = (selector) => {
    try {
      const el = document.querySelector(selector);
      if (el) {
        el.classList.add("quest-highlight-active");
        setTimeout(() => {
          el.classList.remove("quest-highlight-active");
        }, 3200);
      }
    } catch (_) {}
  };

  const handleFlyToTarget = () => {
    sound.playPop();
    setSparkles(true);
    setTimeout(() => setSparkles(false), 600);

    const el = document.querySelector(currentStep.target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      highlightTarget(currentStep.target);
    }
  };

  const handleNextStep = () => {
    sound.playChime();
    setBounce(true);
    setSparkles(true);
    setTimeout(() => {
      setBounce(false);
      setSparkles(false);
    }, 600);

    if (stepIdx < currentSteps.length - 1) {
      const nextIdx = stepIdx + 1;
      setStepIdx(nextIdx);
      const nextS = currentSteps[nextIdx];
      const el = document.querySelector(nextS.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        highlightTarget(nextS.target);
      }
    } else {
      sound.playFanfare();
      const el = document.querySelector("#cta");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        highlightTarget("#cta");
      }
    }
  };

  const handlePrevStep = () => {
    sound.playClick();
    if (stepIdx > 0) {
      const prevIdx = stepIdx - 1;
      setStepIdx(prevIdx);
      const prevS = currentSteps[prevIdx];
      const el = document.querySelector(prevS.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        highlightTarget(prevS.target);
      }
    }
  };

  const handleMascotTap = () => {
    sound.playPop();
    setBounce(true);
    setSparkles(true);

    // Show fresh easter egg tip
    const randomTip = CHIEF_TIPS[Math.floor(Math.random() * CHIEF_TIPS.length)];
    setEasterEgg(randomTip);
    setBubbleOpen(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setBounce(false);
      setSparkles(false);
      setEasterEgg(null);
    }, 4500);
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleClaimSlot = () => {
    sound.playFanfare();
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { source: `walkthrough-${pathname}`, quest: "Quest Completed" },
      })
    );
  };

  // Open the AI Dialogue Terminal
  const openChatModal = () => {
    sound.playPop();
    const matched = FIGURINES.find((f) => f.name === currentStep.character) || FIGURINES[0];
    setSelectedFigurine(matched);
    setChatOpen(true);
  };

  const handleSendChatMessage = async (presetText) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;

    sound.playClick();
    const newMsgList = [...chatMessages, { sender: "user", text: textToSend }];
    setChatMessages(newMsgList);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/mascot-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          character: selectedFigurine.name,
          page: pathname,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        sound.playChime();
        setChatMessages((prev) => [
          ...prev,
          { sender: "mascot", text: data.reply },
        ]);
        if (data.engine) setEngineTag(data.engine);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "mascot",
            text: "Chief! Network link re-routing. Check that your question is clear or tap one of our quick tactical chips below!",
          },
        ]);
      }
    } catch (_) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "mascot",
          text: "Chief! Offline backup: Our 100% organic engine generates 1.0B+ views without ads. Book your free 1:1 strategy audit at orgixmedia.com!",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <>
      {/* ============================================================
          FREESTANDING CHARACTER & FLOATING BALLOON ON CURRENT SIDE
          NO SQUARE CONTAINER BOX!
         ============================================================ */}
      <aside
        aria-label="Clash of Clans Style Studio Walkthrough"
        className={`fixed bottom-3 sm:bottom-6 z-50 select-none pointer-events-auto transition-all duration-500 ease-out flex flex-col ${
          isLeft
            ? "left-3 sm:left-7 items-start animate-in slide-in-from-left-6"
            : "right-3 sm:right-7 items-end animate-in slide-in-from-right-6"
        }`}
      >
        {/* Floating Speech Balloon */}
        {bubbleOpen && (
          <div
            className={`relative mb-2 w-[280px] sm:w-[340px] rounded-3xl bg-[#F6F4EF]/98 backdrop-blur-2xl border-2 border-line/90 p-3.5 sm:p-4 text-ink shadow-[0_16px_40px_rgba(15,26,46,0.22)] transition-all duration-300 ${
              isLeft ? "animate-in slide-in-from-left-3" : "animate-in slide-in-from-right-3"
            }`}
          >
            {/* Balloon tail pointing down toward the mascot's head */}
            <div
              className={`absolute -bottom-2 w-3.5 h-3.5 bg-[#F6F4EF] border-r-2 border-b-2 border-line/90 rotate-45 ${
                isLeft ? "left-9" : "right-9"
              }`}
              aria-hidden="true"
            />

            {/* Top Bar: Quest Badge + Current Side + Sound + Close */}
            <div className="flex items-center justify-between gap-1 pb-2 mb-2 border-b border-line/60 font-mono text-[9.5px]">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse transition-colors"
                  style={{ backgroundColor: currentStep.themeColor }}
                />
                <span className="font-bold text-accent uppercase tracking-wider">
                  {currentStep.kicker}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-[9px] text-ink-soft bg-black/5 px-1.5 py-0.5 rounded-md font-mono">
                  {stepIdx + 1}/{currentSteps.length}
                </span>
                <button
                  type="button"
                  onClick={toggleSound}
                  className="w-5 h-5 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors cursor-pointer text-ink-soft text-[10px]"
                  title={isMuted ? "Sound: Muted" : "Sound: Active"}
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setBubbleOpen(false);
                  }}
                  className="w-5 h-5 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors cursor-pointer text-ink-soft hover:text-ink text-[11px]"
                  title="Hide speech bubble (Mascot stays visible)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Spoken Dialogue to Chief */}
            <p className="font-body text-[12px] sm:text-[12.5px] text-ink leading-relaxed font-normal mb-2">
              {easterEgg ? (
                <span className="text-accent font-semibold block animate-in fade-in">
                  💡 {easterEgg}
                </span>
              ) : (
                currentStep.dialogue
              )}
            </p>

            {/* Animated Directional Pointer pointing at element */}
            <div className="mb-2 flex items-center justify-between gap-1 font-mono text-[9.5px]">
              <span className="text-accent font-semibold">{currentStep.actionHint}</span>
            </div>

            {/* Action Button Row */}
            <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-line/50">
              {/* Back Button */}
              <button
                type="button"
                disabled={stepIdx === 0}
                onClick={handlePrevStep}
                className="px-2 py-1 rounded-full text-[10px] font-mono text-ink-soft hover:text-ink border border-line disabled:opacity-20 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Previous step"
              >
                ←
              </button>

              {/* Fly to Target Section / Line */}
              <button
                type="button"
                onClick={handleFlyToTarget}
                className="px-2.5 py-1 rounded-full bg-white border border-line hover:border-accent text-accent font-mono text-[10.5px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <span>🎯 {currentStep.targetLabel}</span>
                <span className="text-[9px]">↓</span>
              </button>

              {/* Next Step / Finish */}
              {stepIdx < currentSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-3.5 py-1 rounded-full bg-ink hover:bg-accent text-white font-body text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <span>Next</span>
                  <span className="text-[9px]">➔</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClaimSlot}
                  className="px-3.5 py-1 rounded-full bg-accent text-white font-body text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95 animate-pulse"
                >
                  <span>Deploy 🚀</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Freestanding 3D Mascot Character (No Container Box!) */}
        <div
          key={currentStep.id}
          onClick={handleMascotTap}
          className={`relative flex flex-col items-center cursor-pointer select-none group/mascot transition-all duration-300 ${
            isLeft ? "origin-bottom-left" : "origin-bottom-right"
          }`}
          title={`Chief! Tap ${currentStep.character} for game secret!`}
        >
          {/* Floating Sparkle Particles */}
          {sparkles && (
            <div className="absolute -top-4 pointer-events-none flex items-center gap-1 text-sm animate-bounce">
              <span>✨</span>
              <span>⭐</span>
              <span>💫</span>
            </div>
          )}

          {/* Freestanding 3D Mascot Image */}
          <div
            className={`relative w-22 h-32 sm:w-26 sm:h-38 flex items-end justify-center transition-transform duration-300 group-hover/mascot:scale-105 ${
              bounce ? "-translate-y-4 scale-115 rotate-3" : ""
            }`}
          >
            <img
              src={currentStep.avatar}
              alt={currentStep.character}
              className="w-full h-full object-contain drop-shadow-[0_16px_28px_rgba(15,26,46,0.38)]"
            />

            {/* Level Medal floating near character */}
            <div
              className={`absolute top-2 px-1.5 py-0.5 rounded-md text-white font-mono text-[8px] uppercase tracking-wider font-bold shadow-xs border border-white/20 ${
                isLeft ? "-right-1" : "-left-1"
              }`}
              style={{ backgroundColor: currentStep.themeColor }}
            >
              {currentStep.role.split(" · ")[1] || "Lvl 5"}
            </div>
          </div>

          {/* Soft floor shadow under mascot feet */}
          <div className="w-16 sm:w-20 h-2.5 rounded-full bg-ink/25 blur-2xs mt-0.5" />

          {/* Character Name under feet */}
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-line shadow-2xs font-display font-medium text-[11px] text-ink flex items-center justify-center">
            <span>{currentStep.character}</span>
          </div>

          {/* Closed hint */}
          {!bubbleOpen && (
            <div className="mt-1 px-2 py-0.5 rounded-full bg-accent text-white text-[9px] font-mono font-semibold shadow-xs flex items-center gap-1 animate-bounce">
              <span>💬 Tap me, Chief!</span>
            </div>
          )}
        </div>
      </aside>

      {/* ============================================================
          AI MASCOT CHAT DIALOGUE MODAL (CLASH OF CLANS TACTICAL HUD)
         ============================================================ */}
      {chatOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
          onClick={() => setChatOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-[#F6F4EF] border-2 border-line rounded-3xl shadow-[0_24px_60px_rgba(15,26,46,0.35)] overflow-hidden flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-200"
          >
            {/* Header with selected character */}
            <div className="px-4 sm:px-6 py-3.5 bg-ink text-white flex items-center justify-between gap-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 p-0.5 border border-white/20 overflow-hidden flex items-end justify-center">
                  <img
                    src={selectedFigurine.avatar}
                    alt={selectedFigurine.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-semibold text-[15px] leading-none">
                      {selectedFigurine.name}
                    </h3>
                    <span
                      className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase"
                      style={{ backgroundColor: selectedFigurine.themeColor }}
                    >
                      {selectedFigurine.role.split(" · ")[1]}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-white/70 font-mono mt-0.5">
                    {selectedFigurine.role.split(" · ")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                  {engineTag}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setChatOpen(false);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                  title="Close dialogue"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Roster Character Selector Tabs (All 8 Figurines) */}
            <div className="px-3 sm:px-5 py-2 bg-black/5 border-b border-line flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {FIGURINES.map((fig) => {
                const isSel = fig.id === selectedFigurine.id;
                return (
                  <button
                    key={fig.id}
                    type="button"
                    onClick={() => {
                      sound.playPop();
                      setSelectedFigurine(fig);
                      setChatMessages((prev) => [
                        ...prev,
                        {
                          sender: "mascot",
                          text: `Chief! ${fig.name} here. ${fig.intro}`,
                        },
                      ]);
                    }}
                    className={`px-2.5 py-1 rounded-full font-mono text-[10px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 border ${
                      isSel
                        ? "bg-ink text-white border-ink font-semibold shadow-2xs scale-105"
                        : "bg-white/80 hover:bg-white text-ink-soft border-line hover:border-ink/40"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: fig.themeColor }}
                    />
                    <span>{fig.name.replace("The ", "")}</span>
                  </button>
                );
              })}
            </div>

            {/* Chat Conversation History */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 font-body text-[13px]">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "mascot" && (
                    <div className="w-8 h-8 rounded-full bg-black/5 border border-line flex-shrink-0 overflow-hidden flex items-end justify-center">
                      <img
                        src={selectedFigurine.avatar}
                        alt="Avatar"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 leading-relaxed shadow-2xs ${
                      msg.sender === "user"
                        ? "bg-accent text-white rounded-tr-none font-medium"
                        : "bg-white text-ink rounded-tl-none border border-line font-normal"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex items-center gap-2 text-ink-soft font-mono text-xs">
                  <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  <span>{selectedFigurine.name} is calculating response...</span>
                </div>
              )}
            </div>

            {/* Quick Tactical Prompt Chips */}
            <div className="px-4 py-2 border-t border-line/60 bg-white/50 flex flex-wrap gap-1.5">
              {[
                "How do we get 1M+ organic views?",
                "Why 100% organic instead of paid ads?",
                "How does 2 shoot days give 30 days of content?",
                "What did Demla Brothers achieve with Orgix?",
                "How does DM funnel turn views into clients?",
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSendChatMessage(chip)}
                  className="px-2.5 py-0.5 rounded-full bg-white border border-line hover:border-accent text-ink-soft hover:text-accent font-mono text-[10px] transition-colors cursor-pointer shadow-2xs"
                >
                  💡 {chip}
                </button>
              ))}
            </div>

            {/* Message Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-line flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendChatMessage();
                }}
                placeholder={`Ask ${selectedFigurine.name} anything, Chief...`}
                className="flex-1 px-4 py-2.5 rounded-full border border-line focus:border-accent focus:outline-hidden text-ink font-body text-[13px] bg-[#F6F4EF]/50"
              />

              <button
                type="button"
                onClick={() => handleSendChatMessage()}
                disabled={chatLoading || !chatInput.trim()}
                className="px-4 py-2.5 rounded-full bg-ink hover:bg-accent disabled:opacity-40 text-white font-body text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
              >
                <span>Ask</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
