"use client";

import Section from "../core/Section";
import Button from "../core/Button";

/**
 * Insights — the live Orgix blog is still being written ("posts coming
 * soon"), so instead of inventing articles this section honestly points
 * readers to the real blog page. One headline, one paragraph, one visual.
 */
export default function LatestBlogGrid() {
  return (
    <Section id="insights" bgAlt={true} className="select-none">
      <div className="w-full flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="editorial-kicker reveal-item reveal-stagger-1 is-revealed">
            10 / Intel &amp; perspective
          </span>
          <h2 className="display-h2 mb-4 reveal-item reveal-stagger-1 is-revealed">
            Latest from the studio.
          </h2>
          <p className="body-editorial text-center mx-auto reveal-item reveal-stagger-2 is-revealed">
            Growth tactics, case studies and content wisdom — written by the team itself.
          </p>
        </div>

        {/* ONE visual: single editorial coming-soon card */}
        <div className="w-full max-w-[720px] reveal-visual is-revealed">
          <div className="device-mockup bg-white p-8 sm:p-12 text-center flex flex-col items-center">
            <span className="editorial-kicker">The Orgix Blog</span>
            <h3 className="display-h3 mb-3">
              First breakdowns drop soon.
            </h3>
            <p className="editorial-lead text-center mb-8">
              Hook frameworks and algorithm notes from 1B+ organic views — currently being written.
            </p>
            <div className="btn-actions-row justify-center !mt-0">
              <Button
                variant="ghost"
                href="https://orgixmedia.com/blog.php"
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="Visit the Orgix blog"
              >
                Visit the blog <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
