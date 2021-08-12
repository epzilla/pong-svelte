<script>
  import {
    getFormattedMatchDate,
    getMatchTimeAgo,
    getTeamName,
    getStatsForMatch,
    calculateExpectedPointsPerMatch,
    shouldFlashScore
  } from '../modules/helpers';
  export let match;
  let stats;
  let headerRowNums = [];
  let footer;
  let gameFlash;
  let scoreFlash;
  let jumbotron;
  let numCols = 0;
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

    if (match.finished) {
      stats = getStatsForMatch(match);
    }
  }

  function getClassesForGameBox(match, i, gameFlash) {
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
        stats?.winner && stats.winner === match.player1Id ? 'winner' : ''
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
        stats?.winner && stats.winner === match.player2Id ? 'winner' : ''
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
        <p class="font-small center">{stats?.resultString}</p>
        <p class="font-small center">{stats?.pointsWonString}</p>
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

<style>
  .scoreboard {
    margin: 0 auto;
    padding: 1rem;
    background-color: #fff;
    border: 3px solid #aaa;
    border-radius: 5px;
    min-width: 40vw;
    max-width: calc(100vw - 1rem);
  }
  .scoreboard h3 {
    margin: 0;
  }
  @media screen and (max-width: 700px) {
    .scoreboard {
      min-width: 65vw;
    }
  }
  .player-name,
  .score-number-box {
    padding: 0.25rem;
  }
  @media screen and (max-width: 400px) {
    .player-name,
    .score-number-box {
      padding: 0.25rem 0;
    }
  }
  @media screen and (min-width: 550px) {
    .player-name,
    .score-number-box {
      font-size: 1.5rem;
      padding: 0.5rem;
    }
  }
  @media screen and (min-width: 700px) {
    .player-name,
    .score-number-box {
      font-size: 1.75rem;
      padding: 1rem;
    }
  }
  @media screen and (min-width: 1000px) {
    .player-name,
    .score-number-box {
      font-size: 3rem;
      padding: 1rem;
    }
  }
  .player-name {
    flex: 1;
  }
  .player-name.winner {
    position: relative;
    font-weight: 700;
  }
  .player-name.winner:before {
    content: '';
    position: absolute;
    left: -0.66rem;
    top: 0.55em;
    border-top: 0.4em solid transparent;
    border-bottom: 0.4em solid transparent;
    border-left: 0.4em solid var(--colorDefaultText);
    border-right: 0.4em solid transparent;
  }
  @media screen and (min-width: 700px) {
    .player-name.winner:before {
      top: 0.8em;
      left: -0.2em;
    }
  }
  @media screen and (min-width: 1000px) {
    .player-name.winner:before {
      left: -0.66rem;
      top: 0.55em;
    }
  }
  .score-number-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.25rem;
    padding: 0.25rem 0;
    width: 2rem;
  }
  .score-number-box.win {
    font-weight: 900;
  }
  .score-number-box.loss {
    color: var(--colorMediumText);
  }
  .score-number-box.future {
    color: var(--colorMediumText);
    opacity: 0.5;
  }
  .score-number-box.flash {
    background-color: var(--scoreFlashColor);
    font-weight: 700;
  }
  .score-number-box.game-flash {
    background-color: var(--scoreFlashColor);
    position: relative;
  }
  .score-number-box.game-flash:after {
    position: absolute;
    animation: flash 1s ease-in-out infinite;
    content: '';
    position: absolute;
    width: 2.1em;
    height: 5.5em;
    top: 0;
    left: 0;
    background-color: var(--scoreFlashColor);
  }
  @media screen and (min-width: 550px) {
    .score-number-box.game-flash:after {
      left: -0.15em;
    }
  }
  @media screen and (min-width: 700px) {
    .score-number-box.game-flash:after {
      height: 6.25em;
      left: 0;
      width: 2.3em;
    }
  }
  @media screen and (min-width: 1000px) {
    .score-number-box.game-flash:after {
      height: 5em;
      left: -0.1em;
      width: 1.5em;
    }
  }
  @media screen and (min-width: 550px) {
    .score-number-box {
      margin: 0 1rem;
      width: 2.75rem;
    }
  }
  @media screen and (min-width: 700px) {
    .score-number-box {
      width: 4rem;
    }
  }
  .header-row {
    font-weight: 600;
  }
  .header-row .score-number-box {
    border-bottom: 1px solid var(--primaryBtnBg);
  }
  .header-row .score-number-box.current {
    background-image: linear-gradient(#fff, #eee);
    font-weight: 900;
    border-bottom-width: 3px;
  }
  .stats-row {
    margin-top: 0.5rem;
  }
  .stats-row .final,
  .stats-row .match-info-block {
    margin: 0;
  }
  .stats-row .final {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  .stats-row .match-info-block {
    color: #aaa;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
  }
  .stats-row .match-info-block.align-top {
    align-items: flex-start;
  }
  .stats-row .match-info-block.align-top .fa {
    margin-top: 2px;
  }
  .stats-row p {
    margin: 0;
  }
  .date-time-header {
    margin: 0 0 0.5rem 0;
    font-style: italic;
    color: #aaa;
    text-decoration: underline;
    text-align: center;
  }
  .scoreboard.box-score {
    margin-bottom: 2rem;
  }

  .big-box-score {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 1.25rem;
    font-family: 'Montserrat', var(--mainFont);
    position: fixed;
    border: 3px solid #efefef;
    border-top: none;
    top: 50px;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
  }
  .big-box-score:last-child {
    border-bottom: none;
  }
  .big-box-score .back-button {
    position: absolute;
    height: 40px;
    width: 40px;
    top: 1rem;
    left: 0.5rem;
    background-color: transparent;
    border-radius: 25px;
    border: 1px solid #fff;
    color: #fff;
    cursor: pointer;
    line-height: 0;
    z-index: 3;
    font-size: 1rem;
    padding: 0;
  }
  .big-box-score .back-button.dark {
    border-color: var(--colorDefaultText);
    color: var(--colorDefaultText);
  }
  .big-box-score .date-span {
    position: absolute;
    left: 1rem;
  }
  .big-box-score .team-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 100%;
    width: 50%;
    padding: 0 2rem;
    position: relative;
  }
  .big-box-score .team-block * {
    color: #fff;
    user-select: none;
  }
  .big-box-score .team-block .team-name,
  .big-box-score .team-block .score-line {
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 700;
    text-shadow: 2px 2px rgba(0, 0, 0, 0.7);
  }
  @media screen and (max-width: 1000px) {
    .big-box-score .team-block .team-name,
    .big-box-score .team-block .score-line {
      font-size: 2.5rem;
    }
  }
  @media screen and (max-width: 800px) {
    .big-box-score .team-block .team-name,
    .big-box-score .team-block .score-line {
      font-size: 2rem;
    }
  }
  .big-box-score .team-block .team-name {
    margin-top: 30vh;
    min-height: 3rem;
    text-align: center;
    z-index: 1;
  }
  .big-box-score .team-block .team-name.smaller {
    font-size: 2rem;
  }
  @media screen and (max-width: 750px) {
    .big-box-score .team-block .team-name {
      text-align: left;
    }
  }
  .big-box-score .team-block .score-line {
    border-radius: 50%;
    box-shadow: 0 0 15vw 10vw rgba(0, 0, 0, 0.3),
      inset 0 0 0 2rem rgba(0, 0, 0, 0.3);
    font-size: 7rem;
  }
  .big-box-score .team-block .overlay,
  .big-box-score .team-block .team-img,
  .big-box-score .team-block .team-bg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 25vw;
  }
  .big-box-score .team-block .team-img {
    opacity: 0.33;
  }
  .big-box-score .team-block .overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }
  .big-box-score .separator-left,
  .big-box-score .separator-right {
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: calc(100vh - 50px) 5vw 0 0;
    position: absolute;
    left: calc(50% - 2.5rem);
    pointer-events: none;
    user-select: none;
    z-index: 1;
  }
  .big-box-score .separator-right {
    border-width: 0 0 calc(100vh - 50px) 5vw;
  }
  .big-box-score .team-badge {
    width: 50px;
    height: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin: 1rem;
  }
  @media screen and (max-width: 850px) {
    .big-box-score .separator-left,
    .big-box-score .separator-right {
      left: calc(50% - 1rem);
    }
  }
  @media screen and (max-width: 650px) {
    .big-box-score {
      flex-direction: column;
    }
    .big-box-score .team-block {
      height: 50%;
      width: 100%;
    }
    .big-box-score .team-block .team-img {
      opacity: 0.2;
      width: 50%;
    }
    .big-box-score .team-block .overlay {
      flex-direction: row;
      justify-content: flex-start;
      padding: 2rem;
      z-index: 2;
    }
    .big-box-score .team-block .overlay .team-name {
      margin-top: 0;
    }
    .big-box-score .team-block .overlay .score-line {
      box-shadow: none;
      margin-left: auto;
    }
    .big-box-score .separator-right,
    .big-box-score .separator-left {
      display: none;
    }
  }
  .big-box-score .team-name {
    display: none;
  }
  .big-box-score .team-name.light {
    text-shadow: 2px 2px rgba(204, 204, 204, 0.7);
  }
  .big-box-score .team-name.team-name-smaller {
    display: inline;
  }
  .big-box-score .team-name.team-name-smaller.small-text {
    font-size: 1.5rem;
    margin-top: 1.5rem;
  }
  @media screen and (min-width: 750px) {
    .big-box-score .team-name.team-name-smaller {
      display: none;
    }
    .big-box-score .team-name.team-name-small {
      display: inline;
    }
  }
  @media screen and (min-width: 950px) {
    .big-box-score .team-name.team-name-small {
      display: none;
    }
    .big-box-score .team-name.team-name-full {
      display: inline;
    }
  }
  .big-box-score .team-name .score-line {
    flex-shrink: 0;
  }
  .big-box-score .team-name .score-line * {
    margin: 0 0.5rem;
  }
  @media screen and (max-width: 450px) {
    .big-box-score .team-name .team-name,
    .big-box-score .team-name .score-line {
      font-size: 14px;
    }
    .big-box-score .team-name .team-badge {
      margin: 1rem 0.25rem;
    }
    .big-box-score .team-name .team-name {
      margin-right: 0.25rem;
    }
  }
  @media screen and (max-width: 350px) {
    .big-box-score .team-name .team-name,
    .big-box-score .team-name .score-line {
      font-size: 14px;
    }
    .big-box-score .team-name .team-badge {
      margin: 1rem 0.25rem;
    }
    .big-box-score .team-name .score-line * {
      margin: 0 0.25rem;
    }
    .big-box-score .team-name .team-name {
      margin-right: 0.25rem;
    }
  }
  .scale-in-enter.big-box-score {
    animation: flip-in 300ms linear;
  }
  .scale-in-leave.big-box-score {
    animation: flip-out 300ms linear;
  }
  .score-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .score-row .match-info-block {
    margin: 0.5em;
  }

  .score-row .match-info-block .fa {
    margin: 0 0.5em;
  }
</style>
