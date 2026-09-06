"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

export default function AgneyLoader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(100);
      setIsDone(true);
      setUnmounted(true);
      return;
    }

    const DURATION = 3000; // 3 seconds // Exactly 2 seconds
    const startTime = performance.now();
    let animationFrameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const fraction = Math.min(elapsed / DURATION, 1);
      
      const currentProgress = Math.min(Math.round(fraction * 100), 100);
      setProgress(currentProgress);

      if (fraction < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setIsDone(true);
        setTimeout(() => {
          setUnmounted(true);
        }, 500);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0D0D0D] flex flex-col items-center justify-center transition-opacity duration-500 ease-out select-none ${
        isDone ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
      aria-label="Loading Agney"
    >
      {/* Ambient Flame Glow in Background */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FF4500]/20 via-[#FFB400]/10 to-transparent blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Brand Icon + Name */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF4500] to-[#E8380D] flex items-center justify-center shadow-lg shadow-[#FF4500]/40">
            <Flame className="w-6 h-6 text-white animate-pulse" />
          </div>
          <span className="font-agneyDisplay font-extrabold text-3xl tracking-widest text-white">
            AGNEY
          </span>
        </div>

        {/* Large Percentage Counter in Space Grotesk */}
        <div className="font-agneyDisplay font-extrabold text-6xl sm:text-7xl text-white tracking-tight leading-none mb-4 tabular-nums">
          {progress}
          <span className="text-3xl sm:text-4xl text-[#FFB400] font-bold ml-1">%</span>
        </div>

        {/* Thin Percentage Line Bar ("ek line patali se percentage bar") */}
        <div className="w-64 sm:w-80 h-[2.5px] bg-white/10 rounded-full overflow-hidden my-3 relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#FF4500] via-[#FFB400] to-[#E8380D] transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(255,69,0,0.85)] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Status Text */}
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#FFB400] font-semibold mt-2 h-4">
          {progress < 30 && "INITIALIZING POWER CORE..."}
          {progress >= 30 && progress < 65 && "CHARGING IGNITION MATRIX..."}
          {progress >= 65 && progress < 99 && "CALIBRATING FULL VELOCITY..."}
          {progress >= 99 && "VELOCITY READY ⚡"}
        </div>
      </div>
    </div>
  );
}
