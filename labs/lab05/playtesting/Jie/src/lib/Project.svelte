<script>
    export let info = {};
    // let p = info;
    export let hLevel = 2;
</script>

<article>
    <svelte:element this={"h" + hLevel}>{ info.title }</svelte:element>
    <a href={info.url}><img src={info.image} alt=""> </a>
    <div>
    <p>{info.description} </p>
    <p>{info.year}</p>
    </div>
</article>

<style>
    article{
	display:grid;
	grid-template-rows:subgrid;
	grid-row: span 3;
    }

    h2{
	margin:0;
    }
</style>