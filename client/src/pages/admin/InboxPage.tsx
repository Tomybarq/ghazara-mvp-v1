import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { type InboxEmail } from "@/lib/blog";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Inbox, Loader2, Mail, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";

function formatEmailDate(value: Date | string | null, lang: "ar" | "en"): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function InboxPage() {
  const { lang, isAr } = useLanguage();
  const utils = trpc.useUtils();

  const { data: emails, isLoading, isError } = trpc.inbox.list.useQuery();
  const [selected, setSelected] = useState<InboxEmail | null>(null);
  const [pendingDelete, setPendingDelete] = useState<InboxEmail | null>(null);

  const setRead = trpc.inbox.setRead.useMutation({
    onSuccess: () => utils.inbox.list.invalidate(),
    onError: error => toast.error(error.message),
  });

  const removeEmail = trpc.inbox.remove.useMutation({
    onSuccess: () => {
      utils.inbox.list.invalidate();
      setPendingDelete(null);
      setSelected(null);
      toast.success(isAr ? "تم حذف الرسالة" : "Message deleted");
    },
    onError: error => toast.error(error.message),
  });

  const openEmail = (email: InboxEmail) => {
    setSelected(email);
    if (!email.isRead) setRead.mutate({ id: email.id, isRead: true });
  };

  const unreadCount = (emails ?? []).filter(email => !email.isRead).length;
  const current = selected ? emails?.find(email => email.id === selected.id) ?? selected : null;

  return (
    <DashboardLayout requireAuth={false}>
      <div className="mx-auto w-full max-w-5xl space-y-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isAr ? "البريد الوارد" : "Inbox"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAr
              ? `${emails?.length ?? 0} رسالة — ${unreadCount} غير مقروءة`
              : `${emails?.length ?? 0} messages — ${unreadCount} unread`}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center rounded-xl border border-border bg-card py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            {isAr ? "تعذر تحميل الرسائل." : "Couldn't load messages."}
          </div>
        ) : (emails ?? []).length === 0 ? (
          <div className="space-y-3 rounded-xl border border-border bg-card p-12 text-center">
            <Inbox className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {isAr
                ? "لا توجد رسائل بعد. الرسائل المرسلة إلى نطاق ghazara.net ستظهر هنا."
                : "No messages yet. Mail sent to the ghazara.net domain will appear here."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {(emails ?? []).map(email => (
              <button
                key={email.id}
                type="button"
                onClick={() => openEmail(email)}
                className="flex w-full items-start gap-3 px-4 py-3 text-start transition-colors hover:bg-accent/50"
              >
                <span className="mt-1 shrink-0">
                  {email.isRead ? (
                    <MailOpen className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  ) : (
                    <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0 flex-1 space-y-0.5">
                  <span className="flex items-center justify-between gap-3">
                    <span
                      className={`truncate text-sm ${email.isRead ? "text-muted-foreground" : "font-semibold text-foreground"}`}
                    >
                      {email.sender}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {formatEmailDate(email.receivedAt, lang)}
                    </span>
                  </span>
                  <span
                    className={`block truncate text-sm ${email.isRead ? "text-muted-foreground" : "font-medium text-foreground"}`}
                  >
                    {email.subject || (isAr ? "(بدون موضوع)" : "(no subject)")}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {email.body?.slice(0, 120) ?? ""}
                  </span>
                </span>
                {!email.isRead && (
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="unread" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={Boolean(current)}
        onOpenChange={open => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pe-8 text-start">
              {current?.subject || (isAr ? "(بدون موضوع)" : "(no subject)")}
            </DialogTitle>
            <DialogDescription className="text-start">
              <span dir="ltr" className="block text-xs">
                {current?.sender} → {current?.recipient}
              </span>
              <span className="block text-xs">
                {formatEmailDate(current?.receivedAt ?? null, lang)}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div
            dir="auto"
            className="whitespace-pre-wrap break-words rounded-lg bg-muted/40 p-4 text-sm leading-7 text-foreground"
          >
            {current?.body || "—"}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => {
                if (!current) return;
                setRead.mutate({ id: current.id, isRead: false });
                setSelected(null);
              }}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {isAr ? "تعليم كغير مقروء" : "Mark unread"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="gap-2"
              onClick={() => current && setPendingDelete(current)}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              {isAr ? "حذف" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={Boolean(pendingDelete)}
        onOpenChange={open => {
          if (!open) setPendingDelete(null);
        }}
        variant="destructive"
        title={isAr ? "حذف الرسالة" : "Delete message"}
        description={
          isAr
            ? `سيتم حذف رسالة «${pendingDelete?.subject ?? ""}» نهائيًا.`
            : `"${pendingDelete?.subject ?? ""}" will be permanently deleted.`
        }
        confirmLabel={isAr ? "حذف" : "Delete"}
        cancelLabel={isAr ? "إلغاء" : "Cancel"}
        loading={removeEmail.isPending}
        onConfirm={() => {
          if (pendingDelete) removeEmail.mutate({ id: pendingDelete.id });
        }}
      />
    </DashboardLayout>
  );
}
