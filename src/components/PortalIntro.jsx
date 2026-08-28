import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import "./PortalIntro.css";

export default function PortalIntro({ onComplete }) {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const coreRef = useRef(null);
  const yearRef = useRef(null);
  const statusRef = useRef(null);
  const skipRef = useRef(null);
  const hasOpened = useRef(false);
  const launchTimer = useRef(null);
  const idleTl = useRef(null);

  const playOpening = () => {
    if (hasOpened.current) return;
    hasOpened.current = true;

    if (launchTimer.current) clearTimeout(launchTimer.current);
    if (idleTl.current) idleTl.current.kill();

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => onComplete?.(),
    });

    tl.to(coreRef.current, { scale: 2.2, duration: 0.5, ease: "power2.in" }, 0);
    tl.to(
      ringRef.current,
      { rotate: 380, scale: 0.1, duration: 0.9, ease: "power3.in" },
      0.1,
    );
    tl.to(
      coreRef.current,
      { scale: 0, opacity: 0, duration: 0.4, ease: "power1.in" },
      0.55,
    );
    tl.to(
      [yearRef.current, statusRef.current, skipRef.current],
      { opacity: 0, duration: 0.3 },
      0.15,
    );
    tl.add(() => {
      document.body.classList.remove("intro-active");
    }, 0.7);
    tl.to(
      rootRef.current,
      { opacity: 0, duration: 0.5, ease: "power2.out" },
      0.85,
    );
  };

  useEffect(() => {
    const ring = ringRef.current;
    const core = coreRef.current;
    if (!ring || !core) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      document.body.classList.remove("intro-active");
      onComplete?.();
      return;
    }

    const idle = gsap.timeline({ repeat: -1, yoyo: true });
    idle.to(ring, { scale: 1.04, duration: 2.4, ease: "sine.inOut" }, 0);
    idle.to(
      core,
      { scale: 1.25, opacity: 0.85, duration: 1.6, ease: "sine.inOut" },
      0,
    );
    idleTl.current = idle;

    launchTimer.current = setTimeout(playOpening, 700);

    return () => {
      if (launchTimer.current) clearTimeout(launchTimer.current);
      idle.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="portal-intro">
      <p ref={yearRef} className="portal-intro__year text-mono">
        2026
      </p>
      <p ref={statusRef} className="portal-intro__status text-mono">
        System / Ready
      </p>

      <button
        className="portal-intro__trigger"
        onClick={playOpening}
        aria-label="Skip intro"
      >
        <span ref={ringRef} className="portal-intro__ring">
          <span ref={coreRef} className="portal-intro__core" />
        </span>
      </button>

      <p ref={skipRef} className="portal-intro__skip text-mono">
        Skip →
      </p>
    </div>
  );
}
