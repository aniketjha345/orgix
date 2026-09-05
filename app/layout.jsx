import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import ConsultationModal from "@/components/ui/ConsultationModal";
import ExitIntentModal from "@/components/ui/ExitIntentModal";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import CustomCursor from "@/components/ui/CustomCursor";
import CommandPalette from "@/components/ui/CommandPalette";
import ViewTransitions from "@/components/ui/ViewTransitions";
import "./globals.css";
import "./case-vault.css";
import "./antigravity-studio.css";

// Font variables are exposed as `-src` sources; globals.css maps them onto the
// public --font-* tokens with local fallbacks (cascade-order independent).
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display-src",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body-src",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-src",
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
    images: [{ url: "/images/og/orgix-og.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orgix Media — Build the Brand Behind You",
    description:
      "India's personal branding studio for founders & creators. 1B+ views · 85+ creators scaled · 100% organic.",
    images: ["/images/og/orgix-og.png"],
  },
};

export const viewport = {
  themeColor: "#0a0a1f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} data-theme="dark">
      <body>
        <div className="aurora-layer" aria-hidden="true" />
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
        <ExitIntentModal />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
