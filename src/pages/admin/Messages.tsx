import { useState } from "react";
import { Mail, Search, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useMessages, useMarkMessageRead, useDeleteMessage } from "@/hooks/useMessages";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import type { Message } from "@/lib/type";

export default function Messages() {
  const { data: messages = [], isLoading } = useMessages();
  const { mutate: markRead } = useMarkMessageRead();
  const { mutate: deleteMsg } = useDeleteMessage();

  const [open, setOpen] = useState<Message | null>(null);
  const [q, setQ] = useState("");

  const view = (m: Message) => {
    setOpen(m);
    if (!m.read) markRead(m.id);
  };

  const handleDelete = (id: string) => {
    deleteMsg(id, {
      onSuccess: () => {
        toast.success("Message deleted");
        if (open?.id === id) setOpen(null);
      },
      onError: () => toast.error("Failed to delete message"),
    });
  };

  const filtered = messages.filter((m) =>
    [m.name, m.subject, m.email].some((s) => s.toLowerCase().includes(q.toLowerCase())),
  );

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <header className="border-b border-border bg-card px-4 sm:px-8">
        <div className="h-16 md:h-20 flex items-center justify-between gap-3">
          <div className="shrink-0">
            <h1 className="font-display font-bold text-lg md:text-xl">Messages</h1>
            <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
          </div>
          <div className="relative w-full max-w-xs sm:max-w-sm md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search messages..."
              className="pl-9 h-9 md:h-10"
            />
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-8">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((m) => (
                <li key={m.id} className="group">
                  <div className="flex items-start gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 hover:bg-muted/30 transition-colors">
                    <button
                      onClick={() => view(m)}
                      className="flex items-start gap-4 flex-1 text-left min-w-0"
                    >
                      <div
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center font-semibold shrink-0",
                          !m.read
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-foreground",
                        )}
                      >
                        {m.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className={cn("font-medium truncate", !m.read && "text-foreground")}>
                            {m.name}
                          </div>
                          {!m.read && (
                            <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "text-sm truncate mt-0.5",
                            !m.read ? "text-foreground font-medium" : "text-muted-foreground",
                          )}
                        >
                          {m.subject}
                        </div>
                        <div className="text-sm text-muted-foreground truncate mt-1">
                          {m.message}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground shrink-0">
                        {formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}
                      </div>
                    </button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(m.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-6 py-16 text-center text-muted-foreground">
                  <Mail className="h-10 w-10 mx-auto mb-3 opacity-40" />
                  No messages found
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="sm:max-w-2xl">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl pr-8">{open.subject}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {open.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{open.name}</div>
                  <div className="text-xs text-muted-foreground">{open.email}</div>
                  {open.phone && (
                    <div className="text-xs text-muted-foreground">{open.phone}</div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(open.createdAt), { addSuffix: true })}
                </div>
              </div>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{open.message}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
