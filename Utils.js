export const MODOS_JUEGO = Object.freeze({
  1: {
    name: "A finish",
    description:
      "Consiste en determinar un tiempo fijo y no poner tiempo a añadir por cada movimiento.",
  },
  2: {
    name: "Incremento",
    description:
      "Consiste en añadir un tiempo fijo por cada jugada que se haga, desde el primer movimiento.",
  },
  3: {
    name: "Bronstein",
    description:
      "Consiste en determinar un tiempo para la partida y añadir un tiempo por cada jugada desde el primer movimiento. Pues si se responde antes de que se termine el tiempo adjudicado como tiempo añadido solo se suma el tiempo consumido, y si se tarda más el tiempo establecido.",
  },
});

export const INITIAL_STATE = Object.freeze({
  player: 1,
  isPlaying: false,
  time: 900,
  timePlayer1: 900,
  timePlayer2: 900,
  timeIncrement: 0,
  mode: 1,
  movements1: 0,
  movements2: 0,
});

export const INITIAL_INPUTS = Object.freeze({
  inputHours: 0,
  inputMinutes: 15,
  inputSeconds: 0,
  inputIncrement: 0,
});

const TYPES = {
  SET_PLAYER: "SET_PLAYER",
  SET_PLAYING: "SET_PLAYING",
  SET_TIMES: "SET_TIMES",
  SET_MODE: "SET_MODE",
  SET_INCREMENTS: "SET_INCREMENTS",
  SET_PLAYERS_TIMES: "SET_PLAYERS_TIMES",
  SET_CLOCK_TIMES: "SET_CLOCK_TIMES",
  ADD_MOVEMENT: "ADD_MOVEMENT",
};

const changePlayersTimes = (times, player) => {
  let newTimes;
  const lastPLayer = player == 1 ? 2 : 1;
  const playerName = `timePlayer${lastPLayer}`;
  const playerTime = times[`timePlayer${lastPLayer}`];

  if (playerTime + times.timeIncrement > times.time && times.mode == 3) {
    newTimes = {
      ...times,
      [playerName]: times.time,
    };
  } else {
    newTimes = {
      ...times,
      [playerName]: playerTime + times.timeIncrement,
    };
  }
  return newTimes;
};

export const gameReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_PLAYER:
      return { ...state, player: state.player == 1 ? 2 : 1 };
    case TYPES.SET_PLAYING:
      return { ...state, isPlaying: payload };
    case TYPES.SET_PLAYERS_TIMES:
      return changePlayersTimes(state, state.player);
    case TYPES.SET_MODE:
      return { ...state, mode: payload };
    case TYPES.SET_TIMES:
      return {
        ...state,
        time: payload.timeInSeconds,
        timePlayer1: payload.timeInSeconds,
        timePlayer2: payload.timeInSeconds,
        timeIncrement: payload.timeIncrement,
      };
    case TYPES.SET_INCREMENTS:
      return { ...state, timeIncrement: payload };
    case TYPES.SET_CLOCK_TIMES:
      return {
        ...state,
        [`timePlayer${state.player}`]: state[`timePlayer${state.player}`] - 1,
      };
    case TYPES.ADD_MOVEMENT:
      return {
        ...state,
        [`movements${state.player == 1 ? 2 : 1}`]:
          state[`movements${state.player == 1 ? 2 : 1}`] + 1,
      };
    default:
      return state;
  }
};

export function convertSecondsToTime(seconds) {
  const secs = Math.floor(seconds % 60);
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
  const secsStr = secs < 10 ? `0${secs}` : `${secs}`;

  return { hours: hoursStr, mins: minsStr, secs: secsStr };
}
