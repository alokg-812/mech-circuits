import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink, Cpu, Radio, Plane, Bot, Zap, Shield, Wrench, Rocket } from "lucide-react";
import robot from "@/assets/project-robot.jpg";
import fpv from "@/assets/FPV-head-tracking.jpg";
import motor from "@/assets/micro-servo-motor.jpg";
import receiver from "@/assets/receiver.jpg";
import transmitter from "@/assets/transmitter.jpg";

type GalleryItem = { src: string; title: string;};
type SpecItem = { label: string; value: string };
type AppItem = { icon: React.ComponentType<{ className?: string }>; title: string; desc: string };

type Project = {
  id: string;
  title: string;
  category: string;
  status: string;
  image: string;
  short: string;
  long: string;
  tech: string[];
  highlights: string[];
  gallery: GalleryItem[];
  specs: SpecItem[];
  applications: AppItem[];
  why: string[];
};

const projects: Project[] = [
  {
    id: "3-axis-head-tracking-system",
    title: "3-Axis Head Tracking System",
    category: "FPV / MOTION CONTROL / EMBEDDED SYSTEM",
    status: "OPERATIONAL",
    image: robot,
    short:
      "Advanced 3-axis head tracking system that converts real-time human motion into precise control signals for FPV, robotics, and simulation systems.",
    long:
      "A high-performance 3-Axis Head Tracking System designed to translate natural head movements into accurate motion control signals. Built using an STM32 microcontroller and IMU-based motion sensing, the system enables smooth and low-latency tracking across yaw, pitch, and roll axes. Sensor fusion algorithms ensure stable angle estimation with minimal drift, while custom embedded firmware processes real-time data for responsive output. The system supports PWM, PPM, and SBUS outputs, making it highly compatible with RC transmitters, drone gimbals, robotics platforms, and simulation systems. Its lightweight, wearable design and compact PCB make it ideal for immersive control applications.",
    tech: [
      "STM32",
      "IMU Sensors",
      "Embedded C",
      "Sensor Fusion",
      "PWM / PPM / SBUS",
      "PCB Design"
    ],
    highlights: [
      "Full 3-axis tracking (Yaw, Pitch, Roll)",
      "High precision IMU-based motion sensing",
      "Low latency real-time response",
      "Multi-output support (PWM, PPM, SBUS)",
      "Wearable and lightweight design",
      "Custom embedded firmware system",
    ],
    gallery: [
      { src: fpv, title: "Head Tracking Sensor Module" },
      { src: motor, title: "Servo / Gimbal Movement Setup" }
    ],
    specs: [
      { label: "Tracking Axes", value: "3 (Yaw, Pitch, Roll)" },
      { label: "Controller", value: "STM32 MCU" },
      { label: "Sensor", value: "IMU (Gyroscope + Accelerometer)" },
      { label: "Outputs", value: "PWM / PPM / SBUS" },
      { label: "Latency", value: "Low latency response" },
      { label: "Power", value: "Rechargeable Battery / DC Supply" },
    ],
    applications: [
      { icon: Plane, title: "FPV Systems", desc: "Immersive camera control for drones and RC aircraft." },
      { icon: Bot, title: "Robotics", desc: "Real-time head-based control for robot vision systems." },
      { icon: Rocket, title: "Simulation", desc: "Enhanced realism in flight and racing simulators." },
    ],
    why: [
      "Provides natural hands-free control for camera and gimbal systems.",
      "Full 3-axis motion tracking for realistic and immersive experience.",
      "Low latency ensures smooth and responsive control output.",
      "Compatible with drones, robotics, and simulation platforms.",
      "Upgradeable architecture with future wireless and smart features.",
    ],
  },
  {
    id: "8ch-rc-transmitter-receiver",
    title: "8-Channel 2.4GHz RC Transmitter & Receiver",
    category: "RC SYSTEM / WIRELESS CONTROL / EMBEDDED",
    status: "OPERATIONAL",
    image: transmitter,
    short:
      "Custom-built 8-channel wireless control system with low-latency communication for drones, robotics, and RC applications.",
    long:
      "A high-performance 8-Channel RC Transmitter & Receiver System engineered using STM32 and NRF24L01 wireless communication. Designed for stable, long-range, and low-latency control, the system supports multiple output protocols including PWM, PPM, and SBUS. It features a custom embedded firmware architecture, LCD interface for real-time monitoring, and advanced safety features like failsafe protection and secure binding. The modular and upgradeable design makes it suitable for drones, robotics, industrial control, and research applications.",
    tech: [
      "STM32",
      "NRF24L01",
      "Embedded C",
      "Wireless Communication",
      "PWM / PPM / SBUS",
      "PCB Design"
    ],
    highlights: [
      "8 fully functional control channels",
      "2.4GHz NRF24L01 wireless communication",
      "Low latency real-time control",
      "Multi-protocol support (PWM, PPM, SBUS)",
      "Failsafe and secure binding system",
      "Custom firmware and upgradeable design",
    ],
    gallery: [
      { src: transmitter, title: "Transmitter Front View" },
      { src: receiver, title: "Receiver Module" }
    ],
    specs: [
      { label: "Channels", value: "8" },
      { label: "Frequency", value: "2.4 GHz" },
      { label: "Controller", value: "STM32 MCU" },
      { label: "Communication", value: "NRF24L01" },
      { label: "Outputs", value: "PWM / PPM / SBUS" },
      { label: "Power", value: "Rechargeable Battery" },
    ],
    applications: [
      { icon: Plane, title: "RC Systems", desc: "Control for aircraft, cars, boats, and helicopters." },
      { icon: Bot, title: "Robotics", desc: "Wireless control for robots and automation systems." },
      { icon: Rocket, title: "Drones", desc: "Reliable control for multirotor and FPV drone systems." },
    ],
    why: [
      "Multi-purpose system supporting drones, RC vehicles, and robotics.",
      "8 channels enable advanced control features and expansions.",
      "Supports PWM, PPM, and SBUS for wide compatibility.",
      "Reliable 2.4GHz wireless link with low latency.",
      "Upgradeable firmware and customizable hardware design.",
      "Cost-effective alternative to commercial RC systems.",
    ],
  }
];

