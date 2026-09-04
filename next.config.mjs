/** @type {import('next').NextConfig} */
const isStatic = process.env.BUILD_STATIC === "1";

const nextConfig = {
  reactStrictMode: true,
  // Export routes as /work/index.html so clean URLs work on plain shared
  // hosting (cPanel/Hostinger) with zero rewrite configuration.
  trailingSlash: true,
  // `npm run export` (BUILD_STATIC=1) produces 100% static HTML/CSS/JS
  // in /out — deployable on shared hosting, S3, Netlify, anywhere.
  // Default `npm run build` keeps the full Next.js server (VPS/Node).
  output: isStatic ? "export" : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
