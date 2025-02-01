<!-- add title using <svelte:head> -->
<script>
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";

    let profileData = {
        ok: true,
        json: async () => ({
            followers: 100,
            following: 100,
            public_repos: 100,
            public_gists: 100,
        }),
    };

    let data;

    // onMount(async () => {
    //     let res = await fetch("https://api.github.com/users/katiechen1001");
    //     data = await res.json();
    // });
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<h1>Katie-test: Personal site and portfolio</h1>
<p>
    Hi, I'm Katie. I'm a web developer and designer. I'm currently working on my
    personal site and portfolio. Check back soon for updates!
</p>
<p>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quia aspernatur
    mollitia pariatur cupiditate inventore et? Voluptatum, iste praesentium
    corrupti culpa itaque, repudiandae at, porro veniam doloremque dolor dolorum
    perferendis.
</p>
<p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus libero
    commodi vel dolore consectetur molestiae eligendi, delectus veritatis
    blanditiis facilis vero nesciunt. Excepturi distinctio impedit odio hic
    consequatur in ipsum.
</p>
<img
    src="./images/buddy.JPG"
    alt="Buddy, a white samoyed dog, who was my dog and also was my family."
    width="100px"
/>
<p>please enjoy an actual photo of my dog</p>

<h1>Latest projects</h1>
<div class="projects">
    {#each projects.slice(0, 3) as p}
        <Project info={p} hLevel="3" />
    {/each}
</div>
<h1>Selected Projects</h1>

<div class="projects">
    {#each [projects[0], projects[3], projects[6]] as p}
        <Project info={p} hLevel="3" />
    {/each}
</div>

<section>
    <!-- {#await fetch("https://api.github.com/users/katiechen1001")} -->
    {#await profileData}
        <p>Loading...</p>
    {:then response}
        {#await response.json()}
            <p>Decoding...</p>
        {:then data}
            <h2>GITHUB STATS</h2>
            <dl>
                <dt>Followers</dt>
                <dd>{data.followers}</dd>
                <dt>Following</dt>
                <dd>{data.following}</dd>
                <dt>Public repos</dt>
                <dd>{data.public_repos}</dd>
                <dt>Public gists</dt>
                <dd>{data.public_gists}</dd>
            </dl>
        {:catch error}
            <p class="error">
                Something went wrong: {error.message}
            </p>
        {/await}
    {:catch error}
        <p class="error">
            Something went wrong: {error.message}
        </p>
    {/await}
</section>

<style>
    /* apply a grid on the <dl> with four equal-sized columns (1fr each) */
    dl {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    /* every <dt> should be placed on the first row of the grid, and every <dd> on the second row  */
    dt {
        grid-row: 1;
    }
    dd {
        grid-row: 2;
    }
</style>
