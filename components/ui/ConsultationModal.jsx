"use client";

import { useRef, useState, useEffect } from "react";
import Icon from "../core/Icon";
import { company, imgSrc } from "@/data/site";

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    handle: "",
    service: "Instagram Management",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSubmitted(false);
    };

    const handleHash = () => {
      if (window.location.hash === "#consultation") {
        setIsOpen(true);
        setSubmitted(false);
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
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key === "Tab" && isOpen && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement;
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        const closeBtn = modalRef.current?.querySelector(".modal-close-btn");
        if (closeBtn) closeBtn.focus();
      });
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
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
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="modal-container"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Close consultation modal"
        >
          ✕
        </button>

        {/* Modal Left Sidebar */}
        <div className="modal-sidebar">
          <div className="modal-sidebar-glow" aria-hidden="true" />
          <div className="modal-sidebar-content">
            <div className="modal-brand">
              <img
                src={imgSrc("/images/logo/orgix-logo.png")}
                alt="Orgix Media"
                width={36}
                height={36}
                className="brand-logo-img"
              />
              <span>Orgix Media</span>
            </div>

            <h2 id="modal-headline" className="modal-headline">
              Let&rsquo;s build something <br />
              <span className="grad-hot">unforgettable.</span>
            </h2>

            <p className="modal-tagline">
              Strategy, viral scripting, shooting &amp; editing — under one roof in Delhi.
            </p>

            <div className="modal-stats-list">
              <div className="modal-stat-item">
                <b>1B+</b>
                <span>Views Generated</span>
              </div>
              <div className="modal-stat-item">
                <b>85+</b>
                <span>Creators Scaled</span>
              </div>
              <div className="modal-stat-item">
                <b>100%</b>
                <span>Organic Growth</span>
              </div>
            </div>

            <div className="modal-sidebar-bottom">
              <span className="modal-trust-pill">
                <Icon name="shield" size={14} style={{ color: "var(--lime)" }} />
                Verified Agency Roster
              </span>
            </div>
          </div>
        </div>

        {/* Modal Right Form Panel */}
        <div className="modal-main">
          {submitted ? (
            <div className="modal-success-state">
              <span className="modal-success-emoji">🎉</span>
              <h3 className="modal-success-title">Application Received!</h3>
              <p className="modal-success-text">
                Thank you, <b>{formData.name || "friend"}</b>. Our strategy team will analyze your brand profile and reach out within 24 hours.
              </p>
              <div className="modal-success-actions">
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn btn--lime btn--block btn--lg"
                  style={{ marginTop: 16 }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="modal-form-header">
                <h3 className="modal-title">Book Your Strategy Audit</h3>
                <p className="modal-subtitle">
                  Zero obligation. We'll analyze your current content and outline immediate growth levers.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="modal-row">
                  <div className="f-field">
                    <label htmlFor="cm-name">Your Name *</label>
                    <input
                      id="cm-name"
                      required
                      placeholder="e.g. Rohan Mehra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="f-field">
                    <label htmlFor="cm-email">Email Address *</label>
                    <input
                      id="cm-email"
                      type="email"
                      required
                      placeholder="rohan@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-row">
                  <div className="f-field">
                    <label htmlFor="cm-phone">Phone Number *</label>
                    <input
                      id="cm-phone"
                      required
                      type="tel"
                      placeholder="+91 9XXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="f-field">
                    <label htmlFor="cm-handle">Instagram / Channel Handle</label>
                    <input
                      id="cm-handle"
                      placeholder="@yourhandle"
                      value={formData.handle}
                      onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="f-field">
                  <label htmlFor="cm-service">What service are you exploring?</label>
                  <select
                    id="cm-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option>Instagram Management &amp; Reels</option>
                    <option>YouTube Management &amp; Scripting</option>
                    <option>Full Personal Branding Ecosystem</option>
                    <option>Other Strategic Advisory</option>
                  </select>
                </div>

                <div className="f-field">
                  <label htmlFor="cm-message">Tell us about your current followers &amp; target *</label>
                  <textarea
                    id="cm-message"
                    rows={3}
                    required
                    placeholder="I'm a founder/creator in tech. Currently at 5K followers, want to reach 100K and get inbound client leads..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn--lime btn--block btn--lg shine"
                  disabled={loading}
                >
                  {loading ? "Transmitting Application..." : "Request Free Consultation →"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
