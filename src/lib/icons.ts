import { 
  Globe, 
  Settings2, 
  Video, 
  Palette, 
  Sparkles, 
  Wrench, 
  Zap, 
  BarChart3, 
  MessageSquare, 
  Target, 
  Rocket, 
  Search, 
  ShieldCheck, 
  Users, 
  Award,
  Heart,
  Headset,
  ClipboardList,
  Layers,
  MessageCircle
} from "lucide-react";

export const iconMap: Record<string, any> = {
  Globe,
  Settings2,
  Video,
  Palette,
  Sparkles,
  Wrench,
  Zap,
  BarChart3,
  MessageSquare,
  Target,
  Rocket,
  Search,
  ShieldCheck,
  Users,
  Award,
  Heart,
  Headset,
  ClipboardList,
  Layers,
  MessageCircle
};

export type IconName = keyof typeof iconMap;
