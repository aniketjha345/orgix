"use client";

import Icon from "../core/Icon";

const blogPosts = [
  {
    title: "The 3-Second Hook Architecture: How We Stop the Scroll for 85+ Creators",
    category: "CONTENT STRATEGY",
    readTime: "5 min read",
    date: "Sep 2026",
    excerpt: "Why the first 3 frames decide whether a reel compounds into millions of views or dies in the feed, and how to write contrarian open loops.",
    href: "https://orgixmedia.com/blog.php",
  },
  {
    title: "Founder-Led Brand vs. Paid Ads: Why Organic Authority Wins in 2026",
    category: "PERSONAL BRANDING",
    readTime: "7 min read",
    date: "Aug 2026",
    excerpt: "Customer acquisition costs on paid ads continue to rise. Here is how founders and Shark Tank innovators build compounding organic moats.",
    href: "https://orgixmedia.com/blog.php",
  },
  {
    title: "2 Days of Shooting, 30 Days of Content: The Studio Production Blueprint",
    category: "SYSTEMS & OS",
    readTime: "4 min read",
    date: "Jul 2026",
    excerpt: "How we eliminate camera anxiety, streamline studio lighting and teleprompters, and batch produce 30 days of high-retention video in 4 hours.",
    href: "https://orgixmedia.com/blog.php",
  },
];

export default function LatestBlogGrid() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/60" id="insights">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-mono uppercase tracking-wider text-accent mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>08 — INTEL &amp; PERSPECTIVE</span>
            </div>
            <h2 className="text-[2.25rem] sm:text-[3rem] md:text-[3.5rem] font-display font-normal text-ink-primary tracking-[-0.03em] leading-[1.08] mb-3">
              Latest from <span className="text-accent">the studio.</span>
            </h2>
            <p className="text-body-md text-ink-secondary font-light">
              Field notes, algorithm breakdowns, and hook frameworks tested across 1B+ organic views.
            </p>
          </div>

          <a
            href="https://orgixmedia.com/blog.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-secondary hover:text-accent font-body text-[14px] transition-colors"
          >
            <span>View all articles</span>
            <span>↗</span>
          </a>
        </div>

        {/* 3-Card Simple Grid (Antigravity's blog card layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <a
              key={post.title}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-7 rounded-2xl bg-surface-muted/80 border border-border hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group shadow-subtle hover:bg-surface-elevated"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-ink-muted mb-4">
                  <span className="text-accent uppercase tracking-wider font-semibold">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-heading-md font-display font-medium text-ink-primary group-hover:text-accent transition-colors leading-snug mb-3">
                  {post.title}
                </h3>

                <p className="text-body-sm text-ink-secondary leading-relaxed font-light mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between text-[12px] font-mono text-ink-muted group-hover:text-ink-primary transition-colors">
                <span>{post.date}</span>
                <span className="flex items-center gap-1 text-accent">
                  Read article ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
