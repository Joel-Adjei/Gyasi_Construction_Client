import { Wrench, Inbox, Building2, TrendingUp, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Total Services", value: "9", change: "+2 this month", icon: Wrench, accent: true },
  { label: "Total Messages", value: "247", change: "+18 this week", icon: Inbox },
  { label: "Active Projects", value: "32", change: "+4 in progress", icon: Building2 },
  { label: "Conversion Rate", value: "12.4%", change: "+1.8 vs last", icon: TrendingUp },
];

const recent = [
  { name: "Marcus Chen", subject: "Tower project inquiry", time: "2h ago" },
  { name: "Sarah Whitman", subject: "Bridge maintenance quote", time: "5h ago" },
  { name: "David Okonkwo", subject: "Warehouse expansion", time: "1d ago" },
  { name: "Lila Patel", subject: "Renovation timeline", time: "2d ago" },
];

export default function Dashboard() {
  return (
    <div>
      <header className="h-20 border-b border-border bg-card flex items-center justify-between px-8">
        <div>
          <h1 className="font-display font-bold text-xl">Dashboard</h1>
          <p className="text-xs text-muted-foreground">Welcome back, admin</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">A</div>
      </header>
      <div className="p-8 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.accent ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"}`}>
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

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Activity overview</h2>
            <div className="h-64 rounded-lg bg-linear-to-br from-muted to-muted/40 flex items-end p-4 gap-2">
              {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-primary/80 hover:bg-accent transition-colors" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display font-semibold text-lg mb-4">Recent messages</h2>
            <ul className="space-y-4">
              {recent.map((r) => (
                <li key={r.name} className="flex gap-3">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold shrink-0">
                    {r.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{r.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{r.subject}</div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">{r.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
