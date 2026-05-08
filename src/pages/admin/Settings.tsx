import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Cloud,
  KeyRound,
  Save,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import type { SiteSettings } from "@/lib/type";

const schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  contactEmail: z.string().email("Enter a valid email"),
  contactPhone: z.string().min(1, "Phone number is required"),
  contactAddress: z.string().min(1, "Address is required"),
  cloudinaryCloudName: z.string(),
  cloudinaryUploadPreset: z.string(),
});

type FormData = z.infer<typeof schema>;

function FieldGroup({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-accent/30 transition-colors">
      <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-4.5 w-4.5 text-accent" style={{ height: "1.125rem", width: "1.125rem" }} />
      </div>
      <div className="flex-1 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending, isSuccess } = useUpdateSettings();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: "",
      contactEmail: "",
      contactPhone: "",
      contactAddress: "",
      cloudinaryCloudName: "",
      cloudinaryUploadPreset: "",
    },
  });

  useEffect(() => {
    if (settings) reset(settings as FormData);
  }, [settings, reset]);

  const cloudName = watch("cloudinaryCloudName");
  const uploadPreset = watch("cloudinaryUploadPreset");
  const cloudinaryConfigured = cloudName?.trim() && uploadPreset?.trim();

  const onSubmit = (data: FormData) => {
    updateSettings(data as Partial<SiteSettings>, {
      onSuccess: () =>
        toast.success("Settings saved", { description: "Changes are now live across the site." }),
      onError: () =>
        toast.error("Failed to save settings", { description: "Please try again." }),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <header className="h-16 md:h-20 border-b border-border bg-card flex items-center justify-between px-4 sm:px-8">
        <div>
          <h1 className="font-display font-bold text-lg md:text-xl">Settings</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">Manage site configuration and integrations</p>
        </div>
        <Button
          form="settings-form"
          type="submit"
          disabled={(!isDirty && !isSuccess) || isPending}
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gap-2 disabled:opacity-50"
          size="sm"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Saving…</span>
            </>
          ) : isSuccess && !isDirty ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Save changes</span>
            </>
          )}
        </Button>
      </header>

      <div className="p-4 sm:p-8 max-w-3xl space-y-6 sm:space-y-8">
        <form id="settings-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company */}
          <section className="space-y-4">
            <h2 className="font-display font-bold text-lg">Company</h2>
            <FieldGroup icon={Building2} label="Company name">
              <div className="space-y-1.5">
                <Input
                  {...register("companyName")}
                  placeholder="e.g. SteelCore Construction"
                  className={errors.companyName ? "border-destructive" : ""}
                />
                {errors.companyName && (
                  <p className="text-xs text-destructive">{errors.companyName.message}</p>
                )}
              </div>
            </FieldGroup>
          </section>

          {/* Contact */}
          <section className="space-y-4">
            <h2 className="font-display font-bold text-lg">Contact Information</h2>
            <div className="space-y-3">
              <FieldGroup icon={Mail} label="Email address">
                <div className="space-y-1.5">
                  <Input
                    {...register("contactEmail")}
                    type="email"
                    placeholder="info@yourcompany.com"
                    className={errors.contactEmail ? "border-destructive" : ""}
                  />
                  {errors.contactEmail && (
                    <p className="text-xs text-destructive">{errors.contactEmail.message}</p>
                  )}
                </div>
              </FieldGroup>

              <FieldGroup icon={Phone} label="Phone number">
                <div className="space-y-1.5">
                  <Input
                    {...register("contactPhone")}
                    placeholder="+1 (555) 000-0000"
                    className={errors.contactPhone ? "border-destructive" : ""}
                  />
                  {errors.contactPhone && (
                    <p className="text-xs text-destructive">{errors.contactPhone.message}</p>
                  )}
                </div>
              </FieldGroup>

              <FieldGroup icon={MapPin} label="Office address">
                <div className="space-y-1.5">
                  <Textarea
                    {...register("contactAddress")}
                    rows={2}
                    placeholder="123 Steel Avenue, New York, NY 10001"
                    className={`resize-none ${errors.contactAddress ? "border-destructive" : ""}`}
                  />
                  {errors.contactAddress && (
                    <p className="text-xs text-destructive">{errors.contactAddress.message}</p>
                  )}
                </div>
              </FieldGroup>
            </div>
          </section>

          {/* Cloudinary */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="font-display font-bold text-lg">Cloudinary Integration</h2>
              {cloudinaryConfigured ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Configured
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  <AlertTriangle className="h-3 w-3" />
                  Not configured
                </span>
              )}
            </div>

            <div
              className="flex gap-3 p-4 rounded-xl border text-xs"
              style={{
                background: "oklch(0.78 0.17 65 / 0.06)",
                borderColor: "oklch(0.78 0.17 65 / 0.2)",
              }}
            >
              <Cloud className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
              <div className="space-y-1 text-muted-foreground">
                <p className="font-semibold text-foreground text-sm">Image uploads via Cloudinary</p>
                <p>
                  Create a free account at{" "}
                  <span className="font-mono font-semibold text-foreground">cloudinary.com</span>,
                  then create an{" "}
                  <span className="font-semibold text-foreground">unsigned upload preset</span> under
                  Settings → Upload. Paste your Cloud Name and preset name below.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <FieldGroup icon={Cloud} label="Cloud name">
                <Input
                  {...register("cloudinaryCloudName")}
                  placeholder="e.g. my-cloud-name"
                  className="font-mono text-sm"
                />
              </FieldGroup>

              <FieldGroup icon={KeyRound} label="Upload preset (unsigned)">
                <Input
                  {...register("cloudinaryUploadPreset")}
                  placeholder="e.g. steelcore_unsigned"
                  className="font-mono text-sm"
                />
              </FieldGroup>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
