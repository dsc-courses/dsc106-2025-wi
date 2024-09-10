<!-- YOLO <slot /> -->

<script>
    let pages = [
	{url: "./", title: "Home"},
	{url: "./projects", title: "Projects"},
    {url: "./resume", title: "Resume"},
    {url: "https://github.com/jayefan", title: "GitHub"},
    {url: "./contact", title: "Contact"},
];
    import { page } from '$app/stores';
    import "../style.css";
    // let colorScheme = "light dark";
    let localStorage = globalThis.localStorage ?? {};
    let colorScheme = localStorage.colorScheme ?? "light dark";
    $: localStorage.colorScheme = colorScheme;
    let root = globalThis?.document?.documentElement;
    $: root?.style.setProperty("color-scheme", colorScheme);
</script>

<nav>
	{#each pages as p }
    <a href={ p.url } class:current={ "." + $page.route.id === p.url} target={ p.url.startsWith("http") ? "_blank" : null }
    >{ p.title }</a>
	{/each}
</nav>

<label class="color-scheme">
    Theme:
    <select bind:value={ colorScheme }>
        <option value="light dark">Automatic</option>
        <option value="light" selected>Light</option>
        <option value="dark">Dark</option>
    </select>
</label>

<style>

.color-scheme{
	position:absolute;
	top: 1rem;
	right: 1rem;
	font-size: 80%;
}
nav {
	display: flex;
	margin-bottom: 3em;
	margin-top:2em;
	border-bottom: 1px solid oklch(80% 3% 200);
}
nav a{
	flex:1;
	text-decoration: none;
	color: inherit;
	text-align: center;
	padding: 0.5em;
}

nav .current{
	border-bottom:5px solid oklch(80% 3% 200/40%);
}
nav a:hover{
	border-bottom:5px solid var(--color-accent);
}
</style>
<slot />