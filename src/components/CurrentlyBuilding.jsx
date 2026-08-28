import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { currentFocus } from "../data/currentFocus";
import "./CurrentlyBuilding.css";

export default function CurrentlyBuilding() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="currently" ref={rootRef}>
      <div className="container">
        <p className="currently__eyebrow text-mono" data-reveal>
          Currently building
        </p>

        <div className="currently__primary" data-reveal>
          <span className="currently__pulse" aria-hidden="true" />
          <h3 className="currently__title">{currentFocus.primary}</h3>
        </div>

        <p className="currently__note" data-reveal>
          {currentFocus.primaryNote}
        </p>

        <ul className="currently__tags" data-reveal>
          {currentFocus.tags.map((tag) => (
            <li key={tag} className="text-mono">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
