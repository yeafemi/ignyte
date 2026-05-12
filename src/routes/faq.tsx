import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus, ArrowRight, HelpCircle } from "lucide-react";
import { useSection } from "@/lib/content";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({ meta: [{ title: "FAQ — IGNYTE Support" }] }),
});

function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faq = useSection("faq");

  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-50" />
      
      <div className="relative mx-auto max-w-4xl px-6 py-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-magenta/10 text-brand-magenta mb-6">
            <HelpCircle className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-cyan">{faq.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl font-black md:text-6xl">
            {faq.title} <span className="text-gradient-brand">{faq.titleAccent}</span>
          </h1>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faq.items?.map((item, i) => (
            <div
              key={i}
              className={`group overflow-hidden rounded-3xl border transition-all duration-500 ${
                openIndex === i 
                  ? "border-brand-cyan/40 bg-card shadow-glow shadow-brand-cyan/5" 
                  : "border-border/40 bg-card/40 hover:border-border"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left md:p-8"
              >
                <div className="flex items-center gap-5">
                  <span className={`font-display text-lg font-black transition-colors ${openIndex === i ? "text-brand-cyan" : "text-muted-foreground"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-bold tracking-tight md:text-2xl">
                    {item.q}
                  </span>
                </div>
                <div className={`h-8 w-8 shrink-0 rounded-full border border-border/60 flex items-center justify-center transition-all ${openIndex === i ? "bg-brand-cyan border-brand-cyan text-background rotate-90" : "group-hover:border-foreground"}`}>
                  {openIndex === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-8 pl-[4.5rem] pr-12 md:pb-10 md:pr-24">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA Card */}
        <div className="mt-20 rounded-[3rem] border border-border/40 bg-gradient-to-br from-brand-cyan/5 to-brand-magenta/5 p-10 text-center backdrop-blur-sm md:p-16">
          <h2 className="font-display text-3xl font-bold">Still have questions?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed">
            Our team is here to help you. Reach out to us directly for a more personalized conversation about your project.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-3 rounded-full bg-gradient-brand px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-glow transition-transform hover:scale-105"
            >
              Contact Support
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
