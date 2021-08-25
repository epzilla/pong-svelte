<script>
  import DeviceIcon from './DeviceIcon.svelte';
  export let device;
</script>

<div class="flex-center">
  {#if device}
    <DeviceIcon type={device.type} />
    <span>{device.name}</span>
  {/if}
</div>
