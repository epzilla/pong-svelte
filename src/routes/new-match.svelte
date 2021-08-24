<script context="module">
  export async function load({ fetch }) {
    try {
      const res = await fetch('https://pong-api.herokuapp.com/players');
      const players = await res.json();
      return {
        props: {
          players
        }
      };
    } catch (err) {
      return {
        status: 500,
        error: new Error(`Error doing stuff`)
      };
    }
  }
</script>

<script>
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { MATCH_STARTED } from '../modules/constants';
  import LocalStorage from '../modules/localStorage';
  import Rest from '../modules/rest';
  import WebSockets from '../modules/websockets';
  import Avatar from '../components/Avatar.svelte';
  import Stepper from '../components/Stepper.svelte';
  import SegmentedControl from '../components/SegmentedControl.svelte';
  import Toggle from '../components/Toggle.svelte';
  import PlayerSelectBlock from '../components/PlayerSelectBlock.svelte';

  export let doubles = false;
  export let player1 = null;
  export let player2 = null;
  export let partner1 = null;
  export let partner2 = null;
  export let isSelectingPlayer = 0;
  export let players = [];
  export let playTo = 21;
  export let selectedPlayToOption = -1;
  export let winByTwo = true;
  export let bestOf = 3;
  export let updateEveryPoint = 1;
  export let playAllGames = 0;
  export let showPlayToInput = false;
  export let flipping = false;
  export let showCoinToss = false;
  export let showCoinReverse = false;
  export let firstServe = null;

  let deviceId = LocalStorage.get('device');
  let toggledOn = false;

  function onMatchStartedElsewhere(match) {
    goto('/');
  }

  function setAndCacheState() {
    LocalStorage.set('start-match-state', {
      player1,
      player2,
      partner1,
      partner2
    });
  }

  function selectPlayer(p) {
    switch (isSelectingPlayer) {
      case 1:
        player1 = p;
        break;
      case 2:
        player2 = p;
        break;
      case 3:
        partner1 = p;
      default:
        partner2 = p;
    }
    setAndCacheState();
  }

  function dismissModal() {
    isSelectingPlayer = -1;
  }

  function beginMatch() {
    let packet = {
      deviceId,
      player1Id: player1.id,
      player2Id: player2.id,
      partner1Id: partner1?.id || null,
      partner2Id: partner2?.id || null,
      doubles,
      updateEveryPoint,
      bestOf,
      playTo,
      winByTwo,
      playAllGames
    };
    Rest.post('matches/create', packet).then(({ match }) => {
      LocalStorage.delete('start-match-state');
      let matchIds = LocalStorage.get('match-ids');
      if (!matchIds || matchIds.length === 0) {
        matchIds = [match.id];
      } else {
        matchIds.push(match.id);
      }
      LocalStorage.set('match-ids', matchIds);
      goto('/update-score');
    });
  }

  function addNewPlayer(num) {
    if (player1 || player2 || partner1 || partner2) {
      LocalStorageService.set('start-match-state', {
        player1,
        player2,
        partner1,
        partner2
      });
    }
    goto(`/add-new-player/new-match/${num}`);
  }

  onMount(() => {
    WebSockets.subscribe(MATCH_STARTED, onMatchStartedElsewhere);
    let cachedState = LocalStorage.get('start-match-state');
    player1 = cachedState?.player1 || players[0];
    player2 = cachedState?.player2 || players[1];
    if (cachedState?.doubles) {
      partner1 = cachedState?.partner1 || players[2];
      partner2 = cachedState?.partner2 || players[3];
    }
  });

  onDestroy(() => {
    WebSockets.unsubscribe(MATCH_STARTED, onMatchStartedElsewhere);
  });
</script>

<h2>Start a New Match</h2>

<!-- {JSON.stringify({ player1, player2, partner1, partner2 })} -->
<style lang="scss">
  .main.new-match {
    display: flex;
    flex-direction: column;
    align-items: center;

    hr {
      width: 400px;
      max-width: 95%;
      margin-bottom: 2rem;
      margin-top: 2rem;
    }

    .btn {
      min-height: 50px;
      font-size: 1.2rem;

      &.big.begin-match-btn {
        font-size: 1.35rem;
        height: 60px;
        min-width: 300px;
      }
    }

    .doubles-switch {
      margin-bottom: 1rem;
    }

    .team-select-block .btn {
      min-height: unset;
      font-size: 1rem;
      padding: 0.5rem;
    }

    .match-settings {
      .label {
        font-size: 1.35rem;
        max-width: calc(100vw - 2rem);

        &:first-of-type {
          text-align: right;
        }
      }

      .controls-col {
        .label {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        input {
          margin-top: 0.5rem;
          font-size: 1.5rem;
          height: 3rem;
          width: 5rem;
          padding: 0.5rem;
        }
      }

      &.first-serve {
        .controls-col .label {
          padding: 1rem;
          margin-bottom: 0;
        }
      }
    }
  }

  .team-select-block {
    display: flex;
    flex-direction: column;

    .avatar {
      margin: 0 0.5rem 0 1.5rem;
    }
  }

  .player-selected-block,
  .versus-separator {
    margin-bottom: 1rem;
  }

  .player-selection-area {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }

  .player-selected-block {
    display: flex;
    align-items: center;

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

  .and-separator,
  .versus-separator {
    font-size: 1.5rem;
  }

  .and-separator {
    margin-bottom: 1rem;
  }

  .versus-separator {
    margin-bottom: 0;
    position: relative;

    &:before,
    &:after {
      content: '';
      width: 5rem;
      position: absolute;
      top: 1.25rem;
      border: 1px solid #eee;
    }

    &:before {
      left: -6rem;
    }

    &:after {
      left: 2.75rem;
    }
  }

  .coin-flip-area {
    height: 10rem;
    z-index: 15;
  }

  .coin-flip-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .flip-container {
    display: block !important;
    perspective: 1000px;

    .avatar.big {
      margin: 0;
      font-size: 2rem;
    }
  }

  .flip-container.flipping,
  .flip-container.flipping-extra {
    animation: coin-toss 2s ease-in-out;

    .front {
      z-index: 0;
    }
  }

  .flip-container.flipping .flipper {
    animation: coin-flip 2s ease-out;
  }

  .flip-container.flipping-extra .flipper {
    animation: coin-flip-reverse 2s ease-out;
  }

  .flip-container.reversed {
    .flipper {
      transform: rotateX(180deg);
      transition: 0.2s ease;
    }
  }

  .flip-container,
  .flipper,
  .front,
  .back {
    width: 8rem;
    height: 8rem;
  }

  /* flip speed goes here */
  .flipper {
    transition: all 0.6s;
    position: relative;
    transform-style: preserve-3d;
  }

  .front {
    z-index: 2;
  }

  /* hide back of pane during swap */
  .front,
  .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 8rem;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* back, initially hidden pane */
  .back {
    transform: rotateY(180deg) rotateZ(180deg);
  }
</style>
