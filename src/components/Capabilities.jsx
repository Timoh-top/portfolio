import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { capabilities } from "../data/capabilities";
import "./Capabilities.css";

export default function Capabilities() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" className="capabilities" ref={rootRef}>
      <div className="container">
        <p className="capabilities__eyebrow text-mono" data-reveal>
          What I can build
        </p>

        <div className="capabilities__grid">
          {capabilities.map((cap) => (
            <div key={cap.id} className="capabilities__col" data-reveal>
              <p className="capabilities__index text-mono">{cap.index}</p>
              <h3 className="capabilities__title">{cap.title}</h3>
              <p className="capabilities__statement">{cap.statement}</p>
              <ul className="capabilities__items">
                {cap.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
