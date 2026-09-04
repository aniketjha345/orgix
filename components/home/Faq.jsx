"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "../core/Icon";
import Reveal from "../core/Reveal";
import SectionHead from "../ui/SectionHead";
import { faqs } from "@/data/site";

export default function Faq({ center = true, index = "09" }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--line)" }}>
      <div className="container">
        <SectionHead
          center={center}
          index={index}
          kicker="DIRECT INQUIRIES · INTEL DIRECTORY"
          title={
            <>
              Questions, <span className="grad-hot">answered.</span>
            </>
          }
          lead="Everything founders & creators ask before launching with Orgix Media."
        />

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;

            return (
              <Reveal delay={(i % 3) * 0.07} key={f.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{f.q}</span>
                  <span className="x" aria-hidden="true">
                    <Icon name={isOpen ? "minus" : "plus"} size={15} />
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  className="faq-a"
                  style={{ maxHeight: isOpen ? 400 : 0 }}
                >
                  <p>{f.a}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {center && (
          <Reveal style={{ textAlign: "center", marginTop: 44 }}>
            <p className="lead" style={{ fontSize: 16 }}>
              Still not sure?{" "}
              <Link href="/contact" style={{ color: "var(--lime)", fontWeight: 800, textDecoration: "underline", textUnderlineOffset: 4 }}>
                Talk to us →
              </Link>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
