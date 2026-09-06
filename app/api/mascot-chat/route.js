import { NextResponse } from "next/server";

// Fallback tactical responses when no API key is provided
const KNOWLEDGE_BASE = {
  "The Strategist": {
    organic:
      "Chief! Paid ads rent temporary attention that vanishes the second your ad budget hits zero. Organic authority builds a compound monopoly — every reel, carousel, and video continues working for your personal brand months after posting without paying Mark Zuckerberg a single rupee!",
    shoot:
      "Chief! You don't need 40 hours a week to dominate social media. Our 2-day guided shoot sprint gives you an entire 30-day content moat. We do the niche analytics and scriptwriting in advance — you deliver your expertise on camera for 4 hours!",
    default:
      "Chief! In personal branding, positioning is everything. Don't be a generic creator; be the undisputed category authority in your niche. Let's book your free 1:1 strategy audit to map your 90-day trajectory!",
  },
  "The Creator": {
    views:
      "Chief! 1.0 Billion views isn't luck — it's scientific hook engineering! The first 1.2 to 2.5 seconds determines 80% of your retention. We craft pattern-interrupt hooks with visual contrast and curiosity loops that stop the scroll instantly!",
    script:
      "Chief! A great script doesn't sound like a speech; it sounds like an insider secret whispered to a peer. We research your competitors' top performing angles and write tight, punchy scripts that keep viewers hooked till the final frame!",
    default:
      "Chief! Every high-performing reel starts with an irresistible premise. Stop talking about yourself and start solving the exact pain point keeping your target client awake at night!",
  },
  "The Director": {
    camera:
      "Chief! Camera shyness is completely normal. In our Delhi studio, we guide you through professional teleprompters, cinematic lighting, and real-time cadence coaching. You just speak naturally — we make you look like an industry titan!",
    studio:
      "Chief! We are not remote freelancers in coffee shops. We run a dedicated 25–30 member studio HQ in Rohini, Delhi. Dedicated gear, sound treatment, and master directors behind every frame!",
    default:
      "Chief! Executive presence comes from great lighting, crystal-clear audio, and confident posture. Deliver your lived domain knowledge, and let our camera squad handle the rest!",
  },
  "The Alchemist": {
    audio:
      "Chief! 73% of viewers watch reels on mute — that's why kinetic typography and high-contrast captions are non-negotiable! But for the 27% with audio on, our subtle foley, whooshes, and risers trigger continuous dopamine hits that keep watch-time through the roof!",
    editing:
      "Chief! We edit short-form with surgical precision. Micro-zooms, kinetic text, sound design, and strategic B-roll every 2.4 seconds so the viewer's brain never finds a moment of boredom to scroll away!",
    default:
      "Chief! Pacing is the heartbeat of virality. If a sentence can be said in 6 words instead of 14, cut the fluff. Retention is king in short-form video!",
  },
  "The Analyst": {
    metrics:
      "Chief! Stop tracking vanity likes. The only metrics that actually build authority are Average Percentage Viewed (APV > 85%), Saves, and Inbound DMs. High APV tells the Instagram algorithm to push your reel to non-followers worldwide!",
    growth:
      "Chief! We scaled 85+ creators and founders like Royston Dias (31K), Shivam Careers (100K), and Shark Tank brand Cellbell (23K) with 100% organic velocity. Data before drama, always!",
    default:
      "Chief! The algorithm isn't against you; it only cares about viewer satisfaction and watch time. Give the viewer instant value in the first 3 seconds, and the algorithm will reward you with explosive reach!",
  },
  "The Whisperer": {
    dm:
      "Chief! A million views without revenue is just digital ego. We set up psychological comment-to-DM triggers and lead magnets that funnel interested followers straight into high-ticket sales calls and contracts!",
    conversion:
      "Chief! Our DM funnels average a 78.6% response rate because we don't spam. We use value-first conversational frameworks that position you as an expert solving high-value problems!",
    default:
      "Chief! Converting attention into revenue requires relationship velocity. Stop waiting for inbound inquiries to magically appear — let's construct your conversion pipeline!",
  },
  "The Catalyst": {
    trend:
      "Chief! When a cultural trend or audio surge matches your domain niche, we jump on it within 4 hours. That early algorithmic velocity is what turns a regular reel into a 5M+ breakout phenomenon!",
    explore:
      "Chief! The Explore page rewards instant velocity in the first 60 minutes after posting. We optimize thumbnail contrast and caption hooks so your posts get indexed for viral discovery!",
    default:
      "Chief! Momentum is currency on social media! When one reel takes off, we double down with sibling content that traps incoming audience members into your personal ecosystem!",
  },
  "The Builder": {
    funnel:
      "Chief! Views mean nothing without revenue. We build automated inbound DM flows and calendar booking systems so that every viral reel turns curious viewers into qualified high-ticket leads and partnership deals!",
    scale:
      "Chief! All 8 studio minds are assembled in your corner. From 0 followers to category prominence, we handle research, scripts, shoots, edits, posting, and conversions. Ready to mobilize your personal branding engine?",
    default:
      "Chief! Don't wait for the 'perfect time' to start your personal brand. Category leaders are being crowned right now. Book your free 1:1 strategy audit and let's construct your empire!",
  },
};

