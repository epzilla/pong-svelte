<script lang="ts">
  export let onClick: (e: MouseEvent) => void;
  export let btnPos: 'top' | 'bottom' = 'top';
  $: dir = btnPos === 'top' ? 'up' : 'down';
  $: btnClasses = `btn btn-invert stepper-btn ${
    btnPos === 'top' ? 'top-btn' : 'bottom-btn'
  }`;
  $: iClass = `fa fa-angle-${btnPos === 'top' ? 'up' : 'down'}`;
</script>

<button class={btnClasses} data-direction={dir} on:click={onClick}>
  <i class={iClass} />
</button>

<style lang="scss">
  .stepper-btn {
    background-color: var(--primaryBtnBg);
    color: var(--primaryBtnText);
    font-weight: bold;
    width: 5rem;
    height: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: center;

    i.fa {
      margin: 0 auto;
    }

    &.top-btn {
      order: 1;
    }

    &.bottom-btn {
      order: 3;
    }
  }
</style>
