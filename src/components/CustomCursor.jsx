import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const isPointerRef = useRef(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReduced) return;

    function onMouseMove(e) {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = !!el?.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      if (isPointerRef.current !== interactive) {
        isPointerRef.current = interactive;
        setIsPointer(interactive);
      }
    }

    function onMouseLeave() {
      setIsVisible(false);
    }

    function onMouseEnter() {
      setIsVisible(true);
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    function loop() {
      setPosition((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;
        return {
          x: prev.x + dx * 0.35,
          y: prev.y + dy * 0.35,
        };
      });
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Halo Follower */}
      <div
        className="fixed pointer-events-none z-[99999] will-change-transform"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isPointer
              ? 'w-9 h-9 border-2 border-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.15)] shadow-[0_0_20px_hsl(var(--accent)/0.6)]'
              : 'w-5 h-5 border border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)] shadow-[0_0_12px_hsl(var(--primary)/0.5)]'
          }`}
        />
      </div>

      {/* Immediate Sharp Center Dot */}
      <div
        className="fixed pointer-events-none z-[99998] will-change-transform"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_6px_#fff]" />
      </div>
    </>
  );
}
