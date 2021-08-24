<!-- 
    import Avatar from './Avatar';

const PlayerSelectBlock = ({ doubles, isPartner, player, num, selectCallback, selectBtnText }) => {
  if (player) {
    return (
      <div class="player-selected-block flex">
        <div class="avatar-wrap">
          <Avatar fname={player.fname} lname={player.lname} />
        </div>
        <div class="player-name-wrap">
          <h3>{ player.fname } { player.lname }</h3>
        </div>
        <button class="btn primary" onClick={() => selectCallback(num)}>{ selectBtnText }</button>
      </div>
    );
  }

  return (
    <div class="player-selected-block flex empty" onClick={() => selectCallback(num)}>
      <div class="avatar-wrap">
        <Avatar empty={true} />
      </div>
      <div class="player-name-wrap">
        <h3>Select { isPartner ? 'Partner' : 'Player' }</h3>
      </div>
    </div>
  );
};

export default PlayerSelectBlock;
 -->
<script>
  import Avatar from './Avatar.svelte';
  export let player;
  export let selectCallback;
  export let selectBtnText;
  export let isPartner;
</script>

<div class={`player-selected-block flex${player ? '' : ' empty'}`}>
  <div class="avatar-wrap">
    <Avatar empty={!player} fname={player?.fname} lname={player?.lname} />
  </div>
  <div class="player-name-wrap">
    {#if player}
      <h3>{player.fname} {player.lname}</h3>
      <button class="btn primary" onClick={() => selectCallback(num)}
        >{selectBtnText}</button
      >
    {:else}
      <h3>Select {isPartner ? 'Partner' : 'Player'}</h3>
    {/if}
  </div>
</div>

<style lang="scss">
  .player-selected-block {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    > h3 {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
    }

    &.empty {
      border: 1px dashed #aaa;
      cursor: pointer;
      opacity: 0.5;
    }
  }
  .player-name-wrap {
    flex: 1;
    margin-right: 1rem;
  }
</style>
