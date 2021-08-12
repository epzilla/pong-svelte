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
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import LocalStorage from '../modules/localStorage';
  import WebSockets from '../modules/websockets';
  import BoxScore from '../components/BoxScore.svelte';
  import LiveScoreboard from '../components/LiveScoreboard.svelte';
  export let recentMatches = [];
  let deviceId = LocalStorage.get('device');
  onMount(() => {
    if (deviceId) {
      WebSockets.init(deviceId, false);
    } else {
      goto('/set-device');
    }
  });
</script>

{#if recentMatches.length > 0}
  <h3 class="align-center primary-text">Recent Matches</h3>

  <ul>
    {#each recentMatches as match}
      <LiveScoreboard {match} />
      <BoxScore {match} />
    {/each}
  </ul>
{/if}
