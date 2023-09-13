import { useEffect } from "react";
import "../stylesheet/ChessClock.css";
import ButtonPlayer from "./ButtonPlayer";
import pauseIMG from "../assets/pause.png";
import playIMG from "../assets/play.png";
import rewindIMG from "../assets/rewind.png";
import ControlButton from "./ControlButton";
import saveImg from "../assets/save.png";
import usePlay from "../hooks/usePlay";

export default function ChessClock({ children, game, dispatch }) {
  const { handlePause, handleStart, handleRestart, handleSave } = usePlay(
    dispatch,
    game
  );
  const players = JSON.parse(localStorage.getItem("players")) || {};

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

        <ControlButton
          onClick={() =>
            handleSave({
              player1: players.player1,
              player2: players.player2,
              timePlayer1: game.timePlayer1,
              timePlayer2: game.timePlayer2,
              movements1: game.movements1,
              movements2: game.movements2,
              mode: game.mode,
            })
          }
          src={saveImg}
        />
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
