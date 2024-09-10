<script>
  import projects from "$lib/projects.json";
  import Projects from "$lib/Projects.svelte";
  import { onMount } from "svelte";

  //   let data = {
  //     public_repos: 12,
  //     followers: 0,
  //     following: 0,
  //     public_gists: 0,
  //   };

  let data;

  onMount(async () => {
    let res = await fetch("https://api.github.com/users/gracefh");
    data = await res.json();
  });
</script>

<h1>Grace Huang</h1>
<img
  src="./images/dinodino.jpeg"
  alt="some of my plushies!"
  style="width:60%"
/>
<p>
  Currently trying to achieve a better sleep schedule and to spend more time
  going on outdoor adventures, despite how cold it currently is in Cambridge.
  Also consuming large amounts of snacks while trying to debug code.
</p>

<h2>My Latest Projects!</h2>
<div class="projects highlights">
  <Projects projectList={projects.slice(0, 3)} hlevel={3} />
</div>

{#if data}
  <h2>My GitHub S T A T S</h2>
  <dl>
    <div>
      <dt>Public Repos</dt>
      <dd>
        {data.public_repos}
      </dd>
    </div>
    <div>
      <dt>Followers .-.</dt>
      <dd>
        {data.followers}
      </dd>
    </div>
    <div>
      <dt>Following .-.</dt>
      <dd>
        {data.following}
      </dd>
    </div>
    <div>
      <dt>Public Gists .-.</dt>
      <dd>
        {data.public_gists}
      </dd>
    </div>
  </dl>
{:else}
  <div>No GitHub data to show</div>
{/if}

<style>
  dl {
    display: flex;
    justify-content: space-around;
  }

  dl div {
    text-align: right;
  }
  dt {
    font-family:
      Josefin Sans,
      sans-serif;
    color: rgb(95, 123, 139);
    font-size: 120%;
  }

  dd {
    font-size: 200%;
  }
</style>
