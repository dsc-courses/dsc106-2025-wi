<script>
  import * as d3 from 'd3';

  export let data;

  const width = 928;
  const height = 600;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Placeholders for the axis elements.
  let gx;
  let gy;

  $: x = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => d.date))
    .range([marginLeft, width - marginRight]);

  $: y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.value))
    .nice()
    .range([height - marginBottom, marginTop]);

  $: max = d3.max(data, (d) => Math.abs(d.value));

  // Create a symmetric diverging color scale.
  $: color = d3
    .scaleSequential()
    .domain([max, -max])
    .interpolator(d3.interpolateRdBu);

  $: d3.select(gx).call(d3.axisBottom(x).ticks(width / 80));
  $: d3.select(gy)
    .call(d3.axisLeft(y).ticks(null, '+'))
    // grid lines
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('x2', width - marginRight - marginLeft)
        .attr('stroke-opacity', (d) => (d === 0 ? 1 : 0.1)),
    );
</script>

<div class="temperature-plot">
  <svg
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    style="max-width: 100%; height: auto;"
  >
    <!-- x-axis -->
    <g bind:this={gx} transform="translate(0,{height - marginBottom})" />
    <!-- y-axis -->
    <g bind:this={gy} transform="translate({marginLeft},0)">
      <text
        x="5"
        y={marginTop}
        dy="0.32em"
        fill="#000"
        font-weight="bold"
        text-anchor="start"
      >
        Anomaly (°C)
      </text>
    </g>

    <!-- points -->
    <g stroke="#000" stroke-opacity="0.2">
      {#each data as d, i}
        <circle
          key={i}
          cx={x(d.date)}
          cy={y(d.value)}
          fill={color(d.value)}
          r="2.5"
        />
      {/each}
    </g>
  </svg>
</div>

<!--
Sources:
https://observablehq.com/@d3/global-temperature-trends?intent=fork
https://www.nytimes.com/interactive/2017/01/18/science/earth/2016-hottest-year-on-record.html
-->
