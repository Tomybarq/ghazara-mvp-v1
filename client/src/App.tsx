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

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/hub" component={Hub} />
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
