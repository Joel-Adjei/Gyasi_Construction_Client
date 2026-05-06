import { useState } from "react";
import { Mail, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Msg = { id: string; name: string; email: string; subject: string; body: string; date: string; unread: boolean };

const seed: Msg[] = [
  { id: "1", name: "Marcus Chen", email: "marcus@vertex.com", subject: "40-story tower project inquiry", body: "Hi team, we're planning a 40-story commercial tower in downtown Austin and would love to discuss whether Steelcore would be the right partner. Timeline starts Q3 next year. Looking forward to hearing from you.", date: "2026-04-30", unread: true },
  { id: "2", name: "Sarah Whitman", email: "swhitman@portauthority.gov", subject: "Bridge maintenance quote needed", body: "We need a comprehensive maintenance and retrofit assessment for the Harborside Bridge. Can your infrastructure team schedule a site visit next month?", date: "2026-04-29", unread: true },
  { id: "3", name: "David Okonkwo", email: "david@meridian.co", subject: "Warehouse expansion - 200,000 sq ft", body: "Following our previous successful collaboration, we're ready to expand our distribution center. Roughly 200k sq ft additional. Let's set up a call.", date: "2026-04-27", unread: false },
  { id: "4", name: "Lila Patel", email: "lila@patelarchitects.com", subject: "Renovation timeline confirmation", body: "Just confirming the schedule for the Maple Avenue renovation. Are we still on track for the August handover?", date: "2026-04-25", unread: false },
  { id: "5", name: "Robert Kim", email: "rkim@summitdev.com", subject: "Mixed-use development partnership", body: "Exploring a 12-acre mixed-use development. Residential + retail. Would love your perspective on feasibility and rough cost ranges.", date: "2026-04-22", unread: false },
];

export default function Messages() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [open, setOpen] = useState<Msg | null>(null);
  const [q, setQ] = useState("");

  const view = (m: Msg) => {
    setOpen(m);
    setMessages((arr) => arr.map((x) => x.id === m.id ? { ...x, unread: false } : x));
  };

  const filtered = messages.filter((m) =>
    [m.name, m.subject, m.email].some((s) => s.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <header className="h-20 border-b border-border bg-card flex items-center justify-between px-8">
        <div>
          <h1 className="font-display font-bold text-xl">Messages</h1>
          <p className="text-xs text-muted-foreground">{messages.filter((m) => m.unread).length} unread</p>
        </div>
        <div className="relative w-80 max-w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search messages..." className="pl-9 h-10" />
        </div>
      </header>
      <div className="p-8">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <ul className="divide-y divide-border">
            {filtered.map((m) => (
              <li key={m.id}>
                <button onClick={() => view(m)} className="w-full text-left px-6 py-5 hover:bg-muted/30 transition-colors flex items-start gap-4">
                  <div className={cn("h-10 w-10 rounded-full flex items-center justify-center font-semibold shrink-0", m.unread ? "bg-accent text-accent-foreground" : "bg-muted text-foreground")}>
                    {m.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <div className={cn("font-medium truncate", m.unread && "text-foreground")}>{m.name}</div>
                      {m.unread && <span className="h-2 w-2 rounded-full bg-accent shrink-0" />}
                    </div>
                    <div className={cn("text-sm truncate mt-0.5", m.unread ? "text-foreground font-medium" : "text-muted-foreground")}>{m.subject}</div>
                    <div className="text-sm text-muted-foreground truncate mt-1">{m.body}</div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">{m.date}</div>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-6 py-16 text-center text-muted-foreground">
                <Mail className="h-10 w-10 mx-auto mb-3 opacity-40" />
                No messages found
              </li>
            )}
          </ul>
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
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">{open.name.charAt(0)}</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{open.name}</div>
                  <div className="text-xs text-muted-foreground">{open.email}</div>
                </div>
                <div className="text-xs text-muted-foreground">{open.date}</div>
              </div>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{open.body}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
