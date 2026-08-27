import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { headerNavLinks } from "@/data/navigation";
import { Globe, Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Link, useLocation } from "wouter";

export default function Header() {
  const { lang, toggleLanguage, isAr } = useLanguage();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-xs py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="content-wrap flex items-center justify-between">
        {/* Brand Logo with Link to Home */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl transition-transform hover:scale-[1.01]"
          aria-label={isAr ? "الرئيسية - مؤسسة غزارة للتجارة والتسويق" : "Home - Ghazara Trading & Marketing"}
        >
          <Logo variant="header" size="header" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label={isAr ? "التنقل الرئيسي" : "Main Navigation"}
          className="hidden lg:flex items-center gap-7"
        >
          {headerNavLinks.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                    : "text-muted-foreground"
                }`}
              >
                {item.label[lang]}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions & Language Switcher */}
        <div className="hidden md:flex items-center gap-3.5">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1"
          >
            {isAr ? "تسجيل الدخول" : "Login"}
          </Link>
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-heading font-semibold px-3.5 py-2 rounded-full border border-border hover:border-primary/50 transition-colors bg-card text-card-foreground shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            title={isAr ? "Switch to English" : "التبديل إلى العربية"}
            aria-label={isAr ? "Switch to English language" : "التبديل إلى اللغة العربية"}
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{isAr ? "English" : "العربية"}</span>
          </button>

          <Link
            href="/request-quote"
            className="route-button route-button-primary px-5 py-2.5 text-xs font-heading font-bold flex items-center gap-1.5 shadow-sm hover:shadow-md transition"
          >
            <span>{isAr ? "اطلب عرضًا" : "Request Quote"}</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${isAr ? "rotate-[-90deg]" : ""}`} />
          </Link>
        </div>

        {/* Mobile Menu Button & Quick Lang Toggle */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full border border-border bg-card shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={isAr ? "Switch language to English" : "تغيير اللغة إلى العربية"}
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{isAr ? "EN" : "عربي"}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-card border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={isAr ? "تبديل القائمة" : "Toggle Menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="absolute top-full right-0 left-0 bg-card/98 backdrop-blur-2xl border-b border-border shadow-2xl lg:hidden p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 z-50"
        >
          {/* Mobile Header Branding */}
          <div className="pb-3 border-b border-border/60 flex items-center justify-between">
            <Logo variant="header" size="sm" priority />
            <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold tracking-wider">
              {isAr ? "القائمة الرئيسية" : "Main Menu"}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {headerNavLinks.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-base font-medium py-2.5 px-2 rounded-xl transition-colors ${
                    isActive
                      ? "text-primary font-bold bg-primary/5"
                      : "text-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  {item.label[lang]}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/request-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="route-button route-button-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <span>{isAr ? "اطلب عرضًا تجارياً" : "Request a Quote"}</span>
              <ArrowUpRight className={`w-4 h-4 ${isAr ? "rotate-[-90deg]" : ""}`} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
