<script context="module" lang="ts">
  import { BASE_URL } from '../../modules/constants';

  export async function load({ fetch, page }) {
    try {
      const id: string = await page.params.id;
      const matchResult = await fetch(`${BASE_URL}matches/${id}`);
      const match: Match = await matchResult.json();
      return {
        props: {
          match
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
  import { MATCH_SUMMARY } from '../../modules/constants';
  import BoxScore from '../../components/BoxScore.svelte';
  export let match: Match;
</script>

<div class="main match-summary">
  <h2 class="align-center primary-text">{MATCH_SUMMARY}</h2>
  {#if match}
    <BoxScore jumbotron={true} {match} />
  {/if}
</div>
