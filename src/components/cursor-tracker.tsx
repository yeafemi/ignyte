import { useEffect, useRef } from "react";

export function CursorTracker() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = false;

    const updatePosition = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        if (isVisible) {
          cursor.style.opacity = "1";
        } else {
          cursor.style.opacity = "0";
        }
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    // Use event delegation for pointer hover check - much more performant than getComputedStyle on mousemove
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isClickable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.tagName === "SELECT" || 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest('[role="button"]') !== null ||
        window.getComputedStyle(target).cursor === "pointer"; // fallback only when cursor changes elements

      if (isClickable) {
        cursor.classList.add("cursor-hover");
      } else {
        cursor.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.body.addEventListener("mouseenter", onMouseEnter, { passive: true });

    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block opacity-0 transition-opacity duration-300 group"
      style={{
        width: "0",
        height: "0",
      }}
    >
      {/* Outer Glow */}
      <div 
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-all duration-300 ease-out h-20 w-20 bg-brand-cyan/20 group-[.cursor-hover]:h-32 group-[.cursor-hover]:w-32 group-[.cursor-hover]:bg-brand-magenta/30"
      />
    </div>
  );
}
