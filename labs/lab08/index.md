---
layout: assignment
title: 'Lab 8: Geospatial Visualizations'
lab: 8
parent: '👩‍🔬 Programming Labs'
released: true
---

# Lab {{ page.lab }}: Geospatial visualizations

{: .no_toc}

{: .summary}

> In this lab, we will:
>
> - Learn how to embed a Mapbox map into a webpage
> - Learn to add data-driven layers within a Mapbox canvas.
> - Learn to add custom SVG overlays on Mapbox maps and adapt to the map's panning and zooming
> - Practice creating visualizations with large datasets of real-world data, by importing, parsing, filtering and binding to elements on the page.

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Check-off

To get checked off for the lab, please record a 2 minute video with the following components:

1. Present your Mapbox visualization
2. Show you interacting with your map visualizations.
3. Share the most interesting thing you learned from this lab.

**Videos longer than 2 minutes will be trimmed to 2 minutes before we grade, so
make sure your video is 2 minutes or less.**

## What will we make?

In this lab, we will be building an immersive, interactive map visualization of bike traffic in the Boston area during different times of the day, shown in the screencast below:

<video src="videos/final.mp4" loop muted autoplay class="browser"></video>

- The underlying map shows Boston area roads and labels of neighborhoods. You can pan and zoom around as you would with services like Google Maps.
- The green lines show bike lanes. We will be importing two datasets from the city governments of Boston and Cambridge for this.
- The circles represent individual BlueBike stations. The size of each circle represents the amount of traffic at each station, while the color represents whether most traffic is entering or leaving the station. We will be using two datasets from BlueBikes to analyze bike traffic from about 260,000 individual rides from March 2024.
- There is a slider at the top right that allows the user to filter the data for traffic at specific times of the day, and the circles will change size and color accordingly.

There is a lot of room for styling and customization in this lab, and you are free to choose colors and themes that you prefer. So the screenshots and videos here are for reference only and your version can differ in appearance (but should be functionally the same!).

## Step 0: Start a new Svelte project

### Step 0.1: Create a new repository and push it to GitHub

