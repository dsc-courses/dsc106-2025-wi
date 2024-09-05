<script>
  import * as d3 from 'd3';

  export let data;

  const width = 928;
  const height = 600;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  $: console.log(data.length);
</script>

<div class="temperature-plot">
  <svg
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    style="max-width: 100%; height: auto;"
  >
  </svg>
</div>

<!--
Sources:
https://observablehq.com/@d3/global-temperature-trends?intent=fork
https://www.nytimes.com/interactive/2017/01/18/science/earth/2016-hottest-year-on-record.html
-->
