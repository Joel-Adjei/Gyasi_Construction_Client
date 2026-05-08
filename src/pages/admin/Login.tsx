import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
type FormData = z.infer<typeof schema>;

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/admin";

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success("Welcome back, Admin", { description: "Session started successfully." });
      navigate(from, { replace: true });
    } catch {
      setError("password", { message: "Invalid email or password" });
      toast.error("Authentication failed", {
        description: "Check your credentials and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, oklch(0.14 0.04 260), oklch(0.20 0.04 265), oklch(0.16 0.05 260))",
        }}
      >
        <div
          className="absolute -top-32 -right-32 w-120 h-120 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.17 65), transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -left-24 w-90 h-90 rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.17 65), transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, oklch(0.6 0.1 240), transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.95 0 0 / 1) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0 0 / 1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl flex items-center justify-center shadow-lg">
            <img src={logo} className="object-contain" />
          </div>
          <div>
            <div className="font-display font-bold text-xl text-white tracking-tight">
              Gyasi <span style={{ color: "oklch(0.78 0.17 65)" }}>Construction</span>
            </div>
            <div className="text-xs font-medium" style={{ color: "oklch(0.65 0.02 260)" }}>
              Admin Portal
            </div>
          </div>
        </div>

        <div className="relative space-y-8">
          <div className="space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                background: "oklch(0.78 0.17 65 / 0.12)",
                borderColor: "oklch(0.78 0.17 65 / 0.3)",
                color: "oklch(0.85 0.12 65)",
              }}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure Access
            </div>
            <h1 className="font-display font-bold text-4xl leading-tight text-white">
              Manage Your
              <br />
              <span style={{ color: "oklch(0.78 0.17 65)" }}>Construction</span>
              <br />
              Business
            </h1>
            <p
              className="text-base leading-relaxed max-w-sm"
              style={{ color: "oklch(0.65 0.02 260)" }}
            >
              Control services, review client messages, and track your business performance — all
              from one place.
            </p>
          </div>

          <ul className="space-y-3">
            {[
              "Manage all services and offerings",
              "View and respond to client inquiries",
              "Monitor project and business analytics",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div
                  className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "oklch(0.78 0.17 65 / 0.2)" }}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: "oklch(0.78 0.17 65)" }}
                  />
                </div>
                <span className="text-sm font-medium" style={{ color: "oklch(0.75 0.02 260)" }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <p className="text-xs" style={{ color: "oklch(0.45 0.02 260)" }}>
            &copy; {new Date().getFullYear()} SteelCore Construction. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
        <div className="flex lg:hidden items-center gap-2.5 mb-10">
          <div className="h-10 w-10 rounded-xl flex items-center justify-center">
            <img src={logo} className="w-6 object-contain" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Gyasi <span className="text-accent">Construction</span>
          </span>
        </div>

        <div className="w-full max-w-100 space-y-8">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl text-foreground">Sign in</h2>
            <p className="text-sm text-muted-foreground">
              Enter your admin credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  {...register("email")}
                  className={cn(
                    "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-card text-sm font-medium transition-colors outline-none",
                    "placeholder:text-muted-foreground/60",
                    "focus:border-accent focus:ring-2 focus:ring-accent/20",
                    errors.email
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : "border-input hover:border-accent/50",
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  {...register("password")}
                  className={cn(
                    "w-full pl-10 pr-11 py-2.5 rounded-lg border bg-card text-sm font-medium transition-colors outline-none",
                    "placeholder:text-muted-foreground/60",
                    "focus:border-accent focus:ring-2 focus:ring-accent/20",
                    errors.password
                      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                      : "border-input hover:border-accent/50",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-destructive">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg",
                "font-semibold text-sm text-primary-foreground transition-all",
                "shadow-md hover:shadow-lg active:scale-[0.98]",
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:brightness-110",
              )}
              style={{
                background: "linear-gradient(135deg, oklch(0.22 0.04 260), oklch(0.28 0.05 255))",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  Sign in to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            &larr;{" "}
            <a
              href="/"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Back to website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
