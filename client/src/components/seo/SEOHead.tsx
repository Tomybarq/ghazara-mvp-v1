import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteSeoData, SITE_URL, type PageMetadata } from "@/data/seo";
import { companyData } from "@/data/company";
import { contactData } from "@/data/contact";

interface SEOHeadProps {
  pageKey: keyof typeof siteSeoData;
  customTitle?: string;
  customDescription?: string;
  customOgImage?: string;
  customCanonicalPath?: string;
  noIndex?: boolean;
}

export default function SEOHead({
  pageKey,
  customTitle,
  customDescription,
  customOgImage,
  customCanonicalPath,
  noIndex = false,
}: SEOHeadProps) {
  const { lang, isAr } = useLanguage();
  const meta: PageMetadata = siteSeoData[pageKey] || siteSeoData.home;

  const pageTitle = customTitle || meta.title[lang];
  const pageDescription = customDescription || meta.description[lang];
  const canonicalPath = customCanonicalPath || meta.canonicalPath;
  const canonicalUrl = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const ogImageUrl = customOgImage || `${SITE_URL}/branding/og-cover.svg`;

  useEffect(() => {
    // 1. Set Title
    document.title = pageTitle;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to create or update link tag
    const setLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let element = document.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute(rel, rel);
        if (hreflang) element.setAttribute("hreflang", hreflang);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Standard Meta & Robots
    const isNoIndex = noIndex || pageKey === "notFound" || pageKey === "hub" || meta.canonicalPath === "/404";
    setMetaTag("name", "robots", isNoIndex ? "noindex, nofollow" : "index, follow");
    setMetaTag("name", "description", pageDescription);
    setMetaTag("name", "keywords", meta.keywords[lang].join(", "));
    setMetaTag("name", "author", "Ghazara Trading & Marketing");

    // 3. Canonical & Hreflang
    setLinkTag("canonical", canonicalUrl);
    setLinkTag("alternate", canonicalUrl, "ar");
    setLinkTag("alternate", `${canonicalUrl}${canonicalUrl.includes("?") ? "&" : "?"}lang=en`, "en");
    setLinkTag("alternate", canonicalUrl, "x-default");

    // 4. OpenGraph
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag("property", "og:description", pageDescription);
    setMetaTag("property", "og:type", meta.ogType);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", ogImageUrl);
    setMetaTag("property", "og:site_name", companyData.legalName[lang]);
    setMetaTag("property", "og:locale", isAr ? "ar_YE" : "en_US");

    // 5. Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", pageTitle);
    setMetaTag("name", "twitter:description", pageDescription);
    setMetaTag("name", "twitter:image", ogImageUrl);

    // 6. JSON-LD Structured Data (skip for 404 recovery page)
    if (!isNoIndex) {
      const schemaId = "ghazara-jsonld-schema";
      let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = schemaId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["Organization", "LocalBusiness"],
            "@id": `${SITE_URL}/#organization`,
            "name": companyData.legalName[lang],
            "alternateName": isAr ? "غزارة" : "Ghazara",
            "url": SITE_URL,
            "logo": `${SITE_URL}/branding/ghazara-logo.png`,
            "image": `${SITE_URL}/branding/og-cover.svg`,
            "description": companyData.tagline[lang],
            "email": contactData.email.address,
            "telephone": contactData.phone.display,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": isAr
                ? "شارع الجزائر - عمارة باطاهر - الدور الثاني - شقة 6"
                : "Al-Jazair Street, Ba-Taher Building, 2nd Floor, Apt 6",
              "addressLocality": isAr ? "سيئون" : "Seiyun",
              "addressRegion": isAr ? "حضرموت" : "Hadramout",
              "addressCountry": "YE",
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "15.9877",
              "longitude": "48.7871",
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                "opens": "08:00",
                "closes": "17:00",
              },
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": contactData.phone.display,
              "contactType": "customer service",
              "areaServed": ["YE", "GCC"],
              "availableLanguage": ["Arabic", "English"],
            },
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            "url": SITE_URL,
            "name": companyData.legalName[lang],
            "publisher": {
              "@id": `${SITE_URL}/#organization`,
            },
            "inLanguage": isAr ? "ar" : "en",
          },
          {
            "@type": "WebPage",
            "@id": `${canonicalUrl}#webpage`,
            "url": canonicalUrl,
            "name": pageTitle,
            "description": pageDescription,
            "isPartOf": {
              "@id": `${SITE_URL}/#website`,
            },
            "inLanguage": isAr ? "ar" : "en",
          },
        ],
      };

      scriptTag.text = JSON.stringify(structuredData);
    }
  }, [pageKey, pageTitle, pageDescription, canonicalUrl, ogImageUrl, lang, isAr, meta]);

  return null;
}
