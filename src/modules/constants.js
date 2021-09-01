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
  { title: 'Start New Match', href: '/new-match' },
  { title: 'Update Score', href: '/update-score' }
];

// Websocket message types
export const ADDED_DEVICES_TO_MATCH = 'added-devices-to-match';
export const GAME_FINISHED = 'game-finished';
export const GAME_STARTED = 'game-started';
export const MATCH_FINISHED = 'match-finished';
export const MATCH_STARTED = 'match-started';
export const SCORE_UPDATE = 'score-update';

// Strings
export const CONFIRM_END_MATCH = 'Confirm End Match';
export const DEVICE_CANNOT_UPDATE_MATCH =
  'This device is not authorized to update this match. Please ask the person who started this match to grant you permission.';
export const END_MATCH = 'End Match';
export const END_MATCH_AFFIRMATIVE = `Yep! It's Over, son!`;
export const END_MATCH_NEGATIVE = 'Oops! No.';
export const END_MATCH_CONFIRMATION_PROMPT =
  'Are you sure you want to end this match?';
export const FINAL_TOGGLE_LABEL = 'Final?';
export const LET_OTHERS_UPDATE = 'Let Others Update';
export const MATCH_SUMMARY = 'Match Summary';
export const MENU = 'Menu';
export const NAME_ALREADY_EXISTS =
  'There is already a registered device by that name.';
export const NEW_MATCH_PERMISSION_GRANTED =
  'You have been granted permission to update a match!';
export const NO_DEVICES_SELECTED_ERROR = 'No devices selected.';
export const NO_MATCH_IN_PROGRESS = 'There is no match in progress right now.';
export const NO_NAME_ENTERED = 'Please enter a name.';
export const SET_DEVICE_NAME_PROMPT = `
  It doesn't look like you've used Pong Tracker on this device before.
  Please take a moment to give this device a name, so that you can
  use it to update scores.
`;
export const SITE_TITLE = 'Pong Tracker';
export const START_NEW_ONE = 'Start a new one!';
export const UPDATE_SCORE = 'Update Score';

// String interpolations
export const PLAYING_TO_AND_BEST_OF_PROMPT = (match) =>
  `Playing to ${match.playTo}, ${match.playAllGames ? 'total of' : 'best of'} ${
    match.bestOf
  } games.`;
