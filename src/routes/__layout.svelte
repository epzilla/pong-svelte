<script>
  import FixedAlerts from '../components/FixedAlerts.svelte';
  import Nav from '../components/nav.svelte';
</script>

<Nav />
<main>
  <slot />
  <FixedAlerts />
</main>
