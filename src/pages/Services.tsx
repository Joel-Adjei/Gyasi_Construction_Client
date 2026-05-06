import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  Building2,
  HardHat,
  Wrench,
  Shield,
  TrendingUp,
  Award,
  Hammer,
  Layers,
  Truck,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import headerImg from "@/assets/header_bg.jpg";

const services = [
  {
    slug: "commercial-construction",
    icon: Building2,
    title: "Commercial Construction",
    desc: "Office towers, hotels, retail, and mixed-use developments — designed for performance and built for permanence.",
  },
  {
    slug: "industrial-builds",
    icon: HardHat,
    title: "Industrial Builds",
    desc: "Heavy industrial facilities, plants, and warehouses with precision-engineered structural systems.",
  },
  {
    slug: "infrastructure",
    icon: Wrench,
    title: "Infrastructure",
    desc: "Bridges, roads, tunnels, and civil works engineered to outlast the next century of use.",
  },
  {
    slug: "safety-compliance",
    icon: Shield,
    title: "Safety & Compliance",
    desc: "OSHA-certified safety programs, third-party audits, and zero-incident commitment on every site.",
  },
  {
    slug: "project-management",
    icon: TrendingUp,
    title: "Project Management",
    desc: "Cost engineering, scheduling, and reporting transparency at every milestone.",
  },
  {
    slug: "renovation-retrofit",
    icon: Award,
    title: "Renovation & Retrofit",
    desc: "Modernization of existing buildings with structural, energy, and seismic upgrades.",
  },
  {
    slug: "structural-steel",
    icon: Hammer,
    title: "Structural Steel",
    desc: "In-house steel erection and welding with certified crews and rigorous QA.",
  },
  {
    slug: "concrete-systems",
    icon: Layers,
    title: "Concrete Systems",
    desc: "Foundations, post-tensioned slabs, and architectural concrete finishing.",
  },
  {
    slug: "logistics-procurement",
    icon: Truck,
    title: "Logistics & Procurement",
    desc: "Global sourcing and just-in-time delivery to keep your timeline intact.",
  },
];

export default function ServicesPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-20 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="w-full h-full md:w-full md:h-fit absolute top-0 overflow-hidden">
          <img
            src={headerImg}
            alt="Construction site at sunset"
            className="md:w-full w-fit h-full md:h-fit object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 z-0 w-full bg-linear-to-t from-primary to-primary/10" />
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-6xl mx-auto text-center animate-fade-up">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
              What We Do
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-balance">
              Construction services, end to end.
            </h1>
            <p className="mt-8 text-lg text-center text-primary-foreground/80 max-w-2xl mx-auto">
              Nine integrated capabilities. One accountable team. Whether you need a tower, a plant,
              or a bridge — we deliver.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                to={`/services/${s.slug}`}
                className="group relative bg-card border border-border rounded-xl p-8 hover:border-accent transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 overflow-hidden flex flex-col"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/0 group-hover:bg-accent/10 transition-colors" />
                <div className="h-14 w-14 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View service <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-10 text-center max-w-2xl">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-balance">
            Don't see your project type?
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            We've built almost everything. Tell us what you have in mind.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-14 px-8 shadow-glow"
          >
            <Link to="/contact">
              Discuss your project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
