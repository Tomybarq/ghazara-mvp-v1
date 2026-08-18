import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PageLoader() {
  const { isAr } = useLanguage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-[#E6833E] opacity-75 absolute" />
      </div>
      <p className="text-xs font-heading font-medium text-muted-foreground">
        {isAr ? "جارٍ التحميل…" : "Loading…"}
      </p>
    </div>
  );
}
