import { memo, useContext, useEffect, useRef } from "react";
import { convertSecondsToTime } from "../../Utils";
import StateContext from "../context/stateContex";
import imgReloj from "../assets/reloj.png";
import lost from "../assets/lost.mp3";

function ButtonPlayerComponent({ myPlayer, name, handlePause }) {
  const { game, dispatch } = useContext(StateContext);
  const cardRef = useRef(null);
  const iLose = game[`timePlayer${myPlayer}`] == 0;
  const playerTime = game[`timePlayer${myPlayer}`];
  const audioRef = useRef(null);
  const relojRef = useRef(null);

  const { hours, mins, secs } = convertSecondsToTime(playerTime);
  useEffect(() => {
    if (iLose) {
      audioRef.current.play();
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
      if (playerTime <= 10 && playerTime != 0) {
        relojRef.current.classList.remove("hidden");
        return "warning";
      }
      relojRef.current.classList.add("hidden");
      return "";
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
      <span ref={relojRef} className="hidden">
        <img src={imgReloj} className="clock-less-time"></img>
      </span>

      <audio ref={audioRef} style={{ display: "none" }}>
        <source src={lost} type="audio/mpeg" />
        Tu navegador no admite la reproducción de audio.
      </audio>
    </div>
  );
}

const ButtonPlayer = memo(ButtonPlayerComponent);
export default ButtonPlayer;
