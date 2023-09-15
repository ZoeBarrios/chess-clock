import { useContext, useEffect } from "react";
import "../stylesheet/ChessClock.css";
import ButtonPlayer from "./ButtonPlayer";
import pauseIMG from "../assets/pause.png";
import playIMG from "../assets/play.png";
import rewindIMG from "../assets/rewind.png";
import ControlButton from "./ControlButton";
import saveImg from "../assets/save.png";
import usePlay from "../hooks/usePlay";
import StateContext from "../context/stateContex";

export default function ChessClock({ children }) {
  const { game, dispatch } = useContext(StateContext);
  const { handlePause, handleStart, handleRestart, handleSave } = usePlay();

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
    <div className="game-container ligth">
      <ButtonPlayer myPlayer={1} name={game.player1Name} />
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

        <ControlButton onClick={() => handleSave(game)} src={saveImg} />
      </div>
      <ButtonPlayer myPlayer={2} name={game.player2Name} />
    </div>
  );
}