In this lab, we will be working on a new project and thus a new repository (that we will subsequently list on our projects page).
Follow [step 1 of lab 4](../4/#step-1-setting-up) again to set up a new Svelte project with a new repo name this time. I called mine `bikewatching`, but you may want to get more creative with bike-related puns. 😉

### Step 0.2: Publish your new project to GitHub Pages

Also follow [step 3 from the same lab](https://vis-society.github.io/labs/4/#step-3-publishing-our-new-website-to-github-pages) to set up GitHub Pages for your new project.

### Step 0.3: Start local server

Run `npm run dev --open` to start the local server and open the project in your browser.

### Step 0.4: Edit `routes/+page.svelte`

Replace the content of `routes/+page.svelte` with a heading of your project name and a brief description of what it does.
Commit and push the change, and make sure the website updates accordingly.

### Step 0.5: Add basic styling

Create a CSS file for global styles in `src/lib` called `global.css` and add the following content:

```css
body {
  font: 100%/1.5 system-ui, sans-serif;
  display: flex;
  flex-flow: column;
  max-width: 80em;
  min-height: 100vh;
  box-sizing: border-box;
  margin: auto;
  padding: 1em;
}
```

Then, in your `src/routes/+page.svelte` file, import the CSS file by adding this in a `<style>` element:

```css
@import url('$lib/global.css');
```

At this point, you should be seeing something like this:

<img src="images/step-0.png" class="browser" alt="">

### Step 0.6: Add a bike favicon _(optional)_

To distinguish open tabs from your project, you can customize its _[favicon](https://en.wikipedia.org/wiki/Favicon)_.

In your `static` directory, add a `favicon.svg` file with the following content:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<text y=".9em" font-size="90">🚴🏼‍♀️</text>
</svg>
```

Feel free to use any emoji you want.
Then edit `src/app.html` to change `favicon.png` to `favicon.svg` here:

```html
<link rel="icon" href="%sveltekit.assets%/favicon.png" />
```

You may also want to add a `<title>` with your project title, as a fallback for pages that don't specify one.

It should look like this:
![](images/favicon.png)

{: .tip }
You can now delete `static/favicon.png` if you want to keep things tidy, since we’re not using it anymore.

## Step 1: My first map

### Step 1.0: Create a Mapbox account

Go to [Mapbox](https://www.mapbox.com/) and create an account [using your MIT email](https://www.mapbox.com/community/education).
We will be using the free service tier which carries no charge.

<!-- , but you still need to provide credit card information during the signup process (please reach out to the course staff if that may be a problem). Otherwise, the process of signing up should be straightforward. -->

After you sign up, make sure to verify your email.

### Step 1.1: Install Mapbox.js

In your project directory, run the following command to install the Mapbox.js library:

```bash
npm install mapbox-gl
```

### Step 1.2: Add an element to hold the map

We will largely follow the steps outlined in [Mapbox’s official docs about Svelte integration](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-svelte/).

Let’s create an element to receive our map and bind it to a variable (we’ll need to reference that when we tell Mapbox to create a map there):

```html
<div id="map" />
```

We also want to add some CSS to ensure the map will have sufficient height:

```css
#map {
  flex: 1;
}
```

Try giving the map a background color to make sure it’s taking up the space you expect:

<img src="images/map-empty.png" class="browser" alt="">

### Step 1.3: Import Mapbox and connect it to our account

In order to use Mapbox, we first need to import its JS and CSS.
In your `src/routes/+page.svelte` file, inside your `<script>` tag, add this:

```javascript
import mapboxgl from 'mapbox-gl';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
```

<!--
{: .tbd }
There is actually a named export `mapbox-gl/style` but I could not get it to work at all.
 -->

Then, we need to connect our account to it, by setting up our access token:

```js
mapboxgl.accessToken = 'your access token here';
```

To find your access token, you go to your account page on Mapbox:

<img src="images/access-token.png" class="browser">

{: .warning }
Make sure your repo is private before you push your access token to GitHub!

### Step 1.4: Create the map

To create the map, we create a new `mapboxgl.Map` object with [settings](https://docs.mapbox.com/mapbox-gl-js/api/map/) that specify things like:

- which HTML element will hold the map? (`container`) This can be either an element reference, or a string with the element’s ID (which is what we will use)
- What will the _basemap_ look like? (`style`)
- _Map extent_:
  - What latitude and longitude will the map be centered on? (`center: [longitude, latitude]`)
  - How zoomed in will the map start off and what will be the min & max zoom allowed? (`zoom`, `minZoom`, `maxZoom`)

We want to do that _only_ in the browser, so we will use the [`onMount` lifecycle function](https://learn.svelte.dev/tutorial/onmount), which we need to import separately from `svelte`:

```js
import { onMount } from 'svelte';

onMount(() => {
  let map = new mapboxgl.Map({
    /* options */
  });
});
```

In terms of what values to apply to options:

- For the container, we want to specify an id so we don't have to worry about element references.
- For the style, I used `"mapbox://styles/mapbox/streets-v12"` but you are welcome to choose any [other style](https://docs.mapbox.com/api/maps/styles/#classic-mapbox-styles) you like. Keep in mind that the busier the style, the harder it will be to see your data drawn on top of it.
- Map extent:
  - I used `12` for the zoom level (`zoom`)
  - You can use any centerpoint you like (I used MIT’s HQ), but it should be within the Cambridge & Boston area. See below for how to find the latitude and longitude of any location.

To find the coordinates of a location, you can enter it on Google Maps, and then right click and select the first option:

![](images/gps-copy.png)

Another way is via the URL, it's the part after the `@`:
![](images/gmaps-latlng.png)

Note that you will need to specify them in the reverse order, as [Mapbox expects longitude first](https://docs.mapbox.com/api/overview/#coordinate-format).

If everything went well, you should have a map of Boston already! 🎉

<img src="images/step-1.png" class="browser" alt="">

Try panning and zooming around to see the map in action.

Right click your map element and inspect it using the dev tools.
Notice how Mapbox has added a bunch of elements to the DOM to render the map,
including a `<canvas>` element that it uses to draw the map.

<img src="images/dev-tools-screenshot.png" alt="Dev tools">

Don't like how your map looks? Try the optional step below!

### Step 1.5: Customizing the map _(optional)_

The map style in its current form is quite functional as it shows a lot of useful waypoints and detail.
However, sometimes we'd like to create a more stylized map to create a cohesive design language across our website, or simply to draw readers in with a unique design.

Luckily, Mapbox provides a way to fully customize your map style using [**Mapbox Studio**](https://docs.mapbox.com/studio-manual/guides/).
To access Mapbox Studio, go back to your Mapbox account page and click "Create a map in Studio".

<img src="images/mapbox-studio-red-box.png" class="browser">

Next, create a new style.

<img src="images/new-style.png" class="inline">

From here, you are free to create a style however you'd like! As a starting point, many high quality map visualizations end up using a monochrome style, which you can find by clicking on "Classic template", then "Monochrome". Once you've selected a variant from the list of styles, click on the "Customize" buttom to add further customization, which will open up the actual studio, shown below.

<img src="images/mapbox-studio.png" class="browser">

Mapbox styles are made up of [layers](https://docs.mapbox.com/studio-manual/reference/styles/#layers) and [components](https://docs.mapbox.com/studio-manual/reference/styles/#components) (e.g. natural features, streets, points of interest, transit nodes, etc.). These items have properties which can be edited, such as the color or font, and can even be removed for a cleaner look.
For example, if you wanted to make the color of the bodies of water a more natural blue color in this monochrome example, you could click on the "Land & water _water_" layer in the left panel and simply adjust the color in the color picker.

<img src="images/mapbox-edit-property.png" class="browser">

Once you are done playing around with the style, you can [**publish it**](https://docs.mapbox.com/studio-manual/guides/publish-your-style/) so that it can be referenced in your code where you define the map, as you did in [Step 1.4](#step-14-create-the-map). To do so, click "Publish" in the top right corner of the studio interface.

Then, click on the three dots next to your style name to find the style URL (it will look something like this: `mapbox://styles/casillasenrique/clukyyerk007v01pb6r107k1o`).

<img src="images/copy-style.png">

Copy it and paste this URL in your `style` property when defining the `mapboxgl.Map` object. You should now see that your map uses your custom style!

<img src="images/studio-final-in-code.png" class="browser">

Now, each time you edit your map style in Mapbox Studio and re-publish it, the updated style will automatically be applied in your website (note that sometimes the style takes a couple of minutes to update after publishing).

## Step 2: Adding bike lanes

### Step 2.0: Getting familiar with the data

The City of Boston provides an [open dataset with bike lanes in the city](https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D).
The dataset is in [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) format, which is just JSON that follows a specific structure, designed to represent geographical data.

Download the dataset, open it in VS Code, and examine its structure.

{: .tip }
Try pressing <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open the command palette, and then select “Format document” to make the JSON more readable.

### Step 2.1: Import the data

Mapbox provides an `addSource` function to connect the map with an external data [source](https://docs.mapbox.com/mapbox-gl-js/api/sources/).
However, to use any of that, we first need to wait for the `"load"` event to fire on `map`.
To avoid nesting all our code in an event listener, we can instead convert our `onMount` function to an `async` function, and then add this after the map creation:

```js
await new Promise((resolve) => map.on('load', resolve));
```

After that we can add the source:

```js
map.addSource('boston_route', {
  type: 'geojson',
  data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D',
});
```

{: .fyi }
What is `boston_route`?
It’s just a name we made up to refer to this data source.
You can name it anything you want, but it should be unique to this source.

This won’t produce much of a visible result.
To actually _see_ something, we need to actually _use_ the data to draw something.

### Step 2.2: Drawing bike lanes on the map

One way to do that is to use the [`map.addLayer()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addlayer) method to add a [_layer_](https://docs.mapbox.com/style-spec/reference/layers/) to our map that visualizes the data source.

The this will look like this:

```js
map.addLayer({
  id, // A name for our layer (up to you)
  type, // one of the supported layer types, e.g. line, circle, etc.
  source: 'boston_route', // The id we specified in `addSource()`
  paint: {
    // paint params, e.g. colors, thickness, etc.
  },
});
```

You should experiment with the different types of layers and paint properties to see what you can come up with, but chances are you’ll settle on `"line"`,
to draw a network of bike routes as lines.

Without any painting properties (i.e. an empty `paint` object),
your map will look like this:
![](images/routes-unstyled.png).

### Step 2.3: Styling the bike lanes

You should look at the [reference](https://docs.mapbox.com/style-spec/reference/layers/#layer-sub-properties) to see what you can do with the `paint` property, but chances are you will need at least the following:

- `line-color` to set the color of the lines (see caveat below)
- `line-width` to make the lines thicker (default is `1`)
- `line-opacity` to make the lines translucent (0 is fully transparent, 1 is fully opaque). This is recommended so that the lines blend in to the rest of the map smoothly instead of obscuring it.

{: .caveat }
Mapbox does not yet understand newer color formats like `oklch()`.
You can see the [docs](https://docs.mapbox.com/style-spec/reference/types/#color) on what it accepts, but at the time of writing it's basically named colors (e.g. `green`), hex codes (e.g. `#32D400`), `hsl()` and `rgb()`.
You can convert any valid CSS color to the closest `rgb()` or `hsl()` equivalent using [this tool](https://colorjs.io/apps/convert).
If it shows two versions, you want the one marked "gamut mapped".

{: .caveat }
Since these are properties in a JS object, and they contain hyphens, we need to wrap them in quotes, e.g. `"line-color": "green"`, not `line-color: "green"`.

The exact styling is up to you. I went with a translucent `green` (40% opacity), and a line width of `3`, which looked like this:

<img src="images/bike-lanes-green.png" class="browser" alt="">

### Step 2.4: Adding Cambridge bike lanes

Notice that our map right now only shows bike lanes from Boston.
What about the numerous Cambridge ones?!

Fortunately, the City of Cambridge also provides [bike lane data as a GeoJSON file](https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson).

Follow a similar process as steps 2.0 - 2.3 to visualize Cambridge bike lanes as well.
It should look like this:

<img src="images/cambridge-routes.png" class="browser" alt="">

{: .further }
At this point, you have likely ended up specifying your line styles twice:
one in the Boston layer, and one in the Cambridge layer.
This means that if we want to tweak them, we need to do it as many times as our layers.
A good idea at this point (but entirely optional) is to specify the styling as a separate object that you reference in both places.

## Step 3: Adding bike stations

As you probably know, [Bluebikes](https://bluebikes.com/) is a bicycle sharing program in the Boston area.
They make many [datasets](https://bluebikes.com/system-data) publicly available, including real-time and historical data.
The first Bluebikes dataset we will use in this lab is station information, which is a JSON file with names, IDs and coordinates (among other info) for each station.

We have made a copy of this data in <a href="data/bluebikes-stations.csv" download markdown="1">`https://vis-society.github.io/labs/{{ page.lab }}/data/bluebikes-stations.csv`</a>.
This is a CSV file where every row has the following properties:

- `Number`: a code like "L32001"
- `NAME`: the station’s name, like "Railroad Lot and Minuteman Bikeway"
- `Lat`: the station’s latitude, e.g. 42.41606457
- `Long`: the station’s longitude, e.g. -71.15336637
- `Seasonal Status`: whether the station is seasonal or not with statuses like "Year Round", "Winter storage" etc.
- `Municipality`: e.g. "Cambridge", "Arligton", etc.
- `Total Docks`: the number of docks at the station as a number, e.g. 11

We will be using the latitude and longitude data to add markers to our map for each station.

While we _could_ use Mapbox’s `addSource()` and [`addLayer()`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addlayer) functions to plot the stations as another layer on the map canvas (like we just did with bike lanes), we will try a different approach here so we can learn how to combine the two visualization methods we have already learned: Mapbox and D3.
We will be adding an SVG layer on top of our map to hold the station markers, and use D3 to fetch and parse the data, and to draw the markers.

### Step 3.1: Fetching and parsing the CSV

Install `d3` as we have done before:

```bash
npm install d3
```

Then, in your `src/routes/+page.svelte` file, import `d3` and fetch the CSV file using `d3.csv()`, as we did in [the previous lab](../7/#step-11-reading-the-csv-file-in-d3).
You don’t need to download this file and include in your project, you can just fetch it directly from that URL.
Let’s call the variable that will hold the station data `stations`.

Make sure that the data is being fetched correctly by logging it to the console.
That way you can also explore its structure.

### Step 3.2: Overlaying SVG on the map

We will start by appending an `<svg>` element on our map container:

```html
<div id="map">
  <svg></svg>
</div>
```

If you preview your app right now, you won’t see anything different.
However, if you right click on the map, you should be able to see the `<svg>` element we just inserted in the dev tools:

<img src="images/svg.png" alt="">

However, it doesn’t have the right size: it’s just a small rectangle in the top left corner.
Worse yet, it’s actually rendered _under_ the map, which becomes obvious if we give it a background color:

```css
#map svg {
  background: yellow;
  opacity: 50%;
}
```

Let’s fix all of that, by applying the following declarations:

- `position: absolute` and `z-index: 1` so we can position it on top of the map (`z-index` does not work without positioning)
- `width: 100%` and `height: 100%` to make it fill the map container
- `pointer-events: none` so that we can still pan and move the map

Make sure you’re now seeing something like this:

![](images/svg-yellow.png)

And then remove the `background` and `opacity` declarations — they were only there as debugging aids, we don’t need them for the actual visualization.

### Step 3.3: Adding station markers

This step is similar to making the scatterplot in the previous lab:
we just need to append a bunch of circles to the SVG element, each representing a station.

The only tricky part here is positioning them so that they line up with the map.
Fortunately, Mapbox has a great built-in function [`map.project()`](https://docs.mapbox.com/android/maps/api/10.0.0-beta.12/-mapbox%20-maps%20-android/com.mapbox.maps/-mapbox-map/project.html), which takes longitude and latitude values and returns the relative map coordinates in pixels.

{: .fyi }
Why not just use D3 scales for this?
`map.project()` takes into account many things: panning, zooming, even rotation.
It’s certainly _possible_ to calculate this manually, but it’s nontrivial.

First, we need to move some of our variables outside the `onMount()` callback so that they are visible to the HTML template too.
So instead of doing this:

```js
onMount(async () => {
	let foo = /* calculate foo */
});
```

We now want to do this:

```js
let foo;

onMount(async () => {
	foo = /* calculate foo */
});
```

We need to do this for both `stations` (so we can loop over them in the HTML template),
and `map` (so we can use `map.project()` to calculate coordinates).
Initialize `stations` to `[]` so that you don’t get an error before the data is fetched.

Now let’s define a helper function to give the circle center from latitude and longitude for every station:

```js
function getCoords(station) {
  let point = new mapboxgl.LngLat(+station.Long, +station.Lat);
  let { x, y } = map.project(point);
  return { cx: x, cy: y };
}
```

In our template, we add an [`{#each}`](https://svelte.dev/docs/logic-blocks#each) block to loop over the stations and append an SVG `<circle>` for each one, very much like we did in the previous lab.
You can use any radius (`r` attribute) and fill/stroke color(s) you like (I used a radius of `5` and a fill of `steelblue`).

While we _could_ do something like this for the circle center:

```jsx
<circle
  cx={getCoords(station).cx}
  cy={getCoords(station).cy}
  r='5'
  fill='steelblue'
/>
```

A better way is to take advantage of a special syntax called [spread attributes](https://svelte.dev/docs/basic-markup#attributes-and-props:~:text=Spread%20attributes),
which allows us to set multiple attributes at once:

```jsx
<circle {...getCoords(station)} r='5' fill='steelblue' />
```

If everything went well, you should see something like this:

![](images/stations-static.png)

### Step 3.4: Adjusting station markers when map is zoomed/panned

Our map looks great when everything is stationary, but it all breaks down if we try to pan, zoom, rorate, or even resize the window: The stations are “stuck” in the same position like splatters on a window!

<video src="videos/splatters.mp4" loop muted autoplay></video>

To fix this, we need to reposition the stations every time the map moves.

{: .fyi }

> Normally, Svelte’s reactivity takes care of updating state whenever needed without us having to worry about it (beyond making statements reactive).
> However, because our code depends on _side effects_, Svelte’s reactivity does not work as expected.
> What are side effects in this context?
> When you look at `getCoords(station)`
> it looks like the result depends on `station` — and it does.
> But that’s not the full story.
> It also depends on things that are not visible by simply looking at the code, such as the current state of the map (zooming, panning, etc.).
> These are side effects.
> When the dependencies are not visible in the code, we need to take care of updating the state ourselves.

Mapbox fires many [events](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events) on `map` as we interact with it.
Most useful in this case is the [`move`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:move) event, which is fired whenever the map is moved (panned, zoomed, rotated, etc.).
But how do we force Svelte’s to re-run `getCoords()` when the `move` event fires?

Svelte provides a [`{#key}`](https://svelte.dev/docs/logic-blocks#key) block that can be used to force a re-render when a variable changes.
We can easily do that by defining a variable that we increment every time the `move` event is fired.
Let’s define our variable in the JS:

```js
let mapViewChanged = 0;
```

Then we use a `move` event listener (using Mapbox’s own `.on()` function for events):

```js
$: map?.on('move', (evt) => mapViewChanged++);
```

and then we wrap the code drawing the stations with:

```html
{#key mapViewChanged}
<!-- render stations here -->
{/key}
```

If everything went well, you should now see the stations move around as you pan and zoom the map:

<video src="videos/panning.mp4" loop muted autoplay></video>

{: .note }
Some of you may have wondered why we needed to use `{#key}` at all.
We _could_ have gotten the exact same result by adding `mapViewChanged` as a dummy parameter in `getCoords()`, i.e. pass it as an argument to the function even though the function does not use it in any way.
We just use `{#key}` because it makes our intent more clear, while the dummy parameter approach is more of a [hack](https://www.reddit.com/r/learnprogramming/comments/3cd0x4/what_constitutes_a_hack_or_hacky_code/) and could make it look like our code has a bug,
rather than this being intentional.
It also means it could break in the future if Svelte becomes smarter about detecting dependencies.

{: .further }
We are currently drawing all the stations in the Bluebikes network, even though we can only actually see a few.
You can explore tweaking the code to only draw stations that are currently visible on the map which should make it much faster.

## Step 4: Visualizing bike traffic

Marking the station position is nice, but doesn’t tell a very interesting story.
What patterns could we uncover if we set the size of the circles according to the amount of traffic at each station?

A copy of the Bluebikes traffic data from March 2024 is at <a href="data/bluebikes-traffic-2024-03.csv" download markdown="1">`https://vis-society.github.io/labs/{{ page.lab }}/data/bluebikes-traffic-2024-03.csv`</a>.
This is quite a large file (21 MB) containing more than 260,000 entries with the following fields:

- `ride_id`: A unique id of the ride
- `bike_type`: `electric` or `classic`
- `started_at`: the date and time the trip started in ISO 8601 format (e.g. `"2019-12-13 13:28:04.2860"`)
- `ended_at`: the date and time the trip ended in ISO 8601 format (e.g. `"2019-12-13 13:33:57.4370"`)
- `start_station_id`: the ID of the station where the trip started (e.g. `A32000`)
- `end_station_id`: the ID of the station where the trip ended (e.g. `A32000`)
- `is_member`: whether the rider is a member or not (`1` or `0`)

This is a cut down / simplified version of the dataset that Bluebikes provides to reduce filesize.

### Step 4.1: Importing and parsing the traffic data

Just like the previous step, we will use `d3.csv()` to fetch the traffic data.
You can fetch it directly from the URL, without hosting it yourself.
Let’s call the variable that will hold the traffic data `trips`.

### Step 4.2: Calculating traffic at each station

Now that we have read the data into a JS object, we can use it to calculate station traffic volumes (arrivals, departures, and total traffic per station).

As we have in the previous labs, we will use [`d3.rollup()`](https://d3js.org/d3-array/group#rollup) (or `d3.rollups()`) to calculate arrivals and departures.

First, we calculate them separately, like this:

```js
departures = d3.rollup(
  trips,
  (v) => v.length,
  (d) => d.start_station_id,
);
```

{: .note }
We are calculating `departures` and `arrivals` inside `onMount` since we only need to calculate them once.
However, you should make sure to declare the `arrivals` and `departures` variables _outside_ `onMount()` so you can access them in your reactive code later!

Now, we want to add `arrivals`, `departures`, `totalTraffic` properties to each station, which we can do like this after both `stations` and `trips` have loaded:

```js
stations = stations.map((station) => {
  let id = station.Number;
  station.arrivals = arrivals.get(id) ?? 0;
  // TODO departures
  // TODO totalTraffic
  return station;
});
```

{: .tip }
You can log `stations` in the console after to make sure the properties have been added correctly.

### Step 4.3: Size markers according to traffic

Now, we can use this data structure to size the markers on the map according to the traffic at each station.
Currently, all our circle radii are hardcoded.
We should decide what the minimum and maximum radius should be (I went with `0` and `25`),
and then create a D3 scale to map our data domain `[0, d3.max(stations, d => d.totalTraffic)]` to this range of circle radii.

However, there is a catch: if we just use a linear scale to calculate the circle’s radius,
we will end up misrepresenting the data: for example, stations that have double the traffic would appear 4 times larger since the area of a circle is proportional to the square of its radius (A = πr²).
We want to use the circle _area_ to visualize the variable, not the circle _radius_.

To fix this, we will use a different type of scale: a [square root scale](https://d3js.org/d3-scale/pow#scaleSqrt).
A square root scale is a type of power scale that uses the square root of the input domain value to calculate the output range value.

{: .note }
If you did the optional [step 4 in the previous lab](../7/#step-4-communicating-lines-edited-via-the-size-of-the-dots-optional) you will be familiar with this already.

Thankfully, the API is very similar to the linear scale we used before,
the only thing that changes is that we use a different function name:

```js
$: radiusScale = d3
  .scaleSqrt()
  .domain([0, d3.max(stations, (d) => d.totalTraffic)])
  .range([0, 25]);
```

Then, we can use this scale to calculate the radius of each circle in the SVG by passing the station traffic as a parameter to `radiusScale()`.

If we look at our map right now, it looks like this:

![](images/station-traffic-1.png)

Because our dots are opaque and overlapping, it’s hard to see the actual traffic patterns.
Add a CSS rule for `circle` inside your `svg` rule, and experiment with different `fill-opacity` values and strokes to improve this.
I used a `steelblue` fill, a `fill-opacity` of 60%, and a `stroke` of `white`, and this was the result:
![alt text](images/stations-stroke.png)

### Step 4.4: Adding a tooltip with exact traffic numbers _(optional)_

In addition to providing additional info, it helps us debug as well to be able to see the number of trips that each circle represents.
We _could_ add a tooltip in the same way we did in [the previous lab](../7/#step-3-adding-a-tooltip) but that’s fairly involved.
Here we will do the quick and dirty way and use the default browser tooltips.
To create those, all it takes is adding a `<title>` element inside each `<circle>` element with the number of trips:

```html
<circle>
  <!-- (omitting attributes for brevity) -->
  <title>
    {station.totalTraffic} trips ({station.departures} departures, {
    station.arrivals} arrivals)
  </title>
</circle>
```

We have applied `pointer-events: none` to the whole `<svg>`, so to be able to see our tooltips we need to override that on circles, by adding `pointer-events: auto` to our CSS rule for `circle`.

![](images/title-tooltip.png)

{: .further }
If you want to go even further, you could explore adding a nicer tooltip, with more advanced information.

{: .caveat }
Note that _both_ SVG and HTML have a `<title>` element, but they are false friends, as they do different things!

## Step 5: Interactive data filtering

Even with the styling improvements, it’s hard to make sense of all this data as currently displayed all at once.
Let’s add some interactive filtering with a slider for arrival/departure time.

### Step 5.1: Adding the HTML and CSS for the slider

The first step is to add the HTML for our time filter, which includes the following elements:

- A slider (`<input type=range>`) with a min of -1 (no filtering)
  and a max of 1440 (the number of minutes in the day).
- A `<time>` element to display the selected time.
- An `<em>(any time)</em>` element that will be shown when the slider is at -1.
- A `<label>` _around_ the slider and `<time>` element with some explanatory text (e.g. "Filter by time:").

Where you put it on the page is up to you.
I added it under the `<h1>` and wrapped both with a `<header>`, to which I applied a `display: flex`, `gap: 1em`, and `align-items: baseline` to align them horizontally,
then gave the label a `margin-left: auto` to push it all the way to the right.

Make sure to place the `<time>` and `<em>` on their own line (e.g. via `display: block`) otherwise the contents of the `<time>` updating will move the slider and it will look very jarring.

You would also want to style the `<em>` differently, e.g. with a lighter color and/or italic, to make it clear that it’s a different state.

Here is a sample rendering of what you should have at this point:

<img src="images/slider-static.png" alt="" class="browser">

### Step 5.2: Reactivity

Now that we've added our static HTML and CSS, let’s connect it with our code
by having the slider update a variable that we can use to filter the data
and outputting the currently selected time in the `<time>` element.

First, let’s create a variable to hold the slider value, called `timeFilter`,
that we initialize to `-1` so that no filtering is done by default.

```js
let timeFilter = -1;
```

Then we can use [`bind:value`](https://svelte.dev/docs/element-directives#bind-property) on the slider to reactively update `timeFilter` as the slider is moved.

Lastly, we need to display the selected time in the `<time>` element,
which also serves as validation that we’ve done the plumbing correctly.

For that, let’s define a reactive variable that converts the number of minutes since midnight to a human-readable time string (using [`date.toLocaleString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)):

```js
$: timeFilterLabel = new Date(0, 0, 0, 0, timeFilter).toLocaleString('en', {
  timeStyle: 'short',
});
```

Then, all we need to do is print out `timeFilterLabel` via a reactive expression (`{}`) in the `<time>` element.

It looks like this now:

![](images/slider.gif)

Lastly, we want to display the `<em>` element only when the slider is at `-1` and the `<time>` only when it is not, using a [Svelte `{#if}` block](https://svelte.dev/docs/logic-blocks#if).

### Step 5.3: Filtering the data

Our slider now _looks_ like a filter, but doesn’t actually _do_ anything.
To make it work there are a few more things we need to do:

1. Writing out the logic to filter the data, by creating `filteredXXX` versions of each of our root variables:
   1. A `filteredTrips` data structure that contains the trips that correspond to the filter.
   2. `filteredArrivals` and `filteredDepartures` data structures that contain the `arrivals` and `departures` data after filtering.
   3. A `filteredStations` data structure with stations that contain data that corresponds to the filter (i.e. filtered arrivals, departures, and total traffic).
2. Updating our HTML template to use these new data structures instead of the original ones.

The trip data includes dates and times as strings, which are not directly comparable to the number of minutes since midnight that we have from the slider.
To compare the two, we need to convert the date and time strings to a number of minutes since midnight.

We will do this in two steps.
First, we will replace the start and end date strings of each trip with [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects.

We only need to do this once, so we can do this in `onMount()`, right after `trips` has been fetched.
Since `trips` is such a large dataset, we want to avoid setting it twice, so we will instead use the [`then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method of the `Promise` returned by `d3.csv()` to do this:

```js
trips = await d3.csv(TRIP_DATA_URL).then(trips => {
	for (let trip of trips) {
		trip.started_at = /* ...
		... */
	}
	return trips;
});
```

To convert each time and date string, we just do `new Date(dateTimeString)` (assuming `dateTimeString` is the date & time string we are trying to convert).

Now, we can define a function that takes a `Date` object and returns the number of minutes since midnight:

```js
function minutesSinceMidnight(date) {
  return date.getHours() * 60 + date.getMinutes();
}
```

Then, we can use this function to filter the data to trips that started or ended within 1 hour before or after the selected time:

```js
$: filteredTrips =
  timeFilter === -1
    ? trips
    : trips.filter((trip) => {
        let startedMinutes = minutesSinceMidnight(trip.started_at);
        let endedMinutes = minutesSinceMidnight(trip.ended_at);
        return (
          Math.abs(startedMinutes - timeFilter) <= 60 ||
          Math.abs(endedMinutes - timeFilter) <= 60
        );
      });
```

Now, we need to create new data structures that correspond to `arrivals`, `departures`, and `stations` but _only_ for the filtered trips.
We can call them `filteredArrivals`, `filteredDepartures`, and `filteredStations`.

For `filteredArrivals` and `filteredDepartures`, all we need to do is copy the statements that set the original variables (`arrivals` and `departures`), convert them to reactive statements, and replace `trips` with `filteredTrips`.

For `filteredStations`, we don’t actually need to do any filtering of the `stations` array (since it’s unlikely that there are stations with zero arrivals and departures for a given time), but we do need an array that contains updated data for `station.arrivals`, `station.departures` and `station.totalTraffic` that correspond to the filtered trips.

{: .caution }

> This is where we need to be careful: if we simply do `$: filteredStations = stations.map(station => {...})` and set properties on `station`, we will have modified our original station objects since [in JS, objects are passed around by reference](https://dev.to/bbarbour/passed-by-reference-vs-value-in-javascript-2fna)!
> To avoid this, before we set any property on these objects, we need to _clone_ them.
> We can do that by doing this before we modify `station`:
>
> ```js
> station = { ...station };
> ```

Last, we want to have bigger circles, since there's fewer data.
We can do that by changing the scale when a filter is applied,
by making the scale conditional, i.e. instead of using a static `[0, 25]` as the range,
we use `[0, 25]` when `timeFilter` is `-1` and e.g. `[3, 50]` otherwise.
You will find the [conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) useful for this.

The result right now should look like this:

<video src="videos/filtering.mp4" class="browser" loop autoplay muted></video>

### Step 5.4: Performance optimizations _(optional if you don't have this problem)_

Notice that moving the slider now does not feel as smooth as it did before we implemented the filtering.
This is because every time we move the slider, we filter the trips, which is a relatively expensive operation given that we have over a quarter of a million of them!
Worse, every time we do this filtering, _nothing else can happen_ until the filtering ends, including things like the browser updating the slider position!
This is commonly referred to as _"blocking the main thread"_.

There are many ways to improve this.
[_Throttling_ and _debouncing_](https://css-tricks.com/debouncing-throttling-explained-examples/) are two common techniques to limit the rate at which a certain (expensive) piece of code is called in response to user action.

These are "brute force" in the sense that they work regardless of what the expensive operation or the user action is, but they can adversely affect the user experience, since they make the UI update less frequently.
However, depending on the case, there are often ways to optimize the operation itself (e.g. by caching repetitive work), without any negative impact on the user experience.

In this case, we can make the filtering a lot less expensive by presorting the trips into 1440 "buckets", one for each minute of the day.
Then, instead of going over 260 K trips every time the slider moves, we only need to go over the trips in the 120 buckets corresponding to the selected time.

We start by defining two top-level variables to hold the departure and arrival "buckets",
which will be arrays with 1440 elements initially filled with empty arrays:

```js
let departuresByMinute = Array.from({ length: 1440 }, () => []);
let arrivalsByMinute = Array.from({ length: 1440 }, () => []);
```

Then, in `onMount()`, in the same callback where we converted `trip.started_at` and `trip.ended_at` to `Date` objects, we add:

```js
let startedMinutes = minutesSinceMidnight(trip.started_at);
departuresByMinute[startedMinutes].push(trip);

// TODO: Same for arrivals
```

{: .note }
Why not use `d3.group()` or `d3.groups()`?
These return different data structures and as you will see below,
using an array of arrays simplifies our code a lot as we can use [`array.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) to get a whole time range.

Now let’s use our awesome new data structures to make our code faster!

First, we can get rid of `filteredTrips`, as we will be calculating `filteredDepartures` and `filteredArrivals` directly from `departuresByMinute` and `arrivalsByMinute` respectively.

Let’s discuss calculating `filteredDepartures` and you can apply the same logic to `filteredArrivals`.
For a first approximation, we can replace `filteredTrips`, with `departuresByMinute.slice(timeFilter - 60, timeFilter + 60).flat()`.

There are two methods in this you may not have seen before:

- [`array.slice(start, end)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) returns a new array with the elements from `start` (inclusive) to `end` (exclusive).
- [`array.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) "flattens" an array of arrays, so that the result is a single array with all the elements of the subarrays.

Let’s now enjoy the fruits of our labor by moving the slider _really fast_ — it should now be smooth as butter! (or at least, much smoother than before)

But …there is one bug. Can you spot it?
Our code works great for times between 1 AM and 11 PM.
However for times where the 2 hour window spans midnight, it doesn’t work so well:
`minMinute` will be negative, or `maxMinute` will be greater than 1440.
While `array.slice()` actually does accept negative numbers and numbers greater than the array length, it doesn’t do what we want in this case.

In these cases, we basically want _two_ separate `array.slice()` operations:
one for the times before midnight and one for those after,
that we then combine.

Let’s create a helper function to do just that:

```js
function filterByMinute(tripsByMinute, minute) {
  // Normalize both to the [0, 1439] range
  // % is the remainder operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
  let minMinute = (minute - 60 + 1440) % 1440;
  let maxMinute = (minute + 60) % 1440;

  if (minMinute > maxMinute) {
    let beforeMidnight = tripsByMinute.slice(minMinute);
    let afterMidnight = tripsByMinute.slice(0, maxMinute);
    return beforeMidnight.concat(afterMidnight).flat();
  } else {
    return tripsByMinute.slice(minMinute, maxMinute).flat();
  }
}
```

Then, in the calculation for `filteredDepartures`, we use `filterByMinute(departuresByMinute, timeFilter)` instead of our previous `filteredDepartures.slice().flat()` operation.
Don't forget to do the same for `filteredArrivals`!

<!--
["Debounce"](https://css-tricks.com/debouncing-throttling-explained-examples/) is a technique to limit the rate at which a certain (expensive) piece of code is called in response to user action.
Instead of immediately running the code, we wait a certain amount of time to see if the user is done interacting, and only then do we run it.

{: .tip }
You can find a basic demo of using debouncing in Svelte [here](https://svelte.dev/repl/f55e23d0bf4b43b1a221cf8b88ef9904?version=3.12.1)

For large delays, debouncing can adversely affect the interaction, as the user will not see the result of their actions until they stop the action (e.g. stop moving the slider).
However, we can make the delay as small as the screen refresh rate (~16ms) to make the interaction feel smooth.
In fact, there is even a dedicated function for this on the web platform: [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) which schedules some code to run on the next repaint, and its complement [`cancelAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/cancelAnimationFrame) which cancels this.

How does this kind of debouncing look in Svelte?
Instead of doing this:

```js
$: foo = someExpensiveOperation(bar);
```

We do this:

```js
let foo, rAF;
$: {
	cancelAnimationFrame(rAF);
	rAF = requestAnimationFrame(() => {
		foo = someExpensiveOperation(bar);
	});
}
```

{: .caveat }
> These functions are only available in browsers, not Node.js, so you need to put this at the start of your JS code to avoid errors while Svelte attempts to run your code at build time:
> ```js
> globalThis.requestAnimationFrame ??= fn => setTimeout(fn, 1000 / 60);
> globalThis.cancelAnimationFrame ??= clearTimeout;
> ```

Can you try to apply this logic to the filtering operation?
-->

If everything goes well, it should now look like this:

<video src="videos/optimized.mp4" class="browser" loop autoplay muted></video>

Here they are side by side:

<figure markdown="1">
<video src="videos/filtering.mp4" loop autoplay muted></video>
<video src="videos/optimized.mp4" loop autoplay muted></video>
<figcaption>
Left: original, Right: optimized
</figcaption>
</figure>

## Step 6: Visualizing traffic _flow_

Currently, we are visualizing traffic volume at different times of the day, but traffic direction also changes!
In the morning, stations in downtown and near MIT campus tend to have a lot of arrivals, while in the evening they tend to see a lot of departures.

In this step, we will use circle color to visualize traffic flow at different times of the day.

### Step 6.1: Make circle color depend on traffic flow

While it may seem that using a continuous color scale gives us more information,
humans are very poor at associating continuous color scales with quantitative data
(as we will see in the upcoming Color lecture),
so using only three colors will actually make the traffic flow trends more salient.

To do this, we will use a [_quantize scale_](https://d3js.org/d3-scale/quantize), which is like a linear scale but with a discrete output range.
We will use this scale to map a continuous number from 0 to 1 to a discrete number in the array `[0, 0.5, 1]`.
It looks like this:

```js
let stationFlow = d3.scaleQuantize().domain([0, 1]).range([0, 0.5, 1]);
```

Notice that this is not a reactive statement, since it does not depend on any variables.

Then, on our circles, we calculate the ratio of departures to total traffic,
map it to our discrete scale, and assign the result to a CSS variable:

```html
<!-- Other attributes ommitted for brevity -->
<circle
  style="--departure-ratio: { stationFlow(station.departures / station.totalTraffic) }"
></circle>
```

Then, in our CSS rule for `circle` we can use this variable to set the fill color:

```css
--color-departures: steelblue;
--color-arrivals: darkorange;
--color: color-mix(
  in oklch,
  var(--color-departures) calc(100% * var(--departure-ratio)),
  var(--color-arrivals)
);
fill: var(--color);
```

If everything went well, our current map looks like this:

<video src="videos/traffic-flow.mp4" loop muted autoplay></video>

### Step 6.2: Adding a legend

Our visualization looks pretty cool, but it’s very hard to understand what the three colors mean.
We can fix this by adding a legend to the map.

Let’s first add some HTML for the legend _after_ our map container:

```html
<div class="legend">
  <div style="--departure-ratio: 1">More departures</div>
  <div style="--departure-ratio: 0.5">Balanced</div>
  <div style="--departure-ratio: 0">More arrivals</div>
</div>
```

There are many ways to style this as a legend, but the following apply to most of them:

- Move the `--color-departures`, `--color-arrivals`, and `--color` variables to a new rule so that it applies to both `#map circle` and `.legend > div`.
- Apply flexbox to the legend container to align the items horizontally.
- Apply `margin-block` to the legend container to give it some space from the map.

Here are some example styles and a few pointers on how to implement them, but you’re welcome to experiment and come up with your own design:

#### Design 1: Blocks

![](images/legend-blocks.png)

One advantage of this is that it generalizes more nicely to more than 3 colors,
and it’s fairly simple.

- Here each child `<div>` has `flex: 1` to make them take up equal space.
- The gap is only `1px`; just enough to prevent the colors from touching.
- Note that `text-align` is different for each swatch.
- Specify significantly more horizontal padding than vertical, otherwise they will not look even
- If you have used different colors, make sure to pick the text color accordingly to ensure sufficient contrast.

#### Design 2: Separate swatches & labels

![](images/legend-swatches.png)

This is a little more advanced but looks much more like an actual legend.
One downside of it is that it’s harder to generalize to more than 3 colors,
as it looks like a legend for a categorical variable.

- Uses a [`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) pseudo-element with `content: ""` to create the swatches.
- Uses an additional element for the "Legend:" label
- Each child `<div>` _also_ uses flexbox
- Make sure the gap on child `<div>` is _significantly_ smaller than the gap on the parent `.legend` to create the effect of the swatches being connected to the labels ([design principle of _proximity_](https://www.nngroup.com/articles/gestalt-proximity/)).

Here is the final result:

<video src="videos/final.mp4" loop muted autoplay class="browser"></video>

## Step 7: Add your new project to your list of projects!

Now that you have made this cool app to visualize bike traffic in the Boston area, time to claim credit for your work!
Go back to your portfolio website, and add a new entry for this project, with a nice screenshot.

You should also add a `url` field to each project, and add a link to it in the template (for projects that have a `url` field).
