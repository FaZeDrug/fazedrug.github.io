import { OpenSourceList, type OpenSourceProject } from "./open-source-list";

// Copy a project below to add another repo, or add more PRs to contributions.
// Links and live stars use owner/repo. "stars" is an optional fallback while loading.
const projects: OpenSourceProject[] = [
  {
    owner: "e2e-inc",
    repo: "e2e",
    description: "Agentic end-to-end testing framework.",
    stars: "14k",
    contributions: [
      { pr: 1911, title: "Add CLI dot reporter" },
    ],
    
  },
  
];

export function OpenSource() {
  return <OpenSourceList projects={projects} />;
}
