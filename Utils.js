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
  lastTime1: 900,
  lastTime2: 900,
  timeIncrement: 0,
  mode: 1,
  movements1: 0,
  movements2: 0,
  player1Name: "Player 1",
  player2Name: "Player 2",
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
  RESTART: "RESTART",
  SET_STATE: "SET_STATE",
};

const changePlayersTimes = (times, player) => {
  let newTimes;
  const lastPLayer = player == 1 ? 2 : 1;
  const playerName = `timePlayer${lastPLayer}`;
  const playerTime = times[`timePlayer${lastPLayer}`];
  const lastTime = times[`lastTime${lastPLayer}`];
  let finalTime = 0;
  if (times.mode == 3) {
    const remainingTime = lastTime - playerTime;
    console.log(remainingTime);
    if (remainingTime <= 0) return times;
    if (remainingTime > times.timeIncrement) {
      finalTime = playerTime + times.timeIncrement;
      newTimes = {
        ...times,
        [playerName]: finalTime > times.time ? times.time : finalTime,
        [`lastTime${lastPLayer}`]:
          finalTime > times.time ? times.time : finalTime,
      };
    } else {
      finalTime = playerTime + remainingTime;
      newTimes = {
        ...times,
        [playerName]: finalTime > times.time ? times.time : finalTime,
        [`lastTime${lastPLayer}`]:
          finalTime > times.time ? times.time : finalTime,
      };
    }
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
        lastTime1: payload.timeInSeconds,
        lastTime2: payload.timeInSeconds,
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
    case TYPES.RESTART:
      return {
        ...state,
        player: 1,
        isPlaying: false,
        timePlayer1: state.time,
        timePlayer2: state.time,
        lastTime1: state.time,
        lastTime2: state.time,
        movements1: 0,
        movements2: 0,
      };

    case TYPES.SET_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export function convertSecondsToTime(seconds, format = "hh:mm:ss") {
  const secs = Math.floor(seconds % 60);
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  let hoursStr;
  let minsStr;
  let secsStr;

  if (format == "hh:mm:ss") {
    hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    minsStr = mins < 10 ? `0${mins}` : `${mins}`;
    secsStr = secs < 10 ? `0${secs}` : `${secs}`;
  } else {
    hoursStr = hours;
    minsStr = mins;
    secsStr = secs;
  }

  return { hours: hoursStr, mins: minsStr, secs: secsStr };
}
