////////////////////////////////////////////////////////////////////
// 1. Setup (standard d3 code for generating a histogram)
////////////////////////////////////////////////////////////////////
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const unemployment = await d3.json('unemployment.json');

// Declare the chart dimensions and margins.
const width = 960;
const height = 500;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3
  .scaleLinear()
  .domain([0, d3.max(unemployment, (d) => d.rate)])
  .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3
  .scaleLinear()
  .domain([0, d3.max(unemployment, (d) => d.rate)])
  .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3
  .select('#histogram')
  .attr('width', width)
  .attr('height', height)
  .attr('viewBox', [0, 0, width, height])
  .attr('style', 'max-width: 100%; height: auto;');

// Create the axes
svg
  .append('g')
  .attr('class', 'x-axis')
  .attr('transform', `translate(0,${height - marginBottom})`)
  .call(
    d3
      .axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0),
  )
  // Additional text element for the x-axis label
  .call((g) =>
    g
      .append('text')
      .attr('x', width)
      .attr('y', marginBottom - 4)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'end')
      .text('Unemployment rate (%) →'),
  );

svg
  .append('g')
  .attr('class', 'y-axis')
  .attr('transform', `translate(${marginLeft},0)`)
  .call(d3.axisLeft(y).ticks(height / 40))
  .call((g) => g.select('.domain').remove())
  // Additional text element for the y-axis label
  .call((g) =>
    g
      .append('text')
      .attr('x', -marginLeft)
      .attr('y', 10)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'start')
      .text('↑ Frequency (no. of counties)'),
  );

////////////////////////////////////////////////////////////////////
// 2. Update histogram when the number of bins changes
////////////////////////////////////////////////////////////////////
function updateHistogram(nBins) {
  // By default, d3 will try to round the number of bins so that the bars for
  // the histogram align with the ticks on the x-axis. We want to override this
  // for this demo, so we generate exact threshold values for the specified
  // number of bins.
  const domain = x.domain();
  const step = (domain[1] - domain[0]) / nBins;
  const thresholds = d3.range(domain[0], domain[1], step);

  const bins = d3
    .bin()
    .domain(x.domain())
    .thresholds(thresholds)
    .value((d) => d.rate)(unemployment);

  y.domain([0, d3.max(bins, (d) => d.length)]);

  // Here is where the magic happens: The `join` method allows us to specify the
  // enter, update, and exit selections for the bars. The enter selection is
  // used to create the bars, the update selection is used to update the bars,
  // and the exit selection is used to remove the bars.
  //
  // For example, if we originally have 21 bins and we go to 41 bins, we first
  // need to create 20 new bars, so the enter() function will get called to
  // create bars. Then, the update() function will get called to update the
  // heights of all 41 bars.
  //
  // If we instead go from 41 bars to 21 bars, then we need to delete 20 bars, so
  // the exit() function will get called to remove bars. Then, the update()
  // function will get called to update the heights of the remaining 21 bars.
  svg
    .selectAll('rect')
    .data(bins)
    .join(
      // When a bar is created, we'll set its x-position and width, but set the
      // height to 0 since we'll animate the height to the correct value.
      (enter) =>
        enter
          .append('rect')
          .attr('x', (d) => x(d.x0) + 1)
          .attr('width', (d) => x(d.x1) - x(d.x0) - 1)
          .attr('y', height - marginBottom) // Start from bottom
          .attr('height', 0) // Start with height 0
          .attr('fill', 'steelblue'),
      // Leave the update selection empty, since we don't need to do anything.
      // If we updated the height of the bar here, only the existing bars would
      // get animated and the new bars would appear abruptly.
      (update) => update,
      // For the exit selection, we'll animate the height of the bar to 0, then
      // remove the element.
      (exit) =>
        exit
          .transition()
          .duration(750)
          .attr('y', height - marginBottom)
          .attr('height', 0)
          .remove(),
    )
    // Now, we'll update the height of all the bars.
    .transition()
    .duration(750)
    .attr('x', (d) => x(d.x0) + 1)
    .attr('width', (d) => x(d.x1) - x(d.x0) - 1)
    .attr('y', (d) => y(d.length))
    .attr('height', (d) => y(0) - y(d.length));

  // Update axes with transition
  svg
    .select('.x-axis')
    .transition()
    .duration(750)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0),
    );

  svg
    .select('.y-axis')
    .transition()
    .duration(750)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select('.domain').remove());
}

// Initial render
updateHistogram(21);

// Add event listener to input element
d3.select('#nBins').on('input', function () {
  updateHistogram(+this.value); // Convert string to number with +
});
