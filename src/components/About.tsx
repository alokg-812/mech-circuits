import { Cpu, Plane, CircuitBoard, Zap } from "lucide-react";

const skills = [
  {
    icon: CircuitBoard,
    title: "PCB DESIGN",
    text: "Multi-layer schematics, routing, and prototype fabrication using Altium & KiCad.",
  },
  {
    icon: Plane,
    title: "UAV SYSTEMS",
    text: "Quadcopter assembly, flight controllers, telemetry tuning and autonomous navigation.",
  },
  {
    icon: Cpu,
    title: "EMBEDDED",
    text: "Firmware on STM32, ESP32, Arduino — sensors, motor control, and wireless protocols.",
  },
  {
    icon: Zap,
    title: "INNOVATION",
    text: "Translating concepts into working hardware. Rapid prototyping with hands-on rigor.",
  },
];

const About = () => {
  return (
    <section id="about" className="relative py-28">
      <div className="pcb-bg pointer-events-none absolute inset-0 opacity-30" />

      <div className="container relative">
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-primary">// 01 — IDENTITY</p>
          <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
            Engineer by craft.{" "}
            <span className="neon-text">Innovator</span> by instinct.
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              I'm Prince — a final-year B.Tech (Electronics &amp; Communication) student at{" "}
              <span className="text-foreground">Raj Kumar Goel Institute of Technology, Ghaziabad</span>,
              driven by a single obsession: <span className="text-foreground">building intelligent
              hardware that works in the real world</span>. My lab runs on solder fumes, flight
              logs, and the satisfaction of a clean trace route.
            </p>
            <p>
              From hand-routed PCBs to autonomous UAVs, every project is an exercise in
              precision engineering — where electronics meets aerodynamics meets code.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <div
              key={s.title}
              className="glass corner-brackets group relative overflow-hidden rounded-lg p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow-soft"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <s.icon className="mb-4 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 font-display text-sm font-bold tracking-wider">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
