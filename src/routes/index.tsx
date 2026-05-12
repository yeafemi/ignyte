import { createFileRoute, Link } from "@tanstack/react-router";
import { iconMap } from "@/lib/icons";
import { useSection } from "@/lib/content";
import { ArrowRight, Globe, Quote, Sparkles, MessageSquare } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import hero1 from "@/assets/hero/website_dev_hero_1778579748736.png";
import hero2 from "@/assets/hero/meta_config_hero_1778580178884.png";
import hero3 from "@/assets/hero/video_ads_hero_1778580267131.png";
import hero4 from "@/assets/hero/graphic_design_hero_1778580285013.png";
import hero5 from "@/assets/hero/branding_hero_1778580527613.png";
import hero6 from "@/assets/hero/maintenance_hero_1778580693461.png";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "IGNYTE — Igniting Brands. Driving Growth." },
      {
        name: "description",
        content:
          "Strategic branding, web development, advertising and digital consultancy for businesses ready to grow.",
      },
    ],
  }),
});

const serviceColors = [
  "text-brand-cyan",
  "text-brand-magenta",
  "text-brand-yellow",
  "text-brand-red",
];

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];

function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(intervalId);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <div className="relative w-full max-w-md lg:max-w-lg animate-float">
      <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl animate-pulse" />
      <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-brand-magenta/20 blur-3xl animate-pulse delay-700" />
      
      <div className="relative overflow-hidden rounded-[40px] border border-border/40 bg-card/30 backdrop-blur-xl shadow-elegant" ref={emblaRef}>
        <div className="flex">
          {heroImages.map((src, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%] aspect-[4/3] group">
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-[10000ms] ease-linear group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 right-6 flex gap-2 z-20">
          {heroImages.map((src, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`relative h-12 w-12 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                selectedIndex === i 
                  ? "border-brand-cyan scale-110 shadow-glow" 
                  : "border-white/20 opacity-50 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Index() {
  const home = useSection("home");
  const services = useSection("services");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="absolute inset-x-0 top-0 h-[600px] [background:var(--gradient-radial-glow)] opacity-50" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="text-left animate-in fade-in slide-in-from-left-8 duration-1000">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-5 py-1.5 text-[10px] font-black text-brand-cyan backdrop-blur-sm uppercase tracking-[0.3em]">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
                {home.heroEyebrow}
              </span>
              
              <h1 className="mt-8 font-display text-4xl font-black leading-[1.02] tracking-tighter md:text-6xl lg:text-7xl">
                {home.heroTitle}<br />
                <span className="text-gradient-brand drop-shadow-glow">{home.heroTitleAccent}</span>
              </h1>
              
              <p className="mt-8 max-w-xl text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                {home.heroSubtitle}
              </p>
              
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link
                  to="/booking"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-brand px-10 py-5 text-sm font-black uppercase tracking-widest text-primary-foreground shadow-glow transition-all hover:scale-[1.05] active:scale-[0.98]"
                >
                  <span className="relative z-10">{home.ctaPrimary}</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-widest backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
                >
                  {home.ctaSecondary}
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-cyan">
              {home.whoEyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              {home.whoTitle}
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground">
            <p>{home.whoBody1}</p>
            <p>{home.whoBody2}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-y border-border/40 bg-card/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-magenta">
              {home.servicesEyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              {home.servicesTitle}
            </h2>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {services.items.slice(0, 6).map((s, i) => {
              const Icon = iconMap[s.icon] || Globe;
              return (
                <Link
                  key={s.id || s.title}
                  to="/services/$serviceId"
                  params={{ serviceId: s.id || "unknown" }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 transition-all hover:-translate-y-2 hover:border-brand-cyan/40 hover:shadow-glow backdrop-blur-sm"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
                  <Icon className={`h-10 w-10 ${serviceColors[i % 4]} transition-transform group-hover:scale-110`} />
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-cyan opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-brand-cyan"
            >
              Explore all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative py-40 border-t border-border/40 overflow-hidden bg-[#0a0a10]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,255,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,0,255,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-cyan">
                <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
                {home.advantageEyebrow}
              </div>
              <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tighter md:text-7xl">
                {home.advantageTitle} <br />
                <span className="text-gradient-brand drop-shadow-glow">{home.advantageTitleAccent}</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                {home.advantageSubtitle}
              </p>
              <div className="pt-8">
                <div className="h-px w-24 bg-gradient-to-r from-brand-cyan to-transparent mx-auto lg:mx-0" />
              </div>
            </div>

            <div className="lg:w-2/3 grid gap-6 md:grid-cols-2">
              {home.advantages?.map((f, i) => {
                const Icon = iconMap[f.icon] || Sparkles;
                return (
                  <div 
                    key={f.title}
                    className={`group relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.03] p-10 backdrop-blur-3xl transition-all duration-700 hover:-translate-y-3 hover:border-brand-cyan/30 hover:bg-white/[0.06] ${i === 0 ? "md:col-span-2" : "col-span-1"}`}
                  >
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-cyan opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-20" />
                    <div className="relative z-10">
                      <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-[2rem] bg-white/5 ${i % 2 === 0 ? "text-brand-cyan" : "text-brand-magenta"} transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 animate-float`} style={{ animationDelay: `${i * 0.5}s` }}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-display text-3xl font-black tracking-tight">{f.title}</h3>
                      <p className="mt-4 text-lg text-muted-foreground font-medium leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                    <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-12 translate-y-12 rounded-full border border-white/10 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-6 group-hover:translate-y-6" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="relative py-40 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-24">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-cyan">{home.processEyebrow}</p>
            <h2 className="mt-4 font-display text-5xl font-black md:text-6xl">
              {home.processTitle} <span className="text-gradient-brand">{home.processTitleAccent}</span>
            </h2>
          </div>

          <div className="relative grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent hidden lg:block -translate-y-1/2" />
            
            {home.processes?.map((p, i) => {
              const Icon = iconMap[p.icon] || MessageSquare;
              return (
                <div key={p.step} className="group relative">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`mb-8 flex h-24 w-24 items-center justify-center rounded-[2.5rem] border border-border/40 bg-card shadow-elegant transition-all duration-700 group-hover:-translate-y-4 group-hover:border-brand-cyan/30 group-hover:shadow-glow`}>
                      <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-b ${i % 2 === 0 ? "from-brand-cyan/20" : "from-brand-magenta/20"} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />
                      <Icon className="relative h-10 w-10 text-foreground transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute -top-4 -right-4 h-10 w-10 flex items-center justify-center rounded-full bg-background border border-border text-xs font-black text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white transition-colors duration-500">
                        {p.step}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4">{p.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm max-w-[200px]">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialCarousel />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center md:p-16">
          <div className="absolute inset-0 [background:var(--gradient-radial-glow)]" />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {home.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {home.ctaBody}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/booking"
                className="rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                {home.ctaPrimaryLabel}
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-border bg-background/60 px-7 py-3.5 text-sm font-semibold backdrop-blur hover:bg-background"
              >
                {home.ctaSecondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TestimonialCarousel() {
  const home = useSection("home");
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps"
  });

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [emblaApi]);

  if (!home.testimonials?.length) return null;

  return (
    <section className="relative py-40 bg-[#08080c] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.03)_0%,transparent_70%)]" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-magenta">{home.testimonialsEyebrow}</p>
          <h2 className="mt-4 font-display text-5xl font-black md:text-6xl">
            {home.testimonialsTitle} <span className="text-gradient-brand">{home.testimonialsTitleAccent}</span>
          </h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {home.testimonials.map((t, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <div className="h-full group relative rounded-[3rem] border border-white/5 bg-white/[0.02] p-10 transition-all duration-700 hover:bg-white/[0.04] hover:border-brand-magenta/30 backdrop-blur-sm">
                  <Quote className="absolute top-8 right-8 h-10 w-10 text-white/5 transition-colors group-hover:text-brand-magenta/10" />
                  <div className="flex flex-col h-full justify-between gap-8">
                    <p className="text-lg font-medium leading-relaxed italic text-foreground/90">
                      “{t.quote}”
                    </p>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-bold text-foreground text-sm">{t.author}</p>
                        <p className="text-xs text-muted-foreground">{t.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
