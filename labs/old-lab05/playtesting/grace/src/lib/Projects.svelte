<script>
  export let projectList = [];
  export let hlevel = 2;

  import Project from "$lib/Project.svelte";
</script>

{#each projectList as p}
  <Project info={p} {hlevel} />
{/each}
