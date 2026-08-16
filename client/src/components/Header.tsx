import { useState, useEffect } from "react";
import { content } from "@/data/content";
import { Globe, Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

interface HeaderProps {
  lang: "ar" | "en";
  setLang: (lang: "ar" | "en") => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  const t = content[lang];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === "ar" ? "en" : "ar";
    setLang(nextLang);
    document.documentElement.lang = nextLang;
    document.documentElement.dir = nextLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-xs py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="content-wrap flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <Logo variant="transparent" size="sm" priority />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.home}
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.about}
          </a>
          <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.services}
          </a>
          <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.products}
          </a>
          <a href="#rfq" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.requestQuote}
          </a>
        </nav>

        {/* Actions & Language Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-heading font-semibold px-3 py-1.5 rounded-full border border-border hover:border-primary/50 transition-colors bg-card text-card-foreground shadow-xs"
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{lang === "ar" ? "English" : "العربية"}</span>
          </button>

          <a href="#rfq" className="route-button route-button-primary px-5 py-2 text-xs">
            <span>{t.nav.requestQuote}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full border border-border"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{lang === "ar" ? "EN" : "AR"}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-card border border-border text-foreground"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 left-0 bg-card border-b border-border shadow-xl md:hidden p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium py-2 border-b border-border/50"
          >
            {t.nav.home}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium py-2 border-b border-border/50"
          >
            {t.nav.about}
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium py-2 border-b border-border/50"
          >
            {t.nav.services}
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium py-2 border-b border-border/50"
          >
            {t.nav.products}
          </a>
          <a
            href="#rfq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base font-medium py-2 text-primary font-semibold"
          >
            {t.nav.requestQuote}
          </a>
        </div>
      )}
    </header>
  );
}
