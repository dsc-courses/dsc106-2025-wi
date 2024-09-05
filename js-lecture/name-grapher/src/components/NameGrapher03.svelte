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

  function brighten(color) {
    return d3.color(color).brighter(0.5);
  }

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

  //////////////////////////////////////////////////////////////////////////////
  // Tooltip
  //////////////////////////////////////////////////////////////////////////////
  const tooltipW = 180;
  const tooltipH = 200;
  const tooltipPaddingTop = 30;
  const tooltipPaddingLeft = 15;
  const tooltipLineHeight = 36;

  let mousePosition = [0, 0];
  function recordMousePosition(event) {
    mousePosition = d3.pointer(event);
  }

  const bisect = d3.bisector((d) => d.data[0]).center;
  let selectedArea = null;
  let selectedPoint = null;
  function setSelected(area) {
    selectedArea = area;

    const i = bisect(area, x.invert(mousePosition[0]));
    const [_, groupData] = area[i].data;
    selectedPoint = groupData.get(name(area.key)).get(sex(area.key));
  }
</script>

<input bind:value={prefix} type="text" />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  on:pointermove={recordMousePosition}
>
  <g stroke="lightgray" stroke-width="0.5">
    {#each series as d}
      <path
        key={d.key}
        d={area(d)}
        fill={selectedArea && d.key === selectedArea.key
          ? brighten(color(sex(d.key)))
          : color(sex(d.key))}
        on:pointermove={() => setSelected(d)}
      />
    {/each}
  </g>

  {#if selectedArea != null}
    <g
      class="tooltip"
      transform="translate({mousePosition[0] - tooltipW - 5},{mousePosition[1] -
        tooltipH})"
    >
      <rect width={tooltipW} height={tooltipH} fill="white" stroke="black" />
      <g transform="translate({tooltipPaddingLeft},{tooltipPaddingTop})">
        <text class="tooltip-name">
          {selectedPoint.name}
        </text>
        <text y={tooltipLineHeight * 1.5}>
          Year: {selectedPoint.year}
        </text>
        <text y={tooltipLineHeight * 2.5}>
          Count: {selectedPoint.count}
        </text>
        <text y={tooltipLineHeight * 3.5}>
          Rank: {selectedPoint.rank}
        </text>
      </g>
    </g>
  {/if}
</svg>

<style>
  svg {
    max-width: 100%;
    height: auto;
  }

  .tooltip {
    font-size: 24px;
  }

  .tooltip-name {
    font-weight: bold;
  }
</style>
