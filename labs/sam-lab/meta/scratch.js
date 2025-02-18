{
  const data = d3.csv(
    'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv',
    (row) => ({ price: +row.price }),
  );
  const width = 460;
  const height = 400;
  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const usableArea = {
    top: margin.top,
    right: width - margin.right,
    bottom: height - margin.bottom,
    left: margin.left,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
  };

  // append the svg object to the body of the page
  d3.select('#hist-container').selectAll('svg').remove();
  const svg = d3
    .select('#hist-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // X axis: scale and draw:
  let xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.price)])
    .range([0, usableArea.width]);
  svg
    .append('g')
    .attr('transform', `translate(${usableArea.left},${usableArea.bottom})`)
    .call(d3.axisBottom(xScale));

  // Y axis: initialization
  let yScale = d3.scaleLinear().range([usableArea.height, 0]);
  let yAxis = svg.append('g');

  // A function that builds the graph for a specific value of bin
  function drawHist(nBins) {
    // set the parameters for the histogram
    let histogram = d3
      .bin()
      .value((d) => d.price)
      .domain(xScale.domain())
      .thresholds(xScale.ticks(nBins));

    // And apply this function to data to get the bins
    let bins = histogram(data);

    // Y axis: update now that we know the domain
    yScale.domain([
      0,
      d3.max(bins, function (d) {
        return d.length;
      }),
    ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(yScale));

    // Join the rect with the bins data
    svg
      .selectAll('rect')
      .data(bins)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('x', 1)
            .attr(
              'transform',
              (d) => `translate(${xScale(d.x0)},${yScale(d.length)})`,
            )
            .attr('width', (d) => xScale(d.x1) - xScale(d.x0) - 1)
            .attr('height', (d) => height - yScale(d.length))
            .style('fill', '#69b3a2'),
        (update) =>
          update
            .transition()
            .duration(1000)
            .attr(
              'transform',
              (d) => `translate(${xScale(d.x0)},${yScale(d.length)})`,
            )
            .attr('width', (d) => xScale(d.x1) - xScale(d.x0) - 1)
            .attr('height', (d) => height - yScale(d.length)),
      );
  }

  // Initialize with 20 bins
  drawHist(20);

  // Listen to the button -> update if user change it
  d3.select('#nBins').on('input', function () {
    drawHist(+this.value);
  });
}
