import { useRef } from "react";
import { convertSecondsToTime } from "../../Utils";

export default function ButtonPlayer({ dispatch, myPlayer, game, name }) {
  const cardRef = useRef(null);
  const { hours, mins, secs } = convertSecondsToTime(
    game[`timePlayer${myPlayer}`]
  );

  const handleClasesButton = () => {
    return !game.isPlaying
      ? "disabled"
      : game.player == myPlayer
      ? "active"
      : "disabled";
  };

  const handleClasesColors = () => {
    return game.player == myPlayer
      ? game[`timePlayer${myPlayer}`] <= 10 &&
        game[`timePlayer${myPlayer}`] != 0
        ? "warning"
        : game[`timePlayer${myPlayer}`] == 0
        ? "lost"
        : ""
      : "";
  };

  return (
    <div
      className={`boton-player  ${handleClasesColors()} ${handleClasesButton()} ${
        myPlayer == 1 ? "rotate" : ""
      }`}
      ref={cardRef}
      onClick={() => {
        if (game.isPlaying) {
          dispatch({ type: "SET_PLAYER" });

          dispatch({ type: "ADD_MOVEMENT" });
        }
      }}
    >
      <div className="game-info">
        <p>Jugador: {name}</p>
        <p>Movimientos: {game[`movements${myPlayer}`]}</p>
      </div>
      <span className="clock-time">
        {game[`timePlayer${myPlayer}`] == 0
          ? "Perdiste"
          : `${hours}:${mins}:${secs}`}
      </span>
    </div>
  );
}
