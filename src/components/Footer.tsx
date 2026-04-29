import { Mail, Instagram, MessageCircle, YoutubeIcon } from "lucide-react";

const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/9174080 96838",
    icon: MessageCircle,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mechcircuits",
    icon: Instagram,
  },
  {
    label: "Email",
    href: "mailto:princethakur6519@gmail.com",
    icon: Mail,
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/@mechcircuits",
    icon: YoutubeIcon,
  },
];

const Footer = () => (
  <footer className="border-t border-border/60 py-10">
    <div className="container flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            data-cursor="hover"
            className="group relative grid h-11 w-11 place-items-center rounded-full border border-primary/30 bg-card/40 text-primary backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_24px_hsl(var(--primary)/0.55)]"
          >
            <s.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
          </a>
        ))}
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-3 font-mono text-xs tracking-widest text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} PRINCE THAKUR · ALL SYSTEMS NOMINAL</p>
        <p className="text-primary/70">[ DESIGNED · ENGINEERED · DEPLOYED ]</p>
      </div>
    </div>
  </footer>
);

export default Footer;
