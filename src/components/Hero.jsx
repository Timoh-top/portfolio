import "./Hero.css";
import { useMagnetic } from "../lib/useMagnetic";

export default function Hero() {
  const primaryCtaRef = useMagnetic(0.3);
  const ghostCtaRef = useMagnetic(0.3);

  return (
    <section id="top" className="hero">
      <div className="hero__inner container">
        <p className="hero__eyebrow text-mono">Timothy Ajewole</p>

        <h1 className="hero__headline">I build digital products.</h1>

        <p className="hero__stack text-mono">Software · Data · AI</p>

        <div className="hero__actions">
          <a
            ref={primaryCtaRef}
            href="#work"
            className="hero__cta hero__cta--primary"
            data-cursor="link"
          >
            Explore my work
          </a>

          <a
            ref={ghostCtaRef}
            href="#contact"
            className="hero__cta hero__cta--ghost"
            data-cursor="link"
          >
            Let&rsquo;s build →
          </a>
        </div>
      </div>

      <div className="hero__scroll-cue text-mono" aria-hidden="true">
        Scroll
      </div>
    </section>
  );
}
