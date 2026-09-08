"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { sound } from "@/lib/sound";

// ============================================================================
// THE 8-MEMBER ORGIX TEAM (the people behind the engine)
// Human roles — no game jargon.
// ============================================================================
const FIGURINES = [
  {
    id: "strategist",
    name: "The Strategist",
    role: "Brand Strategist",
    avatar: "/images/figurines/strategist.webp",
    themeColor: "#EA580C",
    intro: "I help you claim the territory nobody's taken yet — so every reel you make builds a position no one can copy.",
  },
  {
    id: "creator",
    name: "The Scriptwriter",
    role: "Scriptwriter",
    avatar: "/images/figurines/creator.webp",
    themeColor: "#16A34A",
    intro: "I turn the things you already know into hooks and stories people actually watch till the end.",
  },
  {
    id: "director",
    name: "The Director",
    role: "Shooting Director",
    avatar: "/images/figurines/director.webp",
    themeColor: "#DB2777",
    intro: "I run calm, guided shoot days in our Delhi studio that give you a month of content in one sitting.",
  },
  {
    id: "alchemist",
    name: "The Editor",
    role: "Video Editor",
    avatar: "/images/figurines/alchemist.webp",
    themeColor: "#0891B2",
    intro: "I cut with rhythm and add kinetic text and sound so viewers — even on mute — stay till the last frame.",
  },
  {
    id: "analyst",
    name: "The Analyst",
    role: "Growth Analyst",
    avatar: "/images/figurines/analyst.webp",
    themeColor: "#7C3AED",
    intro: "I watch retention curves and average-percentage-viewed. Data before drama, every time.",
  },
  {
    id: "whisperer",
    name: "The Strategist",
    role: "Conversion Strategist",
    avatar: "/images/figurines/whisperer.webp",
    themeColor: "#059669",
    intro: "I turn views into replies and replies into paying clients — with funnels that feel like conversation, not marketing.",
  },
  {
    id: "catalyst",
    name: "The Trend Scout",
    role: "Trend Strategist",
    avatar: "/images/figurines/catalyst.webp",
    themeColor: "#D97706",
    intro: "I spot momentum early and help you ride the right wave before your niche gets crowded.",
  },
  {
    id: "builder",
    name: "The Builder",
    role: "Founder & Account Lead",
    avatar: "/images/figurines/builder.webp",
    themeColor: "#2E5BFF",
    intro: "I keep all of us aligned on your goal — from the first call to the day you hit 1M followers.",
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
      role: "Brand Strategist",
      avatar: "/images/figurines/strategist.webp",
      themeColor: "#EA580C",
      kicker: "01 · WHY 100% ORGANIC",
      dialogue:
        "See that promise up top? '100% Organic Growth · No Ads · No Bots'. Here's why it matters: ads stop working the moment you stop paying. Organic authority keeps compounding — that's the honest way to build a brand people trust.",
      target: ".hero-rise-1",
      targetLabel: "See our promise",
      actionHint: "Right there — our no-shortcuts guarantee.",
    },
    {
      id: "home-2",
      stepNum: 2,
      side: "right",
      character: "The Scriptwriter",
      role: "Scriptwriter",
      avatar: "/images/figurines/creator.webp",
      themeColor: "#16A34A",
      kicker: "02 · REAL, VERIFIED RESULTS",
      dialogue:
        "This is what we've actually done: 85+ creators and founders grown, over a billion organic views. No bought followers, no fake numbers — every view earned through stories people chose to watch.",
      target: ".hero-rise-5",
      targetLabel: "See the numbers",
      actionHint: "Left there — our track record at a glance.",
    },
    {
      id: "home-3",
      stepNum: 3,
      side: "left",
      character: "The Trend Scout",
      role: "Trend Strategist",
      avatar: "/images/figurines/catalyst.webp",
      themeColor: "#D97706",
      kicker: "03 · THE CLIENTS BEHIND THE GROWTH",
      dialogue:
        "Scroll down and you'll meet the people behind the growth — Shark Tank brands like Cellbell, cricketer Royston Dias, finance creator Gaurav Mahawar. These aren't stock images; they're real clients we've scaled.",
      target: "#results",
      targetLabel: "Meet the clients",
      actionHint: "Take a look at their results.",
    },
    {
      id: "home-4",
      stepNum: 4,
      side: "right",
      character: "The Director",
      role: "Shooting Director",
      avatar: "/images/figurines/director.webp",
      themeColor: "#DB2777",
      kicker: "04 · OUR DELHI STUDIO",
      dialogue:
        "We're not freelancers working from laptops. There's a full team of 25–30 strategists, writers, editors and shooters under one roof in Delhi. This is how we go from a single shoot day to a full month of content — reliably.",
      target: "#process",
      targetLabel: "Tour the studio",
      actionHint: "See how the engine actually runs.",
    },
    {
      id: "home-5",
      stepNum: 5,
      side: "left",
      character: "The Editor",
      role: "Video Editor",
      avatar: "/images/figurines/alchemist.webp",
      themeColor: "#0891B2",
      kicker: "05 · RETENTION-DRIVEN EDITING",
      dialogue:
        "Here's a little detail most people miss: about 73% watch reels on mute. So we add kinetic text, sound design and tight pacing that keep people watching even with sound off. That's what makes a video impossible to scroll past.",
      target: "#editing",
      targetLabel: "Watch our edits",
      actionHint: "Test the retention for yourself.",
    },
    {
      id: "home-6",
      stepNum: 6,
      side: "right",
      character: "The Strategist",
      role: "Conversion Strategist",
      avatar: "/images/figurines/whisperer.webp",
      themeColor: "#059669",
      kicker: "06 · GROWTH THAT PAYS FOR ITSELF",
      dialogue:
        "A million views means nothing if it doesn't pay. We also build comment-to-DM funnels and lead nurturing, so your viral reach actually turns into clients and deals — not just likes.",
      target: "#cast",
      targetLabel: "Meet the full team",
      actionHint: "Everyone working in your corner.",
    },
    {
      id: "home-7",
      stepNum: 7,
      side: "left",
      character: "The Analyst",
      role: "Growth Analyst",
      avatar: "/images/figurines/analyst.webp",
      themeColor: "#7C3AED",
      kicker: "07 · WHY WE'RE DIFFERENT",
      dialogue:
        "Want to see the honest comparison? Set us against paid ads and freelancers. We keep everything in-house — strategy, shooting, editing, funnels. That's how you get consistent results, not one-off videos.",
      target: "#comparison",
      targetLabel: "See the comparison",
      actionHint: "The real difference, side by side.",
    },
    {
      id: "home-8",
      stepNum: 8,
      side: "right",
      character: "The Builder",
      role: "Founder & Account Lead",
      avatar: "/images/figurines/builder.webp",
      themeColor: "#2E5BFF",
      kicker: "08 · YOUR TURN",
      dialogue:
        "All right — that's the whole picture. If it feels like the right fit, book a free call and we'll map out your 90-day growth plan. No pressure, just a real conversation about your brand.",
      target: "#cta",
      targetLabel: "Book a free call",
      actionHint: "Start with a real conversation.",
    },
  ],

  "/work": [
    {
      id: "work-1",
      stepNum: 1,
      side: "left",
      character: "The Strategist",
      role: "Brand Strategist",
      avatar: "/images/figurines/strategist.webp",
      themeColor: "#EA580C",
      kicker: "01 · BROWSE THE PORTFOLIO",
      dialogue:
        "Welcome to our work — a portfolio of 24 creators and founders we've grown, 100% organically. Use these filters to explore by 'All', 'Founders', 'Creators', or 'Brands'.",
      target: ".filters",
      targetLabel: "Browse the filters",
      actionHint: "Switch between founders and brands.",
    },
    {
      id: "work-2",
      stepNum: 2,
      side: "right",
      character: "The Analyst",
      role: "Growth Analyst",
      avatar: "/images/figurines/analyst.webp",
      themeColor: "#7C3AED",
      kicker: "02 · PROOF THAT TRANSLATES",
      dialogue:
        "Notice the names that matter — Shark Tank brands like Cellbell and Mintree. Real, founder-led authority built purely through organic video retention.",
      target: ".wall-grid",
      targetLabel: "See the case studies",
      actionHint: "Each card shows verified results.",
    },
    {
      id: "work-3",
      stepNum: 3,
      side: "left",
      character: "The Trend Scout",
      role: "Trend Strategist",
      avatar: "/images/figurines/catalyst.webp",
      themeColor: "#D97706",
      kicker: "03 · AUTHORITY IN EVERY NICHE",
      dialogue:
        "Across the grid you'll see cricketer Royston Dias, CA Jyoti Goyal, and 9SKIN. We build authority in high-ticket niches that attract serious clients.",
      target: ".wall-grid",
      targetLabel: "Explore the niche",
      actionHint: "Notice the handles and growth stats.",
    },
    {
      id: "work-4",
      stepNum: 4,
      side: "right",
      character: "The Strategist",
      role: "Conversion Strategist",
      avatar: "/images/figurines/whisperer.webp",
      themeColor: "#059669",
      kicker: "04 · GROWTH THAT CONVERTS",
      dialogue:
        "Take Tools Fact — scaled from short reels to ₹35L in direct revenue. Great content should do more than get views; it should bring in business.",
      target: ".wall-grid",
      targetLabel: "See the revenue proof",
      actionHint: "Real commercial outcomes, not vanity metrics.",
    },
    {
      id: "work-5",
      stepNum: 5,
      side: "left",
      character: "The Builder",
      role: "Founder & Account Lead",
      avatar: "/images/figurines/builder.webp",
      themeColor: "#2E5BFF",
      kicker: "05 · YOU COULD BE NEXT",
      dialogue:
        "There's one slot in this portfolio still open — yours. Every founder here started with a single conversation. Let's have that conversation.",
      target: ".wall-card--next",
      targetLabel: "Claim your slot",
      actionHint: "Open a conversation about your brand.",
    },
  ],

  "/services": [
    {
      id: "svc-1",
      stepNum: 1,
      side: "left",
      character: "The Scriptwriter",
      role: "Scriptwriter",
      avatar: "/images/figurines/creator.webp",
      themeColor: "#16A34A",
      kicker: "01 · INSTAGRAM MANAGEMENT",
      dialogue:
        "First, Instagram. We build a strategy, script hooks people actually stop for, and publish high-retention reels that turn casual scrollers into loyal followers.",
      target: ".audiences-grid, .card",
      targetLabel: "Explore the capability",
      actionHint: "A reels-first approach to your profile.",
    },
    {
      id: "svc-2",
      stepNum: 2,
      side: "right",
      character: "The Director",
      role: "Shooting Director",
      avatar: "/images/figurines/director.webp",
      themeColor: "#DB2777",
      kicker: "02 · YOUTUBE AUTHORITY",
      dialogue:
        "Then YouTube — where your ideas get depth. Long-form storytelling, retention-focused scripts, and structured content that builds real intellectual authority.",
      target: ".section",
      targetLabel: "Explore the capability",
      actionHint: "Deep, compounding authority over time.",
    },
    {
      id: "svc-3",
      stepNum: 3,
      side: "left",
      character: "The Editor",
      role: "Video Editor",
      avatar: "/images/figurines/alchemist.webp",
      themeColor: "#0891B2",
      kicker: "03 · RETENTION EDITING",
      dialogue:
        "Editing is where attention is won or lost. Dynamic text, thoughtful sound design, and precise pacing — built to keep even the 73% watching on mute locked in.",
      target: ".section",
      targetLabel: "Explore the capability",
      actionHint: "Pacing designed for real viewers.",
    },
    {
      id: "svc-4",
      stepNum: 4,
      side: "right",
      character: "The Strategist",
      role: "Brand Strategist",
      avatar: "/images/figurines/strategist.webp",
      themeColor: "#EA580C",
      kicker: "04 · LINKEDIN LEADERSHIP",
      dialogue:
        "And LinkedIn — for founders and C-suite leaders. We shape the positioning that earns high-ticket B2B trust, so your personal brand opens doors professionally.",
      target: ".section",
      targetLabel: "Explore the capability",
      actionHint: "Executive positioning that attracts clients.",
    },
    {
      id: "svc-5",
      stepNum: 5,
      side: "left",
      character: "The Builder",
      role: "Founder & Account Lead",
      avatar: "/images/figurines/builder.webp",
      themeColor: "#2E5BFF",
      kicker: "05 · READY TO START?",
      dialogue:
        "Whether you're a founder, consultant, creator, or coach — the whole team is ready to work behind you. Book a free call and we'll map out your plan.",
      target: "#cta, .audiences-grid",
      targetLabel: "Book your free call",
      actionHint: "A real conversation about your brand.",
    },
  ],

  "/about": [
    {
      id: "abt-1",
      stepNum: 1,
      side: "left",
      character: "The Strategist",
      role: "Brand Strategist",
      avatar: "/images/figurines/strategist.webp",
      themeColor: "#EA580C",
      kicker: "01 · THE MANIFESTO",
      dialogue:
        "Read our manifesto to the left — 'Everyone has expertise. Few command attention.' We treat your personal brand as an asset built to survive every algorithm change.",
      target: ".editorial-display-anchor",
      targetLabel: "Read the manifesto",
      actionHint: "Our founding belief, in a few lines.",
    },
    {
      id: "abt-2",
      stepNum: 2,
      side: "right",
      character: "The Scriptwriter",
      role: "Scriptwriter",
      avatar: "/images/figurines/creator.webp",
      themeColor: "#16A34A",
      kicker: "02 · THE CO-FOUNDERS",
      dialogue:
        "To the right you'll meet the three of us — Pari Jain, Anant Jain, and Deepak Jain. This is the leadership making every call behind the brand.",
      target: ".team-section, .editorial-quote-card",
      targetLabel: "Meet the founders",
      actionHint: "Three people behind every decision.",
    },
    {
      id: "abt-3",
      stepNum: 3,
      side: "left",
      character: "The Director",
      role: "Shooting Director",
      avatar: "/images/figurines/director.webp",
      themeColor: "#DB2777",
      kicker: "03 · A REAL TEAM, ONE ROOF",
      dialogue:
        "We're not freelancers scattered across cafés. 25–30 specialists — strategists, writers, directors, editors — work under one roof in Delhi, aligned on your growth.",
      target: ".editorial-anchor-stats, .team-stat",
      targetLabel: "See the team setup",
      actionHint: "A fully in-house studio in Delhi.",
    },
    {
      id: "abt-4",
      stepNum: 4,
      side: "right",
      character: "The Analyst",
      role: "Growth Analyst",
      avatar: "/images/figurines/analyst.webp",
      themeColor: "#7C3AED",
      kicker: "04 · THE JOURNEY SO FAR",
      dialogue:
        "Look at the timeline to the right — from two founders brainstorming in a small room in 2022 to a billion+ views and 85+ scaled brands by 2026.",
      target: ".journey-timeline, #journey",
      targetLabel: "See the timeline",
      actionHint: "From 2022 to today, no funding, only organic.",
    },
    {
      id: "abt-5",
      stepNum: 5,
      side: "left",
      character: "The Builder",
      role: "Founder & Account Lead",
      avatar: "/images/figurines/builder.webp",
      themeColor: "#2E5BFF",
      kicker: "05 · COME SEE US",
      dialogue:
        "Visit us in Rohini, Delhi, or book a free 1:1 strategy call to see how we'd build your organic engine. We'd love to meet you.",
      target: "#cta",
      targetLabel: "Book a strategy call",
      actionHint: "Let's connect directly.",
    },
  ],

  "/contact": [
    {
      id: "cnt-1",
      stepNum: 1,
      side: "left",
      character: "The Strategist",
      role: "Brand Strategist",
      avatar: "/images/figurines/strategist.webp",
      themeColor: "#EA580C",
      kicker: "01 · A FREE STRATEGY AUDIT",
      dialogue:
        "You're one step from a personalized 90-day organic growth blueprint. No ad-spend pitches, no spam — just high-leverage strategic guidance.",
      target: "h1, .page-hero",
      targetLabel: "Explore the free audit",
      actionHint: "A free 1:1 with the lead strategist.",
    },
    {
      id: "cnt-2",
      stepNum: 2,
      side: "right",
      character: "The Scriptwriter",
      role: "Scriptwriter",
      avatar: "/images/figurines/creator.webp",
      themeColor: "#16A34A",
      kicker: "02 · SHARE A FEW DETAILS",
      dialogue:
        "Add your handle and your category on the form, and we'll look at your growth bottlenecks before we even get on the call.",
      target: "form",
      targetLabel: "Fill the intake form",
      actionHint: "Your handle and goals help us prep.",
    },
    {
      id: "cnt-3",
      stepNum: 3,
      side: "left",
      character: "The Editor",
      role: "Video Editor",
      avatar: "/images/figurines/alchemist.webp",
      themeColor: "#0891B2",
      kicker: "03 · PREFER WHATSAPP?",
      dialogue:
        "If you'd rather message us directly, our Delhi team is on WhatsApp for quick, same-day scheduling.",
      target: "a[href*='wa.me']",
      targetLabel: "Message us on WhatsApp",
      actionHint: "A direct line to our Delhi team.",
    },
    {
      id: "cnt-4",
      stepNum: 4,
      side: "right",
      character: "The Builder",
      role: "Founder & Account Lead",
      avatar: "/images/figurines/builder.webp",
      themeColor: "#2E5BFF",
      kicker: "04 · LOCK IN YOUR CALL",
      dialogue:
        "We onboard a limited number of new partners each month to protect quality. Hit submit and we'll be in touch to schedule your call.",
      target: "button[type='submit']",
      targetLabel: "Submit & schedule",
      actionHint: "Send it and we'll reach out quickly.",
    },
  ],
};

