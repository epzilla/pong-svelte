<script context="module">
  import { BASE_URL } from '../modules/constants';
  import { isEmpty } from '../modules/helpers';

  export async function load({ fetch }) {
    try {
      const matchResult = await fetch(`${BASE_URL}matches/current`);
      const match = await matchResult.json();
      console.log(`Match ID is: ${match?.id}`);
      return {
        props: {
          match
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
  import FixedAlerts from '../components/FixedAlerts.svelte';
  import Nav from '../components/Nav.svelte';
  import { currentMatch } from '../modules/stores';

  export let match;
  let matchInProgress;

  $: {
    console.log(`Match inside $ loop is: ${match?.id}`);
    if (!isEmpty(match)) {
      currentMatch.set(match);
      matchInProgress = match;
    }
  }
  currentMatch.subscribe((m) => {
    console.log(`Match inside sub is: ${m?.id}`);
    matchInProgress = m;
  });
</script>

<Nav match={matchInProgress} />
<main>
  <slot />
  <FixedAlerts />
</main>
