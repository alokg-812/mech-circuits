import { useEffect, useRef } from "react";

/**
 * Animated PCB-trace SVG background. Lines "flow" with stroke-dashoffset animation.
 */
const CircuitBackground = () => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = ref.current?.querySelectorAll<SVGPathElement>("path[data-trace]");
    paths?.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.animation = `trace-flow ${8 + (i % 5) * 2}s linear ${i * 0.3}s infinite`;
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        ref={ref}
        viewBox="0 0 1440 900"
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="trace-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(186 100% 55%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(186 100% 65%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(145 100% 55%)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="node-grad">
            <stop offset="0%" stopColor="hsl(186 100% 70%)" />
            <stop offset="100%" stopColor="hsl(186 100% 50% / 0)" />
          </radialGradient>
        </defs>

        {/* Traces */}
        <path data-trace d="M 0 150 L 300 150 L 350 200 L 700 200 L 750 150 L 1100 150 L 1150 100 L 1440 100"
          fill="none" stroke="url(#trace-grad)" strokeWidth="1.5" />
        <path data-trace d="M 0 400 L 200 400 L 250 450 L 600 450 L 650 400 L 900 400 L 950 450 L 1440 450"
          fill="none" stroke="url(#trace-grad)" strokeWidth="1.5" />
        <path data-trace d="M 0 700 L 400 700 L 450 650 L 800 650 L 850 700 L 1200 700 L 1250 750 L 1440 750"
          fill="none" stroke="url(#trace-grad)" strokeWidth="1.5" />
        <path data-trace d="M 200 0 L 200 300 L 250 350 L 250 600 L 300 650 L 300 900"
          fill="none" stroke="url(#trace-grad)" strokeWidth="1.5" />
        <path data-trace d="M 800 0 L 800 200 L 850 250 L 850 550 L 900 600 L 900 900"
          fill="none" stroke="url(#trace-grad)" strokeWidth="1.5" />
        <path data-trace d="M 1200 0 L 1200 250 L 1150 300 L 1150 700 L 1100 750 L 1100 900"
          fill="none" stroke="url(#trace-grad)" strokeWidth="1.5" />

        {/* Nodes */}
        {[
          [300, 150], [700, 200], [1100, 150],
          [200, 400], [600, 450], [900, 400],
          [400, 700], [800, 650], [1200, 700],
          [200, 300], [800, 200], [1200, 250],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="20" fill="url(#node-grad)" />
            <circle cx={x} cy={y} r="3" fill="hsl(186 100% 70%)" />
          </g>
        ))}
      </svg>

      <style>{`
        @keyframes trace-flow {
          0% { stroke-dashoffset: var(--len, 1000); opacity: 0.2; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default CircuitBackground;
