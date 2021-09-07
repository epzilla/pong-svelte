/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="@sveltejs/kit" />

type Device = {
  type: string;
  id: string;
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
  matchFinished: boolean;
  gameFinished: boolean;
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
  finished: boolean;
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

type LVP = {
  label: string;
  value: any;
};
