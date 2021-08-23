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
