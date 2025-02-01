<script> 
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    import Pie from "$lib/Pie.svelte";
    import * as d3 from 'd3';
//     let pieData = [
// 	{ value: 1, label: "apples" },
// 	{ value: 2, label: "oranges" },
// 	{ value: 3, label: "mangos" },
// 	{ value: 4, label: "pears" },
// 	{ value: 5, label: "limes" },
// 	{ value: 5, label: "cherries" }
// ];
    let pieData;
    $:{
        pieData = {};
        let rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);
        pieData = rolledData.map(([year, count]) => {
        return { value: count, label: year };
    });
    }    
    
    let query = "";
    let filteredProjects;
    $: filteredProjects = projects.filter(project => {
        if (query) {
            return project.title.toLowerCase().includes(query.toLowerCase());
        }
        return true;
    });
    $: filteredProjects = projects.filter(project => {
        let values = Object.values(project).join("\n").toLowerCase();
        return values.includes(query.toLowerCase());
    });

    let selectedYearIndex = -1;
    let selectedYear;
    $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;
    let filteredByYear;
    $: filteredByYear = selectedYear ? filteredProjects.filter(p => p.year === selectedYear) : filteredProjects;
</script>

<svelte:head>
	<title>Project</title>
</svelte:head>

<Pie data={pieData} bind:selectedIndex={selectedYearIndex} />

<input type="search" bind:value={query}
       aria-label="Search projects" placeholder="🔍 Search projects…" />

<h1>Projects</h1>
<div class="projects">
    {#each filteredByYear as p(p.title)}
    <Project info={p} />
    {/each}
</div>

<style>
    .projects{
	max-width:100%;
	display: grid;
	grid-template-columns:repeat(auto-fill, minmax(15em, 1fr));
	gap: 1em;
    } 
</style>