export async function POST(request) {
  try {
    const { message, character = "The Strategist", page = "/" } = await request.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const cleanChar = character || "The Strategist";
    const groqKey = process.env.GROQ_API_KEY?.trim();
    const geminiKey = process.env.GEMINI_API_KEY?.trim();

    const systemPrompt = `You are ${cleanChar}, an elite studio specialist at Orgix Media (India's premier 100% organic personal branding agency based in Rohini, Delhi).
Orgix Media Core Principles:
- 100% Organic Growth. Zero Paid Ads. Zero Bots.
- 1.0 Billion+ views generated across Instagram & YouTube.
- 85+ creators and founders scaled (from 0 to 1M+ followers).
- In-house 25-30 member production team under one roof at Delhi HQ (founded by Pari Jain, Anant Jain, Deepak Jain).
- Notable clients: Cellbell (Shark Tank Featured Brand), Mintree (Shark Tank Featured Brand), 9Skin, Royston Dias (Indian Cricketer), Gaurav Mahawar (Finance 287K+), Shivam Careers (100K in 80 posts), CA Jyoti Goyal (36.7K).
- 2 shoot days per month yields 30 days of high-retention content.
- Call to Action: Book a free 1:1 strategy audit call at orgixmedia.com.

Persona guidelines for ${cleanChar}:
- The Strategist: Strategic moat architect. Talks about market positioning, audience psychology, high-ticket leads, and why paid ads fail.
- The Creator: Viral hook architect. Talks about the first 1.2-3 seconds, curiosity loops, storytelling frameworks, and pattern interrupts.
- The Director: Cinematic visualizer. Talks about camera presence, studio lighting, teleprompters, and how to conquer camera shyness in a 4-hour shoot.
- The Alchemist: Audio & retention foley master. Talks about kinetic typography, sound design, pacing, and captivating the 73% who watch on mute.
- The Analyst: Data scientist. Talks about retention curves, algorithmic velocity, average percentage viewed (APV), and converting attention into revenue.
- The Whisperer: Conversion sage & dealmaker. Talks about turning comments and DMs into booked calls, high-ticket sales, and client relationships.
- The Catalyst: Trend igniter & accelerator. Talks about viral momentum, timing, Explore page indexing, and rapid reach expansion.
- The Builder: Scale general & systems engineer. Talks about inbound DM automation, booking systems, team execution, and scaling an empire.

Current user page: ${page}
Tone: Confident, tactical, energetic, friendly. Always address the user as "Chief". Keep responses concise (2 to 4 punchy sentences maximum) so it feels like a rapid tactical in-game mascot briefing!`;

    // 1. Try Groq API if key is set
    if (groqKey) {
      try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: message },
            ],
            temperature: 0.65,
            max_tokens: 280,
          }),
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const reply = groqData.choices?.[0]?.message?.content?.trim();
          if (reply) {
            return NextResponse.json({
              reply,
              character: cleanChar,
              engine: "Groq (Llama 3.3 70B)",
              hasApiKey: true,
            });
          }
        }
      } catch (err) {
        console.error("Groq API error fallback:", err);
      }
    }

    // 2. Try Gemini API if key is set
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nChief asks: ${message}` }],
                },
              ],
              generationConfig: { maxOutputTokens: 250, temperature: 0.7 },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const reply =
            geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (reply) {
            return NextResponse.json({
              reply,
              character: cleanChar,
              engine: "Gemini 2.0 Flash",
              hasApiKey: true,
            });
          }
        }
      } catch (err) {
        console.error("Gemini API error fallback:", err);
      }
    }

    // 3. Fallback: Intelligent Local Tactical Knowledge Engine
    const lower = message.toLowerCase();
    const charKB = KNOWLEDGE_BASE[cleanChar] || KNOWLEDGE_BASE["The Strategist"];

    let fallbackReply = charKB.default;
    if (lower.includes("dm") || lower.includes("conversion") || lower.includes("deal") || lower.includes("sale") || lower.includes("lead")) {
      fallbackReply = charKB.dm || charKB.conversion || charKB.default;
    } else if (lower.includes("trend") || lower.includes("viral") || lower.includes("explore") || lower.includes("speed")) {
      fallbackReply = charKB.trend || charKB.explore || charKB.default;
    } else if (lower.includes("organic") || lower.includes("ad") || lower.includes("money") || lower.includes("boost")) {
      fallbackReply = charKB.organic || charKB.default;
    } else if (lower.includes("shoot") || lower.includes("camera") || lower.includes("shy") || lower.includes("video")) {
      fallbackReply = charKB.shoot || charKB.camera || charKB.studio || charKB.default;
    } else if (lower.includes("view") || lower.includes("hook") || lower.includes("reach")) {
      fallbackReply = charKB.views || charKB.script || charKB.default;
    } else if (lower.includes("edit") || lower.includes("sound") || lower.includes("audio") || lower.includes("mute")) {
      fallbackReply = charKB.audio || charKB.editing || charKB.default;
    } else if (lower.includes("metric") || lower.includes("growth") || lower.includes("data") || lower.includes("algorithm")) {
      fallbackReply = charKB.metrics || charKB.growth || charKB.default;
    }

    return NextResponse.json({
      reply: fallbackReply,
      character: cleanChar,
      engine: "Orgix Tactical Engine (Add GROQ_API_KEY to .env.local to activate live LLM)",
      hasApiKey: false,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
