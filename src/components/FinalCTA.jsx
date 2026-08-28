import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { socials } from "../data/socials";
import "./FinalCTA.css";

export default function FinalCTA() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%" },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="final-cta" ref={rootRef}>
      <div className="container">
        <p className="final-cta__eyebrow text-mono" data-reveal>
          Have a product in mind?
        </p>

        <h2 className="final-cta__headline" data-reveal>
          Message me.
          <br />
          Let&rsquo;s build it.
        </h2>

        <ul className="final-cta__socials" data-reveal>
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                className="text-mono"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="final-cta__footer">
        <p className="text-mono">Timothy Ajewole</p>
        <p className="text-mono">© {new Date().getFullYear()}</p>
      </footer>
    </section>
  );
}
