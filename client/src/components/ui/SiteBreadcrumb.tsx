import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";

export interface SiteBreadcrumbItem {
  label: string;
  href?: string;
}

interface SiteBreadcrumbProps {
  items: SiteBreadcrumbItem[];
  className?: string;
}

export default function SiteBreadcrumb({ items, className = "" }: SiteBreadcrumbProps) {
  const { isAr } = useLanguage();

  return (
    <nav
      aria-label={isAr ? "مسار التصفح" : "Breadcrumb"}
      className={`mb-6 text-xs text-muted-foreground ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-2">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isAr ? "الرئيسية" : "Home"}</span>
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="inline-flex items-center gap-2">
              {isAr ? (
                <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" aria-hidden="true" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" aria-hidden="true" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-foreground" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
