<script context="module">
  export async function load({ fetch }) {
    const res = await fetch(
      'https://pong-api.herokuapp.com/matches/most-recent/5'
    );

    if (res.ok) {
      const recentMatches = await res.json();
      return {
        props: {
          recentMatches
        }
      };
    }

    console.log(res);
    return {
      status: res.status,
      error: new Error(`Error doing stuff`)
    };
  }
</script>

<script>
  import BoxScore from '../components/BoxScore.svelte';
  export let recentMatches = [];
</script>

{#if recentMatches.length > 0}
  <h3 class="align-center primary-text">Recent Matches</h3>

  <ul>
    {#each recentMatches as match}
      <BoxScore {match} />
    {/each}
  </ul>
{/if}
<footer>
  <p>
    Created with <a
      class="link"
      target="_blank"
      rel="noopener"
      href="https://svelte.dev">SvelteKit</a
    >
    and deployed with
    <a class="link" target="_blank" rel="noopener" href="https://vercel.com"
      >▲ Vercel</a
    >.
  </p>
</footer>
