"use client";

import { useRef, useState } from "react";
import Button from "@/components/core/Button";
import Section from "@/components/core/Section";
import { sound } from "@/lib/sound";

/**
 * GrowthSprint — a playful 10-second "tap to grow followers" game.
 *
 * Why it exists: proof + dopamine. The visitor "feels" growth briefly,
 * then we pivot: the real growth is the 90-day organic engine we run daily.
 * Styled to match the minimal editorial look (no mascots, no clutter).
 */
const DURATION = 10; // seconds
const BASE_PER_TAP = 187; // followers gained per tap (× late-game multiplier)

function fmt(n) {
  return n.toLocaleString("en-IN");
}

function verdictFor(followers) {
  if (followers < 4000) {
    return {
      tier: "Warm-up pace",
      line: "A steady start — but real brands grow while you sleep, not while you tap.",
    };
  }
  if (followers < 8000) {
    return {
      tier: "Going viral 🚀",
      line: "That energy, compounded daily for 90 days, is a category leader.",
    };
  }
  if (followers < 13000) {
    return {
      tier: "Explosive ⚡",
      line: "Imagine this every single day — organically, no ad spend.",
    };
  }
  return {
    tier: "Category leader 👑",
    line: "You'd be the name people type into the search bar.",
  };
}

export default function GrowthSprint() {
  const [phase, setPhase] = useState("idle"); // idle | running | done
  const [secondsLeft, setSecondsLeft] = useState(DURATION);
  const [taps, setTaps] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [bursting, setBursting] = useState(false);
  const endAtRef = useRef(0);
  const timerRef = useRef(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const finish = () => {
    stopTimer();
    setBursting(false);
    setPhase("done");
  };

  const start = () => {
    if (timerRef.current) return;
    setPhase("running");
    setTaps(0);
    setFollowers(0);
    setSecondsLeft(DURATION);
    endAtRef.current = Date.now() + DURATION * 1000;
    // Tick the countdown every 100ms for a smooth timer
    timerRef.current = setInterval(() => {
      const remain = endAtRef.current - Date.now();
      if (remain <= 0) {
        finish();
        return;
      }
      setSecondsLeft(Math.ceil(remain / 1000));
    }, 100);
  };

  const tap = () => {
    if (phase !== "running") return;
    sound?.playPop?.();
    setTaps((t) => t + 1);
    // Late-in-sprint frenzy: the more taps, the bigger each one pays out
    setFollowers((f) => f + Math.round(BASE_PER_TAP * (1 + Math.random() * 2.2)));
    setBursting(true);
    setTimeout(() => setBursting(false), 120);
  };

  const reset = () => {
    stopTimer();
    setPhase("idle");
    setTaps(0);
    setFollowers(0);
    setSecondsLeft(DURATION);
  };

  const verdict = phase === "done" ? verdictFor(followers) : null;

  return (
    <Section id="growth-sprint" className="text-center py-16 sm:py-22">
      <span className="editorial-kicker mb-2.5">Try it · 10-Second Growth Sprint</span>
      <h2 className="display-h2 mb-3">
        Can you go viral in <span className="text-accent">10 seconds?</span>
      </h2>

      <div className="mt-6 sm:mt-8 max-w-[520px] mx-auto rounded-3xl border border-line bg-white/85 backdrop-blur-md shadow-[0_18px_40px_rgba(15,26,46,0.10)] p-5 sm:p-6 select-none relative overflow-hidden">
        {/* Live counters */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex-1 text-center">
            <div className="text-[26px] sm:text-[30px] font-display font-bold text-ink tabular-nums">
              {phase === "running" ? secondsLeft : DURATION}
            </div>
            <div className="text-[8.5px] font-mono uppercase tracking-[0.18em] text-ink-soft">seconds</div>
          </div>
          <div className="w-px h-14 bg-line" aria-hidden="true" />
          <div className="flex-1 text-center">
            <div className="text-[26px] sm:text-[30px] font-display font-bold text-ink tabular-nums">{taps}</div>
            <div className="text-[8.5px] font-mono uppercase tracking-[0.18em] text-ink-soft">taps</div>
          </div>
          <div className="w-px h-14 bg-line" aria-hidden="true" />
          <div className="flex-1 text-center">
            <div className="text-[26px] sm:text-[30px] font-display font-bold text-accent tabular-nums">
              {fmt(followers)}
            </div>
            <div className="text-[8.5px] font-mono uppercase tracking-[0.18em] text-ink-soft">followers</div>
          </div>
        </div>

        {phase === "idle" && (
          <div className="text-center">
            <p className="text-[13px] sm:text-[14px] text-ink-soft mb-4 leading-snug max-w-[460px] mx-auto">
              Tap the button as fast as you can and grow followers in {DURATION} seconds. How viral can you go?
            </p>
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-ink text-white border border-ink hover:bg-[#1A2440] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-[15px] font-medium shadow-sm"
            >
              <span>▶ Start Growing</span>
            </button>
          </div>
        )}
  {phase === "running" && (
          <div className="mt-1 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={tap}
              aria-label="Tap to grow followers"
              className={`w-full py-6 rounded-2xl bg-gradient-to-b from-accent to-[#1F4BDB] text-white text-[18px] font-display font-semibold tracking-wide active:scale-95 transition-transform duration-75 select-none cursor-pointer shadow-[0_12px_28px_rgba(46,91,255,0.28)] ${
                bursting ? "scale-[0.97]" : ""
              }`}
            >
              TAP!
            </button>
            <p className="text-[9.5px] font-mono text-ink-soft uppercase tracking-[0.18em]">
              Tap as fast as you can — {secondsLeft}s left
            </p>
          </div>
        )}

        {phase === "done" && (
          <div className="mt-1 flex flex-col items-center text-center gap-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-ink-soft">
              You grew
            </div>
            <div className="text-[40px] sm:text-[48px] font-display font-bold text-accent tabular-nums">
              +{fmt(followers)}
            </div>
            <div className="w-full h-2 rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent via-blue-500 to-indigo-500"
                style={{ width: `${Math.min(100, Math.round((followers / 14000) * 100))}%` }}
              />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-ink-soft mt-0.5">
              viral meter
            </div>
            <div className="w-full text-left rounded-2xl bg-white/90 border border-line px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
                  {verdict.tier}
                </span>
              </div>
              <p className="text-[12.5px] text-ink leading-snug">{verdict.line}</p>
            </div>
            <p className="text-[11px] text-ink-soft italic leading-snug">
              Just a bit of fun 😄 — but the real growth? That's what we do every day, 100% organically.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button variant="primary" href="/contact" ariaLabel="Book a free call to start real growth">
                Book a Free Call →
              </Button>
              <button
                type="button"
                onClick={reset}
                className="px-5 py-2.5 rounded-full border border-line text-ink hover:border-ink hover:text-accent transition-colors duration-200 cursor-pointer text-[14px] font-medium"
              >
                ↻ Play again
              </button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}