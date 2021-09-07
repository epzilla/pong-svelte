<script context="module" lang="ts">
  import { BASE_URL } from '../../modules/constants';

  export async function load({ fetch, page }) {
    try {
      const id: string = await page.params.id;
      const [playersResult, statsResult] = await Promise.all([
        fetch(`${BASE_URL}players`),
        fetch(`${BASE_URL}stats/by-player/${id}`)
      ]);
      const players: Player[] = await playersResult.json();
      const stats: Match[] = await statsResult.json();
      const player = players.find(p => p.id.toString() === id.toString());
      return {
        props: {
          player,
          stats
        }
      };
    } catch (err) {
      return {
        status: 500,
        error: err
      };
    }
  }
</script>

<script lang="ts">
  import { getFullPlayerName } from '../../modules/helpers';
  import BoxScore from '../../components/BoxScore.svelte';
  export let player: Player;
  export let stats: Match[] = [];
</script>

{#if player}
  <div class="main player-profile">
    <h2 class="align-center primary-text">{getFullPlayerName(player)}</h2>
    {#if stats}
      {#each stats as match}
        <BoxScore {match} />
      {/each}
    {/if}
  </div>
{/if}
