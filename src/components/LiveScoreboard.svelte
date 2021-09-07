<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import WebSockets from '../modules/websockets';
  import {
    SCORE_UPDATE,
    GAME_FINISHED,
    GAME_STARTED,
    MATCH_FINISHED
  } from '../modules/constants';
  import BoxScore from './BoxScore.svelte';

  export let match: Match;

  const onScoreUpdate = ({ game, scorer }: ScoreUpdate) => {
    let i = match?.games.findIndex(g => g.id === game.id);
    if (i !== -1) {
      match.games[i] = game;
      match = match;
    }
  };

  const onGameStart = (game: Game) => {
    let i = match?.games.findIndex(g => g.id === game.id);
    if (i === -1) {
      match.games.push(game);
      match = match;
    }
  };

  const onGameFinish = ({ game }: GameFinishUpdate) => {
    let i = match?.games.findIndex(g => g.id === game.id);
    if (i !== -1) {
      match.games[i] = game;
      match = match;
    }
  };

  const onMatchFinish = (finishedMatch: Match) => {
    match = finishedMatch;
  };

  onMount(() => {
    WebSockets.subscribe(SCORE_UPDATE, onScoreUpdate);
    WebSockets.subscribe(GAME_STARTED, onGameStart);
    WebSockets.subscribe(GAME_FINISHED, onGameFinish);
    WebSockets.subscribe(MATCH_FINISHED, onMatchFinish);
  });

  onDestroy(() => {
    WebSockets.unsubscribe(SCORE_UPDATE, onScoreUpdate);
    WebSockets.unsubscribe(GAME_STARTED, onGameStart);
    WebSockets.unsubscribe(GAME_FINISHED, onGameFinish);
    WebSockets.unsubscribe(MATCH_FINISHED, onMatchFinish);
  });
</script>

<BoxScore jumbotron {match} />
