import React, { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { siteContent } from "../data/siteContent";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FileText, Mail, Globe, ArrowLeft, ArrowRight } from "lucide-react";

export const TermsPage: React.FC = () => {
  const { lang, dir, isAr } = useLanguage();
  const content = siteContent[lang].terms;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7ED] text-[#27272A] selection:bg-[#FDBA74] selection:text-[#27272A]">
      <Header />

      <main className="flex-1 py-12 sm:py-20">
        <div className="editorial-container">
          {/* Breadcrumb / Back link */}
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52525B] hover:text-[#F97316] transition-colors"
            >
              {dir === "rtl" ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
            </a>
          </div>

          <article className="bg-white border border-[#27272A]/8 rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
            {/* Header */}
            <div className="border-b border-[#27272A]/8 pb-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#F97316]/20 text-xs font-bold text-[#F97316]">
                <FileText className="w-3.5 h-3.5" />
                <span>{isAr ? "الشروط والأحكام القانونية" : "Legal Terms & Conditions"}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#27272A] tracking-tight">
                {content.title}
              </h1>
              <p className="text-xs text-[#71717A] font-mono">
                {content.lastUpdated}
              </p>
            </div>

            {/* Intro */}
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              {content.intro}
            </p>

            {/* Sections */}
            <div className="space-y-8">
              {content.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-[#27272A]">
                    {section.title}
                  </h2>
                  <div className="space-y-2">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm text-[#52525B] leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Details */}
            <div className="border-t border-[#27272A]/8 pt-6 space-y-3">
              <h3 className="text-base font-bold text-[#27272A]">
                {content.contactInfo.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#52525B]">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#F97316]" />
                  <span>{content.contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#F97316]" />
                  <span>{content.contactInfo.domain}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
