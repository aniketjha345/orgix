"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import ConsultationModal from "@/components/ui/ConsultationModal";
import ExitIntentModal from "@/components/ui/ExitIntentModal";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import StudioTourBar from "@/components/ui/StudioTourBar";

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
