import { GitHubStars } from "./github-stars";

export type OpenSourceProject = {
  owner: string;
  repo: string;
  description: string;
  stars?: string;
  contributions: { pr: number; title: string }[];
};

// Shared layout. Add or edit project content in open-source.tsx.
export function OpenSourceList({ projects }: { projects: OpenSourceProject[] }) {
  return (
    <section className="open-source" aria-labelledby="open-source-heading">
      <h2 id="open-source-heading">Open Source</h2>

      <ul className="open-source-repositories">
        {projects.map((project) => {
          const repoUrl = `https://github.com/${project.owner}/${project.repo}`;

          return (
            <li key={`${project.owner}/${project.repo}`}>
              <div className="open-source-repository-header">
                <a
                  className="open-source-repository-link"
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="open-source-owner">{project.owner}</span>/{project.repo}
                </a>
                <GitHubStars owner={project.owner} repo={project.repo} fallback={project.stars} />
              </div>

              <p className="open-source-description">{project.description}</p>

              <ul className="open-source-contributions">
                {project.contributions.map(({ pr, title }) => (
                  <li key={pr}>
                    <a
                      href={`${repoUrl}/pull/${pr}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pull request ${pr}: ${title}`}
                    >
                      #{pr}
                    </a>
                    <span>{title}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
