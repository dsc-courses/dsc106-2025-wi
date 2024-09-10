<script>
    import * as d3 from "d3";
    export let dataProp = [];
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let sliceGeneratorProp = d3.pie().value((d) => d.value);
    // let pieDataProp = sliceGeneratorProp(dataProp);
    // let slicesProp = pieDataProp.map((d) => arcGenerator(d));
    $: pieDataProp = sliceGeneratorProp(dataProp);
    $: slicesProp = pieDataProp.map((d) => arcGenerator(d));
    let colorsProp = d3.scaleOrdinal(d3.schemeCategory10);

    export let selectedIndex = -1;
</script>

<div>
    <h3>Pie using data prop</h3>
    <svg viewBox="-50 -50 100 100">
        {#each slicesProp as slice, i}
            <path
                d={slice}
                fill={colorsProp(i)}
                class:selected={selectedIndex === i}
                on:click={(e) => (selectedIndex = selectedIndex === i ? -1 : i)}
            />
        {/each}
    </svg>
    <ul class="legend">
        {#each dataProp as d, index}
            <li>
                <span class="swatch" style="--color: {colorsProp(index)}"
                ></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>

<style>
    svg {
        max-width: 20em;
        margin-block: 2em;
    }
    /* legend styling */
    /* Making it a square by e.g. 
    giving it the same width and height, 
    or one the two plus aspect-ratio: 1 / 1 */
    /* Giving it a background color of var(--color) */
    .swatch {
        width: 1em;
        height: 1em;
        display: inline-block;
        margin-inline-end: 0.5em;
        background-color: var(--color);
        align-items: center;
        gap: 0.5em;
    }

    .legend {
        list-style: none;
        padding-inline-start: 0;
    }
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
    }
    li {
        display: flex;
    }

    svg:has(path:hover) {
        path:not(:hover) {
            opacity: 50%;
        }
    }

    path {
        transition: 300ms;
        cursor: pointer;
    }
    .selected {
        --color: oklch(60% 45% 0) !important;

        &:is(path) {
            fill: var(--color);
        }
    }
</style>
