import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, LayoutDashboard, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/ignyte-logo.png";
import { useAuth } from "@/hooks/use-auth";
import { useSection } from "@/lib/content";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center group">
          <img src={logo} alt="IGNYTE" className="h-[72px] w-[72px] object-contain transition-transform group-hover:scale-110" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: (l.to as string) === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://ignytestore.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border/60 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur transition-all hover:bg-white/10 hover:border-brand-cyan/40"
          >
            Merch
          </a>
          <Link
            to="/booking"
            className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Free Consultation
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/40 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: (l.to as string) === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const brand = useSection("brand");
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt={brand.name} className="h-10 w-10 object-contain" />
            <span className="font-display text-xl font-bold">{brand.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            {brand.footerBlurb}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-foreground transition-colors">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-foreground transition-colors">Portfolio</Link></li>
            <li><Link to="/booking" className="hover:text-foreground transition-colors">Book Consultation</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services/$serviceId" params={{ serviceId: "website-development" }} className="hover:text-foreground transition-colors">Website Development</Link></li>
            <li><Link to="/services/$serviceId" params={{ serviceId: "meta-configuration" }} className="hover:text-foreground transition-colors">Meta Configuration</Link></li>
            <li><Link to="/services/$serviceId" params={{ serviceId: "video-advertisements" }} className="hover:text-foreground transition-colors">Video Advertisements</Link></li>
            <li><Link to="/services/$serviceId" params={{ serviceId: "flyer-graphic-design" }} className="hover:text-foreground transition-colors">Graphic Design</Link></li>
            <li><Link to="/services/$serviceId" params={{ serviceId: "logo-branding" }} className="hover:text-foreground transition-colors">Logo Creation</Link></li>
            <li><Link to="/services/$serviceId" params={{ serviceId: "website-maintenance" }} className="hover:text-foreground transition-colors">Website Maintenance</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-cyan" />
              <span>{brand.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-brand-cyan" />
              <span>{brand.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-brand-cyan" />
              <a href={`mailto:${brand.email}`} className="hover:text-foreground transition-colors">{brand.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs text-muted-foreground">
          {brand.copyright.replace(/\d{4}/, new Date().getFullYear().toString())}
        </p>
      </div>
    </footer>
  );
}
