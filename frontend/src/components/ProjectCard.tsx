import type { Project } from "../api";
import "./ProjectCard.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="pCard">
      <div className="pTop">
        <h3 className="pTitle">{project.title}</h3>
        {project.tech_stack ? (
          <span className="pPill">{project.tech_stack}</span>
        ) : null}
      </div>

      <p className="pDesc">{project.description}</p>

      <div className="pLinks">
        {project.github_url ? (
          <a className="pLink" href={project.github_url} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        ) : null}
        {project.live_url ? (
          <a className="pLink" href={project.live_url} target="_blank" rel="noreferrer">
            Live ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}