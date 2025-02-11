// See original API call:
// https://open-meteo.com/en/docs#latitude=32.87765&longitude=-117.237396&current=&minutely_15=&hourly=temperature_2m&daily=&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&models=

// Note from Sam: I ran this code to get the data for the weather at Center
// Hall, then saved the JSON as a file called weather-data.json.

// const params = {
//   latitude: 32.87765,
//   longitude: -117.237396,
//   hourly: 'temperature_2m',
//   temperature_unit: 'fahrenheit',
//   wind_speed_unit: 'mph',
//   precipitation_unit: 'inch',
//   timezone: 'America/Los_Angeles',
// };
// const url = 'https://api.open-meteo.com/v1/forecast';

// const queryString = new URLSearchParams(params).toString();
// const fullUrl = `${url}?${queryString}`;

// fetch(fullUrl)
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// Online, you will probably encounter tutorials that use a different method to
// install JS packages like npm. npm is certainly useful for larger projects
// that involve many JS packages but also has a more complicated process for
// deploying pages to the web. For simple projects, you can just download the
// packages you need from jsdelivr.net. The line below downloads a recent
// version of D3 and makes it available to the script, almost as though you ran
// `npm install d3` locally.
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

async function loadWeatherData() {
  try {
    const response = await fetch('./weather-data.json');
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error loading weather data:', error);
  }
}

const weatherData = await loadWeatherData();
console.log(weatherData);

const svg = d3.select('#weather-plot');

// Set the dimensions and margins of the graph. The margin values are important
// since without them, the plot won't have space for the axis labels.
const width = 1000;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

svg.attr('width', width);
svg.attr('height', height);

// Create scales. Scales in D3 are super-important to understand! The basic task
// in creating a visualization is to map data to the visual properties of the
// plot --- what we call _visual encoding_. For example, we want to map the
// timestamps to the x-axis so that the earlier timestamps are at the left of
// the plot (small x-values) and the later timestamps are at the right of the
// plot (large x-values). The expression below creates a scale that maps the
// timestamps to the x-axis. At its core, a scale is a function that takes a
// value from the domain and maps it to a value in the range. For example, after
// defining the variable below, we can use it like this:
//
// xScale(new Date('2025-01-27T00:00')) -> 40
// xScale(new Date('2025-01-28T00:00')) -> 100
// xScale(new Date('2025-01-29T00:00')) -> 160
//               (and so on...)
//
// The scale is linear, which means that the mapping is proportional. For
// example, the difference between January 27 and January 28 is 60 pixels, but
// the difference between January 28 and January 29 is also 60 pixels. (It won't
// actually be exactly 60 pixels, but you get the idea.)
//
// Also notice that the range of the xScale goes from margin.left to width -
// margin.right. If we set the range to [0, width], then the plot would be flush
// against the left and right margins, leaving no space for the y-axis labels.
const xScale = d3
  .scaleTime()
  .domain([
    new Date(weatherData.hourly.time[0]),
    new Date(weatherData.hourly.time[weatherData.hourly.time.length - 1]),
  ])
  .range([margin.left, width - margin.right]);

// Same deal here for the y-axis scale. Notice that the range goes from
// height - margin.bottom to margin.top. This is because we want larger
// temperatures to be at the top of the plot, which means we need SMALLER
// y-values.
const yScale = d3
  .scaleLinear()
  .domain([
    d3.min(weatherData.hourly.temperature_2m),
    d3.max(weatherData.hourly.temperature_2m),
  ])
  .range([height - margin.bottom, margin.top]);

// Another side benefit of having scales is that we can use them to create
// axes. The axisBottom function creates a bottom-aligned axis, which means the
// axis labels will be at the bottom of the plot. The ticks function specifies
// how many ticks to show on the axis, and the tickFormat function specifies the
// format of the tick labels.
const xAxis = d3
  .axisBottom(xScale)
  .ticks(d3.timeDay) // Show ticks for each day
  .tickFormat(d3.timeFormat('%m/%d')); // Format as month/day

