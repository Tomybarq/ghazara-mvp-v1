import { trpc } from "@/lib/trpc";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  GitCommit,
  GitFork,
  GitPullRequest,
  Star,
  Users,
  AlertCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (sec < 60) return "just now";
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  if (day < 30) return `${day}d ago`;
  return d.toLocaleDateString();
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <Card className="py-4">
      <CardContent className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold leading-tight tabular-nums">
            {value}
          </span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function GitHubActivity() {
  const { data, isLoading, error, refetch, isFetching } =
    trpc.github.overview.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || (data && !data.connected)) {
    return (
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertCircle className="h-4 w-4 text-destructive" />
            Couldn't connect to GitHub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {data?.error ??
              error?.message ??
              "The repository data could not be loaded."}
          </p>
          <p className="text-sm text-muted-foreground">
            Make sure a valid <code className="rounded bg-muted px-1 py-0.5 text-xs">GITHUB_TOKEN</code>{" "}
            with access to <code className="rounded bg-muted px-1 py-0.5 text-xs">Tomybarq/ghazara-mvp-v1</code>{" "}
            is configured.
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
          >
            {isFetching && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Retry
          </button>
        </CardContent>
      </Card>
    );
  }

  const repo = data!.repo!;
  const commits = data!.commits;
  const stats = data!.stats;
  const maxWeekly = Math.max(1, ...stats.recentActivity.map((a) => a.total));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={repo.owner.avatarUrl}
            alt={repo.owner.login}
            className="h-11 w-11 rounded-lg border"
          />
          <div>
            <h1 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
              {repo.fullName}
              {repo.private && (
                <Badge variant="secondary" className="text-xs">
                  Private
                </Badge>
              )}
            </h1>
            {repo.description && (
              <p className="text-sm text-muted-foreground">{repo.description}</p>
            )}
          </div>
        </div>
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
        >
          View on GitHub <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={Star} label="Stars" value={repo.stars} />
        <StatCard icon={GitFork} label="Forks" value={repo.forks} />
        <StatCard icon={GitPullRequest} label="Open issues" value={repo.openIssues} />
        <StatCard icon={GitCommit} label="Commits (12mo)" value={stats.totalCommitsLastYear} />
      </div>

      {/* Activity + commits */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity sparkline */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Commit activity (last 12 weeks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-32 items-end gap-1.5">
              {stats.recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground">No activity data yet.</p>
              ) : (
                stats.recentActivity.map((a) => (
                  <div
                    key={a.week}
                    title={`${a.total} commits`}
                    className="flex-1 rounded-t bg-primary/70 hover:bg-primary transition-colors"
                    style={{
                      height: `${Math.max(4, (a.total / maxWeekly) * 100)}%`,
                    }}
                  />
                ))
              )}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {repo.language && <span>Language: {repo.language} · </span>}
              Default branch: {repo.defaultBranch}
            </p>
          </CardContent>
        </Card>

        {/* Latest commits */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Latest commits
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[22rem] pr-2">
              <ul className="divide-y">
                {commits.length === 0 ? (
                  <li className="px-6 py-8 text-center text-sm text-muted-foreground">
                    No commits found.
                  </li>
                ) : (
                  commits.map((c) => (
                    <li key={c.sha}>
                      <a
                        href={c.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3 px-6 py-3 hover:bg-accent/40 transition-colors"
                      >
                        <Avatar className="h-8 w-8 shrink-0 border">
                          {c.authorAvatarUrl ? (
                            <AvatarImage src={c.authorAvatarUrl} alt={c.authorLogin ?? ""} />
                          ) : null}
                          <AvatarFallback className="text-xs">
                            {c.authorName?.charAt(0).toUpperCase() ?? "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {c.message.split("\n")[0]}
                          </p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground/80">
                              {c.authorLogin ?? c.authorName}
                            </span>
                            <span>·</span>
                            <span>{formatDate(c.date)}</span>
                          </div>
                        </div>
                        <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                          {c.sha.slice(0, 7)}
                        </code>
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Separator />
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Users className="h-3.5 w-3.5" />
        Last pushed {formatDate(repo.pushedAt)} · Updated {formatDate(repo.updatedAt)}
      </p>
    </div>
  );
}
