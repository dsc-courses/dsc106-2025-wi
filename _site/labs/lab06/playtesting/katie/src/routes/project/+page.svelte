<script>
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
    import Pie from "$lib/Pie.svelte";
    import * as d3 from "d3";

    let filteredProjects;
    let query = "";
    let selectedYearIndex = -1;
    let selectedYear;
    let pieData;
    let filteredByYear;

    $: filteredProjects = projects.filter((project) => {
        // if there is a query, filter by it
        if (query) {
            let values = Object.values(project).join("\n").toLowerCase();
            return values.includes(query.toLowerCase());
        }

        return true;
    });

    $: {
        pieData = {};
        let rolledData = d3.rollups(
            filteredProjects,
            (v) => v.length,
            (d) => d.year,
        );
        pieData = rolledData.map(([year, count]) => {
            return { value: count, label: year };
        });
    }

    $: selectedYear =
        selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

    $: filteredByYear = filteredProjects.filter((project) => {
        // return the projects that match the selected year
        return selectedYear ? project.year === selectedYear : true; 
    });
</script>

<svelte:head>
    <title>Project</title>
</svelte:head>

<h1>{projects.length} projects</h1>
<input
    type="search"
    bind:value={query}
    aria-label="Search projects"
    placeholder="🔍 Search projects…"
/>

<Pie dataProp={pieData} bind:selectedIndex={selectedYearIndex} />
<div class="projects">
    {#each filteredByYear as p}
        <Project info={p} />
    {/each}
</div>