const Projects = () => {
  const [active, setActive] = useState<Project | null>(null);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  // Lock body scroll when modal/lightbox open
  useEffect(() => {
    const open = active || lightbox;
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [active, lightbox]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (lightbox) setLightbox(null);
      else if (active) setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, lightbox]);

  return (
    <section id="projects" className="relative py-28">
      <div className="container">
        <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.3em] text-primary">// 02 — PROJECT REGISTRY</p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Live <span className="neon-text">Project</span> Showcase
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs tracking-wider text-muted-foreground">
            [SELECT MODULE] — Hover to scan. Click to open full diagnostic.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              data-cursor="hover"
              onClick={() => setActive(p)}
              className="group glass relative overflow-hidden rounded-xl text-left transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:shadow-elegant"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="scan-line absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-3">
                  <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary" />
                  <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary" />
                  <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary" />
                </div>
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded border border-primary/40 bg-background/80 px-2 py-1 font-mono text-[10px] tracking-widest text-primary backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                  {p.status}
                </div>
              </div>

              <div className="p-6">
                <p className="mb-2 font-mono text-[10px] tracking-[0.25em] text-primary/80">{p.category}</p>
                <h3 className="mb-2 font-display text-xl font-bold transition-colors group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-primary opacity-0 transition-all group-hover:opacity-100">
                  ACCESS MODULE <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal — portaled to body */}
      {active &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-0 z-[100] flex items-stretch justify-center bg-background/85 backdrop-blur-md animate-fade-in"
            onClick={() => setActive(null)}
          >
            <div
              className="relative flex h-screen w-screen flex-col overflow-hidden bg-card/40 animate-scale-in md:h-screen md:w-screen"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glowing close button */}
              <button
                onClick={() => setActive(null)}
                className="fixed right-4 top-4 z-[110] rounded-md border border-primary/50 bg-background/70 p-2.5 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)] backdrop-blur transition hover:bg-primary/20 hover:shadow-[0_0_30px_hsl(var(--primary)/0.8)] md:right-6 md:top-6"
                aria-label="Close project view"
                data-cursor="hover"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Scrollable content area */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain scroll-smooth"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Hero header */}
                <div className="relative h-[42vh] min-h-[260px] w-full overflow-hidden md:h-[48vh]">
                  <img src={active.image} alt={active.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  <div className="scan-line absolute inset-0 opacity-60" />
                  <div className="absolute inset-x-0 bottom-0 px-5 pb-6 md:px-10 md:pb-10">
                    <div className="mx-auto max-w-5xl">
                      <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-primary md:text-xs">
                        {active.category} / {active.status}
                      </p>
                      <h3
                        id="project-modal-title"
                        className="mb-3 font-display text-3xl font-bold leading-tight md:text-5xl"
                      >
                        {active.title}
                      </h3>
                      <p className="mb-4 max-w-3xl text-sm text-muted-foreground md:text-base">{active.short}</p>
                      <div className="flex flex-wrap gap-2">
                        {active.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] text-primary md:text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body sections */}
                <div className="mx-auto max-w-5xl space-y-12 px-5 py-10 md:px-10 md:py-14">
                  {/* Image Gallery */}
                  <section>
                    <p className="mb-4 font-mono text-xs tracking-widest text-primary">// IMAGE GALLERY</p>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {active.gallery.map((g) => (
                        <button
                          key={g.title}
                          onClick={() => setLightbox(g)}
                          data-cursor="hover"
                          className="group glass overflow-hidden rounded-xl text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-elegant"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                              src={g.src}
                              alt={g.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                          </div>
                          <div className="p-4">
                            <h4 className="mb-1 font-display text-sm font-semibold text-primary">{g.title}</h4>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Details */}
                  <section className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <p className="mb-3 font-mono text-xs tracking-widest text-primary">// OVERVIEW</p>
                      <p className="leading-relaxed text-muted-foreground">{active.long}</p>
                    </div>
                    <div>
                      <p className="mb-3 font-mono text-xs tracking-widest text-primary">// FEATURES</p>
                      <ul className="space-y-2">
                        {active.highlights.map((h) => (
                          <li
                            key={h}
                            className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm"
                          >
                            → {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* Specs */}
                  <section>
                    <p className="mb-4 font-mono text-xs tracking-widest text-primary">// TECHNICAL SPECIFICATIONS</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {active.specs.map((s) => (
                        <div
                          key={s.label}
                          className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3"
                        >
                          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                            {s.label}
                          </span>
                          <span className="font-display text-sm font-semibold text-primary">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Applications */}
                  <section>
                    <p className="mb-4 font-mono text-xs tracking-widest text-primary">// APPLICATIONS</p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {active.applications.map((a) => {
                        const Icon = a.icon;
                        return (
                          <div
                            key={a.title}
                            className="glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
                          >
                            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/40 bg-primary/10 text-primary">
                              <Icon className="h-5 w-5" />
                            </div>
                            <h4 className="mb-1 font-display text-base font-semibold">{a.title}</h4>
                            <p className="text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Why */}
                  <section>
                    <p className="mb-4 font-mono text-xs tracking-widest text-primary">// WHY THIS PROJECT</p>
                    <div className="glass rounded-xl border-primary/30 p-6">
                      <ul className="space-y-3">
                        {active.why.map((w) => (
                          <li key={w} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                            <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <div className="pt-4 text-center">
                    <button
                      onClick={() => setActive(null)}
                      data-cursor="hover"
                      className="rounded-md border border-primary/50 bg-primary/10 px-6 py-2.5 font-mono text-xs tracking-[0.25em] text-primary transition hover:bg-primary/20 hover:shadow-elegant"
                    >
                      ← CLOSE MODULE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Lightbox */}
      {lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl animate-fade-in"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="fixed right-4 top-4 z-[130] rounded-md border border-primary/50 bg-background/70 p-2.5 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)] backdrop-blur transition hover:bg-primary/20"
              aria-label="Close image"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              className="glass-strong relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.title} className="max-h-[70vh] w-full object-contain" />
              <div className="border-t border-border/50 p-5">
                <h4 className="mb-1 font-display text-lg font-semibold text-primary">{lightbox.title}</h4>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Projects;
