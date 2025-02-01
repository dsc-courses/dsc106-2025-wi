<script>
    import * as d3 from 'd3';
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    // let data = [1, 2, 3, 4, 5, 5];
    export let data = [];
    // let pieData = [
    //     { value: 1, label: "apples" },
    //     { value: 2, label: "oranges" },
    //     { value: 3, label: "mangos" },
    //     { value: 4, label: "pears" },
    //     { value: 5, label: "limes" },
    //     { value: 5, label: "cherries" }
    // ];
    // let data = [
	// { value: 1, label: "apples" },
	// { value: 2, label: "oranges" },
	// { value: 3, label: "mangos" },
	// { value: 4, label: "pears" },
	// { value: 5, label: "limes" },
	// { value: 5, label: "cherries" }
    // ];
    // let sliceGenerator = d3.pie();
    let sliceGenerator = d3.pie().value(d => d.value);
    let arcData = [];
    let arcs = [];
    $: arcData = sliceGenerator(data);
    $: arcs = arcData.map(d => arcGenerator(d));
    // let colors = d3.scaleOrdinal(d3.schemeTableau10);
    let colors = d3.scaleOrdinal(d3.schemePuBuGn[9]);
    export let selectedIndex = -1;
    function toggleWedge (index, event) {
        if (!event.key || event.key === "Enter") {
            selectedIndex = selectedIndex === index? -1:index;
        }
    }
    // let total = 0;
    // for (let d of data) {
    //     total += d;
    // }
    // let angle = 0;
    // let arcData = [];
    // for (let d of data) {
    //     let endAngle = angle + (d / total) * 2 * Math.PI;
    //     arcData.push({ startAngle: angle, endAngle });
    //     angle = endAngle;
    // }
    // let arcs = arcData.map(d => arcGenerator(d));
    // let colors = ['gold', 'purple'];
</script>

<div class="container">
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, index}
            <path d={arc} fill={ colors(index) }
                style="
                --start-angle: { arcData[index]?.startAngle }rad;
                --end-angle: { arcData[index]?.endAngle }rad;"
                class:selected={selectedIndex === index}
                on:click={e => toggleWedge(index, e)} tabindex="0" role="button" 
                on:keyup={e => toggleWedge(index, e)}/>
        {/each}
    </svg>
    
    <ul class="legend">
        {#each data as d, index}
            <li style="--color: { colors(index) }" >
                <span class="swatch" class:selected={selectedIndex === index} 
                    on:click={e => toggleWedge(index, e)} 
                    tabindex="0" role="button" on:keyup={e => toggleWedge(index, e)} ></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>

<style>
    svg {
        max-width: 20em;
        width: auto;
        margin-block:2em;
        overflow:visible;
    }
    .swatch{
        width:1em;
        height:1em;
        border-radius: 50%;
        display:inline-block;
        background-color:var(--color);
    }
    .legend{
        max-width: 50%;
        display:grid;
        grid-template-rows: auto;
        grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
        gap:1em;
        flex:1;
        margin:auto;
        /* border: 1em solid white;
        outline: white solid 1em; */
        /* outline-width: 1em;
        outline-style: solid;
        outline-color: white; */
    }
    .legend li{
        display:flex;
        align-items:center;
        gap:0.5em;
    }
    .container{
        display:flex;
        flex-wrap:wrap;
        align-items: horizontal ;
    }
    svg:has(path:hover, path:focus-visible) {
        path:not(:hover, :focus-visible) {
            opacity: 50%;
        }
    }
    path {
        transition: 300ms;
        outline:none;
        --angle: calc(var(--end-angle) - var(--start-angle));
	--mid-angle: calc(var(--start-angle) + var(--angle) / 2);
    transform: rotate(var(--mid-angle)) translateY(0) rotate(calc(-1 * var(--mid-angle)));
	&.selected {
		transform: rotate(var(--mid-angle))
		           translateY(-6px)
                   scale(1.1)
		           rotate(calc(-1 * var(--mid-angle)));
	}
    }
    span{
        outline:none;
    }
    .selected {
	--color: oklch(75.45% 0.1231 74.65) !important;

	&:is(path) {
		fill: var(--color);
	}
}

</style>