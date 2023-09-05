import { MODOS_JUEGO } from "../../ModosJuego";

export default function Form({ mode, times, setTimes }) {
  const handlerChangeTime = ({ target: { value } }) => {
    setTimes((prevTimes) => {
      return {
        ...prevTimes,
        time: value,
        timePlayer1: value,
        timePlayer2: value,
      };
    });
  };
  const handlerChangeIncrement = ({ target: { value } }) => {
    setTimes((prevTimes) => {
      return {
        ...prevTimes,
        time: value,
        timeIncrement: value,
      };
    });
  };

  return (
    <>
      {mode == 1 ? <h2>{MODOS_JUEGO[mode]}</h2> : <h2>{MODOS_JUEGO[mode]}</h2>}
      <label>
        Minutos
        <input
          type="number"
          min="1"
          onChange={handlerChangeTime}
          value={times.timePlayer1}
        ></input>
      </label>

      {(mode == 2 || mode == 3) && (
        <label>
          Incremento
          <input
            type="number"
            min="1"
            onChange={handlerChangeIncrement}
            value={times.timeIncrement}
          ></input>
        </label>
      )}
    </>
  );
}
