import { content } from "@/data/content";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

interface FooterProps {
  lang: "ar" | "en";
}

export default function Footer({ lang }: FooterProps) {
  const t = content[lang];

  return (
    <footer className="bg-card border-t border-border py-16 text-card-foreground">
      <div className="content-wrap grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-amethyst flex items-center justify-center text-white font-heading font-bold text-lg shadow-md">
              {lang === "ar" ? "غ" : "G"}
            </div>
            <span className="font-heading font-bold text-xl">{t.brandName}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {t.footer.about}
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-base">{t.footer.quickLinks}</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a href="#hero" className="hover:text-primary transition-colors flex items-center gap-1">
                <span>{t.nav.home}</span>
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary transition-colors flex items-center gap-1">
                <span>{t.nav.about}</span>
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary transition-colors flex items-center gap-1">
                <span>{t.nav.services}</span>
              </a>
            </li>
            <li>
              <a href="#rfq" className="hover:text-primary transition-colors flex items-center gap-1">
                <span>{t.nav.requestQuote}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-heading font-bold text-base">{t.footer.contactInfo}</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span>{t.footer.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a href={`mailto:${t.footer.email}`} className="hover:text-primary transition-colors">
                {t.footer.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span dir="ltr">{t.footer.phone}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="content-wrap mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>{t.footer.rights}</p>
        <p className="mt-2 sm:mt-0">
          Powered by <span className="font-semibold text-primary">Ghazara Systems</span>
        </p>
      </div>
    </footer>
  );
}
