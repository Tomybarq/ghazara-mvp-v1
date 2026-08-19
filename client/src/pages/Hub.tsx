import BioHubModal from "@/components/hub/BioHubModal";
import { Globe2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead from "@/components/seo/SEOHead";

export default function Hub() {
  const { lang, toggleLanguage, isAr } = useLanguage();

  return (
    <>
      <SEOHead pageKey="hub" noIndex />
      <button
        type="button"
        onClick={toggleLanguage}
        className="fixed left-5 top-5 z-20 inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-[#242424]/85 px-3.5 text-xs font-heading font-bold text-white backdrop-blur hover:bg-white/10 cursor-pointer shadow-lg"
      >
        <Globe2 size={15} className="text-amber-400" />
        <span>{isAr ? "English" : "العربية"}</span>
      </button>
      <BioHubModal open language={lang} mode="page" />
    </>
  );
}
