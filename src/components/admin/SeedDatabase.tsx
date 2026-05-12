import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type ContentKey } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Database, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function SeedDatabase() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const queryClient = useQueryClient();

  const handleSeed = async () => {
    if (!confirm("This will overwrite any existing content in Supabase with local defaults. Continue?")) {
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const entries = Object.entries(defaultContent).map(([key, value]) => ({
        key,
        value,
      }));

      const { error } = await supabase
        .from("site_content")
        .upsert(entries);

      if (error) throw error;

      setStatus("success");
      toast.success("Database seeded successfully!");
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    } catch (err: any) {
      console.error("Seeding error:", err);
      setStatus("error");
      toast.error(err.message || "Failed to seed database");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur-xl hover:border-brand-cyan/30 transition-colors duration-500 group animate-in fade-in slide-in-from-bottom-4 delay-200 fill-mode-both">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-display text-xl font-bold group-hover:text-brand-cyan transition-colors">Initialize Database</h3>
          <p className="text-sm text-muted-foreground">
            Populate your Supabase instance with the default site content.
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-cyan shadow-inner transition-transform group-hover:rotate-12">
          <Database className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-8">
        <Button
          onClick={handleSeed}
          disabled={loading}
          className="w-full rounded-full bg-gradient-brand shadow-glow font-bold h-11 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {loading ? "Seeding..." : "Seed with Default Content"}
        </Button>
      </div>

      {status === "success" && (
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-500 animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Sync Complete</span>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-red animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Sync Failed</span>
        </div>
      )}
    </div>
  );
}
