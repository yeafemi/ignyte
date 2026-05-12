import { createFileRoute, Link } from "@tanstack/react-router";
import { iconMap } from "@/lib/icons";
import { useSection } from "@/lib/content";
import { ArrowRight, Globe } from "lucide-react";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [{ title: "Services — IGNYTE" }],
  }),
});

const colors = [
  "text-brand-cyan",
  "text-brand-magenta",
  "text-brand-yellow",
  "text-brand-red",
];

function ServicesPage() {
  const c = useSection("services");
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-70" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-magenta animate-in fade-in slide-in-from-bottom-4 duration-700">
            {c.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-5xl font-black leading-tight md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="text-gradient-brand drop-shadow-glow">{c.title}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {c.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {c.items.map((s, i) => {
            const Icon = iconMap[s.icon] || Globe;
            return (
              <Link
                key={s.id || s.title}
                to="/services/$serviceId"
                params={{ serviceId: s.id || "unknown" }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/40 p-10 transition-all duration-500 hover:-translate-y-2 hover:border-brand-cyan/40 hover:shadow-glow backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25" />
                <div className="flex items-center justify-between mb-8">
                  <div className={`h-16 w-16 flex items-center justify-center rounded-2xl bg-white/5 ${colors[i % 4]} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-cyan opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  Detailed Outline <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-24 rounded-[3rem] border border-border/40 bg-card/60 p-12 text-center backdrop-blur-xl md:p-20 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-30" />
          <div className="relative z-10">
            <h3 className="font-display text-4xl font-black md:text-5xl">
              Need something <span className="text-gradient-brand">custom?</span>
            </h3>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Tell us about your specific business goals and we'll craft a bespoke digital strategy that fits your unique vision.
            </p>
            <Link
              to="/booking"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-brand px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-glow transition-all hover:scale-105 active:scale-95"
            >
              Book a Consultation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
