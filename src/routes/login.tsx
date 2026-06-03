import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import logo from "@/assets/ignyte-logo.png";
import { Globe, Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign in — IGNYTE Admin" }] }),
});

function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const { user, loading } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!loading && user) nav({ to: "/admin" });
  }, [user, loading, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. You can now sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav({ to: "/admin" });
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-brand-cyan/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-magenta/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-1000">
        <div className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-700 delay-300 fill-mode-both">
          <Link to="/" className="inline-flex items-center gap-3 group transition-all hover:scale-105">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow group-hover:rotate-6 transition-transform">
              <Globe className="h-8 w-8" />
            </div>
            <div className="text-left">
              <span className="block font-display text-2xl font-black tracking-tighter leading-none">IGNYTE</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Admin Portal</span>
            </div>
          </Link>
        </div>

        <div className="rounded-[40px] border border-border/40 bg-card/90 p-10 shadow-elegant relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative mb-10">
            <h1 className="font-display text-4xl font-extrabold tracking-tight">
              {mode === "signin" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="mt-2 text-muted-foreground text-sm font-medium">
              {mode === "signin"
                ? "Enter your details to access your dashboard."
                : "Join the IGNYTE administration team."}
            </p>
          </div>

          <form onSubmit={submit} className="relative space-y-6">
            <div className="space-y-2 group/field">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 group-focus-within/field:text-brand-cyan transition-colors">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within/field:text-brand-cyan transition-colors" />
                <Input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@ignyte.com"
                  className="pl-12 h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-cyan/50 focus:ring-brand-cyan/10 transition-all font-medium" 
                />
              </div>
            </div>
            
            <div className="space-y-2 group/field">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-focus-within/field:text-brand-magenta transition-colors">Password</label>
                {mode === "signin" && (
                  <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan hover:text-brand-magenta transition-colors">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within/field:text-brand-magenta transition-colors" />
                <Input 
                  type="password" 
                  required 
                  minLength={6} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-12 h-14 rounded-2xl bg-background/40 border-border/40 focus:border-brand-magenta/50 focus:ring-brand-magenta/10 transition-all font-medium" 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={busy}
              className="w-full h-14 rounded-2xl bg-gradient-brand text-primary-foreground font-black text-sm uppercase tracking-widest shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
            >
              {busy ? "Processing..." : mode === "signin" ? "Sign In Now" : "Register Account"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative mt-10 pt-8 border-t border-border/40 text-center">
            <button 
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-all hover:scale-105 active:scale-95"
            >
              {mode === "signin" ? "New to the portal? " : "Already have an account? "}
              <span className="text-brand-cyan font-black border-b border-brand-cyan/30 pb-0.5 ml-1">{mode === "signin" ? "Create One" : "Sign In"}</span>
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 animate-pulse">
          Secure Cloud Access
        </p>
      </div>
    </div>
  );
}
