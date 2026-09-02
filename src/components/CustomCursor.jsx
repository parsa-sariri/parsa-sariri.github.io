import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Only on fine pointers (desktop mouse) and when motion is not reduced
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReduced) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let isVisible = false;
    let isPointer = false;
    let rafId = null;

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible && cursorRef.current) {
        isVisible = true;
        cursorRef.current.style.opacity = '1';
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = !!el?.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      if (interactive !== isPointer) {
        isPointer = interactive;
        if (glowRef.current) {
          if (isPointer) {
            glowRef.current.className = 'w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.15)] shadow-[0_0_20px_hsl(var(--accent)/0.6)] transition-all duration-150 ease-out';
          } else {
            glowRef.current.className = 'w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)] shadow-[0_0_12px_hsl(var(--primary)/0.5)] transition-all duration-150 ease-out';
          }
        }
      }
    }

    function onMouseLeave() {
      isVisible = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    }

    function onMouseEnter() {
      isVisible = true;
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    function renderLoop() {
      // High-performance spring interpolation
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.35;
      cursorY += dy * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }

      rafId = requestAnimationFrame(renderLoop);
    }
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform opacity-0 transition-opacity duration-200"
      style={{ transform: 'translate3d(-100px, -100px, 0)' }}
    >
      {/* Outer Halo Follower */}
      <div
        ref={glowRef}
        className="w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.15)] shadow-[0_0_12px_hsl(var(--primary)/0.5)] transition-all duration-150 ease-out"
      />
      {/* Center Sharp Dot */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_6px_#fff]" />
    </div>
  );
}
