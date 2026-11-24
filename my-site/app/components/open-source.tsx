import { OpenSourceList, type OpenSourceProject } from "./open-source-list";

// Copy a project below to add another repo, or add more PRs to contributions.
// Links and live stars use owner/repo. "stars" is an optional fallback while loading.
const projects: OpenSourceProject[] = [
  {
    owner: "e2e-inc",
    repo: "e2e",
    description: "Agentic end-to-end testing framework for web and mobile apps",
    stars: "14.1k",
    contributions: [
      { pr: 1911, title: "Add CLI dot reporter" },
      { pr: 2033, title: "Add mobile viewport API" },

    ],
    
  },


  
];

export function OpenSource() {
  return <OpenSourceList projects={projects} />;
}
