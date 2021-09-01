export const WS_BASE_URL = 'ws://pong-api.herokuapp.com';
export const BASE_URL = 'https://pong-api.herokuapp.com/';
export const DEVICE_TYPES = {
  MOBILE_DEVICE: 'Mobile',
  TABLET_DEVICE: 'Tablet',
  LAPTOP_DEVICE: 'Laptop',
  DESKTOP_DEVICE: 'Desktop',
  GAME_SYSTEM: 'Game System',
  TV_DEVICE: 'TV',
  OTHER_DEVICE: 'Other'
};
export const ROUTES = [
  { title: 'Home', href: '/' },
  { title: 'Stats', href: '/stats' },
  {
    title: 'Start New Match',
    href: '/new-match',
    hideIfMatchInProgress: true
  },
  { title: 'Update Score', href: '/update-score', hideIfNoMatch: true }
];

// Websocket message types
export const ADDED_DEVICES_TO_MATCH = 'added-devices-to-match';
export const GAME_FINISHED = 'game-finished';
export const GAME_STARTED = 'game-started';
export const MATCH_FINISHED = 'match-finished';
export const MATCH_STARTED = 'match-started';
export const SCORE_UPDATE = 'score-update';

// Strings
export const AFTER_EACH_GAME = 'After each game';
export const BEGIN = 'Begin';
export const BEST_OF = 'Best of';
export const CHANGE = 'Change';
export const CONFIRM_END_MATCH = 'Confirm End Match';
export const DEVICE_CANNOT_UPDATE_MATCH =
  'This device is not authorized to update this match. Please ask the person who started this match to grant you permission.';
export const DEVICE_NAME = 'Device Name';
export const DEVICE_TYPE = 'Device Type';
export const DOUBLES = 'Doubles';
export const END_MATCH = 'End Match';
export const END_MATCH_AFFIRMATIVE = `Yep! It's Over, son!`;
export const END_MATCH_NEGATIVE = 'Oops! No.';
export const END_MATCH_CONFIRMATION_PROMPT =
  'Are you sure you want to end this match?';
export const FINAL_TOGGLE_LABEL = 'Final?';
export const FILTER_BY_DATE = 'Filter by date';
export const FLIP_COIN = 'Flip Coin for 1st Serve';
export const FROM = 'from';
export const GAME_BY_GAME_AVERAGES = 'Game-by-game Averages';
export const GAMES = 'Games';
export const GAMES_WON = 'Games Won';
export const HEAD_TO_HEAD_LABEL = 'Head-to-Head Stats for:';
export const HERE_GOES = 'Here goes...';
export const LET_OTHERS_UPDATE = 'Let Others Update';
export const MATCH_RESULTS = 'Match Results';
export const MATCH_SUMMARY = 'Match Summary';
export const MATCHES_WON = 'Matches Won';
export const MENU = 'Menu';
export const NAME_ALREADY_EXISTS =
  'There is already a registered device by that name.';
export const NEW_MATCH_PERMISSION_GRANTED =
  'You have been granted permission to update a match!';
export const NO = 'No';
export const NO_DEVICES_SELECTED_ERROR = 'No devices selected.';
export const NO_MATCH_IN_PROGRESS = 'There is no match in progress right now.';
export const NO_NAME_ENTERED = 'Please enter a name.';
export const OTHER = 'Other';
export const PLAY_ALL_GAMES = 'Play all games, even if match clinched?';
export const PLAY_TO = 'Play to';
export const POINT_BY_POINT = 'Point-by-point';
export const POINTS_WON = 'Points Won';
export const RECENT_MATCHES = 'Recent Matches';
export const SET_DEVICE_NAME_PROMPT = `
  It doesn't look like you've used Pong Tracker on this device before.
  Please take a moment to give this device a name, so that you can
  use it to update scores.
`;
export const SINGLES = 'Singles';
export const SITE_TITLE = 'Pong Tracker';
export const START_A_NEW_MATCH = 'Start a New Match';
export const START_NEW_ONE = 'Start a new one!';
export const SUBMIT = 'Submit';
export const TO = 'to';
export const UPDATE_SCORE = 'Update Score';
export const UPDATE_SCORES = 'Update scores';
export const VS_ABBREV = 'vs.';
export const WELCOME_EXCLAM = 'Welcome!';
export const YES = 'Yes';

// String interpolations
export const FIRST_SERVE_PROMPT = (player) => `${player.fname} serves first!`;
export const PLAYING_TO_AND_BEST_OF_PROMPT = (match) =>
  `Playing to ${match.playTo}, ${match.playAllGames ? 'total of' : 'best of'} ${
    match.bestOf
  } games.`;
