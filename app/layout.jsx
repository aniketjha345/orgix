import { Instrument_Sans, Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import Effects from "@/components/ui/Effects";
import OrgixChrome from "@/components/core/OrgixChrome";
import "./globals.css";

const displayFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const quoteFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-quote",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-agney-display",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://orgixmedia.com"),
  title: "Orgix Media — Personal Branding Studio for Founders & Creators",
  description:
    "Orgix Media is India's premier personal branding studio for founders & creators. 100% organic Instagram & YouTube growth, viral scripting, guided shooting & retention editing.",
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
  themeColor: "#F6F4EF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${quoteFont.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Effects />
        <OrgixChrome>{children}</OrgixChrome>
      </body>
    </html>
  );
}
