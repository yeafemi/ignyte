import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, CheckCircle2, MessageSquare, Send, Clock, User, Building2, Mail, Phone, Info } from "lucide-react";
import { useSection } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
    <section className="relative overflow-hidden min-h-screen bg-background text-foreground">
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
                    <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan transition-colors">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="font-semibold text-foreground leading-snug">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-border/40 bg-card/90 p-8">
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
              className="relative rounded-[3rem] border border-border/40 bg-card/90 p-8 shadow-elegant md:p-12 space-y-6"
            >
              {sent ? (
                <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                  <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan mb-8">
                    <Send className="h-10 w-10" />
                  </div>
                  <h3 className="font-display text-3xl font-bold">Booking Sent!</h3>
                  <p className="mt-4 text-muted-foreground">Thank you for your interest. We'll be in touch within 24 hours to confirm your consultation.</p>
                  <button 
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-10 text-sm font-bold uppercase tracking-widest text-brand-cyan hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Make another booking
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="full_name"
                          name="full_name"
                          type="text"
                          required 
                          placeholder="e.g. John Doe"
                          className="pl-12 h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium text-foreground"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company / Brand</Label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="company"
                          name="company"
                          type="text"
                          required 
                          placeholder="Organization Name"
                          className="pl-12 h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium text-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          required 
                          placeholder="john@example.com"
                          className="pl-12 h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium text-foreground"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phone"
                          name="phone"
                          type="tel"
                          required 
                          placeholder="+233 xx xxx xxxx"
                          className="pl-12 h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium text-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Service of Interest</Label>
                      <select 
                        id="service"
                        name="service"
                        required
                        defaultValue=""
                        className="flex h-14 w-full rounded-2xl border border-border/40 bg-background/40 px-5 py-4 text-sm font-medium text-foreground focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-background text-foreground">Select an option</option>
                        {[
                          "Website Development",
                          "Meta Configuration",
                          "Video Advertisements",
                          "Graphic Design",
                          "Brand Identity",
                          "Website Maintenance"
                        ].map(opt => <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred_date" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Preferred Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="preferred_date"
                          name="preferred_date"
                          type="date"
                          className="pl-12 h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium text-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meeting_method" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Preferred Meeting Method</Label>
                    <select 
                      id="meeting_method"
                      name="meeting_method"
                      required
                      defaultValue=""
                      className="flex h-14 w-full rounded-2xl border border-border/40 bg-background/40 px-5 py-4 text-sm font-medium text-foreground focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-background text-foreground">Select an option</option>
                      {["Google Meet", "Phone Call", "WhatsApp Audio/Video", "In-person"].map(opt => (
                        <option key={opt} value={opt} className="bg-background text-foreground">{opt}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Project Description</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      rows={4} 
                      required 
                      placeholder="Briefly describe your project goals..."
                      className="w-full rounded-2xl border border-border/40 bg-background/40 px-5 py-4 text-sm focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan/20 transition-all placeholder:text-muted-foreground/30 resize-none min-h-[120px] text-foreground" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full h-14 rounded-full bg-gradient-brand text-primary-foreground font-black text-sm uppercase tracking-widest shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {submitting ? "Submitting..." : "Confirm Consultation Booking"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
