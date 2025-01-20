<script>
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  // Change './NameGrapher.svelte' to './NameGrapher03.svelte' to see final
  // result
  import NameGrapher from './NameGrapher.svelte';

  let data = [];

  onMount(async () => {
    data = await d3.csv('name_grapher_data.csv', d3.autoType);
  });
</script>

<main>
  <h1>Name Grapher</h1>

  {#if data.length === 0}
    <p>Loading...</p>
  {:else}
    <NameGrapher {data} />
  {/if}
</main>

<style>
  main {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
    max-width: 1000px;
    margin: 1em auto;
    padding: 1em;
  }
</style>
