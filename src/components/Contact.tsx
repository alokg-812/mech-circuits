import { useState, FormEvent } from "react";
import { Send, Mail, MapPin, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().nonempty({ message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Valid email required" }).max(255),
  interest: z.string().trim().nonempty({ message: "Select a topic" }).max(120),
  message: z.string().trim().nonempty({ message: "Message is required" }).max(1000),
});

const Field = ({
  label,
  children,
  error,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="mb-1.5 block font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
      {label}
    </span>
    {children}
    {error && <span className="mt-1 block font-mono text-[10px] text-destructive">{error}</span>}
  </label>
);

const inputCls =
  "w-full rounded-md border border-border bg-muted/30 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:bg-muted/50 focus:shadow-glow-soft focus:ring-0";
const socials = [
  { icon: Github, label: "GitHub", link: "https://github.com/theprincethakur09/" },
  { icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/the-prince-thakur-/" },
];
const Contact = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      interest: String(fd.get("interest") || ""),
      message: String(fd.get("message") || ""),
    };
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    // Placeholder: ready for EmailJS integration
    setTimeout(() => {
      setLoading(false);
      toast.success("Transmission received", {
        description: "I'll get back to you shortly. (Connect EmailJS to enable live sending.)",
      });
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container grid gap-12 lg:grid-cols-5">
        {/* Left info */}
        <div className="space-y-8 lg:col-span-2">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.3em] text-primary">// 03 — TRANSMISSION</p>
            <h2 className="mb-5 font-display text-4xl font-bold md:text-5xl">
              Open a <span className="neon-text">channel</span>.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Have a project, prototype, or product inquiry? Whether it's a custom PCB,
              a UAV build, or a new R&amp;D collaboration — let's talk.
            </p>
          </div>

          <ul className="space-y-4 font-mono text-sm">
            <li className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" /> princethakur6519@gmail.com
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Delhi NCR | India | Available remote
            </li>
          </ul>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="glass flex h-11 w-11 items-center justify-center rounded-md text-primary transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow-soft"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="glass-strong corner-brackets relative space-y-5 rounded-xl p-7 lg:col-span-3"
        >
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="OPERATOR NAME" error={errors.name}>
              <input name="name" className={inputCls} placeholder="Prince Thakur" maxLength={100} />
            </Field>
            <Field label="EMAIL CHANNEL" error={errors.email}>
              <input name="email" type="email" className={inputCls} placeholder="prince@mechcircuits.com" maxLength={255} />
            </Field>
          </div>

          <Field label="PROJECT / PRODUCT INTEREST" error={errors.interest}>
            <select name="interest" className={inputCls + " appearance-none cursor-pointer"} defaultValue="">
              <option value="" disabled>— Select module —</option>
              <option>UAV / Drone Build</option>
              <option>Custom PCB Design</option>
              <option>Embedded Firmware</option>
              <option>R&D Collaboration</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="TRANSMISSION" error={errors.message}>
            <textarea
              name="message"
              rows={5}
              maxLength={1000}
              placeholder="Describe your project, requirements, timeline..."
              className={inputCls + " resize-none"}
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-md bg-primary px-7 py-4 font-mono text-sm font-bold tracking-widest text-primary-foreground shadow-glow transition-all hover:shadow-elegant disabled:opacity-60"
          >
            {loading ? "TRANSMITTING..." : "SEND TRANSMISSION"}
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
