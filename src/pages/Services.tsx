import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ArrowRight, ArrowUpRight, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import headerImg from "@/assets/header_bg.jpg";

export default function ServicesPage() {
  const { data: services = [], isLoading, isError } = useServices();

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
          {isLoading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {isError && (
            <div className="text-center py-24 text-muted-foreground">
              Failed to load services. Please try again later.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 flex flex-col"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    {s.images?.[0] ? (
                      <img
                        src={s.images[0]}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 bg-muted">
                        <ImageIcon className="h-10 w-10" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {s.category && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                        {s.category}
                      </span>
                    )}
                    <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-accent transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{s.desc}</p>
                    <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-accent">
                      View service{" "}
                      <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
