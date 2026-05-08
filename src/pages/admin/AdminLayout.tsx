import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Wrench, Inbox, LogOut, HardHat, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/services", label: "Services", icon: Wrench, exact: false },
  { to: "/admin/messages", label: "Messages", icon: Inbox, exact: false },
  { to: "/admin/settings", label: "Settings", icon: Settings, exact: false },
] as const;

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    toast.success("Logged out", { description: "Session ended. See you next time!" });
    navigate("/admin/login", { replace: true });
  }

  const navLinks = (
    <>
      <nav className="flex-1 p-4 space-y-1">
        {items.map((it) => {
          const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium w-full text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="h-20 flex items-center gap-2.5 px-6 border-b border-sidebar-border">
          <div className="h-9 w-1h-9 flex items-center justify-centergroup-hover:scale-105 transition-transform">
            <img src={logo} alt="Gyasi Construction logo" className="size-full object-contain" />
          </div>
        </div>
        {navLinks}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-out drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-16 flex items-center justify-between gap-2.5 px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-1h-9 flex items-center justify-centergroup-hover:scale-105 transition-transform">
              <img src={logo} alt="Gyasi Construction logo" className="size-full object-contain" />
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="h-8 w-8 flex items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {navLinks}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden h-14 flex items-center gap-3 px-4 bg-card border-b border-border shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="h-9 w-9 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-9 w-1h-9 flex items-center justify-centergroup-hover:scale-105 transition-transform">
              <img src={logo} alt="Gyasi Construction logo" className="size-full object-contain" />
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
