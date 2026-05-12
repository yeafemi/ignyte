import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, CheckCircle2, MessageSquare, Send, Clock, User, Building2, Mail, Phone, Info } from "lucide-react";
import { useSection } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/booking")({
  component: BookingPage,
  head: () => ({ meta: [{ title: "Book a Consultation — IGNYTE" }] }),
});

function BookingPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const b = useSection("booking");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const { error } = await supabase.from("bookings").insert({
      full_name: formData.get("full_name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      preferred_date: formData.get("preferred_date") as string || null,
      meeting_method: formData.get("meeting_method") as string,
      description: formData.get("description") as string,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit booking. Please try again.");
      console.error(error);
      return;
    }
    setSent(true);
    toast.success("Booking submitted successfully!");
  };

  return (
    <section className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,255,255,0.03)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Header Section */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-cyan">{b.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl font-black md:text-6xl lg:text-7xl">
            {b.title} <span className="text-gradient-brand">{b.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {b.body}
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Info & Benefits */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="flex items-center gap-3 font-display text-2xl font-bold mb-8">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
                  <Info className="h-5 w-5" />
                </div>
                What to Expect
              </h2>
              <div className="space-y-6">
                {b.benefits?.map((benefit, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan transition-colors group-hover:bg-brand-cyan group-hover:text-white">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="font-semibold text-foreground leading-snug">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-border/40 bg-card/40 p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-brand-magenta/10 text-brand-magenta shrink-0">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-2">Consultation Note</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.consultationNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-brand opacity-5 blur-3xl pointer-events-none" />
            <form
              onSubmit={handleSubmit}
              className="relative rounded-[3rem] border border-border/40 bg-card/60 p-8 shadow-elegant backdrop-blur-xl md:p-12"
            >
              {sent ? (
                <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                  <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan mb-8">
                    <Send className="h-10 w-10" />
                  </div>
                  <h3 className="font-display text-3xl font-bold">Booking Sent!</h3>
                  <p className="mt-4 text-muted-foreground">Thank you for your interest. We'll be in touch within 24 hours to confirm your consultation.</p>
                  <button 
                    onClick={() => setSent(false)}
                    className="mt-10 text-sm font-bold uppercase tracking-widest text-brand-cyan hover:underline"
                  >
                    Make another booking
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <InputField icon={User} label="Full Name" name="full_name" placeholder="e.g. John Doe" />
                    <InputField icon={Building2} label="Company / Brand" name="company" placeholder="Organization Name" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <InputField icon={Mail} label="Email Address" name="email" type="email" placeholder="john@example.com" />
                    <InputField icon={Phone} label="Phone Number" name="phone" type="tel" placeholder="+233 xx xxx xxxx" />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <SelectField label="Service of Interest" name="service" options={[
                      "Website Development",
                      "Meta Configuration",
                      "Video Advertisements",
                      "Graphic Design",
                      "Brand Identity",
                      "Website Maintenance"
                    ]} />
                    <InputField icon={Calendar} label="Preferred Date" name="preferred_date" type="date" />
                  </div>
                  <SelectField label="Preferred Meeting Method" name="meeting_method" options={["Google Meet", "Phone Call", "WhatsApp Audio/Video", "In-person"]} />
                  
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-muted-foreground uppercase tracking-widest">Project Description</label>
                    <textarea 
                      name="description"
                      rows={4} 
                      required 
                      placeholder="Briefly describe your project goals..."
                      className="w-full rounded-2xl border border-border/40 bg-background/50 px-5 py-4 text-sm focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan/20 transition-all placeholder:text-muted-foreground/30 resize-none" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="group relative w-full overflow-hidden rounded-full bg-gradient-brand px-8 py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {submitting ? "Submitting..." : "Confirm Consultation Booking"}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function InputField({ label, name, placeholder, type = "text", icon: Icon }: { label: string; name: string; placeholder?: string; type?: string; icon: any }) {
  return (
    <div className="group/field">
      <label className="mb-2 block text-sm font-semibold text-muted-foreground uppercase tracking-widest transition-colors group-focus-within/field:text-brand-cyan">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within/field:text-brand-cyan" />
        <input 
          name={name}
          type={type} 
          required 
          placeholder={placeholder}
          className="w-full rounded-2xl border border-border/40 bg-background/50 pl-12 pr-5 py-4 text-sm focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan/20 transition-all placeholder:text-muted-foreground/30" 
        />
      </div>
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div className="group/field">
      <label className="mb-2 block text-sm font-semibold text-muted-foreground uppercase tracking-widest transition-colors group-focus-within/field:text-brand-cyan">{label}</label>
      <select 
        name={name}
        required
        className="w-full rounded-2xl border border-border/40 bg-background/50 px-5 py-4 text-sm focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan/20 transition-all appearance-none cursor-pointer"
      >
        <option value="" disabled selected>Select an option</option>
        {options.map(opt => <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>)}
      </select>
    </div>
  );
}
