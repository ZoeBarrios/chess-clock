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
  time: 900,
  timePlayer1: 900,
  timePlayer2: 900,
  timeIncrement: 0,
  mode: 1,
});

export const INITIAL_INPUTS = Object.freeze({
  inputTime: 15,
  inputIncrement: 0,
});
