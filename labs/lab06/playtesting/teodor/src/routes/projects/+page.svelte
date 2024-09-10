<script>
	import projects from '$lib/assets/projects.json';
	import Project from '$lib/components/Project.svelte';
	import Pie from '$lib/components/Pie.svelte';
	import * as d3 from 'd3';

	let query = ''; // Variable to hold the search query
	let selectedYearIndex = -1;

	let selectedYear;
	$: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

	let filteredProjects;
	$: filteredProjects = projects.filter((project) => {
		if (query) {
			let values = Object.values(project).join('\n').toLowerCase();
			return values.includes(query.toLowerCase());
		}

		return true;
	});
	$: selectedYearIndex, console.log('Selected Index:', selectedYearIndex);
	$: selectedYear, console.log('Selected Year:', selectedYear);
	$: pieData, console.log('Pie Data:', pieData);

	// Further filter by selected year
	let filteredByYear;

	$: filteredByYear = selectedYear
		? filteredProjects.filter((project) => project.year === selectedYear)
		: filteredProjects;

	// Reactive block to recalculate pieData based on filteredProjects
	let pieData;
	$: {
		let rolledData = d3.rollups(
			filteredProjects, // Use filteredProjects here
			(v) => v.length,
			(d) => d.year
		);

		pieData = rolledData.map(([year, count]) => {
			return { value: count, label: year ? year.toString() : 'Unknown' };
		});
	}

	$: {
		console.log('Debugging filter condition:');
		filteredProjects.forEach((project) => {
			console.log(
				`Project Year: ${project.year}, Selected Year: ${selectedYear}, Matches: ${project.year === selectedYear}`
			);
		});
	}
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<h1>{filteredByYear.length} Projects</h1>
<Pie data={pieData} bind:selectedIndex={selectedYearIndex} />
<input
	type="search"
	bind:value={query}
	aria-label="Search projects"
	placeholder="🔍 Search projects…"
/>
<div class="projects">
	{#each filteredByYear as project (project.title)}
		<Project projectData={project} />
	{/each}
</div>
