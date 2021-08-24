<script>
  import { scale } from 'svelte/transition';
  import PlayerListItem from './PlayerListItem.svelte';

  export let isSelectingPlayer;
  export let dismiss;
  export let player1;
  export let player2;
  export let players;
  export let select;

  let selectablePlayers =
    players?.filter(
      (p) =>
        p &&
        (!player1 || p.id !== player1.id) &&
        (!player2 || p.id !== player2.id)
    ) || [];

  let selectedPlayers = isSelectingPlayer === 1 ? [player1] : [player2];
</script>

<div
  in:scale={{ duration: 200 }}
  out:scale={{ duration: 200 }}
  class="modal-wrapper select-player-modal-wrapper"
>
  <div class="modal-backdrop select-player-modal-backdrop" />
  <div class="modal select-player-modal-main">
    <div class="modal-header">
      <h2>Select Player {isSelectingPlayer}</h2>
      <button class="dismiss-btn" on:click={() => dismiss()}>&times;</button>
    </div>
    <div class="modal-body flex-1">
      <div class="flex-1 flex-col">
        <div class="player-select-list-wrap flex-1 flex-col">
          <SelectList
            className="player-select-list"
            selectedItems={selectedPlayers}
            items={selectablePlayers}
            onSelect={(p) => select(p)}
            component={PlayerListItem}
          />
        </div>
        <div class="btn-wrap margin-1rem flex-shrink-0 flex-col">
          <a
            href={`/add-new-player/new-match/${isSelectingPlayer}`}
            class="btn primary big add-player"
          >
            <i class="fa fa-plus-circle" />
            <span>Add New Player</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
