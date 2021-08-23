<script context="module">
  import { isEmpty } from '../modules/helpers';

  export async function load({ fetch }) {
    try {
      const [recentMatchesResult, currentMatchResult, playersResult] =
        await Promise.all([
          fetch('https://pong-api.herokuapp.com/matches/most-recent/5'),
          fetch('https://pong-api.herokuapp.com/matches/current'),
          fetch('https://pong-api.herokuapp.com/players')
        ]);

      const recentMatches = await recentMatchesResult.json();
      const currentMatch = await currentMatchResult.json();
      const players = await playersResult.json();
      return {
        props: {
          recentMatches,
          currentMatch,
          players
        }
      };
    } catch (err) {
      return {
        status: 500,
        error: new Error(`Error doing stuff`)
      };
    }
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
  export let currentMatch;
  export let players;
  export let canUpdateScore;
  export let matchInProgress;
  let matchStatus = matchInProgress ? 'Match in Progress' : 'Latest Match';
  let deviceId = LocalStorage.get('device');
  onMount(() => {
    if (deviceId) {
      WebSockets.init(deviceId, false);
    } else {
      goto('/set-device');
    }
  });
</script>

{#if !isEmpty(currentMatch)}
  <h2 class="align-center primary-text">{matchStatus}</h2>
  <LiveScoreboard match={currentMatch} />
{/if}

{#if matchInProgress}
  {#if canUpdateScore}
    <a href="/update-score" class="btn big success update-score">Update Score</a
    >
  {/if}
{:else if deviceId}
  <div class="flex-row flex-center pad-1rem">
    <a href="/new-match" class="btn big primary center margin-top-1rem"
      >Start New Match</a
    >
  </div>
{/if}

{#if recentMatches.length > 0}
  <hr />
  <h3 class="align-center primary-text">Recent Matches</h3>
  <ul>
    {#each recentMatches as match}
      <BoxScore {match} />
    {/each}
  </ul>
{/if}
