import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReduced) return;

    function onMouseMove(e) {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]');
      setIsPointer(!!interactive);
    }

    function onMouseLeave() {
      setIsVisible(false);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    function loop() {
      rafRef.current = requestAnimationFrame(loop);
      setPosition((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.2,
        y: prev.y + (targetRef.current.y - prev.y) * 0.2,
      }));
    }
    loop();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isPointer
              ? 'w-8 h-8 border-2 border-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.1)]'
              : 'w-4 h-4 bg-[hsl(var(--primary))]'
          }`}
          style={{
            boxShadow: isPointer
              ? '0 0 20px hsl(var(--accent) / 0.6)'
              : '0 0 12px hsl(var(--primary) / 0.6)',
          }}
        />
      </div>
      <div
        className="fixed pointer-events-none z-[9998] w-1 h-1 rounded-full bg-[hsl(var(--primary))]"
        style={{
          left: `${targetRef.current.x}px`,
          top: `${targetRef.current.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}