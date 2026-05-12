import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ArrowRight, Globe } from "lucide-react";
import { useSection } from "@/lib/content";
import { iconMap } from "@/lib/icons";

export const Route = createFileRoute("/services/$serviceId")({
  component: ServiceDetailPage,
  head: ({ params }) => ({
    meta: [{ title: `Service Detail — IGNYTE` }],
  }),
});

function ServiceDetailPage() {
  const { serviceId } = Route.useParams();
  const s = useSection("services");
  
  const service = s.items.find(item => item.id === serviceId);
  if (!service) throw notFound();

  const Icon = iconMap[service.icon] || Globe;

  return (
    <div className="min-h-screen bg-background pb-24 selection:bg-brand-cyan/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 py-24 md:py-32">
        <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Link 
            to="/services" 
            className="group mb-12 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>
          
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-3 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-cyan backdrop-blur-md">
                <Icon className="h-3.5 w-3.5" />
                Service Blueprint
              </div>
              <h1 className="mt-8 font-display text-5xl font-black leading-[1.1] tracking-tighter md:text-7xl lg:text-8xl">
                {service.title}
              </h1>
              <p className="mt-8 text-2xl font-bold text-gradient-brand leading-tight">
                {service.subtitle}
              </p>
              <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
                {service.desc}
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  to="/booking"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-brand px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-glow transition-all hover:scale-[1.05] active:scale-[0.98]"
                >
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
              <div className="absolute -inset-4 rounded-[3rem] bg-gradient-brand opacity-10 blur-3xl" />
              <div className="relative rounded-[3rem] border border-border/40 bg-card/40 p-10 backdrop-blur-xl shadow-elegant">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="font-display text-2xl font-black tracking-tight uppercase tracking-widest text-foreground/80">Capabilities</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent ml-6" />
                </div>
                
                <div className="space-y-6">
                  {service.features?.map((feature, i) => (
                    <div 
                      key={feature} 
                      className="flex items-start gap-4 group animate-in fade-in slide-in-from-right-4 fill-mode-both"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan transition-colors group-hover:bg-brand-cyan group-hover:text-white">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-lg font-bold text-foreground/90 leading-tight group-hover:text-brand-cyan transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="mx-auto max-w-7xl px-6 pt-32 text-center">
        <div className="relative overflow-hidden rounded-[4rem] border border-border/40 bg-[#08080c] p-16 md:p-24 shadow-elegant">
          <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-30" />
          <h2 className="relative font-display text-4xl font-black md:text-5xl lg:text-6xl tracking-tight">
            Ready to ignite <br />
            <span className="text-gradient-brand">your digital potential?</span>
          </h2>
          <p className="relative mt-8 text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Join brands that have scaled with our strategic advertising and creative development expertise.
          </p>
          <div className="relative mt-12 flex flex-col items-center gap-8">
            <Link
              to="/contact"
              className="group flex items-center gap-3 text-xl font-black uppercase tracking-[0.2em] text-brand-magenta hover:text-brand-cyan transition-colors"
            >
              Get Expert Guidance <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Link>
            
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-14 w-14 rounded-full border-4 border-[#08080c] bg-white/5 backdrop-blur-md flex items-center justify-center transition-transform hover:-translate-y-2 hover:z-10">
                  <Globe className="h-6 w-6 text-brand-cyan/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
