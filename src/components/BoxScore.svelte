<script>
  import { getFormattedMatchDate, getMatchTimeAgo } from '../modules/helpers';
  export let match;
  let headerRowNums = [];
  let footer;
  let gameFlash;
  let scoreFlash;
  let jumbotron;
  let numCols = 0; // match.finished ? match.games.length : match.bestOf;
  let currentGame;
  let classes = 'scoreboard ';
  if (match) {
    numCols = match.finished ? match.games.length : match.bestOf;
    if (!jumbotron) {
      classes += ' box-score';
    } else if (matchFlash) {
      classes += ' flash-final';
    }

    for (let i = 0; i < numCols; i++) {
      headerRowNums.push(i);
      let game = match.games[i];
      if (game && !game.gameFinished) {
        currentGame = i;
      }
    }
  }

  function getClassesForGameBox(match, i, gameFlash) {
    // `score-number-box ${match.games[i].gameFinished ? 'finished' : 'current'}`
    let g = match.games[i];
    let classes = 'score-number-box';
    if (g.gameFinished) {
      classes += ' finished';
    } else {
      classes += ' current';
    }

    if (gameFlash !== null && gameFlash !== undefined && gameFlash === i) {
      classes += ' game-flash';
    }

    return classes;
  }

  function getClassesForScoreBox(match, i, scoreFlash, teamNum) {
    let g = match.games[i];
    let classes = 'score-number-box';
    if (g.gameFinished) {
      if (
        (g.score1 > g.score2 && teamNum === 1) ||
        (g.score2 > g.score1 && teamNum === 2)
      ) {
        classes += ' win';
      } else {
        classes += ' loss';
      }
    }

    if (scoreFlash && shouldFlashScore(scoreFlash, g, i, teamNum)) {
      classes += ' flash';
    }

    return classes;
  }

  function getScoreToDisplay(match, game, teamNum) {
    if (match.updateEveryPoint || game.gameFinished) {
      return game[`score${teamNum}`];
    }

    return '-';
  }

  function getHourGlassIcon(match, currentGame) {
    let game = match.games[currentGame];
    let previousPoints =
      match.games
        .filter((g) => g.gameFinished)
        .reduce((sum, current) => sum + (current.score1 + current.score2), 0) ||
      0;
    let totalPoints = previousPoints + (game ? game.score1 + game.score2 : 0);
    let expectedTotalPoints = calculateExpectedPointsPerMatch(match);
    let pct = totalPoints / expectedTotalPoints;
    if (pct < 0.25) {
      return 'start';
    } else if (pct < 0.8) {
      return 'half';
    }

    return 'end';
  }
</script>

<div class={classes}>
  {#if match.finished}
    <h4 class="date-time-header">{getFormattedMatchDate(match)}</h4>
  {/if}
  <div class="header-row flex">
    <span class="player-name" />
    {#each headerRowNums as i}
      {#if match.games.length >= i + 1}
        <span class={getClassesForGameBox(match, i, gameFlash)}>{i + 1}</span>
      {:else}
        <span class={`score-number-box future`}>{i + 1}</span>
      {/if}
    {/each}
  </div>
  <div class="score-row flex">
    <span
      class={`player-name ${
        stats && stats.winner && stats.winner === match.player1Id
          ? 'winner'
          : ''
      }`}>{getTeamName(match, 1)}</span
    >
    {#each headerRowNums as i}
      {#if match.games.length >= i + 1}
        <span class={getClassesForScoreBox(match, i, scoreFlash, 1)}
          >{getScoreToDisplay(match, match.games[i], 1)}</span
        >
      {:else}
        <span class={`score-number-box future`}>0</span>
      {/if}
    {/each}
  </div>
  <div class="score-row flex">
    <span
      class={`player-name ${
        stats && stats.winner && stats.winner === match.player2Id
          ? 'winner'
          : ''
      }`}>{getTeamName(match, 2)}</span
    >
    {#each headerRowNums as i}
      {#if match.games.length >= i + 1}
        <span class={getClassesForScoreBox(match, i, scoreFlash, 2)}
          >{getScoreToDisplay(match, match.games[i], 2)}</span
        >
      {:else}
        <span class={`score-number-box future`}>0</span>
      {/if}
    {/each}
  </div>
  <div class="score-row stats-row flex-center">
    {#if jumbotron && match?.finished}
      <div class="flex-col flex-center">
        <p class="final flex-center">Final</p>
        <p class="font-small center">{stats.resultString}</p>
        <p class="font-small center">{stats.pointsWonString}</p>
      </div>
    {:else}
      <p class="flex-col" />
      <p class="match-info-block">
        <i class="fa fa-clock-o" />
        <span class="match-info">Started {getMatchTimeAgo(match)}</span>
      </p>
      <p class="match-info-block">
        <i class="fa fa-bullseye" />
        <span class="match-info">Games played to {match.playTo} points.</span>
      </p>
      <p class="match-info-block">
        <i class={`fa fa-hourglass-${getHourGlassIcon(match, currentGame)}`} />
        <span class="match-info"
          >{match.playAllGames ? 'Playing all' : 'Best of'}
          {match.bestOf} games.</span
        >
      </p>
      {#if match?.updateEveryPoint}
        <p class="match-info-block align-top">
          <i class="fa fa-asterisk" />
          <span class="match-info"
            >Live scoring updates have been disabled for this match. Scores will
            only update between games.</span
          >
        </p>
      {/if}
    {/if}
  </div>
</div>
