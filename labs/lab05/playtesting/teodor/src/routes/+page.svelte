<script>
	import Project from '$lib/components/Project.svelte';
	import projects from '$lib/assets/projects.json';
	import { onMount } from 'svelte';

	let profileData = { loading: true, error: null, data: null };

	onMount(async () => {
		try {
			const response = await fetch('https://api.github.com/users/TeodorNicolaDev');
			if (!response.ok) throw new Error('Failed to fetch');
			const data = await response.json();
			profileData = { loading: false, data };
		} catch (error) {
			profileData = { loading: false, error };
		}
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>
<h1>Teodor Nicola</h1>
<p>Please see my projects</p>
<div class="image-container">
	<img
		class="profile-picture"
		src="/images/Teodor Nicola_Antoniu.jpeg"
		alt="Professional headshot of Teodor"
	/>
</div>

{#if profileData.loading}
	<p>Loading...</p>
{:else if profileData.error}
	<p class="error">Something went wrong: {profileData.error.message}</p>
{:else}
	<section class="github-stats">
		<h2>GitHub Stats</h2>
		<dl>
			<div>
				<dt>Followers:</dt>
				<dd>{profileData.data.followers}</dd>
			</div>
			<div>
				<dt>Following:</dt>
				<dd>{profileData.data.following}</dd>
			</div>
			<div>
				<dt>Public Repos:</dt>
				<dd>{profileData.data.public_repos}</dd>
			</div>
			<div>
				<dt>Public Gists:</dt>
				<dd>{profileData.data.public_gists}</dd>
			</div>
		</dl>
	</section>
{/if}
<h2>Featured Projects</h2>
<div class="projects">
	{#each projects.slice(0, 3) as projectData (projectData.title)}
		<Project {projectData} hLevel={3} />
	{/each}
</div>
