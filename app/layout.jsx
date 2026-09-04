import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import ConsultationModal from "@/components/ui/ConsultationModal";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/ui/CommandPalette";
import ViewTransitions from "@/components/ui/ViewTransitions";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://orgixmedia.com"),
  title: "Orgix Media — Personal Branding Studio for Founders & Creators",
  description:
    "Orgix Media is India's premier personal branding studio for founders & creators. Organic Instagram & YouTube growth, viral scripting, guided shooting & high-retention editing. 1B+ views generated · 85+ creators scaled · 100% organic.",
  keywords: [
    "personal branding agency India",
    "social media marketing agency India",
    "Instagram growth agency",
    "YouTube growth agency",
    "creator economy",
    "Orgix Media",
  ],
  openGraph: {
    title: "Orgix Media — Build the Brand Behind You",
    description:
      "We turn expertise into personal brands that get noticed, trusted and remembered. 100% organic growth.",
    url: "https://orgixmedia.com",
    siteName: "Orgix Media",
    images: [{ url: "/images/logo/orgix-logo.png", width: 512, height: 512 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Orgix Media — Build the Brand Behind You",
    description:
      "India's personal branding studio for founders & creators. 1B+ views· 85+ creators scaled · 100% organic.",
    images: ["/images/logo/orgix-logo.png"],
  },
};

export const viewport = {
  themeColor: "#07060c",
  width: "device-width",
  initialScale: 1,
};

// Inline script runs before first paint so the saved theme applies without a
// dark→light flash (FOUC) on load. Hydration later re-reads the same key.
const themeBootScript = `(function(){try{var t=localStorage.getItem("orgix-theme");if(t==="light"){document.documentElement.dataset.theme="light";}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} data-theme="dark">
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <CommandPalette />
        <ViewTransitions />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ConsultationModal />
      </body>
    </html>
  );
}
