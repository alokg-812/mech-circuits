import { useEffect, useState } from "react";

/**
 * Custom cursor with neon glow trail. Hidden on touch devices.
 */
const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,opacity] duration-200"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 50 : 14,
          height: hovering ? 50 : 14,
          background: "radial-gradient(circle, hsl(186 100% 60% / 0.5), hsl(186 100% 60% / 0))",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ left: pos.x, top: pos.y, width: 4, height: 4, boxShadow: "0 0 10px hsl(var(--primary))" }}
      />
    </>
  );
};

export default CursorGlow;
