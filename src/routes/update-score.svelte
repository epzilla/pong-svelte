<script context="module">
  export async function load({ fetch }) {
    try {
      const [matchResult, devicesResult] = await Promise.all([
        fetch('https://pong-api.herokuapp.com/matches/current'),
        fetch('https://pong-api.herokuapp.com/devices')
      ]);

      const match = await matchResult.json();
      const devices = await devicesResult.json();
      const deviceId = LocalStorage.get('device');
      return {
        props: {
          match,
          devices,
          deviceId
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
  import Rest from '../modules/rest';
  import WebSockets from '../modules/websockets';
  import {
    SCORE_UPDATE,
    GAME_FINISHED,
    GAME_STARTED,
    DEVICE_CANNOT_UPDATE_MATCH,
    MATCH_FINISHED
  } from '../modules/constants';

  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';

  export let deviceId;
  export let devices;
  export let match;
  let gamesCollapsed = {};

  selectDevices = (devices) => {
    if (devices && devices.length > 0) {
      this.setState({ showChooseOtherDevice: false }, () => {
        let packet = Object.assign(
          {
            deviceId: this.props.device.id
          },
          this.state
        );
        packet.devices = devices;
        Rest.post('matches/add-devices', packet)
          .then(() => {
            let msg = 'This match can now be updated by ';
            if (devices.length > 1) {
              msg += `${devices
                .slice(0, -1)
                .map((d) => d.name)
                .join(', ')}, and ${devices[devices.length - 1].name}.`;
            } else {
              msg += `${devices[0].name}.`;
            }
            this.props.postAlert({ type: 'info', msg });
          })
          .catch((e) => this.props.postAlert({ type: 'error', msg: e }));
      });
    }
  };

  function onScoreUpdateFromElsewhere() {
    let i = match.games.findIndex((g) => g.id === game.id);
    if (i !== -1) {
      match.games[i] = game;
      match = match;
    }
  }

  function onGameStartedElsewhere(game) {
    let i = match.games.findIndex((g) => g.id === game.id);
    if (i === -1) {
      match.games.push(game);
    } else {
      match.games[i] = game;
    }

    match = match;
    if (game.gameFinished) {
      gamesCollapsed[game.id] = true;
      gamesCollapsed = gamesCollapsed;
    }
  }

  function onMatchFinishedFromElsewhere(m) {
    if (m.id === match.id) {
      goto('/');
    }
  }

  function onGameFinishedFromElsewhere({ game }) {
    onGameStartedElsewhere(game);
  }

  async function scoreChange(game, playerNum, { amount }) {
    let { games } = match;
    let i = games.findIndex((g) => g.id === game.id);
    if (i !== -1) {
      let checkForFinishedMatch = false;
      games[i][`score${playerNum}`] = amount;
      if (
        amount >= match.playTo &&
        (!match.winByTwo || Math.abs(games[i].score1 - games[i].score2) > 1)
      ) {
        games[i].gameFinished = 1;
        gamesCollapsed[games[i].id] = true;
        checkForFinishedMatch = true;
        gamesCollapsed = gamesCollapsed;
      }
      await Rest.post('games/update', {
        game: games[i],
        scorer: playerNum,
        deviceId
      });
      match = { ...match, games };
      if (checkForFinishedMatch) {
        checkIfMatchFinished();
      }
    }
  }

  onMount(async () => {
    if (match && deviceId && devices) {
      WebSockets.subscribe(SCORE_UPDATE, onScoreUpdateFromElsewhere);
      WebSockets.subscribe(GAME_STARTED, onGameStartedElsewhere);
      WebSockets.subscribe(MATCH_FINISHED, onMatchFinishedFromElsewhere);
      WebSockets.subscribe(GAME_FINISHED, onGameFinishedFromElsewhere);
      const canUpdateScore = await Rest.get(
        `matches/can-update-score/${deviceId}`
      );
      if (canUpdateScore) {
        match.games.forEach((g) => (gamesCollapsed[g.id] = !!g.gameFinished));
      } else {
        console.warn(DEVICE_CANNOT_UPDATE_MATCH);
        goto('/');
      }
    } else {
      console.warn(DEVICE_CANNOT_UPDATE_MATCH);
      goto('/');
    }
  });

  onDestroy(() => {
    WebSockets.unsubscribe(SCORE_UPDATE, onScoreUpdateFromElsewhere);
    WebSockets.unsubscribe(GAME_STARTED, onGameStartedElsewhere);
    WebSockets.unsubscribe(MATCH_FINISHED, onMatchFinishedFromElsewhere);
    WebSockets.unsubscribe(GAME_FINISHED, onGameFinishedFromElsewhere);
  });
</script>
