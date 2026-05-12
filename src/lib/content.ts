import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
    footerBlurb: string;
    copyright: string;
    address: string;
    phone: string;
    email: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroTitleAccent: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    whoEyebrow: string;
    whoTitle: string;
    whoBody1: string;
    whoBody2: string;
    servicesEyebrow: string;
    servicesTitle: string;
    advantageEyebrow: string;
    advantageTitle: string;
    advantageTitleAccent: string;
    advantageSubtitle: string;
    advantages: { title: string; desc: string; icon: string }[];
    processEyebrow: string;
    processTitle: string;
    processTitleAccent: string;
    processes: { step: string; title: string; desc: string; icon: string }[];
    testimonialsEyebrow: string;
    testimonialsTitle: string;
    testimonialsTitleAccent: string;
    testimonials: { quote: string; author: string; company: string }[];
    ctaTitle: string;
    ctaBody: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    missionTitle: string;
    missionBody: string;
    visionTitle: string;
    visionBody: string;
    values: { title: string; desc: string; icon: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { id: string; title: string; subtitle: string; desc: string; icon: string; features: string[] }[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    subtitle: string;
    categories: string[];
    items: { tag: string; title: string; description: string; image: string }[];
  };
  booking: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    consultationNote: string;
    benefits: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    workingHours: string;
    socialIntro: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    items: { q: string; a: string }[];
  };
};

export type ContentKey = keyof SiteContent;

