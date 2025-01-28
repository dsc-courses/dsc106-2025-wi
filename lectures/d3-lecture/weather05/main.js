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

// automatically download d3 from cdn
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

const width = 1000;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

svg.attr('width', width);
svg.attr('height', height);

// Create scales
const xScale = d3
  .scaleTime()
  .domain([
    new Date(weatherData.hourly.time[0]),
    new Date(weatherData.hourly.time[weatherData.hourly.time.length - 1]),
  ])
  .range([margin.left, width - margin.right]);

const yScale = d3
  .scaleLinear()
  .domain([
    d3.min(weatherData.hourly.temperature_2m),
    d3.max(weatherData.hourly.temperature_2m),
  ])
  .range([height - margin.bottom, margin.top]);

// Create axes and labels
const xAxis = d3
  .axisBottom(xScale)
  .ticks(d3.timeDay) // Show ticks for each day
  .tickFormat(d3.timeFormat('%m/%d')); // Format as month/day

const yAxis = d3.axisLeft(yScale);

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

// Add tooltip div to the body
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

// Add a vertical line for hover indication
const verticalLine = svg
  .append('line')
  .attr('class', 'hover-line')
  .attr('y1', margin.top)
  .attr('y2', height - margin.bottom)
  .style('stroke', '#999')
  .style('stroke-width', 1)
  .style('visibility', 'hidden');

// Create a rect overlay for mouse tracking
const overlay = svg
  .append('rect')
  .attr('class', 'overlay')
  .attr('x', margin.left)
  .attr('y', margin.top)
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .style('fill', 'none')
  .style('pointer-events', 'all');

// Replace the circle mouse events with overlay mouse events
overlay
  .on('mouseover', () => {
    verticalLine.style('visibility', 'visible');
    tooltip.style('visibility', 'visible');
  })
  .on('mouseout', () => {
    verticalLine.style('visibility', 'hidden');
    tooltip.style('visibility', 'hidden');
  })
  .on('mousemove', function (event) {
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

// Remove the previous mouse events from circles
svg
  .selectAll('circle')
  .data(weatherData.hourly.temperature_2m)
  .join('circle')
  .attr('cx', (d, i) => xScale(new Date(weatherData.hourly.time[i])))
  .attr('cy', (d) => yScale(d))
  .attr('r', 2);
