import { publicProcedure, router } from "./trpc";

/**
 * GitHub activity router for the /dashboard.
 *
 * Fetches the latest commits and repository stats for the connected repository
 * (Tomybarq/ghazara-mvp-v1) using the GitHub REST API. Authentication uses the
 * GITHUB_TOKEN secret delivered by the platform; unauthenticated requests are
 * attempted as a fallback (the repo is private, so a token is effectively
 * required to see real data).
 */

const OWNER = "Tomybarq";
const REPO = "ghazara-mvp-v1";
const API_BASE = "https://api.github.com";

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "ghazara-dashboard",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

type GhCommit = {
  sha: string;
  commit: {
    message: string;
    author: { name: string; email: string; date: string };
    url: string;
  };
  html_url: string;
  author: { login: string; avatar_url: string; html_url: string } | null;
};

type GhRepo = {
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  default_branch: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  subscribers_count: number;
  pushed_at: string;
  updated_at: string;
  created_at: string;
  owner: { login: string; avatar_url: string; html_url: string };
  language: string | null;
};

type GhActivity = {
  total: number;
  week: number;
  days: number[];
};

async function ghFetch<T>(path: string): Promise<{ ok: true; data: T } | { ok: false; status: number; message: string }> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { headers: authHeaders() });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, status: res.status, message: text || res.statusText };
    }
    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch (err) {
    return { ok: false, status: 0, message: err instanceof Error ? err.message : "network error" };
  }
}

export const githubRouter = router({
  /** Repository overview + latest commits + 1-year commit activity. */
  overview: publicProcedure.query(async () => {
    const [repoRes, commitsRes, activityRes] = await Promise.all([
      ghFetch<GhRepo>(`/repos/${OWNER}/${REPO}`),
      ghFetch<GhCommit[]>(`/repos/${OWNER}/${REPO}/commits?per_page=30`),
      ghFetch<GhActivity[]>(`/repos/${OWNER}/${REPO}/stats/commit_activity`),
    ]);

    const repo = repoRes.ok ? repoRes.data : null;
    const commits = commitsRes.ok ? commitsRes.data : [];
    const activity = activityRes.ok ? activityRes.data : [];

    // Summarize the last 12 weeks of activity for a sparkline.
    const recentActivity = activity.slice(-12).map((a) => ({
      week: a.week,
      total: a.total,
    }));
    const totalCommitsLastYear = activity.reduce((sum, a) => sum + a.total, 0);

    return {
      connected: Boolean(repo),
      repo: repo
        ? {
            fullName: repo.full_name,
            description: repo.description,
            private: repo.private,
            htmlUrl: repo.html_url,
            defaultBranch: repo.default_branch,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            openIssues: repo.open_issues_count,
            watchers: repo.watchers_count,
            subscribers: repo.subscribers_count,
            pushedAt: repo.pushed_at,
            updatedAt: repo.updated_at,
            createdAt: repo.created_at,
            language: repo.language,
            owner: {
              login: repo.owner.login,
              avatarUrl: repo.owner.avatar_url,
              htmlUrl: repo.owner.html_url,
            },
          }
        : null,
      commits: commits.map((c) => ({
        sha: c.sha,
        message: c.commit.message,
        authorName: c.commit.author.name,
        authorLogin: c.author?.login ?? null,
        authorAvatarUrl: c.author?.avatar_url ?? null,
        authorHtmlUrl: c.author?.html_url ?? null,
        date: c.commit.author.date,
        htmlUrl: c.html_url,
      })),
      stats: {
        totalCommitsLastYear,
        recentActivity,
      },
      error:
        !repoRes.ok && repoRes.status === 404
          ? "Repository not found — set a valid GITHUB_TOKEN with access to this private repository."
          : !repoRes.ok
            ? `GitHub API error (${repoRes.status})`
            : null,
    } as const;
  }),

  /** Latest commits only (lighter refresh). */
  commits: publicProcedure.query(async () => {
    const res = await ghFetch<GhCommit[]>(`/repos/${OWNER}/${REPO}/commits?per_page=30`);
    if (!res.ok) {
      return { connected: false, commits: [], error: `GitHub API error (${res.status})` } as const;
    }
    return {
      connected: true,
      commits: res.data.map((c) => ({
        sha: c.sha,
        message: c.commit.message,
        authorName: c.commit.author.name,
        authorLogin: c.author?.login ?? null,
        authorAvatarUrl: c.author?.avatar_url ?? null,
        date: c.commit.author.date,
        htmlUrl: c.html_url,
      })),
      error: null,
    } as const;
  }),
});
