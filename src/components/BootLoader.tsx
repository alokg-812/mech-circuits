import { useEffect, useState } from "react";

const lines = [
  "> initializing system...",
  "> loading neural circuits...",
  "> calibrating UAV systems...",
  "> portfolio.online ✓",
];

const BootLoader = ({ onDone }: { onDone: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= lines.length) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 280);
    return () => clearTimeout(t);
  }, [step, onDone]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
      <div className="font-mono text-sm md:text-base">
        {lines.slice(0, step).map((l, i) => (
          <div key={i} className="text-primary animate-fade-in">
            {l}
          </div>
        ))}
        {step < lines.length && <span className="text-primary animate-pulse">_</span>}
      </div>
    </div>
  );
};

export default BootLoader;