// But even if we don't set ticks and tickFormat, the axis will still be
// created with sensible defaults.
const yAxis = d3.axisLeft(yScale);

// To actually draw the axes, we need to create a group element (<g>) as a
// container for the axis and then append it to the SVG element. We also need to
// set the transform property to position the axis at the bottom of the plot.
// Finally, the .call() function tells d3 to actually draw the axis components
// (ticks, tick labels, etc.) in the group element.
svg
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0, ${height - margin.bottom})`)
  .call(xAxis);

svg
  .append('g')
  .attr('class', 'y axis')
  .attr('transform', `translate(${margin.left}, 0)`)
  .call(yAxis);

// Since we want to add a tooltip to the plot, we need to create a div element
// and append it to the body of the HTML document. We'll also make it invisible
// at first so that it doesn't show up on the screen, then later when the user
// hovers over a data point, we'll make it visible.
const tooltip = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('position', 'absolute')
  .style('visibility', 'hidden')
  .style('background-color', 'white')
  .style('border', '1px solid #ddd')
  .style('padding', '5px')
  .style('border-radius', '3px');

// We'll also add a vertical line to the plot that will be used to indicate
// the position of the mouse cursor.
const verticalLine = svg
  .append('line')
  .attr('class', 'hover-line')
  .attr('y1', margin.top)
  .attr('y2', height - margin.bottom)
  .style('stroke', '#999')
  .style('stroke-width', 1)
  .style('visibility', 'hidden');

// To capture mouse events, we need to create a rect element that covers the
// entire plot. We could have just used the SVG element itself, but this is a
// more general solution that would work for any plot. It also has the benefit
// of allowing us to capture events on the plot but not on the axis labels,
// which we wouldn't be able to do if we used the SVG element itself.
const overlay = svg
  .append('rect')
  .attr('class', 'overlay')
  .attr('x', margin.left)
  .attr('y', margin.top)
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .style('fill', 'none')
  .style('pointer-events', 'all');

// Now we can add event listeners to the overlay for interactivity.
//
// 1. On mouseover, we'll show the vertical line and tooltip.
// 2. On mouseout, we'll hide the vertical line and tooltip.
// 3. On mousemove, we'll update the position of the vertical line and tooltip.
//    In order to update the tooltip text, we'll need to find the closest data
//    point to the mouse cursor. We can do this by using the xScale to convert
//    the mouse position to a date, then using the bisector function to find the
//    index of the closest date in the weatherData.hourly.time array.
overlay
  .on('mouseover', () => {
    // [1]
    verticalLine.style('visibility', 'visible');
    tooltip.style('visibility', 'visible');
  })
  .on('mouseout', () => {
    // [2]
    verticalLine.style('visibility', 'hidden');
    tooltip.style('visibility', 'hidden');
  })
  .on('mousemove', function (event) {
    // [3]
    const mouseX = d3.pointer(event)[0];
    const xDate = xScale.invert(mouseX);

    // Find the closest data point
    const bisect = d3.bisector((d) => new Date(d)).left;
    const index = bisect(weatherData.hourly.time, xDate);
    const temp = weatherData.hourly.temperature_2m[index];
    const time = new Date(weatherData.hourly.time[index]);

    // Update vertical line position
    verticalLine.attr('x1', xScale(time)).attr('x2', xScale(time));

    // Update tooltip
    tooltip
      .style('top', event.pageY - 10 + 'px')
      .style('left', event.pageX + 10 + 'px')
      .html(`${temp.toFixed(1)}°F<br>${time.toLocaleTimeString()}`);

    // Highlight the closest circle
    svg.selectAll('circle').attr('r', (d) => (d === temp ? 4 : 2));
  });

// This is the code that actually draws the circles for the scatter plot.
svg
  .selectAll('circle')
  .data(weatherData.hourly.temperature_2m)
  .join('circle')
  .attr('cx', (d, i) => xScale(new Date(weatherData.hourly.time[i])))
  .attr('cy', (d) => yScale(d))
  .attr('r', 2);
