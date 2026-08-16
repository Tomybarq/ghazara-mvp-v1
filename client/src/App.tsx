/**
 * Ghazara design reminder: "Growth Axis" uses directional movement, commercial clarity,
 * and Deep Iris / Honeyed Amber contrast in an Arabic-first experience.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import FloatingWhatsAppWidget from "@/components/FloatingWhatsAppWidget";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Hub from "./pages/Hub";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/hub" component={Hub} />
        <Route path="/about" component={AboutPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <FloatingWhatsAppWidget language="ar" />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
