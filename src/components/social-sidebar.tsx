import { Facebook, Linkedin, Instagram, MessageCircle, Music2 } from "lucide-react";
import tiktokLogo from "../../public/tiktok-logo.png";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/ignyte-merch",
    icon: Linkedin,
    color: "bg-[#0077b5]",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/ignytestore",
    icon: Facebook,
    color: "bg-[#1877f2]",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/ign.yte/",
    icon: Instagram,
    color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/233593023564",
    icon: MessageCircle,
    color: "bg-[#25D366]",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@ign.yte",
    icon: Music2,
    image: tiktokLogo,
    color: "bg-black",
  },
];

export function SocialSidebar() {
  return (
    <div className="fixed right-6 top-1/2 z-[100] -translate-y-1/2 flex flex-col gap-3">
      {socialLinks.map((s, i) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-all duration-500 ease-out hover:-translate-x-2 hover:scale-110 ${s.color} hover:shadow-glow hover:brightness-110 animate-float`}
          style={{ animationDelay: `${i * 0.2}s` }}
          title={s.name}
        >
          {s.image ? (
            <img src={s.image} alt={s.name} className="h-[26px] w-[26px] object-contain transition-transform duration-500 group-hover:rotate-[360deg]" />
          ) : (
            <s.icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[360deg]" />
          )}
        </a>
      ))}
    </div>
  );
}
