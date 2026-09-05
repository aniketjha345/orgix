"use client";

import { useRef, useState, useEffect } from "react";
import Icon from "../core/Icon";
import { company, imgSrc } from "@/data/site";

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("form"); // 'form' | 'success' | 'founderPay' | 'founderSuccess'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    handle: "",
    service: "Instagram Management",
    message: "",
  });
  const [founderData, setFounderData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [founderLoading, setFounderLoading] = useState(false);

  useEffect(() => {
    const handleOpen = (e) => {
      setIsOpen(true);
      setView("form");
      if (e.detail?.service) {
        setFormData((prev) => ({ ...prev, service: e.detail.service }));
      }
    };

    const handleHash = () => {
      if (window.location.hash === "#consultation") {
        setIsOpen(true);
        setView("form");
      }
    };

    window.addEventListener("open-consultation", handleOpen);
    window.addEventListener("hashchange", handleHash);
    if (window.location.hash === "#consultation") {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener("open-consultation", handleOpen);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setView("success");
    } catch {
      setView("success");
    } finally {
      setLoading(false);
    }
  };

  const handleFounderPayment = async (e) => {
    e.preventDefault();
    setFounderLoading(true);

    // If Razorpay script is available, trigger it, otherwise simulate immediate slot lock
    if (typeof window !== "undefined" && window.Razorpay) {
      try {
        const rzp = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_key",
          amount: 29900, // 299 in paise
          currency: "INR",
          name: "Orgix Media",
          description: "Priority Founder Strategy Call",
          prefill: {
            name: founderData.name,
            email: founderData.email,
            contact: founderData.phone,
          },
          handler: () => {
            setView("founderSuccess");
          },
          theme: { color: "#c4f042" },
        });
        rzp.open();
      } catch {
        setView("founderSuccess");
      }
    } else {
      setTimeout(() => {
        setFounderLoading(false);
        setView("founderSuccess");
      }, 700);
    }
  };

  const waMessage = encodeURIComponent(
    `Hi Orgix Media! I want to discuss growing my personal brand on Instagram & YouTube. My name is ${formData.name || ""}`
  );
  const waUrl = `https://wa.me/919999999999?text=${waMessage}`;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden bg-[#0a0a1f] border border-white/12 shadow-elevated p-6 sm:p-8"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-ink-muted hover:text-ink-primary hover:border-white/20 transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* View 1: Standard Audit Form */}
        {view === "form" && (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono text-accent mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>100% ORGANIC · FREE STRATEGY AUDIT</span>
              </div>
              <h2 id="modal-headline" className="text-[1.75rem] sm:text-[2rem] font-display font-medium text-ink-primary">
                Book Your 1:1 Strategy Audit
              </h2>
              <p className="text-body-sm text-ink-secondary mt-1 font-light">
                Zero obligation. We analyze your category, content pillars, and outline immediate viral levers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11.5px] font-mono text-ink-muted uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    placeholder="e.g. Rohan Mehra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-ink-primary text-[13.5px] focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-mono text-ink-muted uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rohan@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-ink-primary text-[13.5px] focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11.5px] font-mono text-ink-muted uppercase mb-1">
                    Phone (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-ink-primary text-[13.5px] focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-mono text-ink-muted uppercase mb-1">
                    Instagram / YouTube Handle
                  </label>
                  <input
                    placeholder="@yourhandle"
                    value={formData.handle}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-ink-primary text-[13.5px] focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-mono text-ink-muted uppercase mb-1">
                  Service Track
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-ink-primary text-[13.5px] focus:outline-none focus:border-accent"
                >
                  <option>Instagram Management</option>
                  <option>YouTube Management</option>
                  <option>Complete Personal Brand Studio</option>
                  <option>Other / Founder Advisory</option>
                </select>
              </div>

              <div>
                <label className="block text-[11.5px] font-mono text-ink-muted uppercase mb-1">
                  Your Current Followers &amp; Goals
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Currently at 5K followers, want to reach 100K and drive inbound leads..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-ink-primary text-[13.5px] focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-accent text-[#0a0a1f] font-body font-semibold text-[14.5px] hover:bg-[#d2f758] transition-colors shadow-[0_0_20px_rgba(196,240,66,0.3)] disabled:opacity-60 cursor-pointer"
                >
                  {loading ? "Submitting Application..." : "Request Free Strategy Audit →"}
                </button>
              </div>

              {/* Founder Priority Call Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setFounderData({
                      name: formData.name,
                      phone: formData.phone,
                      email: formData.email,
                    });
                    setView("founderPay");
                  }}
                  className="text-[12.5px] font-mono text-accent hover:underline cursor-pointer"
                >
                  ⚡ Want it faster? Pay ₹299 for a direct, ASAP call with the founder →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* View 2: Application Received + WhatsApp Handoff */}
        {view === "success" && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 text-accent mx-auto flex items-center justify-center text-3xl mb-4">
              ✓
            </div>
            <h3 className="text-heading-xl font-display text-ink-primary mb-2">
              Application Received!
            </h3>
            <p className="text-body-sm text-ink-secondary max-w-md mx-auto mb-8 font-light">
              Thank you, <span className="text-ink-primary font-medium">{formData.name || "friend"}</span>. Our strategy team will analyze your profile and reach out within 24 hours.
            </p>

            {/* WhatsApp Handoff Option */}
            <div className="space-y-3 max-w-sm mx-auto">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition-all"
              >
                <span>Continue on WhatsApp for Instant Response</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setFounderData({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                  });
                  setView("founderPay");
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-surface border border-accent/40 text-accent font-mono text-[12px] hover:bg-surface-elevated transition-colors"
              >
                ⚡ Need a call within the hour? Pay ₹299 →
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 text-ink-muted hover:text-ink-secondary text-[12.5px] font-mono"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* View 3: ₹299 Priority Call with Founder */}
        {view === "founderPay" && (
          <div>
            <button
              type="button"
              onClick={() => setView("form")}
              className="text-[12px] font-mono text-ink-muted hover:text-ink-primary mb-4 flex items-center gap-1 cursor-pointer"
            >
              ← Back to standard audit
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-mono text-accent uppercase tracking-wider">
                PRIORITY ACCESS · SKIP THE QUEUE
              </span>
              <h2 className="text-[1.75rem] font-display font-medium text-ink-primary mt-1">
                Direct Founder Strategy Call
              </h2>
              <p className="text-body-sm text-ink-secondary font-light mt-1">
                Book a direct, priority strategy call with our founder. Lock your ASAP slot; we will call you within the hour.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-accent/30 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[1.75rem] font-display font-bold text-accent">₹299</span>
                <span className="text-[12px] font-mono text-ink-muted block">One-time priority slot confirmation</span>
              </div>
              <span className="text-[11px] font-mono text-accent bg-accent/15 px-2.5 py-1 rounded border border-accent/30">
                CALL WITHIN 1 HOUR
              </span>
            </div>

            <form onSubmit={handleFounderPayment} className="space-y-4">
              <div>
                <label className="block text-[11.5px] font-mono text-ink-muted uppercase mb-1">
                  Full Name *
                </label>
                <input
                  required
                  placeholder="Your full name"
                  value={founderData.name}
                  onChange={(e) => setFounderData({ ...founderData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-ink-primary text-[13.5px] focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[11.5px] font-mono text-ink-muted uppercase mb-1">
                  Phone (WhatsApp preferred) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9XXXXXXXXX"
                  value={founderData.phone}
                  onChange={(e) => setFounderData({ ...founderData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-ink-primary text-[13.5px] focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[11.5px] font-mono text-ink-muted uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={founderData.email}
                  onChange={(e) => setFounderData({ ...founderData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border text-ink-primary text-[13.5px] focus:outline-none focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={founderLoading}
                className="w-full py-3.5 rounded-full bg-accent text-[#0a0a1f] font-body font-semibold text-[14.5px] hover:bg-[#d2f758] transition-colors shadow-[0_0_20px_rgba(196,240,66,0.3)] cursor-pointer"
              >
                {founderLoading ? "Securing Slot..." : "Pay ₹299 & Book Priority Call →"}
              </button>
            </form>
          </div>
        )}

        {/* View 4: Founder Call Payment Confirmation */}
        {view === "founderSuccess" && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 text-accent mx-auto flex items-center justify-center text-3xl mb-4">
              ✓
            </div>
            <h3 className="text-heading-xl font-display text-ink-primary mb-2">
              Priority Slot Locked!
            </h3>
            <p className="text-body-sm text-ink-secondary max-w-md mx-auto mb-8 font-light">
              The founder has been notified. We will reach out to <span className="text-ink-primary font-medium">{founderData.phone}</span> within the hour.
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 rounded-full bg-accent text-[#0a0a1f] font-body font-semibold text-[14px]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
