<script context="module">
  import { isEmpty } from '../modules/helpers';
  import { BASE_URL } from '../modules/constants';

  export async function load({ fetch }) {
    try {
      const [recentMatchesResult, currentMatchResult, playersResult] =
        await Promise.all([
          fetch(`${BASE_URL}matches/most-recent/5`),
          fetch(`${BASE_URL}matches/current`),
          fetch(`${BASE_URL}players`)
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
  import Rest from '../modules/rest';
  import BoxScore from '../components/BoxScore.svelte';
  import LiveScoreboard from '../components/LiveScoreboard.svelte';
  import {
    RECENT_MATCHES,
    START_A_NEW_MATCH,
    UPDATE_SCORE
  } from '../modules/constants';
  export let recentMatches = [];
  export let currentMatch;
  export let players;
  let canUpdateScore = false;
  let matchStatus = currentMatch ? 'Match in Progress' : 'Latest Match';
  let device = LocalStorage.get('device');
  let deviceId = device?.id;
  onMount(async () => {
    if (deviceId) {
      WebSockets.init(deviceId, false);
      canUpdateScore = await Rest.get(`matches/can-update-score/${deviceId}`);
    } else {
      goto('/set-device');
    }
  });
</script>

{#if !isEmpty(currentMatch)}
  <h2 class="align-center primary-text">{matchStatus}</h2>
  <LiveScoreboard match={currentMatch} />
{/if}

{#if !isEmpty(currentMatch)}
  {#if canUpdateScore}
    <a href="/update-score" class="btn big success update-score"
      >{UPDATE_SCORE}</a
    >
  {/if}
{:else if deviceId}
  <div class="flex-row flex-center pad-1rem">
    <a href="/new-match" class="btn big primary center margin-top-1rem"
      >{START_A_NEW_MATCH}</a
    >
  </div>
{/if}

{#if recentMatches.length > 0}
  <hr />
  <h3 class="align-center primary-text">{RECENT_MATCHES}</h3>
  <ul>
    {#each recentMatches as match}
      {#if !currentMatch || currentMatch.id !== match.id}
        <BoxScore {match} />
      {/if}
    {/each}
  </ul>
{/if}
