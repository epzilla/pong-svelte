<script>
  import { scale } from 'svelte/transition';
  import SelectList from './SelectList.svelte';
  import PlayerListItem from './PlayerListItem.svelte';
  import AddPlayerModal from './AddPlayerModal.svelte';
  import { ADD_NEW_PLAYER, SELECT_PLAYER_NUM } from '../modules/constants';
  import { onDestroy, onMount } from 'svelte';

  export let isSelectingPlayer;
  export let dismiss;
  export let player1;
  export let player2;
  export let players;
  export let select;

  let isAddingPlayer = 0;

  $: selectablePlayers =
    players?.filter(
      (p) =>
        p &&
        (!player1 || p.id !== player1.id) &&
        (!player2 || p.id !== player2.id)
    ) || [];

  let selectedPlayers = isSelectingPlayer === 1 ? [player1] : [player2];

  function addPlayer(newPlayer) {
    players.push(newPlayer);
    select(newPlayer);
  }

  function onKeyUp({ target: { id }, key }) {
    if (key === 'Escape' && !isAddingPlayer) {
      dismiss();
    }
  }

  onMount(() => document.addEventListener('keyup', onKeyUp));
  onDestroy(() => document.removeEventListener('keyup', onKeyUp));
</script>

<div
  in:scale={{ duration: 200 }}
  out:scale={{ duration: 200 }}
  class="modal-wrapper select-player-modal-wrapper"
>
  <div class="modal-backdrop select-player-modal-backdrop" />
  <div class="modal select-player-modal-main">
    <div class="modal-header">
      <h2>{SELECT_PLAYER_NUM(isSelectingPlayer)}</h2>
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
          <button
            class="btn primary big add-player"
            on:click={() => (isAddingPlayer = isSelectingPlayer)}
          >
            <i class="fa fa-plus-circle" />
            <span>{ADD_NEW_PLAYER}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<AddPlayerModal
  show={isAddingPlayer > 0}
  dismiss={() => (isAddingPlayer = 0)}
  add={addPlayer}
  {players}
/>

<style lang="scss">
  .modal {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 56px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 7;
    background-color: white;
  }

  .modal-header {
    width: 100%;
    min-height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;

    > p {
      margin-top: 0;
    }
  }

  .modal-btn-container {
    margin: 1rem auto;
    .btn:not(:last-of-type) {
      margin-right: 1rem;
    }
  }

  .secret-modal {
    background-color: rgba(51, 51, 51, 0.95);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: top;

    &.gif {
      background-position-x: center;
      background-size: contain;
    }

    h1 {
      background: rgba(255, 255, 255, 0.36);
      text-shadow: 1px 1px rgba(255, 255, 255, 0.59);
      width: 100%;
      text-align: center;
    }

    .dismiss-btn {
      background-color: rgba(0, 0, 0, 0.2);
      height: 50px;
      width: 50px;
      font-size: 2.5rem;
      font-weight: 100;
      color: rgba(247, 247, 247, 0.4);
    }
  }

  .modal-backdrop {
    position: fixed;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
  }

  .modal.keyboard-shortcuts,
  .modal.confirm-modal {
    position: fixed;
    flex-grow: 1;
    bottom: 2rem;
    top: calc(56px + 2rem);
    left: 2rem;
    right: 2rem;
    border-radius: 4px;

    .modal-body {
      font-size: 14px;
      padding: 0 1rem 1rem;
      overflow-y: auto;

      > .flex-col:first-of-type {
        padding-right: 1rem;
      }

      > .flex-col:last-of-type {
        padding-left: 1rem;
      }
    }
  }

  // Flip in
  .modal-flip-in-enter .modal {
    animation: flip-in 200ms linear;
  }

  .modal-flip-in-leave .modal {
    animation: flip-out 200ms linear;
  }

  .modal-flip-in-enter .modal-backdrop {
    opacity: 0;
  }

  .modal-flip-in-leave .modal-backdrop {
    opacity: 0;
  }

  .modal-flip-in-enter.modal-flip-in-enter-active .modal-backdrop {
    opacity: 1;
    transition: opacity 200ms ease-out;
  }

  .modal-flip-in-leave.modal-flip-in-leave-active .modal-backdrop {
    opacity: 0;
    transition: opacity 200ms ease-out;
  }

  // Pop in
  .modal-pop-in-enter .modal {
    animation: pop-in 200ms ease-in-out;
  }

  .modal-pop-in-leave .modal {
    animation: pop-out 200ms ease-in-out;
  }

  .modal-pop-in-enter .modal-backdrop {
    opacity: 0;
  }

  .modal-pop-in-leave .modal-backdrop {
    opacity: 0;
  }

  .modal-pop-in-enter.modal-pop-in-enter-active .modal-backdrop {
    opacity: 1;
    transition: opacity 200ms ease-in-out;
  }

  .modal-pop-in-leave.modal-pop-in-leave-active .modal-backdrop {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  .modal.confirm-modal {
    width: 400px;
    padding: 1rem;
    left: calc(50% - 200px);
    bottom: initial;

    .btn-container {
      .btn {
        min-width: 100px;

        &:not(:first-of-type) {
          margin-left: 1rem;
        }
      }
    }
  }

  .modal.select-teams {
    .modal-header {
      min-height: 6rem;
      justify-content: flex-start;

      h2 {
        margin: 0.5rem 0;
      }
    }
  }
</style>
