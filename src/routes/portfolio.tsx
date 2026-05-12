import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, ExternalLink, Search } from "lucide-react";
import { useSection } from "@/lib/content";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({ meta: [{ title: "Our Work — IGNYTE Portfolio" }] }),
});

function PortfolioPage() {
  const p = useSection("portfolio");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? p.items 
    : p.items?.filter(item => item.tag === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 border-b border-border/40">
        <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan mb-6 animate-bounce-subtle">
            <Briefcase className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-magenta">{p.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl font-black md:text-6xl lg:text-7xl">
            {p.title} <span className="text-gradient-brand">Work</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {p.subtitle}
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-[89px] z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max pb-2 md:pb-0">
            {p.categories?.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-brand-cyan text-background shadow-glow"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        {filteredProjects?.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((item, i) => (
              <article
                key={item.title}
                className="group relative h-[450px] overflow-hidden rounded-[2.5rem] border border-border/40 bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-cyan/10 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Image Overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&q=80&w=800"}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 pt-0">
                  <div className="flex flex-col h-full justify-end">
                    <span className="mb-3 inline-block w-fit rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-brand-cyan backdrop-blur-md">
                      {item.tag}
                    </span>
                    <h3 className="font-display text-2xl font-bold leading-tight group-hover:text-brand-cyan transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {item.description}
                    </p>
                    <div className="mt-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <button className="flex h-10 items-center justify-center gap-2 rounded-full bg-white px-5 text-[10px] font-black uppercase tracking-widest text-black hover:scale-105 transition-transform">
                        View Project
                      </button>
                      <button className="h-10 w-10 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="absolute right-8 top-8 font-display text-4xl font-black text-white/10 transition-colors group-hover:text-brand-cyan/20">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-white/5 text-muted-foreground mb-8">
              <Search className="h-10 w-10" />
            </div>
            <h2 className="font-display text-2xl font-bold">No projects found</h2>
            <p className="mt-4 text-muted-foreground">Try selecting a different category to see our work.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-24 rounded-[3rem] border border-border/40 bg-card/60 p-12 text-center backdrop-blur-sm">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Have a vision in mind?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Let's turn your ideas into a digital masterpiece. Our team is ready to bring your brand to life.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="rounded-full bg-gradient-brand px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-glow transition-transform hover:scale-105"
            >
              Start Your Project
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-border/40 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
