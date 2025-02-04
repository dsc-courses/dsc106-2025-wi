import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

const projectsTitle = document.querySelector('.projects-title');
projectsTitle.textContent = `${projects.length} Projects`;

let searchQuery = '';
let selectedIndex = -1;

// Renders pie chart and legend for input projects to the page
function renderPieChart(filteredProjects) {
  let rolledData = d3.rollups(
    filteredProjects,
    (v) => v.length,
    (d) => d.year,
  );

  let data = rolledData.map(([year, count]) => ({
    value: count,
    label: year,
  }));

  let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  let sliceGenerator = d3.pie().value((d) => d.value);
  let arcData = sliceGenerator(data);
  let arcs = arcData.map((d) => arcGenerator(d));
  let colors = d3.scaleOrdinal(d3.schemeTableau10);

  let svg = d3.select('svg');
  svg.selectAll('path').remove();

  let legend = d3.select('.legend');
  legend.selectAll('li').remove();

  arcs.forEach((arc, i) => {
    svg
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(i))
      .on('click', () => {
        selectedIndex = selectedIndex === i ? -1 : i;

        svg
          .selectAll('path')
          .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));

        legend
          .selectAll('li')
          .attr('class', (_, idx) => (idx === selectedIndex ? 'selected' : ''));

        if (selectedIndex === -1) {
          renderProjects(projects, projectsContainer, 'h2');
        } else {
          const year = data[selectedIndex].label;
          const yearFilteredProjects = projects.filter((p) => p.year === year);
          renderProjects(yearFilteredProjects, projectsContainer, 'h2');
        }
      });
  });

  data.forEach((d, idx) => {
    legend
      .append('li')
      .attr('class', `legend-item ${idx === selectedIndex ? 'selected' : ''}`)
      .attr('style', `--color:${colors(idx)}`)
      .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
  });
}

// Render the pie chart on first page load
renderPieChart(projects);

let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (e) => {
  let query = e.target.value;

  let filteredProjects = projects.filter((p) => {
    let values = Object.values(p).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });

  // Rerender the projects list and pie chart on input
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
});
