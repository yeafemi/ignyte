import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users, Calendar, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function StatsCards() {
  const [stats, setStats] = useState([
    { label: "SERVICES", value: "...", icon: Briefcase, color: "text-brand-cyan" },
    { label: "PROJECTS", value: "...", icon: Briefcase, color: "text-brand-magenta" },
    { label: "BOOKINGS", value: "...", icon: Calendar, color: "text-brand-yellow" },
    { label: "INQUIRIES", value: "...", icon: MessageSquare, color: "text-brand-red" },
  ]);

  useEffect(() => {
    async function fetchStats() {
      const { data: content } = await supabase.from("site_content").select("key, value");
      const { count: bookingsCount } = await supabase.from("bookings").select("*", { count: 'exact', head: true });
      const { count: leadsCount } = await supabase.from("contacts").select("*", { count: 'exact', head: true });

      const services = content?.find(c => c.key === 'services')?.value as any;
      const portfolio = content?.find(c => c.key === 'portfolio')?.value as any;

      setStats([
        { label: "SERVICES", value: services?.items?.length || 0, icon: Briefcase, color: "text-brand-cyan" },
        { label: "PROJECTS", value: portfolio?.items?.length || 0, icon: Briefcase, color: "text-brand-magenta" },
        { label: "BOOKINGS", value: bookingsCount || 0, icon: Calendar, color: "text-brand-yellow" },
        { label: "INQUIRIES", value: leadsCount || 0, icon: MessageSquare, color: "text-brand-red" },
      ]);
    }
    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Card 
          key={stat.label} 
          className="group relative overflow-hidden border-border/40 bg-card/30 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-brand-cyan/40 hover:shadow-glow animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase transition-colors group-hover:text-brand-cyan">
                  {stat.label}
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-background/50 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${stat.color} group-hover:bg-gradient-brand group-hover:text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <div className="h-1 w-full rounded-full bg-background/50 overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-current opacity-60 transition-all duration-1000 ${stat.color.replace('text-', 'bg-')}`} 
                  style={{ width: '65%', transitionDelay: `${i * 150}ms` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
