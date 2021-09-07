/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@sveltejs/kit" />

type Device = {
  id: number;
  type: string;
  name: string;
};

type Player = {
  id: string;
  fname: string;
  lname: string;
};

type Game = {
  id: number;
  gameNum: number;
  score1: number;
  score2: number;
  matchId: number;
  matchFinished: number; // Really a boolean but a 1 or 0 on the back-end
  gameFinished: number; // Really a boolean but a 1 or 0 on the back-end
};

type Match = {
  id: string;
  updateEveryPoint: boolean;
  playTo: number;
  winByTwo: boolean;
  bestOf: number;
  playAllGames: boolean;
  doubles: boolean;
  player1Id: number;
  player2Id: number;
  partner1Id: number;
  partner2Id: number;
  finished: number; // Really a boolean but a 1 or 0 on the back-end
  startTime: string;
  finishTime: string;
  player1: Player;
  player2: Player;
  partner1?: Player;
  partner2?: Player;
  games: Game[];
};

type MatchStats = {
  p1GamesWon: number;
  p2GamesWon: number;
  p1TotalPoints: number;
  p2TotalPoints: number;
  p1name: string;
  p2name: string;
  resultString: string;
  pointsWonString: string;
  winner: number;
};

type PlayerHeadToHeadStats = {
  avgMargin: number;
  avgPointsAgainst: number;
  avgPointsFor: number;
  gamesLost: number;
  gamesWon: number;
  matchesDrawn: number;
  matchesLost: number;
  matchesWon: number;
  perGame: HeadToHeadStatsByGame[];
  player: Player;
  pointsAgainst: number;
  pointsFor: number;
};

type HeadToHeadStatsByGame = {
  avgMargin: number;
  avgPointsAgainst: number;
  avgPointsFor: number;
  gameNum: number;
  games: number;
  pointsAgainst: number;
  pointsFor: number;
  player1?: string;
  player2?: string;
  [player1]?: number;
  [player2]?: number;
};

type HeadToHeadStats = {
  player1: PlayerHeadToHeadStats;
  player2: PlayerHeadToHeadStats;
  matches: Match[];
};

type Alert = {
  id?: string;
  type: string;
  msg: string;
  action?: () => void;
  clickable?: boolean;
  timeout?: number;
};

type ScoreUpdate = {
  game: Game;
  scorer: Player;
};

type GameFinishUpdate = {
  game: Game;
};

type DevicesAddedUpdate = {
  match: Match;
  deviceIds: number[];
};

type LVP = {
  label: string;
  value: any;
};
