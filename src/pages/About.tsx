import { SiteLayout } from "@/components/layout/SiteLayout";
import { Award, Target, Eye, Users } from "lucide-react";
import aboutTeamImg from "@/assets/about-team.jpg";
import headerImg from "@/assets/header_bg.jpg";

const milestones = [
  {
    year: "1998",
    title: "Founded",
    desc: "Steelcore opens its first office in Houston with 12 engineers.",
  },
  {
    year: "2007",
    title: "First Skyscraper",
    desc: "Delivered the 32-story Meridian Tower, our first major commercial win.",
  },
  {
    year: "2015",
    title: "ISO 9001 Certified",
    desc: "Achieved international quality management certification.",
  },
  {
    year: "2021",
    title: "Infrastructure Division",
    desc: "Expanded into bridges and civil infrastructure across three states.",
  },
  {
    year: "2025",
    title: "480+ Projects",
    desc: "Crossing nearly five hundred completed builds with zero major incidents.",
  },
  {
    year: "2026",
    title: "500+ Projects",
    desc: "Reached over five hundred completed projects, continuing our legacy of excellence.",
  },
];

const team = [
  { name: "Elena Vasquez", role: "Chief Executive Officer" },
  { name: "James Patterson", role: "Chief Engineer" },
  { name: "Aisha Khan", role: "Director of Operations" },
  { name: "Marcus Reid", role: "Head of Safety" },
  { name: "Sophia Chen", role: "Director of Sustainability" },
  { name: "David Morales", role: "Project Manager Lead" },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-20 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="h-full md:w-full absolute top-0 overflow-hidden">
          <img
            src={headerImg}
            alt="Construction site at sunset"
            className="h-full md:w-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 z-0 w-full bg-linear-to-t from-primary to-primary/10" />
        <div className="container mx-auto px-6 lg:px-10">
          <div className="max-w-7xl mx-auto text-center animate-fade-up">
            <div className="text-accent z-20 font-semibold text-sm uppercase tracking-widest mb-4">
              About Steelcore
            </div>
            <h1 className="font-display z-20 font-bold text-5xl md:text-7xl text-balance">
              A quarter century of building what matters.
            </h1>
            <p className="mt-8 text-lg text-primary-foreground/80 z-20 max-w-2xl mx-auto leading-relaxed">
              Steelcore was founded on a simple belief: great construction is engineering,
              craftsmanship, and accountability — never just one.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Who We Are
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Built on purpose. Driven by principle.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-5">
              <div className="bg-card border border-border rounded-xl p-6 flex gap-5 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 shrink-0 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    To deliver construction projects that exceed structural, financial, and ethical
                    expectations — building trust as deliberately as we build steel and concrete.
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 flex gap-5 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 shrink-0 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    To be the construction partner of choice for the projects that shape cities — from
                    sustainable towers to resilient infrastructure.
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 flex gap-5 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 shrink-0 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2">Our Values</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Safety first, always. Transparent communication. Quality without compromise. Respect
                    for every craftsperson on site.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 bg-accent/5 rounded-2xl" />
              <img
                src={aboutTeamImg}
                alt="Steelcore team on site"
                className="relative rounded-2xl w-full h-120 object-cover shadow-lg"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-primary/90 backdrop-blur-sm rounded-xl p-4 text-primary-foreground">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-accent shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">25+ Years of Excellence</p>
                    <p className="text-xs text-primary-foreground/70">Trusted by 480+ projects worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Our Journey
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Milestones along the way.
            </h2>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex gap-6 md:gap-0 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent ring-4 ring-background" />
                <div
                  className={`pl-16 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                >
                  <div className="font-display font-bold text-3xl text-accent">{m.year}</div>
                  <h3 className="font-display font-semibold text-xl mt-1">{m.title}</h3>
                  <p className="text-muted-foreground mt-2">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Leadership
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              The people behind every blueprint.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-elegant transition-shadow"
              >
                <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground mx-auto flex items-center justify-center mb-4">
                  <Users className="h-10 w-10 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Why Choose Us
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Building trust, one project at a time.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Proven Expertise",
                desc: "25+ years of delivering complex projects on time and within budget.",
              },
              {
                icon: Users,
                title: "Skilled Team",
                desc: "Certified engineers and craftsmen committed to safety and quality.",
              },
              {
                icon: Target,
                title: "Innovative Solutions",
                desc: "Leveraging cutting-edge technology for sustainable construction.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="h-16 w-16 bg-accent text-accent-foreground rounded-full mx-auto flex items-center justify-center mb-4">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
              Certifications
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl">
              Recognized for excellence.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "ISO 9001", desc: "Quality Management Systems" },
              { title: "LEED Certified", desc: "Leadership in Energy and Environmental Design" },
              { title: "OSHA Compliant", desc: "Occupational Safety and Health Administration" },
              { title: "DBE Certified", desc: "Disadvantaged Business Enterprise" },
            ].map((cert) => (
              <div key={cert.title} className="text-center">
                <div className="h-16 w-16 bg-accent text-accent-foreground rounded-full mx-auto flex items-center justify-center mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{cert.title}</h3>
                <p className="text-muted-foreground text-sm">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
