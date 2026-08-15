import BioHubModal from "@/components/hub/BioHubModal";
import RFQModal from "@/components/quote/RFQModal";
import type { Language, SectorId, ServiceId } from "@/types";
import { Globe2 } from "lucide-react";
import { useState } from "react";

export default function Hub() {
  const query = new URLSearchParams(window.location.search);
  const sector = query.get("sector") as SectorId | null;
  const service = query.get("service") as ServiceId | null;
  const [language, setLanguage] = useState<Language>("ar");
  const [rfqOpen, setRfqOpen] = useState(() => query.get("request") === "1");

  return <>
    <button type="button" onClick={() => setLanguage((current) => current === "ar" ? "en" : "ar")} className="fixed left-5 top-5 z-20 inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-[#242424]/85 px-3 text-xs font-bold text-white backdrop-blur hover:bg-white/10"><Globe2 size={15} />{language === "ar" ? "English" : "العربية"}</button>
    <BioHubModal open language={language} mode="page" onRequest={() => setRfqOpen(true)} />
    <RFQModal open={rfqOpen} language={language} initialSectorId={sector} initialServiceId={service} onClose={() => setRfqOpen(false)} />
  </>;
}
