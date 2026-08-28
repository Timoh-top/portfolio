import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import "./ProjectCase.css";

export default function ProjectCase({ project, index }) {
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
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const number = String(index + 1).padStart(2, "0");

  return (
    <article ref={rootRef} className="project-case">
      <div className="project-case__media" data-reveal>
        <img
          src={project.images[0]}
          alt={`${project.title} interface preview`}
          loading="lazy"
        />
      </div>

      <div className="project-case__content">
        <p className="project-case__number text-mono" data-reveal>
          {number} — {project.category}
        </p>

        <h3 className="project-case__title" data-reveal>
          {project.title}
        </h3>

        <p className="project-case__tagline" data-reveal>
          {project.tagline}
        </p>

        <div className="project-case__pair" data-reveal>
          <div>
            <p className="text-mono project-case__label">Problem</p>
            <p className="project-case__text">{project.problem}</p>
          </div>
          <div>
            <p className="text-mono project-case__label">Solution</p>
            <p className="project-case__text">{project.solution}</p>
          </div>
        </div>

        <ul className="project-case__features" data-reveal>
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <ul className="project-case__stack" data-reveal>
          {project.techStack.map((tech) => (
            <li key={tech} className="text-mono">
              {tech}
            </li>
          ))}
        </ul>

        <p className="project-case__role" data-reveal>
          {project.role}
        </p>

        <div className="project-case__links" data-reveal>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="hero__cta hero__cta--primary"
            >
              Live site ↗
            </a>
          )}

          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="hero__cta hero__cta--ghost"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
