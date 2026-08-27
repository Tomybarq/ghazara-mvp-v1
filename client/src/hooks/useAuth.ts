/**
 * useAuth — single client-side entry point for session state.
 *
 * Wraps the `auth.me` tRPC query so every component reads the same cached user
 * object. TanStack Query handles caching, deduplication, and refetch, so the
 * guard and header can call this hook independently without duplicate requests.
 */
import { trpc } from "@/lib/trpc";

export function useAuth() {
  // `staleTime` mirrors the global default; we keep it explicit here so a future
  // change to global defaults never accidentally makes the guard flicker.
  const query = trpc.auth.me.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
