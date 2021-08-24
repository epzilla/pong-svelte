<script>
  export let className;
  export let items;
  export let selectedItems;
  export let onSelect;
  export let component;
</script>

<ul class={`select-list ${className || ''}`}>
  {#each items as item}
    <li
      class:highlighted={selectedItems.indexOf(item) !== -1}
      on:click={() => callback(item)}
    >
      <svelte:component
        this={component}
        highlighted={selectedItems.indexOf(item) !== -1}
        {item}
      />
    </li>
  {/each}
</ul>
