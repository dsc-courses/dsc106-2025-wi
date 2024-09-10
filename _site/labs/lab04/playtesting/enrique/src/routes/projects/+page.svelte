<script>
  import projects from '$lib/assets/projects.json';
  import Project from '$lib/components/Project.svelte';
</script>

<h1>{projects.length} Projects</h1>
<div class="projects">
  {#each projects as project (project.title)}
    <Project projectData={project} />
  {/each}
</div>
