<script>
  import Avatar from './Avatar.svelte';
  export let player;
</script>

<div class="flex-center">
  <Avatar fname={player.fname} lname={player.lname} />
  <span>{player.fname} {player.lname}</span>
</div>
