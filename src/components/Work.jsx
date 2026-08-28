import { projects } from "../data/projects";
import ProjectCase from "./ProjectCase";
import "./Work.css";

export default function Work() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="work">
      <div className="container">
        <h2 className="work__headline">Built, not just talked about.</h2>

        <div className="work__list">
          {featured.map((project, i) => (
            <ProjectCase key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
