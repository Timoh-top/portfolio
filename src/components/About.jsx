import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import "./About.css";

export default function About() {
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
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 75%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={rootRef}>
      <div className="container about__grid">
        <div className="about__media" data-reveal>
          <img src="/about/timothy.jpg" alt="Timothy Ajewole" loading="lazy" />
        </div>

        <div className="about__content">
          <p className="about__eyebrow text-mono" data-reveal>
            About
          </p>
          <h2 className="about__headline" data-reveal>
            I&rsquo;m Timothy.
          </h2>
          <p className="about__body" data-reveal>
            I build digital products across software, data, and AI — from
            backend architecture to the interfaces people actually touch. My
            focus is on turning ideas and real problems into things that work,
            ship, and hold up under real use.
          </p>
        </div>
      </div>
    </section>
  );
}