const CHIEF_TIPS = [
  "Fun fact: about 73% of viewers watch reels on mute — so kinetic subtitles with strong contrast make all the difference.",
  "The first 1.2 seconds decides whether a reel gets 1K views or 1M views — that's where the hook earns its keep.",
  "Two efficient shoot days a month give you a full 30-day content bank, with zero daily stress.",
  "Organic followers actually buy from you. Paid-ad followers disappear the moment the ad budget ends.",
  "Thoughtful sound design and subtle effects keep retention high far past the 30-second mark.",
  "Specific, contrarian angles reliably get more comments than generic motivational quotes.",
  "A well-built comment-to-DM funnel converts far better than a simple link in bio.",
  "Riding a cultural wave within the first few hours is often what gets a post onto the Explore page.",
];

const GUIDE_STATE_KEY = "orgix_guide_state";

function readGuideState() {
  if (typeof window === "undefined") return "welcome";
  try {
    return window.localStorage.getItem(GUIDE_STATE_KEY) === "minimized" ? "minimized" : "welcome";
  } catch (_) {
    return "welcome";
  }
}

function saveGuideState(state) {
  try {
    window.localStorage.setItem(GUIDE_STATE_KEY, state);
  } catch (_) {
    /* no-op */
  }
}

export default function StudioTourBar() {
  const pathname = usePathname() || "/";
  const currentSteps = useMemo(() => {
    return PAGE_QUESTS[pathname] || PAGE_QUESTS["/"];
  }, [pathname]);

  const [guideState, setGuideState] = useState(readGuideState); // "welcome" | "touring" | "minimized"
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
      text: "Hi, I'm the Orgix team guide. Ask me anything about building a personal brand, going organic, or how our Delhi studio works!",
    },
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [engineTag, setEngineTag] = useState("Orgix Guide");

  // Reset step on page navigation
  useEffect(() => {
    setStepIdx(0);
    if (guideState === "touring") setBubbleOpen(true);
  }, [pathname]);

  const currentStep = currentSteps[stepIdx] || currentSteps[0];
  const isLeft = currentStep.side === "left";
  const guide = FIGURINES.find((f) => f.name === currentStep.character) || FIGURINES[0];

  // Global listener from Hero or buttons
  useEffect(() => {
    const handleStartTour = () => {
      sound.playFanfare();
      setGuideState("touring");
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
    setTimeout(() => setBounce(false), 450);

    // If tour was dismissed, tapping the guide reopens the welcome invite
    if (guideState === "minimized") {
      setGuideState("welcome");
      setBubbleOpen(true);
      setEasterEgg(null);
      return;
    }

    // Otherwise show a fresh "did you know" tip
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

  const startTour = () => {
    sound.playPop();
    setGuideState("touring");
    setBubbleOpen(true);
    setEasterEgg(null);
    setStepIdx(0);
    const el = document.querySelector(currentSteps[0].target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const dismissToMinimized = () => {
    sound.playClick();
    setGuideState("minimized");
    setBubbleOpen(false);
    setEasterEgg(null);
    saveGuideState("minimized");
  };

  const reopenGuide = () => {
    sound.playPop();
    setGuideState("welcome");
    setBubbleOpen(true);
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
        detail: { source: `walkthrough-${pathname}`, step: "Guide Complete" },
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
            text: "Sorry, I couldn't quite catch that. Could you rephrase, or tap one of the quick questions below?",
          },
        ]);
      }
    } catch (_) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "mascot",
          text: "We're offline right now, but the team's still here: 100% organic growth, 1B+ views, no ads. Book a free strategy call at orgixmedia.com and we'll get back to you.",
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
        aria-label="Orgix guided walkthrough"
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

            {/* Top Bar: Guide identity / Step Badge + Sound + Close */}
            <div className="flex items-center justify-between gap-1 pb-2 mb-2 border-b border-line/60 font-mono text-[9.5px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full animate-pulse transition-colors"
                  style={{ backgroundColor: currentStep.themeColor }}
                />
                {guideState === "welcome" ? (
                  <span className="font-bold text-accent uppercase tracking-wider truncate">
                    Hi, I'm the Orgix guide 👋
                  </span>
                ) : (
                  <span className="font-bold text-accent uppercase tracking-wider truncate">
                    {currentStep.kicker}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {guideState === "touring" && (
                  <span className="text-[9px] text-ink-soft bg-black/5 px-1.5 py-0.5 rounded-md font-mono">
                    {stepIdx + 1}/{currentSteps.length}
                  </span>
                )}
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
                  onClick={dismissToMinimized}
                  className="w-5 h-5 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors cursor-pointer text-ink-soft hover:text-ink text-[11px]"
                  title="Hide the guide (tap me anytime to bring it back)"
                >
                  ✕
                </button>
              </div>
            </div>

            {guideState === "welcome" ? (
              <>
                {/* Spoken greeting — a human offering to show you around */}
                <p className="font-body text-[12.5px] sm:text-[13px] text-ink leading-relaxed font-normal mb-2">
                  Welcome to Orgix 👋 I'm {guide.name} — I can show you around this page and point out what
                  matters. It only takes a minute.
                </p>
                <div className="mb-2 flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={startTour}
                    className="inline-flex px-3.5 py-1.5 rounded-full bg-ink hover:bg-accent text-white font-body text-[12px] font-semibold items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>▶ Start tour</span>
                  </button>
                  <button
                    type="button"
                    onClick={dismissToMinimized}
                    className="px-3 py-1.5 rounded-full bg-white border border-line hover:border-accent text-ink-soft font-body text-[11.5px] transition-colors cursor-pointer"
                  >
                    Not now
                  </button>
                  <button
                    type="button"
                    onClick={openChatModal}
                    className="px-3 py-1.5 rounded-full bg-white border border-line hover:border-accent text-ink-soft font-body text-[11.5px] transition-colors cursor-pointer"
                  >
                    💬 Ask me
                  </button>
                </div>
              </>
            ) : (
              <>
            {/* Spoken Dialogue to the visitor */}
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
                  <span>Book Free Call →</span>
                </button>
              )}
            </div>
              </>
            )}
          </div>
        )}

        {/* Freestanding 3D Mascot Character (No Container Box!) */}
        <div
          key={currentStep.id}
          onClick={handleMascotTap}
          className={`relative flex flex-col items-center cursor-pointer select-none group/mascot transition-all duration-300 ${
            isLeft ? "origin-bottom-left" : "origin-bottom-right"
          }`}
          title={`Tap ${currentStep.character} again for a quick tip!`}
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
              {currentStep.role || "Orgix"}
            </div>
          </div>

          {/* Soft floor shadow under mascot feet */}
          <div className="w-16 sm:w-20 h-2.5 rounded-full bg-ink/25 blur-2xs mt-0.5" />

          {/* Character Name under feet */}
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-line shadow-2xs font-display font-medium text-[11px] text-ink flex items-center justify-center">
            <span>{guideState === "minimized" ? "Your guide" : currentStep.character}</span>
          </div>

          {/* Minimized dock pill — human-style "ask me" invite */}
          {guideState === "minimized" && (
            <div
              onClick={reopenGuide}
              className="mt-1 px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-body font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer hover:bg-blue-600 transition-colors animate-bounce"
              title="Open the guide"
            >
              <span>💬</span>
              <span>Hello! Ask me anything</span>
            </div>
          )}
        </div>
      </aside>

      {/* ============================================================
          AI MASCOT CHAT DIALOGUE MODAL (ORGIX TEAM GUIDE)
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
                      {selectedFigurine.role.split(" · ")[0]}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-white/70 font-mono mt-0.5">
                    Orgix team
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
                          text: `${fig.name} — ${fig.intro}`,
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
                  <span>{selectedFigurine.name} is typing...</span>
                </div>
              )}
            </div>

            {/* Quick Question Prompt Chips */}
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
                placeholder={`Ask ${selectedFigurine.name} anything...`}
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
