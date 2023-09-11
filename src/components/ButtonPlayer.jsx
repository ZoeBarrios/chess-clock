import { useEffect, useRef } from "react";
import { convertSecondsToTime } from "../../Utils";

export default function ButtonPlayer({ dispatch, myPlayer, game, name }) {
  const cardRef = useRef(null);
  const { hours, mins, secs } = convertSecondsToTime(
    game[`timePlayer${myPlayer}`]
  );

  useEffect(() => {
    if (game[`timePlayer${myPlayer}`] > 10) {
      cardRef.current.classList.remove("warning");
      cardRef.current.classList.remove("lost");
    } else {
      if (
        game[`timePlayer${myPlayer}`] <= 10 &&
        game[`timePlayer${myPlayer}`] > 0
      ) {
        cardRef.current.classList.add("warning");
      }
      if (game[`timePlayer${myPlayer}`] == 0) {
        cardRef.current.classList.remove("warning");
        cardRef.current.classList.add("lost");
      }
    }
  }, [game[`timePlayer${myPlayer}`]]);

  return (
    <div
      className={`boton-player ${game.player == myPlayer ? "active" : ""}`}
      style={myPlayer === 1 ? { transform: "rotate(180deg)" } : {}}
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
