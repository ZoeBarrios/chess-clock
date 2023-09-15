import { useContext } from "react";
import { MODOS_JUEGO, convertSecondsToTime } from "../../Utils";
import ButtonStart from "./ButtonStart";
import StateContext from "../context/stateContex";

export default function SaveTime({ time, index }) {
  const { timePlayer1, timePlayer2, player1Name, player2Name, mode } = time;
  const { dispatch } = useContext(StateContext);
  const timeConvertedPlayer1 = convertSecondsToTime(timePlayer1);
  const timeConvertedPlayer2 = convertSecondsToTime(timePlayer2);

  const handleDelete = () => {
    const timesSaves = JSON.parse(localStorage.getItem("times")) || [];
    const newTimesSaves = timesSaves.filter((time, i) => i !== index);
    localStorage.setItem("times", JSON.stringify(newTimesSaves));
  };

  const handleClick = () => {
    dispatch({
      type: "SET_STATE",
      payload: {
        ...time,
        player: 1,
        isPlaying: false,
        player1Name: player1Name,
        player2Name: player2Name,
      },
    });
  };

  return (
    <li>
      <div className="container-players-time">
        <h1>Modo de juego: {MODOS_JUEGO[mode].name}</h1>
        <div className="container-times">
          <div>
            <p>{player1Name}</p>
            <p>
              Time: {timeConvertedPlayer1.hours}:{timeConvertedPlayer1.mins}:
              {timeConvertedPlayer1.secs}
            </p>
            <p>Movimientos: {time.movements1}</p>
          </div>

          <div>
            <p>{player2Name}</p>
            <p>
              Time: {timeConvertedPlayer2.hours}:{timeConvertedPlayer2.mins}:
              {timeConvertedPlayer2.secs}
            </p>
            <p>Movimientos: {time.movements2}</p>
          </div>
        </div>
        <div className="buttons-modal">
          <ButtonStart handleClick={handleClick} />
          <button onClick={handleDelete} className="button">
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
}
