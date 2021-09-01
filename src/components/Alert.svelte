<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import {
    CLICK,
    DEVICE_TYPES,
    MATCH_STARTED,
    TAP
  } from '../modules/constants';
  import {
    generateMatchStartAlert,
    getBestGuessDevice
  } from '../modules/helpers';

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
</script>

<div
  in:fly={{ y: 200, duration: 200 }}
  out:fly={{ y: 200, duration: 500 }}
  class={`alert alert-${alert.type}${alert.clickable ? ' clickable' : ''}`}
  on:click={() => {
    if (alert.type === MATCH_STARTED) {
      goto('/');
      dismiss(index);
    }
  }}
>
  {#if alert.type === MATCH_STARTED}
    <span>{generateMatchStartAlert(alert.msg, clickOrTap)}</span>
  {:else}
    <span>{alert.msg}</span>
  {/if}
  <button
    class="close-button"
    on:click={(e) => {
      e.preventDefault();
      e.stopPropagation();
      dismiss(index);
    }}>&times;</button
  >
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

    &.clickable {
      cursor: pointer;
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
