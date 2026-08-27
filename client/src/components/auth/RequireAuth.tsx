/**
 * RequireAuth — route guard for the protected /dashboard area.
 *
 * Follows the Guard Pattern: it is a pure declarative wrapper that renders
 * nothing but a loader until the session resolves, then either renders the
 * children (authenticated) or redirects to /auth (anonymous). The redirect
 * target is stashed as a `redirect` query param so the auth page can send the
 * user back to where they came from after a successful login.
 *
 * Using a render-prop-free component (children) keeps routes in App.tsx
 * declarative: `<Route path="/dashboard" component={RequireAuth(Dashboard)} />`.
 */
import type { ComponentType } from "react";
import { Redirect, useLocation } from "wouter";
import { ADMIN_EMAILS } from "@shared/const";
import { useAuth } from "@/hooks/useAuth";
import PageLoader from "@/components/ui/PageLoader";

/** Higher-order guard: wraps a page so it only mounts for logged-in users. */
export function requireAuth<P extends object>(Page: ComponentType<P>) {
  function Guarded(props: P) {
    const { user, isLoading } = useAuth();
    const [location] = useLocation();

    // Avoid a redirect flash on first paint: the cookie is validated server-side
    // and the query is async, so we show the loader until it settles.
    if (isLoading) return <PageLoader />;

    if (!user) {
      // Preserve the attempted route so login can return the user here.
      const redirect = encodeURIComponent(location);
      return <Redirect to={`/auth?redirect=${redirect}`} />;
    }

    return <Page {...props} />;
  }
  return Guarded;
}

/** Higher-order guard: wraps a page so it only mounts for admin users. */
export function requireAdmin<P extends object>(Page: ComponentType<P>) {
  function AdminGuarded(props: P) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <PageLoader />;

    if (!user) {
      return <Redirect to="/auth" />;
    }

    // Admin access via DB role OR the RLS admin email allowlist.
    const isAdmin = user.role === "admin" || ADMIN_EMAILS.has(user.email ?? "");
    if (!isAdmin) {
      return <Redirect to="/dashboard" />;
    }

    return <Page {...props} />;
  }
  return AdminGuarded;
}
