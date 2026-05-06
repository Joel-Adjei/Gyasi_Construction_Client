import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Star,
  Quote,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-construction.jpg";
import constructionImg from "@/assets/hero-img.png";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import { getServices } from "@/lib/store";
import type { Service } from "@/lib/type";

const stats = [
  { value: "25+", label: "Years of Experience" },
  { value: "480", label: "Projects Delivered" },
  { value: "98%", label: "On-Time Completion" },
  { value: "120+", label: "Industry Awards" },
];

const testimonials = [
  {
    name: "Marcus Chen",
    role: "CEO, Vertex Properties",
    body: "Steelcore delivered our 40-story tower three weeks ahead of schedule. Their precision is unmatched in the industry.",
  },
  {
    name: "Sarah Whitman",
    role: "Director, Port Authority",
    body: "From the first blueprint to final inspection, every milestone was hit. A truly exceptional construction partner.",
  },
  {
    name: "David Okonkwo",
    role: "Founder, Meridian Logistics",
    body: "Our 800,000 sq ft distribution center came in under budget. The team's professionalism set a new standard for us.",
  },
];

function ServiceCard({ service }: { service: Service }) {
  const img = service.images?.[0];
  return (
    <div className="group relative w-[320px] lg:w-90 shrink-0 bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-500 hover:shadow-elegant hover:-translate-y-1.5">
      <div className="relative h-52 bg-primary overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display font-bold text-4xl text-primary-foreground/20">
              {service.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {service.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground shadow">
            <Star className="h-3 w-3 fill-current" /> Featured
          </div>
        )}
      </div>
      <div className="p-7">
        <h3 className="font-display font-semibold text-xl mb-2.5 group-hover:text-accent transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{service.desc}</p>
        <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Learn more <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

function ServicesCarousel({ services }: { services: Service[] }) {
  const doubled = [...services, ...services];
  const duration = `${services.length * 7}s`;
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative">
      {/* Edge fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }}
      />

      {/* Nav buttons */}
      <button
        onClick={() => {
          setPaused(true);
          if (trackRef.current) {
            const card = trackRef.current.querySelector("[data-card]") as HTMLElement | null;
            const step = card ? card.offsetWidth + 24 : 384;
            trackRef.current.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
            const cur = new DOMMatrix(getComputedStyle(trackRef.current).transform).m41;
            trackRef.current.style.transform = `translateX(${cur + step}px)`;
          }
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-card border border-border shadow-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => {
          setPaused(true);
          if (trackRef.current) {
            const card = trackRef.current.querySelector("[data-card]") as HTMLElement | null;
            const step = card ? card.offsetWidth + 24 : 384;
            trackRef.current.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
            const cur = new DOMMatrix(getComputedStyle(trackRef.current).transform).m41;
            trackRef.current.style.transform = `translateX(${cur - step}px)`;
          }
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-card border border-border shadow-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Marquee track */}
      <div
        className={`overflow-hidden py-4 ${paused ? "marquee-paused" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-6 animate-marquee w-max"
          style={{ "--marquee-duration": duration } as React.CSSProperties}
        >
          {doubled.map((s, i) => (
            <div key={`${s.id}-${i}`} data-card>
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const services = getServices();
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Construction site at sunset"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        </div>
        <div className="container  mx-auto px-6 lg:px-10 relative z-10 pt-32 lg:pt-20 pb-20">
          <div className="w-full text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 backdrop-blur text-accent text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Trusted since 1998
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.95] text-balance">
              Building the <span className="text-accent italic">future</span> with precision &
              excellence.
            </h1>
            <p className="mt-8 text-lg text-center md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              From skylines to infrastructure, Steelcore delivers landmark construction projects
              that stand the test of time — engineered, executed, perfected.
            </p>
            <div className="mt-10 flex justify-center flex-wrap gap-4 mx-auto">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-14 px-8 text-base shadow-glow"
              >
                <Link to="/contact">
                  Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold bg-transparent border-white/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
              >
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-0 inset-x-0 bg-primary/95 backdrop-blur border-t border-white/10 z-10">
          <div className="container mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="py-6 text-center md:text-left md:px-6 border-r border-white/10 last:border-r-0 odd:border-r"
              >
                <div className="font-display font-bold text-3xl text-accent">{s.value}</div>
                <div className="text-xs md:text-sm text-primary-foreground/70 mt-1 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className=" lg:hidden bg-primary/95 backdrop-blur border-t border-white/10 z-10">
          <div className="container mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="py-6 text-center md:text-left md:px-6 border-r border-white/10 last:border-r-0 odd:border-r"
              >
                <div className="font-display font-bold text-3xl md:text-4xl text-accent">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-primary-foreground/70 mt-1 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
                What We Do
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-balance">
                Full-spectrum construction services.
              </h2>
            </div>
            <Button asChild variant="ghost" className="self-start md:self-end">
              <Link to="/services">
                All services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ServicesCarousel services={services} />
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <img src={p1} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary" />
        </div>
        <div className="container mx-auto px-6 lg:px-10 relative">
          <div className="max-w-2xl">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Why Steelcore
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Engineered for trust. Built for legacy.
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10">
              We combine decades of structural expertise with modern project intelligence. Every
              site is led by certified engineers and supported by transparent reporting.
            </p>
            <div className="space-y-4">
              {[
                "Zero-incident safety record across 480+ projects",
                "Certified by AGC, OSHA, and ISO 9001:2015",
                "In-house BIM, MEP and structural engineering teams",
                "Fixed-price guarantees with milestone transparency",
              ].map((p) => (
                <div key={p} className="flex items-start gap-4">
                  <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-primary-foreground/90">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Recent Work
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-balance">
              Projects that define skylines.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: p1, title: "Vertex Tower", cat: "Commercial · 2025" },
              { img: p2, title: "Meridian Logistics Hub", cat: "Industrial · 2024" },
              { img: p3, title: "Harborside Bridge", cat: "Infrastructure · 2024" },
            ].map((p) => (
              <div
                key={p.title}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-accent text-xs uppercase tracking-widest font-semibold mb-2">
                    {p.cat}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-primary-foreground">
                    {p.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 bg-muted/40">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Client Voices
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-balance">
              Trusted by industry leaders.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-xl p-8 shadow-card hover:shadow-elegant transition-shadow"
              >
                <Quote className="h-8 w-8 text-accent mb-4" />
                <p className="text-foreground leading-relaxed mb-6">"{t.body}"</p>
                <div className="flex items-center gap-3 pt-6 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto">
        <div className="max-w-2xl mx-auto">
          <img src={constructionImg} alt="" className="object-contain" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="relative rounded-3xl overflow-hidden bg-primary p-12 md:p-20 shadow-elegant">
            <div className="absolute inset-0 opacity-10">
              <Users className="absolute -right-10 -bottom-10 h-96 w-96 text-accent" />
            </div>
            <div className="relative max-w-2xl">
              <h2 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-4 text-balance">
                Ready to build something <span className="text-accent">remarkable?</span>
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Tell us about your project. We'll respond within one business day.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-14 px-8 shadow-glow"
              >
                <Link to="/contact">
                  Start a project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
