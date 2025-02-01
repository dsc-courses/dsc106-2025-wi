import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');
// Sanity check
console.log("Fetched projects:", projects);

// ensure HTML includes container w class=projects
const projectsContainer = document.querySelector('.projects');

// Sanity check
if (!projectsContainer) {
    console.error("Projects container not found.");
} else {
    console.log("Container found:", projectsContainer);
}

renderProjects(projects, projectsContainer, 'h2');