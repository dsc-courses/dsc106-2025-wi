<script>
    export let info = {};
    export let hLevel = 2;
    // let p = info;
</script>
<style>
article {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
  }
  
  .projects img{
    max-width: 100%;
  }
  
  
</style>
<article>
    <svelte:element this={"h" + hLevel}>{ info.title }</svelte:element>
    <!-- <h2>{p.title}</h2>  -->
    <!-- we no longer need the above -->
    <img src={info.image} alt="">
    <p>{info.description}</p>
    <span>{info.year}</span>
</article>