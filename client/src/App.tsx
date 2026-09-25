/**
 * Ghazara Website V2
 * "Growth Axis" Architecture — Deep Iris & Honeyed Amber, Arabic RTL-first with seamless English LTR
 */
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import FloatingWhatsAppWidget from "@/components/FloatingWhatsAppWidget";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/ui/PageLoader";
import { Analytics } from "@vercel/analytics/react";

// Eager load Home page for instant initial paint
import Home from "./pages/Home";

// Lazy load secondary routes for optimal initial bundle performance
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const RequestQuotePage = lazy(() => import("./pages/RequestQuotePage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const Hub = lazy(() => import("./pages/Hub"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/request-quote" component={RequestQuotePage} />
          <Route path="/hub" component={Hub} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <FloatingWhatsAppWidget />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light" switchable={false}>
          <TooltipProvider>
            <Toaster />
            <Router />
            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
