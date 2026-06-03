import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Clock, Building2, Share2, Facebook, Instagram, Linkedin, MessageCircle, Music2 } from "lucide-react";
import { useSection } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact Us — IGNYTE" }] }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const c = useSection("contact");
  const b = useSection("brand");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const { error } = await supabase.from("contacts").insert({
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
      return;
    }
    setSent(true);
    toast.success("Message sent successfully!");
  };

  return (
    <section className="relative overflow-hidden min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,0,255,0.03)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Header Section */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-magenta">{c.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl font-black md:text-6xl lg:text-7xl">
            {c.title} <span className="text-gradient-brand">{c.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {c.body}
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column: Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="flex items-center gap-3 font-display text-2xl font-bold mb-8">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
                  <Building2 className="h-5 w-5" />
                </div>
                Office Information
              </h2>
              <div className="rounded-3xl border border-border/40 bg-card/90 p-8">
                <p className="text-xl font-bold mb-6 text-foreground">{b.name} {b.tagline}</p>
                <div className="space-y-6">
                  <ContactItem 
                    icon={Phone} 
                    label="Phone Number" 
                    value={b.phone} 
                  />
                  <ContactItem 
                    icon={Mail} 
                    label="Email Address" 
                    value={b.email} 
                    link={`mailto:${b.email}`}
                  />
                  <ContactItem 
                    icon={MapPin} 
                    label="Business Address" 
                    value={b.address} 
                  />
                  <ContactItem 
                    icon={Clock} 
                    label="Working Hours" 
                    value={c.workingHours} 
                  />
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div>
              <h2 className="flex items-center gap-3 font-display text-2xl font-bold mb-8">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-magenta/10 text-brand-magenta">
                  <Share2 className="h-5 w-5" />
                </div>
                Connect With Us
              </h2>
              <div className="rounded-3xl border border-border/40 bg-card/90 p-8">
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {c.socialIntro}
                </p>
                <div className="flex flex-wrap gap-4">
                  <SocialLink icon={Facebook} href="https://www.facebook.com/ignytestore" color="hover:bg-[#1877F2]" />
                  <SocialLink icon={Instagram} href="https://www.instagram.com/ign.yte/" color="hover:bg-[#E4405F]" />
                  <SocialLink icon={Linkedin} href="https://www.linkedin.com/company/ignyte-merch" color="hover:bg-[#0A66C2]" />
                  <SocialLink icon={MessageCircle} href="https://wa.me/233593023564" color="hover:bg-[#25D366]" />
                  <SocialLink icon={Music2} href="https://www.tiktok.com/@ign.yte" color="hover:bg-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
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
                  <h3 className="font-display text-3xl font-bold">Message Sent!</h3>
                  <p className="mt-4 text-muted-foreground">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button 
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-10 text-sm font-bold uppercase tracking-widest text-brand-cyan hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                      <Input 
                        id="full_name"
                        name="full_name"
                        type="text"
                        required 
                        placeholder="e.g. John Doe"
                        className="h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        required 
                        placeholder="john@example.com"
                        className="h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium text-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        required 
                        placeholder="+233 xx xxx xxxx"
                        className="h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Subject</Label>
                      <Input 
                        id="subject"
                        name="subject"
                        type="text"
                        required 
                        placeholder="How can we help?"
                        className="h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium text-foreground"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      rows={5} 
                      required 
                      placeholder="Tell us about your project or enquiry..."
                      className="w-full rounded-2xl border border-border/40 bg-background/40 px-5 py-4 text-sm focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan/20 transition-all placeholder:text-muted-foreground/30 resize-none min-h-[150px] text-foreground" 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full h-14 rounded-full bg-gradient-brand text-primary-foreground font-black text-sm uppercase tracking-widest shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    {submitting ? "Sending..." : "Send Message"}
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

function ContactItem({ icon: Icon, label, value, link }: { icon: any; label: string; value: string; link?: string }) {
  const content = (
    <div className="flex gap-4 group">
      <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-brand-cyan transition-colors group-hover:bg-brand-cyan group-hover:text-white group-hover:border-brand-cyan">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
        <p className="font-semibold text-foreground leading-tight">{value}</p>
      </div>
    </div>
  );

  if (link) {
    return <a href={link} className="block transition-transform hover:translate-x-1">{content}</a>;
  }
  return content;
}

function SocialLink({ icon: Icon, href, color }: { icon: any; href: string; color: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`h-12 w-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white transition-all duration-300 hover:scale-110 hover:shadow-lg ${color} hover:border-transparent`}
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
