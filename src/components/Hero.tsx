import heroImg from "@/assets/hero-engineer.jpg";
import CircuitBackground from "./CircuitBackground";
import { ArrowRight, Cpu } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-hero"
    >
      <CircuitBackground />

      {/* Image side */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-1/2 opacity-60 md:opacity-90">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent md:from-background md:via-background/50" />
        <img
          src={heroImg}
          alt="Prince Thakur — R&D engineer with holographic drone and circuit interface"
          width={1280}
          height={1280}
          className="h-full w-full object-cover object-center animate-float"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="container relative z-10 grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-7 animate-boot">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs tracking-widest text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            SYSTEM ONLINE / B.TECH ECE — FINAL YEAR
          </div>

          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            PRINCE
            <br />
            <span className="neon-text">THAKUR</span>
          </h1>

          <div className="space-y-2 font-mono text-sm md:text-base">
            <p className="text-primary">
              <span className="text-muted-foreground">{">"}</span> R&amp;D Engineer
              <span className="mx-2 text-muted-foreground">|</span>
              UAV &amp; Drone Enthusiast
              <span className="mx-2 text-muted-foreground">|</span>
              PCB Designer
            </p>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Designing intelligent systems with electronics &amp; innovation —
              from custom PCBs to autonomous flight.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-primary px-7 py-3.5 font-mono text-sm font-semibold tracking-widest text-primary-foreground shadow-glow transition-all hover:shadow-elegant"
            >
              <Cpu className="h-4 w-4" />
              VIEW PROJECTS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-transparent px-7 py-3.5 font-mono text-sm font-semibold tracking-widest text-primary transition-all hover:bg-primary/10 hover:shadow-glow-soft"
            >
              CONTACT ME
            </a>
          </div>

          {/* Spec chips */}
          <div className="flex flex-wrap gap-3 pt-4 font-mono text-[10px] tracking-widest">
            {["ALTIUM", "KICAD", "ARDUINO", "STM32", "RASPBERRY PI", "PIXHAWK"].map((s) => (
              <span
                key={s}
                className="rounded border border-border bg-muted/30 px-2.5 py-1 text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground md:flex">
        <span>SCROLL</span>
        <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
