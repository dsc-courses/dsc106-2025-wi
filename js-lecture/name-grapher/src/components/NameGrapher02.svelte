<script>
  // data is a list of objects, each with the following keys:
  // { name, sex, year, count, rank }
  export let data;

  import * as d3 from 'd3';

  const width = 928;
  const height = 500;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  //////////////////////////////////////////////////////////////////////////////
  // Data manipulation
  //////////////////////////////////////////////////////////////////////////////

  let prefix = 'sam';
  $: filteredData = data.filter((d) => d.name.toLowerCase().startsWith(prefix));

  $: console.log(filteredData);

  //////////////////////////////////////////////////////////////////////////////
  // d3 scales
  //////////////////////////////////////////////////////////////////////////////

  // This is a complicated bit of code to get d3.stack() to work. We essentially
  // want to group by year, name, and sex, then stack the counts for each year.
  // The issue is that d3.stack.keys() needs string keys, so we have to join
  // name and sex together into one string, then split them apart later in
  // .value().
  $: series = d3
    .stack()
    .keys(d3.union(filteredData.map((d) => `${d.name}~${d.sex}`)))
    .value(([, D], key) => {
      const [name, sex] = key.split('~');
      return D.get(name).get(sex).count;
    })(
    d3.index(
      filteredData,
      (d) => d.year,
      (d) => d.name,
      (d) => d.sex,
    ),
  );

  $: x = d3
    .scaleLinear()
    .domain(d3.extent(filteredData, (d) => d.year))
    .range([marginLeft, width - marginRight]);

  $: y = d3
    .scaleLinear()
    .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
    .rangeRound([height - marginBottom, marginTop]);

  $: color = d3
    .scaleOrdinal()
    .domain(['M', 'F'])
    .range(['steelblue', 'indianred']);

  // Construct an area shape.
  $: area = d3
    .area()
    .x((d) => x(d.data[0]))
    .y0((d) => y(d[0]))
    .y1((d) => y(d[1]));

  //////////////////////////////////////////////////////////////////////////////
  // Helper functions
  //////////////////////////////////////////////////////////////////////////////

  function name(key) {
    return key.split('~')[0];
  }

  function sex(key) {
    return key.split('~')[1];
  }
</script>

<input bind:value={prefix} type="text" />

<svg {width} {height} viewBox="0 0 {width} {height}">
  <g stroke="lightgray" stroke-width="0.5">
    {#each series as d}
      <path d={area(d)} fill={color(sex(d.key))} />
    {/each}
  </g>
</svg>

<style>
  svg {
    max-width: 100%;
    height: auto;
  }
</style>
