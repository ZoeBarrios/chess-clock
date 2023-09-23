import { useCallback, useContext, useEffect } from "react";
import "../stylesheet/ChessClock.css";
import ButtonPlayer from "./ButtonPlayer";
import usePlay from "../hooks/usePlay";
import StateContext from "../context/stateContex";
import ContainerButtons from "./ContainerButtons";

export default function ChessClock() {
  const { game, dispatch } = useContext(StateContext);
  const { handlePause, handleStart, handleRestart, handleSave } = usePlay();

  //Proximamente lo estare mejorando para que sea mas eficiente
  //Agradeceria recomendaciones ya que me gustaria mejorar mas en ese aspecto  me cuesta visualizarlo

  useEffect(() => {
    if (game.isPlaying) {
      dispatch({ type: "SET_PLAYERS_TIMES" });
      handleStart();
    }
  }, [game.player]);

  useEffect(() => {
    return () => {
      handlePause();
    };
  }, []);

  return (
    <div className="game-container ligth">
      <ButtonPlayer
        myPlayer={1}
        name={game.player1Name}
        handlePause={handlePause}
      />
      <ContainerButtons
        game={game}
        handlePause={handlePause}
        handleRestart={handleRestart}
        handleStart={handleStart}
        handleSave={handleSave}
      />

      <ButtonPlayer
        myPlayer={2}
        name={game.player2Name}
        handlePause={handlePause}
      />
    </div>
  );
}
