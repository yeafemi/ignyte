import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileEdit,
  Image as ImageIcon,
  Building2,
  Briefcase,
  Users2,
  LogOut,
  Globe,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { title: "Overview", icon: LayoutDashboard, id: "overview" },
  { title: "Bookings", icon: Calendar, id: "bookings" },
  { title: "Inquiries", icon: MessageSquare, id: "leads" },
  { title: "Brand Settings", icon: Globe, id: "brand" },
  { title: "Home Page", icon: FileEdit, id: "home" },
  { title: "About Us", icon: Users2, id: "about" },
  { title: "Services", icon: Briefcase, id: "services" },
  { title: "Portfolio", icon: ImageIcon, id: "portfolio" },
  { title: "FAQ", icon: MessageSquare, id: "faq" },
  { title: "Contact", icon: Building2, id: "contact" },
];

export function AdminSidebar({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const navigate = useNavigate();

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Globe className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            IGNYTE Admin
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSelect(item.id)}
                    isActive={activeId === item.id}
                    tooltip={item.title}
                    className="h-11 px-4 rounded-xl transition-all duration-300 hover:bg-white/5 active:scale-95 group/btn"
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${activeId === item.id ? 'bg-gradient-brand shadow-glow text-white scale-110' : 'bg-background/40 group-hover/btn:bg-background/60 group-hover/btn:scale-105'}`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className={`ml-1 transition-all duration-300 ${activeId === item.id ? 'font-bold tracking-tight text-foreground' : 'font-medium text-muted-foreground'}`}>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/40">
        <button
          onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/login" }))}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
