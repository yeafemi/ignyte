import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useSiteContent, defaultContent, type ContentKey } from "@/lib/content";
import { toast } from "sonner";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsCards } from "@/components/admin/StatsCards";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { BookingList } from "@/components/admin/BookingList";
import { ContactList } from "@/components/admin/ContactList";
import { SeedDatabase } from "@/components/admin/SeedDatabase";
import { 
  ExternalLink, 
  Plus, 
  Download, 
  UserPlus, 
  History,
  CheckCircle2,
  Clock,
  Lock,
  Globe,
  FileEdit,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Dashboard — IGNYTE Admin" }] }),
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const nav = useNavigate();
  const { data, isLoading, error: contentError } = useSiteContent();
  const qc = useQueryClient();
  const [view, setView] = useState("overview");
  const [activeKey, setActiveKey] = useState<ContentKey>("brand");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [user, loading, nav]);

  if (loading || isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-muted-foreground animate-pulse">
        <Globe className="h-12 w-12 mb-4 text-brand-cyan animate-spin-slow" />
        <p className="font-display text-lg font-bold tracking-tight">Initializing Dashboard…</p>
      </div>
    );
  }

  if (contentError) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-6 text-center">
        <h1 className="font-display text-3xl font-bold text-brand-red">Configuration Error</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          There was an error loading the site content from Supabase. Please check your database connection and environment variables.
        </p>
        <code className="mt-4 p-4 rounded-xl bg-card border border-border text-xs text-brand-red">
          {contentError instanceof Error ? contentError.message : "Unknown error"}
        </code>
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-6">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card p-12 text-center shadow-elegant animate-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red mb-6">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl font-bold">Access Denied</h1>
          <p className="mt-4 text-muted-foreground">
            Account: <span className="text-foreground font-medium">{user.email}</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            You do not have administrative privileges for this portal.
          </p>
          <div className="mt-10 flex flex-col gap-3">
            <Button
              onClick={() => supabase.auth.signOut().then(() => nav({ to: "/login" }))}
              className="rounded-full bg-gradient-brand shadow-glow"
            >
              Switch Account
            </Button>
            <Link to="/">
              <Button variant="ghost" className="w-full rounded-full">
                Back to Website
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = async (updatedData: any) => {
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .upsert({ 
        key: activeKey, 
        value: updatedData, 
        updated_by: user!.id 
      });
    setSaving(false);
    
    if (error) {
      toast.error(error.message);
      return;
    }
    
    toast.success(`${activeKey.charAt(0).toUpperCase() + activeKey.slice(1)} updated successfully`);
    qc.invalidateQueries({ queryKey: ["site_content"] });
  };

  const handleReset = async (key: ContentKey) => {
    if (!confirm(`Are you sure you want to reset ${key} to defaults? This will erase your current content in Supabase for this section.`)) return;
    handleSave(defaultContent[key]);
  };

  const handleNavSelect = (id: string) => {
    if (id === "overview" || id === "bookings" || id === "leads") {
      setView(id);
    } else {
      setView("editor");
      setActiveKey(id as ContentKey);
    }
  };

  const renderContent = () => {
    if (view === "overview") {
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
              <h1 className="font-display text-4xl font-extrabold tracking-tight bg-gradient-brand bg-clip-text text-transparent">Dashboard Overview</h1>
              <p className="text-muted-foreground mt-1">Welcome back to the IGNYTE control center, {user.email?.split('@')[0]}.</p>
            </div>
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm" className="rounded-full gap-2 border-border/60 hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
                <ExternalLink className="h-4 w-4 text-brand-cyan" /> Visit Website
              </Button>
            </Link>
          </div>

          <StatsCards />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur-xl hover:border-brand-magenta/30 transition-colors duration-500 group">
              <h3 className="font-display text-xl font-bold group-hover:text-brand-magenta transition-colors">Content Status</h3>
              <p className="text-sm text-muted-foreground mt-1">Real-time health of your digital presence.</p>
              
              <div className="mt-8 space-y-6">
                <div className="space-y-2 group/item">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold tracking-tight text-muted-foreground group-hover/item:text-foreground transition-colors">Home Page</span>
                    <span className="text-brand-cyan font-mono font-bold">100%</span>
                  </div>
                  <Progress value={100} className="h-2.5 bg-background/50 [&>div]:bg-gradient-cool" />
                </div>
                <div className="space-y-2 group/item">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold tracking-tight text-muted-foreground group-hover/item:text-foreground transition-colors">Services</span>
                    <span className="text-brand-magenta font-mono font-bold">100%</span>
                  </div>
                  <Progress value={100} className="h-2.5 bg-background/50 [&>div]:bg-gradient-brand" />
                </div>
                <div className="space-y-2 group/item">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold tracking-tight text-muted-foreground group-hover/item:text-foreground transition-colors">Portfolio</span>
                    <span className="text-brand-yellow font-mono font-bold">100%</span>
                  </div>
                  <Progress value={100} className="h-2.5 bg-background/50 [&>div]:bg-gradient-warm" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur-xl hover:border-brand-cyan/30 transition-colors duration-500 group">
              <h3 className="font-display text-xl font-bold group-hover:text-brand-cyan transition-colors">Quick Actions</h3>
              <p className="text-sm text-muted-foreground mt-1">Optimize your workflow with fast commands.</p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex-col gap-3 rounded-2xl bg-background/20 border-border/40 hover:border-brand-cyan hover:bg-brand-cyan/5 transition-all duration-300 hover:scale-[1.03] active:scale-95" onClick={() => handleNavSelect('home')}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan">
                    <FileEdit className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tracking-tight">Edit Home</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-3 rounded-2xl bg-background/20 border-border/40 hover:border-brand-yellow hover:bg-brand-yellow/5 transition-all duration-300 hover:scale-[1.03] active:scale-95">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-yellow/10 text-brand-yellow">
                    <Download className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tracking-tight">Export Data</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-3 rounded-2xl bg-background/20 border-border/40 hover:border-brand-magenta hover:bg-brand-magenta/5 transition-all duration-300 hover:scale-[1.03] active:scale-95" onClick={() => handleNavSelect('brand')}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-magenta/10 text-brand-magenta">
                    <Globe className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tracking-tight">Site Settings</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-3 rounded-2xl bg-background/20 border-border/40 hover:border-brand-red hover:bg-brand-red/5 transition-all duration-300 hover:scale-[1.03] active:scale-95">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                    <History className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tracking-tight">Audit Logs</span>
                </Button>
              </div>
            </div>

            <SeedDatabase />
          </div>
        </div>
      );
    }

    if (view === "bookings") {
      return <BookingList />;
    }

    if (view === "leads") {
      return <ContactList />;
    }

    if (view === "editor") {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="rounded-3xl border border-border/40 bg-card/30 p-8 backdrop-blur-xl shadow-elegant">
            {activeKey === "portfolio" ? (
              <PortfolioManager 
                items={data?.portfolio?.items ?? []} 
                onSave={(newItems) => handleSave({ ...data?.portfolio, items: newItems })}
              />
            ) : (
              <SectionEditor 
                sectionKey={activeKey}
                data={data?.[activeKey] ?? defaultContent[activeKey]}
                onSave={handleSave}
                onReset={() => handleReset(activeKey)}
                isSaving={saving}
              />
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background selection:bg-brand-cyan/30">
        <AdminSidebar 
          activeId={view === "editor" ? activeKey : view} 
          onSelect={handleNavSelect} 
        />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center border-b border-border/40 bg-background/70 px-8 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="uppercase tracking-widest">Dashboard</span>
              <span className="text-border">/</span>
              <span className="uppercase tracking-widest text-foreground">
                {view === "overview" ? "Overview" : view === "bookings" ? "Bookings" : view === "leads" ? "Inquiries" : activeKey}
              </span>
            </div>
          </header>
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="mx-auto max-w-5xl">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
