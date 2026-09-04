"use client";

import { useEffect, useState, useRef } from "react";
import Icon from "../core/Icon";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("orgix-sound-fx");
    if (saved === "true") {
      setEnabled(true);
    }
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playClick = () => {
    if (!enabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext not ready or blocked
    }
  };

  const toggleSound = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("orgix-sound-fx", String(next));
    if (next) {
      const ctx = getAudioContext();
      if (ctx) {
        // Confirmation chord
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      }
    }
  };

  // Attach global click sound listener when enabled
  useEffect(() => {
    if (!enabled) return;
    const handleGlobalClick = (e) => {
      const target = e.target.closest("button, a, .vt-card, .shot-card, .sim-niche-pill");
      if (target) {
        playClick();
      }
    };
    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => window.removeEventListener("click", handleGlobalClick, { capture: true });
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`sound-toggle-btn ${enabled ? "active" : ""}`}
      title={enabled ? "Mute interactive audio FX" : "Enable interactive audio FX"}
      aria-label="Interactive sound effects"
      aria-pressed={enabled}
    >
      <span className="sound-icon-wrap">
        {enabled ? "🔊" : "🔇"}
      </span>
      <span className="sound-label">
        {enabled ? "FX ON" : "FX OFF"}
      </span>
    </button>
  );
}
