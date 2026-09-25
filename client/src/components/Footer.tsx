import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { siteContent } from "../data/siteContent";
import { Logo } from "./ui/Logo";

export const Footer: React.FC = () => {
  const { lang } = useLanguage();
  const content = siteContent[lang];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[#27272A]/8 bg-[#FFF7ED] py-12 text-[#52525B]">
      <div className="editorial-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#27272A]/6">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-start gap-2">
            <Logo variant="header" size="sm" />
            <p className="text-xs text-[#71717A] max-w-sm mt-1">
              {content.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#52525B]">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="hover:text-[#F97316] transition-colors"
            >
              {content.footer.links.home}
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "#services")}
              className="hover:text-[#F97316] transition-colors"
            >
              {content.footer.links.services}
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "#about")}
              className="hover:text-[#F97316] transition-colors"
            >
              {content.footer.links.about}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hover:text-[#F97316] transition-colors"
            >
              {content.footer.links.contact}
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-xs text-[#71717A]">
          <div>{content.footer.copyright}</div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{content.trustBar.pillars.join(" • ")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
