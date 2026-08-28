import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import "./CustomCursor.css";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [variant, setVariant] = useState("default");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (prefersReducedMotion || isTouch) return;

    const dot = dotRef.current;
    if (!dot) return;

    setActive(true);

    const xTo = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3.out" });

    const handleMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);

    const handleEnter = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) setVariant(target.dataset.cursor);
    };
    const handleLeave = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) setVariant("default");
    };
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={`custom-cursor custom-cursor--${variant} ${
        active ? "custom-cursor--active" : "custom-cursor--hidden"
      }`}
    >
      {variant === "view" && <span className="custom-cursor__label">View</span>}
    </div>
  );
}
