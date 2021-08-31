<!-- svelte-ignore a11y-label-has-associated-control -->
<script context="module">
  import { BASE_URL } from '../modules/constants';
  export async function load({ fetch }) {
    const res = await fetch(`${BASE_URL}players`);
    const players = await res.json();
    const playerOptions =
      players?.map((p) => ({
        label: `${p.fname} ${p.lname}`,
        value: p.id,
        disabled: false
      })) || [];
    return {
      props: {
        players,
        playerOptions
      }
    };
  }
</script>

<script>
  import format from 'date-fns/format/index.js';
  import isAfter from 'date-fns/isAfter';
  import Chart from 'svelte-frappe-charts';
  import Select from 'svelte-select';
  import Rest from '../modules/rest';
  import Toggle from '../components/Toggle.svelte';
  import BoxScore from '../components/BoxScore.svelte';
  export let players;
  export let playerOptions;

  const dateFormat = 'yyyy-MM-dd';
  let resultHR;

  let stats;
  let perGameData;
  let largestMatchesValue = 0;
  let largestGamesValue = 0;
  let largestPointsValue = 0;
  let useDates = false;
  let startDate = format(new Date(), dateFormat);
  let endDate = format(new Date(), dateFormat);
  let activeMatchesIndex = -1;
  let activeGamesIndex = -1;
  let activePointsIndex = -1;

  let player1 = playerOptions?.length > 0 ? playerOptions[0] : null;
  let player2 = playerOptions?.length > 1 ? playerOptions[1] : null;
  $: submitEnabled = !!(player1 && player2);

  let data = {
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    datasets: [
      {
        values: [10, 12, 3, 9, 8, 15, 9]
      }
    ]
  };

  function onPlayer1Select({ detail }) {
    if (!detail?.disabled) {
      player1 = detail;
      if (player1?.value === player2?.value) {
        player2 = null;
      }
    }
  }

  function onPlayer2Select({ detail }) {
    if (!detail?.disabled) {
      player2 = detail;
      if (player1?.value === player2?.value) {
        player1 = null;
      }
    }
  }

  function toggleUseDates() {
    useDates = !useDates;
  }

  function onDateStartChange(e) {
    startDate = e.target.value;
  }

  function onDateEndChange(e) {
    endDate = e.target.value;
  }

  async function submit(e) {
    if (player1 && player2) {
      let dateQuery = '';
      if (useDates && startDate && (!endDate || !isAfter(startDate, endDate))) {
        dateQuery = `?from=${startDate}${endDate ? '&to=' + endDate : ''}`;
      }
      stats = await Rest.get(
        `stats/head-to-head/${player1.value}/${player2.value}${dateQuery}`
      );
      perGameData = stats.player1.perGame.map((pg) => {
        pg.player1 = stats.player1.player.fname;
        pg.player2 = stats.player2.player.fname;
        pg[stats.player1.player.fname] = pg.avgPointsFor;
        pg[stats.player2.player.fname] = pg.avgPointsAgainst;
        return pg;
      });
      console.log({ perGameData });
      largestMatchesValue = Math.max(
        stats.player1.matchesWon,
        stats.player2.matchesWon
      );
      largestGamesValue = Math.max(
        stats.player1.gamesWon,
        stats.player2.gamesWon
      );
      largestPointsValue = Math.max(
        stats.player1.pointsFor,
        stats.player2.pointsFor
      );
      window.smoothScroll(resultHR, 250);
      console.info({
        stats,
        matchesData,
        gamesData,
        pointsData,
        perGameData,
        largestMatchesValue,
        largestGamesValue,
        largestPointsValue
      });
    }
  }
</script>

<div style="height: 100%; width: 100%;">
  <h2>Head-to-Head Stats for:</h2>
  <div class="form-container">
    <div class="players-row">
      <div class="select-container">
        <Select
          items={playerOptions}
          value={player1}
          on:select={onPlayer1Select}
        />
      </div>
      <span class="row-vs-span">vs.</span>
      <div class="select-container">
        <Select
          items={playerOptions}
          value={player2}
          on:select={onPlayer2Select}
        />
      </div>
    </div>

    <div class="toggle-wrap">
      <label>Filter by date</label>
      <Toggle onOff={useDates} toggled={toggleUseDates} id="use-dates-toggle" />
    </div>
    {#if useDates}
      <div class="dates-wrapper">
        <div class="date-input-wrapper">
          <label>From</label>
          <input
            id="date1"
            type="date"
            value={startDate}
            on:change={onDateStartChange}
          />
        </div>
        <div class="date-input-wrapper">
          <label>To</label>
          <input
            id="date2"
            type="date"
            value={endDate}
            on:change={onDateEndChange}
          />
        </div>
      </div>
    {/if}
    <button class="btn primary" on:click={submit} disabled={!submitEnabled}>
      Submit
    </button>
  </div>
  <hr class="result-hr" bind:this={resultHR} />
  {#if stats}
    <div class="charts-container">
      <div class="chart-container">
        <h3 class="chart-header no-top-margin">Matches Won</h3>
        <div class="pie-container">
          <Chart
            data={{
              labels: [
                stats.player1?.player.fname,
                stats.player2?.player.fname,
                'Draw'
              ],
              datasets: [
                {
                  values: [
                    stats.player1?.matchesWon,
                    stats.player2?.matchesWon,
                    stats.player1?.matchesDrawn
                  ]
                }
              ]
            }}
            type="pie"
          />
        </div>
      </div>
      <div class="chart-container">
        <h3 class="chart-header">Games Won</h3>
        <div class="pie-container">
          <Chart
            data={{
              labels: [
                stats.player1?.player.fname,
                stats.player2?.player.fname
              ],
              datasets: [
                {
                  values: [stats.player1?.gamesWon, stats.player2?.gamesWon]
                }
              ]
            }}
            type="pie"
          />
        </div>
      </div>
      <div class="chart-container">
        <h3 class="chart-header">Points Won</h3>
        <div class="pie-container">
          <Chart
            data={{
              labels: [
                stats.player1?.player.fname,
                stats.player2?.player.fname
              ],
              datasets: [
                {
                  values: [stats.player1?.pointsFor, stats.player2?.pointsFor]
                }
              ]
            }}
            type="pie"
          />
        </div>
      </div>
      <div class="chart-container full-width">
        <h3 class="chart-header">Game-by-game Averages</h3>
        <div class="pie-container line-chart-container">
          <!-- <PerGameLineChart
                  data={perGameData}
                  player1={player1}
                  player2={player2}
                  width={lineChartWidth}
                  height={lineChartHeight}
                /> -->
          <Chart
            data={{
              labels: perGameData.map((pg, i) => `Game ${i + 1}`),
              datasets: [
                {
                  values: perGameData.map((pg) => pg.avgPointsFor)
                },
                {
                  values: perGameData.map((pg) => pg.avgPointsAgainst)
                }
              ]
            }}
            type="line"
            lineOptions={{
              regionFill: 1
            }}
          />
        </div>
      </div>
      <hr class="result-hr" />
      <div class="results-container">
        <h3 class="chart-header">Match Results</h3>
        {#each stats.matches as m}
          <BoxScore match={m} />
        {/each}
      </div>
    </div>
  {/if}
</div>
