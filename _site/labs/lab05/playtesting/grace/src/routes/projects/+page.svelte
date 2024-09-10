<script>
  import projects from "$lib/projects.json";
  import Projects from "$lib/Projects.svelte";
</script>

<h1>{projects.length} Projects</h1>
<div class="projects">
  <Projects projectList={projects}/>
</div>

