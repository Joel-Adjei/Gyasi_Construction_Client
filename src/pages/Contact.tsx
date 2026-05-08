import { SiteLayout } from "@/components/layout/SiteLayout";
import { useRef } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useContact } from "@/hooks/useContact";
import type { AxiosError } from "axios";
import headerImg from "@/assets/header_bg.jpg";
import useContactStore from "@/store/ContactStore";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate: sendContact, isPending } = useContact();
  const { data: contactData } = useContactStore();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    sendContact(
      {
        name: fd.get("name") as string,
        email: fd.get("email") as string,
        phone: (fd.get("phone") as string) || undefined,
        subject: fd.get("subject") as string,
        message: fd.get("message") as string,
      },
      {
        onSuccess: () => {
          formRef.current?.reset();
          toast.success("Message sent — we'll respond within one business day.");
        },
        onError: (err) => {
          const msg = (err as AxiosError<{ message: string }>).response?.data?.message;
          toast.error(msg ?? "Failed to send message. Please try again.");
        },
      },
    );
  };

  return (
    <SiteLayout>
      <section className="pt-40 pb-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="w-full absolute top-0 overflow-hidden">
          <img
            src={headerImg}
            alt="Construction site at sunset"
            className="w-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 z-0 w-full bg-linear-to-t from-primary to-primary/10" />
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center animate-fade-up">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
              Get in Touch
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-balance">
              Let's build something together.
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 md:p-10 shadow-card">
            <h2 className="font-display font-bold text-2xl mb-6">Request a quote</h2>
            <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="mt-2 h-12"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 h-12"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    className="mt-2 h-12"
                    placeholder="+1 555 000 0000"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    required
                    className="mt-2 h-12"
                    placeholder="Commercial tower project"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Project details</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={6}
                  className="mt-2 resize-none"
                  placeholder="Tell us about scope, timeline, and budget..."
                />
              </div>
              <Button
                type="submit"
                disabled={isPending}
                size="lg"
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-14 px-8"
              >
                {isPending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send message
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-elegant">
              <h3 className="font-display font-bold text-xl mb-6">Reach us directly</h3>
              <ul className="space-y-5 text-sm">
                {[
                  {
                    icon: MapPin,
                    label: "Headquarters",
                    value: contactData?.contactAddress,
                  },
                  { icon: Phone, label: "Phone", value: contactData?.contactPhone },
                  { icon: Mail, label: "Email", value: contactData?.contactEmail },
                  { icon: Clock, label: "Hours", value: "Mon–Fri · 8:00 AM – 6:00 PM CT" },
                ].map((c) => (
                  <li key={c.label} className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-primary-foreground/60">
                        {c.label}
                      </div>
                      <div className="text-primary-foreground mt-0.5">{c.value}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden border border-border shadow-card">
              <iframe
                title="Office location"
                className="w-full h-full"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-95.385%2C29.755%2C-95.355%2C29.775&layer=mapnik"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
