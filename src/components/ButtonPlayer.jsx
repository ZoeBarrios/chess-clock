import { memo, useContext, useEffect, useRef } from "react";
import { convertSecondsToTime } from "../../Utils";
import StateContext from "../context/stateContex";

function ButtonPlayerComponent({ myPlayer, name, handlePause }) {
  const { game, dispatch } = useContext(StateContext);
  const cardRef = useRef(null);
  const iLose = game[`timePlayer${myPlayer}`] == 0;
  const playerTime = game[`timePlayer${myPlayer}`];

  const { hours, mins, secs } = convertSecondsToTime(playerTime);
  useEffect(() => {
    if (iLose) {
      cardRef.current.classList.add("lost");
      handlePause();
    } else {
      cardRef.current.classList.remove("lost");
    }
  }, [game.isPlaying, handlePause, iLose]);

  const handleClasesButton = () => {
    return !game.isPlaying || game.player != myPlayer ? "disabled" : "active";
  };

  const handleClasesColors = () => {
    if (game.isPlaying && game.player == myPlayer) {
      return playerTime <= 10 && playerTime != 0 ? "warning" : "";
    }
  };

  return (
    <div
      className={`boton-player  ${handleClasesButton()}  ${handleClasesColors()} ${
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
        {iLose ? "Perdiste" : `${hours}:${mins}:${secs}`}
      </span>
      {cardRef.current?.classList.contains("warning") ? (
        <span>
          <img src="src\assets\reloj.png" className="clock-less-time"></img>
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

const ButtonPlayer = memo(ButtonPlayerComponent);
export default ButtonPlayer;
