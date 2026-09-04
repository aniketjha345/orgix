"use client";

import { useState, useRef } from "react";
import Icon from "../core/Icon";
import { company } from "@/data/site";

const goals = ["Grow my following", "Generate leads", "YouTube growth", "Full brand rebuild"];

const niches = [
  "Founder / Business",
  "Finance & CA / Tax",
  "Tech & AI / Career",
  "Health / Fitness",
  "Education",
  "Real Estate",
  "Content Creator",
  "Other",
];

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

export default function ContactForm() {
  const [state, setState] = useState({ status: "idle", msg: "", busy: false });
  const [isShaking, setIsShaking] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    handle: "",
    niche: niches[0],
    message: "",
    goals: [],
  });

  const formRef = useRef(null);

  const toggle = (g) =>
    setForm((f) => ({
      ...f,
      goals: f.goals.includes(g) ? f.goals.filter((x) => x !== g) : [...f.goals, g],
    }));

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 650);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      triggerShake();
      setState({ status: "err", msg: "Please fill in all required fields marked with *.", busy: false });
      return;
    }

    const body = {
      name: form.name,
      email: form.email,
      handle: form.handle,
      niche: form.niche,
      goals: form.goals.join(", "),
      message: form.message,
    };

    setState({ status: "sending", msg: "Transmitting enquiry…", busy: true });

    // 1) JSON endpoint (Formspree / your future `/api/contact` in the CMS build)
    if (endpoint) {
      const ok = await postJson(endpoint, body);
      if (ok) {
        setState({ status: "ok", msg: "Message sent — the Orgix team will reach out within 24 hours.", busy: false });
        return;
      }
    }

    // 2) No PHP handler anymore — the stack is 100% JavaScript.
    //    If an endpoint is configured later it lands here; until then we
    //    fall straight through to the email client.

    // 3) Client mailto fallback
    const subject = encodeURIComponent(`Brand growth enquiry — ${form.name}`);
    const text = encodeURIComponent(
      `Hi Orgix Media,\n\nI'd like to grow my personal brand.\n\nName: ${form.name}\nEmail: ${form.email}\nCurrent handle/website: ${form.handle}\nNiche: ${form.niche}\nGoals: ${form.goals.join(", ")}\n\n${form.message}`
    );
    window.location.href = `mailto:info@orgixmedia.com?subject=${subject}&body=${text}`;
    setState({ status: "ok", msg: "Opening your mail app… we can't wait to review your profile.", busy: false });
  };

  const postJson = async (url, body, graceful = false) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok && !graceful) {
        triggerShake();
        setState({ status: "err", msg: "Something went wrong. Please email us at info@orgixmedia.com directly.", busy: false });
        return false;
      }
      try {
        const data = await res.json();
        return !!(data && data.ok !== false);
      } catch {
        return false;
      }
    } catch {
      if (!graceful) {
        triggerShake();
        setState({ status: "err", msg: "Network error — please verify your connection or email info@orgixmedia.com directly.", busy: false });
      }
      return false;
    }
  };

  return (
    <form ref={formRef} className={`form ${isShaking ? "shake-error" : ""}`} onSubmit={onSubmit}>
      <div className="f-row">
        <div className="floating-field">
          <input
            id="f-name"
            type="text"
            placeholder=" "
            value={form.name}
            onChange={set("name")}
            required
            autoComplete="name"
          />
          <label htmlFor="f-name">Your Full Name *</label>
        </div>
        <div className="floating-field">
          <input
            id="f-email"
            type="email"
            placeholder=" "
            value={form.email}
            onChange={set("email")}
            required
            autoComplete="email"
          />
          <label htmlFor="f-email">Email Address *</label>
        </div>
      </div>

      <div className="f-row">
        <div className="floating-field">
          <input
            id="f-handle"
            type="text"
            placeholder=" "
            value={form.handle}
            onChange={set("handle")}
            autoComplete="off"
          />
          <label htmlFor="f-handle">Instagram / YouTube Handle</label>
        </div>
        <div className="floating-field">
          <select id="f-niche" value={form.niche} onChange={set("niche")} required>
            {niches.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <label htmlFor="f-niche">Industry / Niche *</label>
        </div>
      </div>

      <div>
        <div className="form-group-label">Primary 90-day ambitions (select all that apply)</div>
        <div className="goal-chips" role="group" aria-label="Goals selection">
          {goals.map((g) => {
            const on = form.goals.includes(g);
            return (
              <button
                type="button"
                key={g}
                className={`chip ${on ? "on" : ""}`}
                onClick={() => toggle(g)}
                aria-pressed={on}
              >
                <span className="chk" aria-hidden="true">
                  {on ? <Icon name="check" size={13} /> : "+"}
                </span>
                {g}
              </button>
            );
          })}
        </div>
      </div>

      <div className="floating-field">
        <textarea
          id="f-msg"
          rows={3}
          placeholder=" "
          value={form.message}
          onChange={set("message")}
          required
        />
        <label htmlFor="f-msg">Tell us about your brand &amp; 12-month goals *</label>
      </div>

      <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <button
          className="btn btn--lime btn--lg shine"
          type="submit"
          disabled={state.status === "ok" || state.status === "sending"}
        >
          {state.status === "ok" ? (
            <>
              Enquiry Transmitted <Icon name="check" size={18} />
            </>
          ) : state.status === "sending" ? (
            <>
              <span className="spin" aria-hidden="true" /> Transmitting…
            </>
          ) : (
            <>
              Submit Application <Icon name="send" size={17} className="arr" />
            </>
          )}
        </button>
      </div>

      <p className="form-note" role="status" aria-live="polite">
        {state.msg || "Strict privacy. No unsolicited newsletters. Directly reviewed by Orgix strategists."}
      </p>
    </form>
  );
}
