import { useParams, Link, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { getServices } from "@/lib/store";
import {
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart3,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = getServices().find((s) => s.id === id);

  useEffect(() => {
    if (!service) navigate("/services", { replace: true });
  }, [service, navigate]);

  if (!service) return null;

  const hasStats = service.startingPrice || service.duration || service.projectsCompleted;
  const hasFeatures = service.features && service.features.length > 0;
  const hasProcess = service.process && service.process.length > 0;
  const extraImages = (service.images ?? []).slice(1);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-primary text-primary-foreground overflow-hidden">
        {service.images?.[0] && (
          <>
            <img
              src={service.images[0]}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/70 to-primary/30" />
          </>
        )}

        <div className="relative container mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Services
          </Link>

          <div className="max-w-3xl">
            {service.category && (
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-accent/20 text-accent border border-accent/30 mb-5">
                {service.category}
              </div>
            )}

            <h1 className="font-display font-bold text-4xl md:text-6xl text-balance leading-tight">
              {service.title}
            </h1>

            <p className="mt-5 text-lg text-primary-foreground/80 max-w-2xl leading-relaxed">
              {service.desc}
            </p>

            {/* Stat pills */}
            {hasStats && (
              <div className="mt-8 flex flex-wrap gap-4">
                {service.startingPrice && (
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                    <DollarSign className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">{service.startingPrice}</span>
                  </div>
                )}
                {service.duration && (
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">{service.duration}</span>
                  </div>
                )}
                {service.projectsCompleted != null && service.projectsCompleted > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                    <BarChart3 className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">
                      {service.projectsCompleted}+ projects completed
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-10 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-14">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-14">
              {/* Long description */}
              {service.longDesc && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-5">About this service</h2>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {service.longDesc}
                  </p>
                </div>
              )}

              {/* Process steps */}
              {hasProcess && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-7">How we work</h2>
                  <div className="space-y-5">
                    {service.process!.map((step, i) => (
                      <div key={i} className="flex gap-5">
                        <div className="shrink-0 h-9 w-9 rounded-full bg-accent text-accent-foreground font-display font-bold text-sm flex items-center justify-center mt-0.5">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-base mb-1">{step.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image gallery */}
              {extraImages.length > 0 && (
                <div>
                  <h2 className="font-display font-bold text-2xl mb-6">Gallery</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {extraImages.map((src, i) => (
                      <div
                        key={i}
                        className="aspect-4/3 rounded-xl overflow-hidden border border-border bg-muted"
                      >
                        <img
                          src={src}
                          alt={`${service.title} ${i + 2}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Placeholder when no hero image */}
              {!service.images?.[0] && (
                <div className="aspect-4/3 rounded-xl border border-border bg-muted flex items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-10 w-10" />
                </div>
              )}

              {/* Features card */}
              {hasFeatures && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-display font-semibold text-base mb-4">What's included</h3>
                  <ul className="space-y-3">
                    {service.features!.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick stats card */}
              {hasStats && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h3 className="font-display font-semibold text-base">At a glance</h3>
                  {service.startingPrice && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Starting price</span>
                      <span className="font-semibold">{service.startingPrice}</span>
                    </div>
                  )}
                  {service.duration && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Typical duration</span>
                      <span className="font-semibold">{service.duration}</span>
                    </div>
                  )}
                  {service.projectsCompleted != null && service.projectsCompleted > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Projects delivered</span>
                      <span className="font-semibold">{service.projectsCompleted}+</span>
                    </div>
                  )}
                </div>
              )}

              {/* CTA card */}
              <div className="bg-primary text-primary-foreground rounded-xl p-6 space-y-3">
                <h3 className="font-display font-semibold text-base">Ready to get started?</h3>
                <p className="text-sm text-primary-foreground/75 leading-relaxed">
                  Tell us about your project and we'll put together a tailored proposal.
                </p>
                <Button
                  asChild
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold mt-1"
                >
                  <Link to="/contact">
                    Get a free quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-6 lg:px-10 text-center max-w-2xl">
          <h2 className="font-display font-bold text-3xl md:text-4xl">
            Explore our other services
          </h2>
          <p className="mt-3 text-muted-foreground">
            We offer nine integrated capabilities under one accountable team.
          </p>
          <Button asChild size="lg" variant="outline" className="mt-7 h-12 px-8 font-semibold">
            <Link to="/services">
              View all services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
