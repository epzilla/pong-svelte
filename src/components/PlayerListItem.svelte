<script lang="ts">
  import Avatar from './Avatar.svelte';
  export let item: Player;
</script>

<div class="flex-center">
  <Avatar fname={item?.fname} lname={item?.lname} />
  <span>{item?.fname} {item?.lname}</span>
</div>
