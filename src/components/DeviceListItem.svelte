<script lang="ts">
  import DeviceIcon from './DeviceIcon.svelte';
  export let item: { type: string; name: string };
</script>

<div class="flex-center">
  {#if item}
    <DeviceIcon type={item.type} />
    <span>{item.name}</span>
  {/if}
</div>
