import { createFileRoute } from "@tanstack/react-router";
import { iconMap } from "@/lib/icons";
import { useSection } from "@/lib/content";
import { Target, Eye, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "About — IGNYTE Consultancy & Advertising Agency" }],
  }),
});

function AboutPage() {
  const c = useSection("about");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 min-h-[60vh] flex items-center">
        <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-70" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-cyan animate-in fade-in slide-in-from-bottom-4 duration-700">
            {c.eyebrow}
          </p>
          <h1 className="mt-8 font-display text-5xl font-black leading-[1.1] tracking-tighter md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="text-gradient-brand drop-shadow-glow">{c.title}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {c.intro}
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-[3rem] border border-border/40 bg-card/30 p-12 backdrop-blur-xl transition-all duration-500 hover:border-brand-cyan/40 hover:shadow-glow shadow-brand-cyan/5">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-cyan opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10" />
            <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Target className="h-8 w-8" />
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight">
              {c.missionTitle}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {c.missionBody}
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-[3rem] border border-border/40 bg-card/30 p-12 backdrop-blur-xl transition-all duration-500 hover:border-brand-magenta/40 hover:shadow-glow shadow-brand-magenta/5">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-magenta opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10" />
            <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-brand-magenta/10 text-brand-magenta mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Eye className="h-8 w-8" />
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight">
              {c.visionTitle}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {c.visionBody}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-card/30 py-40 border-t border-border/40 relative overflow-hidden">
        <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-30 pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="max-w-3xl text-center md:text-left mb-24">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-cyan">Guiding Principles</p>
            <h2 className="mt-6 font-display text-5xl font-black md:text-7xl">Our Core <span className="text-gradient-brand">Values</span></h2>
            <p className="mt-8 text-muted-foreground text-xl leading-relaxed">
              The principles that guide our every move and define the IGNYTE experience for every client we serve.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {c.values?.map((v, i) => {
              const Icon = iconMap[v.icon] || Lightbulb;
              return (
                <div 
                  key={v.title}
                  className="group relative p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] hover:border-brand-cyan/30 hover:-translate-y-2"
                >
                  <div className={`mb-8 h-16 w-16 flex items-center justify-center rounded-2xl transition-all duration-500 ${i % 2 === 0 ? "bg-brand-cyan/10 text-brand-cyan" : "bg-brand-magenta/10 text-brand-magenta"} group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{v.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                  <div className="absolute -bottom-2 -right-2 font-display text-8xl font-black opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.06] transition-opacity">
                    0{i + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="relative overflow-hidden rounded-[4rem] border border-border/40 bg-card p-12 text-center md:p-24 shadow-elegant">
          <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-40" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display text-4xl font-black md:text-6xl tracking-tight">
              Driven by <span className="text-gradient-brand">Excellence.</span>
            </h2>
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed">
              We are a team of strategic thinkers, creative designers, and tech experts dedicated to igniting the potential of your brand.
            </p>
            <div className="mt-12">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-3 rounded-full bg-gradient-brand px-10 py-5 text-sm font-black uppercase tracking-widest text-white shadow-glow transition-all hover:scale-105 active:scale-95"
              >
                Join Our Journey
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
