<script>
  export let info = {};
  export let hlevel = 2;
  let p = info;
</script>

<article>
  <svelte:element this={"h" + hlevel}>{p.title}</svelte:element>
  <img src={p.image} alt="" />
  <p>
    {p.description}
  </p>
</article>

<style>
  h2,
  h3 {
    margin: 0;
  }
  article {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
  }
</style>
