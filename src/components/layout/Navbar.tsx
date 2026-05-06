import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-card"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-14 w-1h-14 flex items-center justify-centergroup-hover:scale-105 transition-transform">
            <img src={logo} alt="Gyasi Construction logo" className="size-full object-contain" />
          </div>
          <div
            className={cn(
              "font-display font-bold text-xl tracking-tight",
              scrolled || open ? "text-accent" : "text-primary-foreground",
            )}
          >
            Gyasi{" "}
            <span className={cn("font-medium", scrolled || open ? "text-primary" : "text-accent ")}>
              Construction
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors relative",
                  scrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-primary-foreground/90 hover:text-primary-foreground",
                  active && "text-accent",
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            variant="default"
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          >
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>

        <button
          className={cn(
            "md:hidden p-2",
            scrolled || open ? "text-foreground" : "text-primary-foreground",
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden relative h-dvh border-t border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-3 rounded-md text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Button
            asChild
            className="absolute z-50 left-5 bottom-24 bg-accent px-9 text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
