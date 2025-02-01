<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    // let profileData = fetch("https://api.github.com/users/jayefan");
    let public_repos = 0; 
    let followers = 0; 
    let following = 0;
    let me = "";
    fetch("https://api.github.com/users/jayefan")
    .then(response => response.json())
    .then(data => {
      me = data.name;
      public_repos = data.public_repos;
      followers = data.followers;
      following = data.following;
    })
    .catch(error => console.error('Error fetching user data:', error));
//     let profileData = {
// 	ok: true,
// 	json: async () => ({
// 		followers: 100,
// 		following: 100,
// 		public_repos: 100,
// 		public_gists: 100,
// 	})
// };
</script>
<svelte:head>
	<title>J</title>
</svelte:head>

<h1>Jie Fan</h1>
<p>Hi, I'm Jie, a student at MIT. This is my first personal website. Welcome! </p>
<img src="images/seagull.jpg" alt="A photo of me" width="300px" />

<h2>Latest Projects</h2>
<div class="projects">
        {#each projects.slice(0,3) as p}
        <Project info={p} hLevel=3 />
        {/each}
</div> 

<section>
    <h2>My GitHub Stats</h2>
    <!-- {#await fetch("https://api.github.com/users/jayefan") }
	<p>Loading...</p>
{:then response}
	{#await response.json()}
		<p>Decoding...</p>
	{:then data}
		<p>The data is { JSON.stringify(data.name) }</p>
	{:catch error}
		<p class="error">
			Something went wrong: {error.message}
		</p>
	{/await}
{:catch error}
	<p class="error">
		Something went wrong: {error.message}
	</p>
{/await} -->
<dl>
    <dt>Public Repositories:</dt>
    <dd>{public_repos}</dd>
    
    <dt>Followers:</dt>
    <dd>{followers}</dd>

    <dt>Following:</dt>
    <dd>{following}</dd>
  </dl>
</section>

<style>
  .projects{
	max-width:100%;
	display: grid;
	grid-template-columns:repeat(auto-fill, minmax(15em, 1fr));
	gap: 1em;
    } 
  
  dl{
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
  }
  dt{
    grid-row: 1;
  }
  dd{
    grid-row: 2;
  }
</style>