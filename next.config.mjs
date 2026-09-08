/** @type {import('next').NextConfig} */
const isStatic = process.env.BUILD_STATIC === "1";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Export routes as /work/index.html so clean URLs work on plain shared
  // hosting (cPanel/Hostinger) with zero rewrite configuration.
  trailingSlash: true,
  // `npm run export` (BUILD_STATIC=1) produces 100% static HTML/CSS/JS
  // in /out — deployable on shared hosting, S3, Netlify, anywhere.
  // Default `npm run build` keeps the full Next.js server (VPS/Node).
  output: isStatic ? "export" : undefined,
  images: { unoptimized: true },
  // Tree-shake icon + animation chunks per-page instead of one shared vendor blob.
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "lenis"],
  },
  // Long-cache immutable static assets in production only (custom
  // Cache-Control on _next/static breaks dev HMR, so skip it there).
  async headers() {
    if (isStatic || process.env.NODE_ENV !== "production") return [];
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
