import React, { useEffect, useRef, useState } from 'react';

type CursorVariant = 'default' | 'button' | 'card';

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isPressed, setIsPressed] = useState(false);

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluateSupport = () => {
      const hasTouch = 'ontouchstart' in window && !finePointerQuery.matches;
      const supported = finePointerQuery.matches && !reducedMotionQuery.matches && !hasTouch;
      setIsEnabled(supported);
      if (supported) {
        document.body.classList.add('custom-cursor-enabled');
      } else {
        document.body.classList.remove('custom-cursor-enabled');
      }
    };

    evaluateSupport();
    finePointerQuery.addEventListener('change', evaluateSupport);
    reducedMotionQuery.addEventListener('change', evaluateSupport);

    return () => {
      finePointerQuery.removeEventListener('change', evaluateSupport);
      reducedMotionQuery.removeEventListener('change', evaluateSupport);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) {
        setVariant('default');
        return;
      }

      const cardInteractive = target.closest('[data-cursor="card"]');
      const buttonInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="button"]'
      );

      if (buttonInteractive) {
        setVariant('button');
      } else if (cardInteractive) {
        setVariant('card');
      } else {
        setVariant('default');
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const animateRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.22;
      ringPos.current.y += dy * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isEnabled, isVisible]);

  if (!isEnabled) return null;

  const ringDimensions =
    variant === 'button'
      ? 'w-12 h-12 border-[#ece1df]'
      : variant === 'card'
      ? 'w-14 h-14 border-[#ece1df]/80'
      : 'w-8 h-8 border-[#ece1df]/50';

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Inner precision dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-[#ece1df] transition-[width,height,opacity] duration-150 ${
          variant === 'card' ? 'w-2 h-2' : 'w-1.5 h-1.5'
        } ${isPressed ? 'scale-75' : 'scale-100'}`}
      />

      {/* Outer reactive ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,border-color] duration-200 flex items-center justify-center ${ringDimensions} ${
          isPressed ? 'scale-90' : 'scale-100'
        }`}
      >
        {variant === 'card' && (
          <span className="text-[9px] font-mono-tabular tracking-widest text-[#ece1df] select-none">
            +
          </span>
        )}
      </div>
    </div>
  );
};
