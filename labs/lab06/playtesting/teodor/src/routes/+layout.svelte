<script>
	import { page } from '$app/stores';
	import '../style.css';

	let pages = [
		{ url: './', title: 'Home' },
		{ url: './projects', title: 'Projects' },
		{ url: './contact', title: 'Contact' },
		{ url: './resume', title: 'Resume' },
		{ url: 'https://github.com/TeodorNicolaDev', title: 'GitHub' }
	];

	let localStorage = globalThis?.localStorage ?? {};
	let colorScheme = localStorage.colorScheme ?? 'light dark';
	let root = globalThis?.document?.documentElement;

	$: localStorage.colorScheme = colorScheme;
	$: root?.style.setProperty('color-scheme', colorScheme);
</script>

<nav>
	{#each pages as p}
		<a
			href={p.url}
			class:current={'.' + $page.route.id === p.url}
			target={p.url.startsWith('http') ? '_blank' : null}>{p.title}</a
		>
	{/each}
</nav>
<label class="color-scheme">
	Theme:
	<select bind:value={colorScheme}>
		<option value="light dark">Automatic</option>
		<option value="light">Light</option>
		<option value="dark">Dark</option>
	</select>
</label>
<slot />

<style>
	nav {
		display: flex;
		margin-bottom: 1.5em;
		border-bottom: 1px solid var(--nav-border);
	}
	nav a {
		flex: 1;
		text-decoration: none;
		color: inherit;
		text-align: center;
		padding: 0.5em;
		font-weight: 600;

		&:hover {
			color: var(--text-secondary);
		}
	}
	.current {
		border-bottom: 0.4em solid var(--color-accent);
		padding-bottom: 1em;
		color: var(--text-secondary);
	}
	select {
		font-family: inherit;
	}
</style>
