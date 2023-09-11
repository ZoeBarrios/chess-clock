import { useEffect } from "react";
import "../stylesheet/ChessClock.css";
import ButtonPlayer from "./ButtonPlayer";
import pauseIMG from "../assets/pause.png";
import playIMG from "../assets/play.png";
import rewindIMG from "../assets/rewind.png";
import ControlButton from "./ControlButton";
import usePlay from "../hooks/usePlay";

export default function ChessClock({ children, game, dispatch }) {
  const { handlePause, handleStart, handleRestart } = usePlay(dispatch);
  const players = JSON.parse(localStorage.getItem("players"));

  useEffect(() => {
    if (game.isPlaying) {
      dispatch({ type: "SET_PLAYERS_TIMES" });
      handleStart();
    }
  }, [game.player]);

  useEffect(() => {
    if (game.timePlayer1 == 0 || game.timePlayer2 == 0) {
      handlePause();
    }
  }, [game.timePlayer1, game.timePlayer2]);

  return (
    <div className="game-container">
      <ButtonPlayer
        dispatch={dispatch}
        myPlayer={1}
        game={game}
        name={players.player1}
      />
      <div className="buttons-container">
        {children}
        <ControlButton
          onClick={game.isPlaying ? handlePause : handleStart}
          src={game.isPlaying ? pauseIMG : playIMG}
          classe={`boton ${
            game.timePlayer1 == 0 || game.timePlayer2 == 0 ? "disabled" : ""
          }`}
        />
        <ControlButton onClick={handleRestart} src={rewindIMG} />
      </div>
      <ButtonPlayer
        dispatch={dispatch}
        myPlayer={2}
        game={game}
        name={players.player2}
      />
    </div>
  );
}
