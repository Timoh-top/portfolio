import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { processSteps } from "../data/Process";
import "./Process.css";

export default function Process() {
  const rootRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    const fill = fillRef.current;
    if (!el || !fill) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 75%" },
        },
      );

      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="process" ref={rootRef}>
      <div className="container">
        <h2 className="process__headline" data-reveal>
          I start with the problem.
        </h2>

        <div className="process__track">
          <div className="process__baseline">
            <div ref={fillRef} className="process__fill" />
          </div>

          <ol className="process__steps">
            {processSteps.map((step, i) => (
              <li key={step.id} className="process__step" data-reveal>
                <span className="process__step-num text-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="process__step-label">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
