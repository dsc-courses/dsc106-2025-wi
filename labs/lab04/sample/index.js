// 2.1.2
import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

// 2.1.3
const projects = await fetchJSON('./lib/projects.json');
const latestProjects = projects.slice(0, 3); // get 3 latest proj

// 2.1.4
const projectsContainer = document.querySelector('.projects');

// 2.1.5
renderProjects(latestProjects, projectsContainer, 'h2');

// 3.3 - 3.5
const githubData = await fetchGitHubData('natdosan');
const profileStats = document.querySelector('#profile-stats');

if (profileStats) {
    profileStats.innerHTML = `
          <dl>
            <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
            <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
            <dt>Followers:</dt><dd>${githubData.followers}</dd>
            <dt>Following:</dt><dd>${githubData.following}</dd>
          </dl>
      `;
  }
