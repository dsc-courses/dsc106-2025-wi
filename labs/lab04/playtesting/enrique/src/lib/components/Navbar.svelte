<script>
  import { page } from '$app/stores';

  let pages = [
    { url: './', title: 'Home' },
    { url: './projects', title: 'Projects' },
    { url: './resume', title: 'Resume' },
    { url: './contact', title: 'Contact' },
    { url: 'https://github.com/casillasenrique', title: 'GitHub' },
  ];
</script>

<nav>
  {#each pages as p}
    {#if p.url.startsWith('http')}
      <!-- Outgoing link -->
      <a href={p.url} target="_blank" rel="noopener noreferrer">
        {p.title}
      </a>
    {:else}
      <!-- Navigation link -->
      <a href={p.url} class:current={'.' + $page.route.id === p.url}>
        {p.title}
      </a>
    {/if}
  {/each}
</nav>
