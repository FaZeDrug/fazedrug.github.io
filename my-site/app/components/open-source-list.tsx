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
                {project.stars && (
                  <span
                    className="open-source-stars"
                    role="img"
                    aria-label={`About ${project.stars} GitHub stars`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m12 3 2.78 5.63 6.22.91-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91Z" />
                    </svg>
                    {project.stars}
                  </span>
                )}
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
