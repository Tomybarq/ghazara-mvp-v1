import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { siteContent } from "../data/siteContent";
import { Logo } from "./ui/Logo";
import { Globe, Menu, X, ArrowUpRight } from "lucide-react";

export const Header: React.FC = () => {
  const { lang, toggleLanguage, dir, isAr } = useLanguage();
  const content = siteContent[lang];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: content.header.nav.services, href: "#services" },
    { label: content.header.nav.about, href: "#about" },
    { label: content.header.nav.whyGhazara, href: "#why-ghazara" },
    { label: content.header.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFF7ED]/90 backdrop-blur-md border-b border-[#27272A]/8 shadow-xs py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="editorial-container">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo with White Chip */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 group transition-transform focus:outline-hidden focus:ring-2 focus:ring-[#F97316]/50 rounded-2xl"
            aria-label={content.footer.companyName}
          >
            <Logo variant="header" size="sm" />
          </a>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#52525B] hover:text-[#F97316] transition-colors duration-180"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Language Switcher + CTA Button */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#27272A]/10 text-[#27272A] hover:border-[#F97316] hover:text-[#F97316] transition-all shadow-2xs"
              aria-label={isAr ? "Switch to English" : "التحويل إلى اللغة العربية"}
            >
              <Globe className="w-3.5 h-3.5 text-[#F97316]" />
              <span>{isAr ? "EN" : "العربية"}</span>
            </button>

            {/* Primary CTA (Desktop) */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:inline-flex btn-primary text-xs sm:text-sm py-2 px-4.5"
            >
              <span>{content.header.cta}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${dir === "rtl" ? "rotate-[-90deg]" : ""}`} />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#27272A] bg-white border border-[#27272A]/10 hover:border-[#F97316] transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-white border border-[#27272A]/10 rounded-2xl shadow-xl space-y-3 animate-in fade-in-50 slide-in-from-top-3 duration-200">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-[#27272A] hover:bg-[#FFF7ED] hover:text-[#F97316] rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-[#27272A]/6">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full btn-primary text-sm py-2.5 justify-center"
              >
                <span>{content.header.cta}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
