"use client";

import { useEffect, useRef } from "react";

export default function AgneyFlameCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particleCount = 50;
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 40;
        this.size = Math.random() * 3 + 1.2;
        this.speedY = Math.random() * 1.6 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.opacity = Math.random() * 0.75 + 0.25;
        this.hue = Math.random() > 0.45 ? 16 : 42; // Flame orange (16) or Amber/gold (42)
        this.life = 0;
        this.maxLife = Math.random() * 180 + 100;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.life++;
        const progress = this.life / this.maxLife;
        this.currentOpacity = this.opacity * (1 - progress);

        if (this.life >= this.maxLife || this.y < -20) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 2.8
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 55%, ${this.currentOpacity})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 45%, ${this.currentOpacity * 0.4})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 30%, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const p = new Particle();
      p.y = Math.random() * height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
}
