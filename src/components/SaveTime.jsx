import { MODOS_JUEGO, convertSecondsToTime } from "../../Utils";
import ButtonStart from "./ButtonStart";

export default function SaveTime({ time, index }) {
  const { player1, player2, timePlayer1, timePlayer2, mode } = time;
  const timeConvertedPlayer1 = convertSecondsToTime(timePlayer1);
  const timeConvertedPlayer2 = convertSecondsToTime(timePlayer2);

  const handleDelete = () => {
    const timesSaves = JSON.parse(localStorage.getItem("times")) || [];
    const newTimesSaves = timesSaves.filter((time, i) => i !== index);
    localStorage.setItem("times", JSON.stringify(newTimesSaves));
  };

  const handleClick = () => {
    const players = {
      player1,
      player2,
    };
    localStorage.setItem("players", JSON.stringify(players));
  };

  return (
    <li>
      <div className="container-players-time">
        <h1>Modo de juego: {MODOS_JUEGO[mode].name}</h1>
        <div className="container-times">
          <div>
            <p>{player1}</p>
            <p>
              Time: {timeConvertedPlayer1.hours}:{timeConvertedPlayer1.mins}:
              {timeConvertedPlayer1.secs}
            </p>
            <p>Movimientos: {time.movements1}</p>
          </div>

          <div>
            <p>{player2}</p>
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
