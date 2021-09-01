<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import {
    ALERT_MATCH_STARTED,
    CLICK,
    DEVICE_TYPES,
    MATCH_STARTED,
    TAP
  } from '../modules/constants';
  import { getBestGuessDevice } from '../modules/helpers';

  export let alert;
  export let device;
  export let dismiss;
  export let index;

  let clickOrTap = CLICK;

  onMount(() => {
    let type = device && device.type ? device.type : getBestGuessDevice();
    if (
      type === DEVICE_TYPES.MOBILE_DEVICE ||
      type === DEVICE_TYPES.TABLET_DEVICE
    ) {
      clickOrTap = TAP;
    }
  });

  function goToHomeScreen(dismiss) {
    goto('/');
    dismiss && dismiss();
  }
</script>

<div
  in:fly={{ y: 200, duration: 200 }}
  out:fly={{ y: 200, duration: 500 }}
  class={`alert alert-${alert.type}`}
>
  {#if alert.type === MATCH_STARTED}
    <span on:click={() => goToHomeScreen(dismiss)}
      >{ALERT_MATCH_STARTED(alert, clickOrTap)}</span
    >
  {:else}
    <span>{alert.msg}</span>
  {/if}
  <button class="close-button" on:click={() => dismiss(index)}>&times;</button>
</div>

<style lang="scss">
  .alert {
    display: flex;
    background-color: #b4d3f2;
    border: 1px solid #a6c0da;
    color: #003e7b;
    padding: 1rem;
    border-radius: 4px;

    &:not(:last-of-type) {
      margin-bottom: 0.25rem;
    }

    &.alert-error {
      background-color: #c22f3d;
      border-color: #a80817;
      color: #fff;
    }

    &.alert-warning {
      background-color: #ffeb85;
      border-color: #e6cf5a;
      color: #655606;
    }

    &.alert-success {
      background-color: #d4edda;
      border-color: #c3e6cb;
      color: #155724;
    }

    .close-button {
      background: transparent;
      border: none;
      color: #003e7b;
      cursor: pointer;
      font-size: 1.5rem;
      line-height: 0;
      margin-left: auto;
      padding-left: 1rem;

      &:focus {
        outline: none;
      }
    }
  }
</style>