export const defaultContent: SiteContent = {
  brand: {
    name: "IGNYTE",
    tagline: "Consultancy & Advertising Agency",
    footerBlurb: "IGNYTE Consultancy & Advertising Agency provides professional digital, branding, and advertising solutions designed to help businesses grow and thrive.",
    copyright: "© 2026 IGNYTE Consultancy & Advertising Agency. All Rights Reserved.",
    address: "No.11 Silver lane, North Legon Valley.",
    phone: "+233 20 069 2763 / +233 59 302 3564",
    email: "info@ignytestore.com",
  },
  home: {
    heroEyebrow: "Consultancy & Advertising Agency",
    heroTitle: "Igniting Brands.",
    heroTitleAccent: "Driving Growth.",
    heroSubtitle: "We build powerful digital identities through strategic branding, web development, and creative advertising.",
    ctaPrimary: "Free Consultation",
    ctaSecondary: "Contact Us",
    whoEyebrow: "Who We Are",
    whoTitle: "Creativity, technology and strategy — under one roof.",
    whoBody1: "IGNYTE is a creative consultancy and advertising agency dedicated to igniting the potential of brands. We combine strategic thinking with cutting-edge digital solutions to help businesses connect with their audience and drive sustainable growth.",
    whoBody2: "At IGNYTE, we don't just build brands; we spark movements. Whether you're a startup looking to make a mark or an established enterprise ready for a digital transformation, we provide the tools and expertise to ignite your next chapter of growth.",
    servicesEyebrow: "Our Services",
    servicesTitle: "Everything you need to ignite your brand.",
    advantageEyebrow: "The IGNYTE Advantage",
    advantageTitle: "Why We Are",
    advantageTitleAccent: "Different.",
    advantageSubtitle: "We don't just build brands; we ignite them. Our approach blends technical precision with raw creative power.",
    advantages: [
      { title: "Creative Excellence", desc: "Strategic artistry that captures attention and drives conversion.", icon: "Sparkles" },
      { title: "Client Focused", desc: "Your vision is our blueprint. We build for your specific goals.", icon: "Heart" },
      { title: "Expert Support", desc: "Unwavering commitment to your success, long after launch.", icon: "Headset" },
      { title: "Modern Tech", desc: "Leveraging the latest stack to keep you ahead of the curve.", icon: "Zap" },
      { title: "Scalable Growth", desc: "Solutions that grow with you, from startup to enterprise.", icon: "BarChart3" },
    ],
    processEyebrow: "Success Blueprint",
    processTitle: "Our",
    processTitleAccent: "Process",
    processes: [
      { step: "01", title: "Consultation", desc: "We begin by understanding your business, goals, audience, and project requirements.", icon: "MessageSquare" },
      { step: "02", title: "Planning", desc: "We develop a customized strategy and creative direction tailored to your brand.", icon: "ClipboardList" },
      { step: "03", title: "Design & Dev", desc: "Our team designs and develops high-quality solutions with attention to detail.", icon: "Layers" },
      { step: "04", title: "Launch & Support", desc: "We launch successfully and continue providing support to ensure smooth performance.", icon: "Rocket" },
    ],
    testimonialsEyebrow: "Testimonials",
    testimonialsTitle: "What Our",
    testimonialsTitleAccent: "Clients Say",
    testimonials: [
      { quote: "IGNYTE transformed our online presence completely. Their professionalism and creativity exceeded our expectations.", author: "Creative Director", company: "TechPulse Global" },
      { quote: "The website they developed for our business helped us attract more customers and improved our brand image significantly.", author: "Managing Partner", company: "Sterling Group" },
      { quote: "Excellent service delivery, timely communication, and outstanding support throughout the entire project.", author: "Head of Operations", company: "NexGen Media" },
      { quote: "Working with IGNYTE was one of the best decisions for our business. Their branding and website solutions gave our company a more professional image and increased customer engagement.", author: "CEO & Founder", company: "Aura Wellness" },
      { quote: "From logo design to digital marketing support, the IGNYTE team delivered beyond expectations. Their creativity, responsiveness, and professionalism were exceptional throughout the project.", author: "Marketing Director", company: "Vanguard Logistics" },
    ],
    ctaTitle: "Ready to Grow Your Brand?",
    ctaBody: "Partner with IGNYTE Consultancy & Advertising Agency for professional digital and advertising solutions that help your business stand out.",
    ctaPrimaryLabel: "Free Consultation",
    ctaSecondaryLabel: "Contact Us",
  },
  about: {
    eyebrow: "About Us",
    title: "We help brands tell their story through design and strategy.",
    intro: "IGNYTE is a full-service creative agency specializing in branding, digital experiences, and strategic advertising.",
    missionTitle: "Our Mission",
    missionBody: "Our mission is to empower businesses with innovative branding and digital strategies that spark engagement and deliver measurable results in an ever-evolving marketplace.",
    visionTitle: "Our Vision",
    visionBody: "To be the leading catalyst for brand transformation, known for our creativity, integrity, and the lasting impact we create for our clients globally.",
    values: [
      { title: "Creativity", desc: "We believe in developing fresh and innovative ideas that help brands stand out.", icon: "Palette" },
      { title: "Excellence", desc: "We are committed to delivering quality services and exceeding client expectations.", icon: "Award" },
      { title: "Integrity", desc: "We build relationships based on honesty, transparency, and professionalism.", icon: "ShieldCheck" },
      { title: "Innovation", desc: "We embrace modern technologies and creative strategies to provide effective solutions.", icon: "Lightbulb" },
      { title: "Customer Commitment", desc: "Our clients remain at the center of everything we do.", icon: "Users" },
    ],
  },
  services: {
    eyebrow: "Our Services",
    title: "Comprehensive Solutions for Your Brand",
    subtitle: "We provide professional digital, branding, and advertising solutions designed to help businesses grow and thrive.",
    items: [
      { 
        id: "website-development", 
        title: "Website Development", 
        subtitle: "High-Performance Digital Experiences",
        desc: "We create responsive, modern, and functional websites tailored to your business goals.", 
        icon: "Globe",
        features: ["Custom UI/UX Design", "Responsive Layouts", "SEO Optimization", "Performance Tuning", "CMS Integration"]
      },
      { 
        id: "meta-configuration", 
        title: "Meta Business Configuration", 
        subtitle: "Master Your Social Advertising",
        desc: "We help businesses professionally configure and optimize Meta platforms for effective digital marketing.", 
        icon: "Settings2",
        features: ["Facebook Business Page Setup", "Instagram Business Setup", "Meta Business Suite Configuration", "Ad Account Setup", "Meta Pixel Integration", "Business Verification Assistance", "Advertising Campaign Setup"]
      },
      { 
        id: "video-advertisements", 
        title: "Video Ad Production", 
        subtitle: "Stories That Convert",
        desc: "Capture attention and promote your business with high-quality video advertisements for social media.", 
        icon: "Video",
        features: ["Script Writing", "Motion Graphics", "Color Grading", "Sound Design", "Social-Ready Exports"]
      },
      { 
        id: "flyer-graphic-design", 
        title: "Graphic Design Services", 
        subtitle: "Visual Excellence",
        desc: "We design visually compelling graphics that communicate your message clearly and professionally.", 
        icon: "Palette",
        features: ["Print Ready Flyers", "Social Media Kits", "Billboard Design", "Stationery Design", "Illustration"]
      },
      { 
        id: "logo-branding", 
        title: "Brand Identity Design", 
        subtitle: "Memorable Brand Stories",
        desc: "We create memorable logos and branding materials that reflect your business values and vision.", 
        icon: "Sparkles",
        features: ["Logo Variations", "Typography Systems", "Color Palettes", "Brand Style Guides", "Brand Voice"]
      },
      { 
        id: "website-maintenance", 
        title: "Website Maintenance & Support", 
        subtitle: "Worry-Free Performance",
        desc: "We provide ongoing support to keep your website secure, updated, and performing at its best.", 
        icon: "Wrench",
        features: ["Security Monitoring", "Daily Backups", "Content Updates", "Bug Fixing", "Hosting Support"]
      },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "Our",
    subtitle: "Explore some of the creative and digital projects we have delivered for businesses, organizations, ministries, and brands.",
    categories: ["All", "Website Projects", "Branding Projects", "Video Advertisement Projects", "Flyer & Graphic Design Projects", "Social Media Branding Projects"],
    items: [],
  },
  booking: {
    eyebrow: "Let's Work Together",
    title: "Book a",
    titleAccent: "Consultation",
    body: "Ready to start your project? Fill out the form below and our team will get in touch with you to discuss your business needs and how we can help.",
    consultationNote: "Our consultations are designed to help us understand your goals and provide the best solutions tailored to your business.",
    benefits: [
      "A tailored strategy for your brand",
      "Professional advice from our team",
      "Response within one business day",
      "No obligation, completely free",
    ],
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Contact",
    titleAccent: "Us",
    body: "We would love to hear from you. Whether you need a website, branding services, advertising solutions, or digital consultancy, our team is ready to assist you.",
    workingHours: "Mon - Fri: 9:00 AM - 6:00 PM",
    socialIntro: "Follow us on our social media platforms to stay updated with our latest projects, services, and creative work.",
  },
  faq: {
    eyebrow: "Support",
    title: "Frequently Asked",
    titleAccent: "Questions",
    items: [
      { q: "How long does it take to develop a website?", a: "Project timelines vary depending on the complexity and features required. Most standard business websites are completed within a few weeks." },
      { q: "Do you provide website maintenance after launch?", a: "Yes. We offer continuous website maintenance and support services to ensure your website remains updated and secure." },
      { q: "Can you redesign an existing website?", a: "Absolutely. We can redesign and modernize existing websites to improve appearance, functionality, and user experience." },
      { q: "Do you provide social media branding services?", a: "Yes. We provide social media branding, content design, and Meta business configuration services." },
      { q: "Can I request custom services?", a: "Yes. We provide customized solutions tailored to your business needs." },
    ],
  },
};

export function useSiteContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async (): Promise<SiteContent> => {
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value");
      if (error) throw error;
      const merged: SiteContent = JSON.parse(JSON.stringify(defaultContent));
      for (const row of data ?? []) {
        const k = row.key as ContentKey;
        if (k in merged) {
          (merged as Record<string, unknown>)[k] = {
            ...(merged[k] as object),
            ...(row.value as object),
          };
        }
      }
      return merged;
    },
    staleTime: 30_000,
  });
}

export function useSection<K extends ContentKey>(key: K): SiteContent[K] {
  const { data } = useSiteContent();
  return (data?.[key] ?? defaultContent[key]) as SiteContent[K];
}
