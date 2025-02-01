<script>
	import * as d3 from 'd3';
	let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
	let arc = arcGenerator({
		startAngle: 0,
		endAngle: 2 * Math.PI
	});
	export let selectedIndex = -1;
	export let data = [];
	//let sliceGenerator = d3.pie().value((d) => d.value);
	let arcData;
	let arcs;
	let colors = d3.scaleOrdinal(d3.schemeTableau10);

	// Reactive statement to generate slice data from data
	$: arcData = d3.pie().value((d) => d.value)(data);

	// Reactive statement to generate SVG path commands for each slice
	$: arcs = arcData.map((d) => arcGenerator(d));

	function handleWedgeClick(index) {
		selectedIndex = selectedIndex === index ? -1 : index;
	}
	function toggleWedge(index, event) {
		if (!event || event.key === 'Enter') {
			selectedIndex = selectedIndex === index ? -1 : index;
		}
	}
</script>

<div class="container">
	<svg viewBox="0 0 100 100">
		{#each arcs as arc, i}
			<path
				transform="translate(50, 50)"
				d={arc}
				fill={colors(i)}
				tabindex="0"
				role="button"
				aria-label={`Select ${data[i].label} segment`}
				class:selected={selectedIndex === i}
				on:click={() => handleWedgeClick(i)}
				on:keyup={(e) => e.key === 'Enter' && toggleWedge(i)}
			/>
		{/each}
	</svg>

	<ul class="legend">
		{#each data as d, index}
			<li class:selected={selectedIndex === index}>
				<span
					class="swatch"
					style="--color: {selectedIndex === index ? 'var(--selected-color)' : colors(index)};"
				></span>
				{d.label} <em>({d.value})</em>
			</li>
		{/each}
	</ul>
</div>

<style>
	:root {
		--selected-color: oklch(60% 45% 0);
	}
	svg {
		max-width: 20em;
		margin-block: 2em;
		flex-shrink: 0; /* Prevents the SVG from shrinking */
		width: 50%; /* Example fixed width, adjust as needed */
		height: auto; /* Maintains aspect ratio */
		/*display: block; /* Ensures SVG is centered in its parent */
		/*margin-left: auto; */
		/*margin-right: auto;*/
	}

	svg:has(path:hover, path:focus-visible) {
		path:not(:hover, :focus-visible) {
			opacity: 0.5;
		}
	}

	path {
		cursor: pointer;
		transition: opacity 300ms; /* Smooth transition for the opacity change */
		outline: none;
	}

	.legend {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		justify-content: center; /* Adjust this as needed */
		gap: 1em;
		list-style-type: none;
		padding: 1em; /* Padding inside the legend for spacing */
		margin: 2em 0; /* Margin around the legend for separation from other content */
		border: 1px solid #d3d3d3; /* Elegant, light grey border */
		border-radius: 8px; /* Softly rounded corners for a modern look */
		max-width: 25em;
	}

	.legend li {
		display: flex;
		align-items: center;
		gap: 0.5em; /* Smaller gap for items within each li for proximity */
		align-items: center; /* Vertically centers items within the legend entry */
		flex: 1 1 auto; /* Allows the item to grow and shrink, but starts with the content's natural size */
	}

	.swatch {
		width: 1em;
		height: 1em;
		aspect-ratio: 1 / 1;
		background-color: var(--color);
		display: inline-block;
		margin-right: 0.5em; /* Space between the swatch and label */
	}
	.container {
		display: flex;
		gap: 2rem;
		align-items: center; /* Align items at the start or remove if not needed */
	}

	.selected {
		--color: var(--selected-color) !important;
	}

	path.selected {
		fill: var(--color) !important;
	}

	.legend li.selected {
		--color: oklch(30% 85% 0) !important;
	}
</style>
