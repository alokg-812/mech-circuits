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
    id: "fpv-head-tracker",
    title: "FPV Head Tracking System",
    category: "FPV / IMMERSIVE CONTROL",
    status: "OPERATIONAL",
    image: robot,
    short:
      "DIY FPV system that maps real-time head movement to camera motion for an immersive pilot-like experience.",
    long:
      "A fully functional FPV Head Tracking System that translates real-time user head motion into precise camera movement, delivering a true first-person immersive experience for drones, RC cars and planes. An IMU mounted to the headset streams orientation data to a microcontroller that drives a 2-axis pan/tilt servo rig holding the FPV camera, with smooth motion mapping and a custom 3D-printed mechanical assembly.",
    tech: ["IMU Sensors", "Embedded C", "Servo Control", "3D Printing", "FPV"],
    highlights: [
      "Head-tracked pan & tilt",
      "2-axis servo gimbal",
      "Custom 3D-printed rig",
      "Real-time motion mapping",
      "RC / drone / plane ready",
      "Hardware-debugged build",
    ],
    gallery: [
      { src: fpv, title: "FPV Head Sensor Setup"},
      { src: transmitter, title: "Transmitter"},
      { src: receiver, title: "Receiver"},
    ],
    specs: [
      { label: "Axes", value: "2 (Pan + Tilt)" },
      { label: "Sensor", value: "9-DoF IMU" },
      { label: "Update Rate", value: "100 Hz" },
      { label: "Latency", value: "< 25 ms" },
      { label: "Mount", value: "3D Printed PLA+" },
      { label: "Compatibility", value: "FPV / RC / Drone" },
    ],
    applications: [
      { icon: Plane, title: "Drones", desc: "Immersive aerial cinematography and inspection." },
      { icon: Bot, title: "RC Vehicles", desc: "First-person driving for cars, tanks, rovers." },
      { icon: Rocket, title: "Fixed-Wing", desc: "Look-around cockpit view for RC planes." },
    ],
    why: [
      "End-to-end engineered: sensor fusion, firmware and mechanics all custom.",
      "Sub-25ms motion-to-camera latency for natural feel.",
      "Modular design — swap servos, cameras or mounts easily.",
    ],
  },
  {
    id: "rc-tx-rx-8ch",
    title: "8-Channel 2.4GHz RC Transmitter & Receiver",
    category: "WIRELESS CONTROL / PRODUCT",
    status: "DEPLOYED",
    image: transmitter,
    short:
      "Custom-built 8-channel wireless control system for drones and robotics with long-range, low-latency comms.",
    long:
      "A high-performance 8-channel 2.4GHz wireless control system engineered for drones, RC vehicles, robotics and industrial IoT. Built around an STM32 microcontroller with NRF24L01 radios, it delivers 500–1000m range, sub-20ms latency, PWM/PPM/SBUS outputs, an LCD operator interface, custom firmware and failsafe protection — all in a compact, engineer-built package designed to be customizable and cost-effective.",
    tech: ["STM32", "NRF24L01", "2.4 GHz", "SBUS / PPM / PWM", "Custom Firmware"],
    highlights: [
      "8 channels",
      "500–1000 m range",
      "<20 ms latency",
      "LCD interface",
      "Failsafe protection",
      "Compact design",
    ],
    gallery: [
      { src: transmitter, title: "Transmitter Front View"},
      { src: receiver, title: "Receiver Board"},
      { src: robot, title: "Internal PCB"},
    ],
    specs: [
      { label: "MCU", value: "STM32" },
      { label: "Radio", value: "NRF24L01 + PA/LNA" },
      { label: "Channels", value: "8" },
      { label: "Range", value: "500 – 1000 m" },
      { label: "Latency", value: "< 20 ms" },
      { label: "Outputs", value: "PWM / PPM / SBUS" },
    ],
    applications: [
      { icon: Plane, title: "Drones / UAVs", desc: "Reliable command link for multirotor and fixed-wing." },
      { icon: Bot, title: "Robotics", desc: "Teleoperation of ground and crawling robots." },
      { icon: Radio, title: "Industrial IoT", desc: "Long-range remote control for field equipment." },
    ],
    why: [
      "Engineer-built — every layer from PCB to firmware is in-house.",
      "Customizable channels, mixing and failsafe logic.",
      "Cost-effective alternative to commercial 8-channel systems.",
    ],
  },
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
