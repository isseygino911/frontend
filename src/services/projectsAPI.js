import { PROJECTS } from '../data/projects.js';

/** Simulated network delay (ms) — feels like a real fetch. */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/** Fetch all projects. */
export async function getProjects() {
  await delay(300);
  return PROJECTS;
}

/** Fetch a single project by key. */
export async function getProject(key) {
  await delay(200);
  const project = PROJECTS.find((p) => p.key === key);
  if (!project) throw new Error(`Project not found: ${key}`);
  return project;
}
