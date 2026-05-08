import { Wrench, Inbox, ArrowUpRight, Loader2 } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { useMessages } from "@/hooks/useMessages";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { data: services = [], isLoading: loadingServices } = useServices();
  const { data: messages = [], isLoading: loadingMessages } = useMessages();

  const unreadCount = messages.filter((m) => !m.read).length;
  const recentMessages = messages.slice(0, 4);

  const stats = [
    {
      label: "Total Services",
      value: loadingServices ? "—" : String(services.length),
      change: `${services.filter((s) => s.featured).length} featured`,
      icon: Wrench,
      accent: true,
    },
    {
      label: "Total Messages",
      value: loadingMessages ? "—" : String(messages.length),
      change: `${unreadCount} unread`,
      icon: Inbox,
    },
  ];

  return (
    <div>
      <header className="h-16 md:h-20 border-b border-border bg-card flex items-center justify-between px-4 sm:px-8">
        <div>
          <h1 className="font-display font-bold text-lg md:text-xl">Dashboard</h1>
          <p className="text-xs text-muted-foreground">Welcome back, admin</p>
        </div>
        <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
          A
        </div>
      </header>

      <div className="p-4 sm:p-8 space-y-4 sm:space-y-8">
        <div className="grid sm:grid-cols-2 gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.accent ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"}`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="font-display font-bold text-3xl">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              <div className="text-xs text-accent mt-2 font-medium">{s.change}</div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display font-semibold text-lg mb-4">Recent messages</h2>
          {loadingMessages ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : recentMessages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">No messages yet.</p>
          ) : (
            <ul className="space-y-4">
              {recentMessages.map((m) => (
                <li key={m.id} className="flex gap-3">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${!m.read ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"}`}
                  >
                    {m.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{m.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{m.subject}</div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">
                    {formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
