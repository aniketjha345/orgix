"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";

// Interaction-only widgets ship as separate chunks after first paint:
// none of them render visible content on load (modals mount hidden,
// floats appear after scroll/idle), so they never block LCP.
const ConsultationModal = dynamic(() => import("@/components/ui/ConsultationModal"), {
  ssr: false,
});
const ExitIntentModal = dynamic(() => import("@/components/ui/ExitIntentModal"), {
  ssr: false,
});
const WhatsAppFloat = dynamic(() => import("@/components/ui/WhatsAppFloat"), {
  ssr: false,
});
const StudioTourBar = dynamic(() => import("@/components/ui/StudioTourBar"), {
  ssr: false,
});

export default function OrgixChrome({ children }) {
  const pathname = usePathname();
  const isAgney = pathname?.startsWith("/agney");

  if (isAgney) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ConsultationModal />
      <ExitIntentModal />
      <WhatsAppFloat />
      <StudioTourBar />
    </>
  );
}
