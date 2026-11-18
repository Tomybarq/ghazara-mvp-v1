import { useLanguage } from "@/contexts/LanguageContext";
import type { LocalizedString } from "@/data/company";

interface ErpSectionHeadingProps {
  eyebrow: LocalizedString;
  title: LocalizedString;
  desc?: LocalizedString;
  align?: "start" | "center";
}

export default function ErpSectionHeading({
  eyebrow,
  title,
  desc,
  align = "start",
}: ErpSectionHeadingProps) {
  const { lang } = useLanguage();
  const isCenter = align === "center";

  return (
    <div className={`max-w-3xl space-y-4 ${isCenter ? "mx-auto text-center" : ""}`}>
      <span className={`eyebrow ${isCenter ? "justify-center" : ""}`}>{eyebrow[lang]}</span>
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
        {title[lang]}
      </h2>
      {desc ? (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{desc[lang]}</p>
      ) : null}
    </div>
  );
}
