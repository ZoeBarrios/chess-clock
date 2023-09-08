import { useEffect, useState } from "react";
import "../stylesheet/ChessClock.css";
import ButtonPlayer from "./ButtonPlayer";
import pauseIMG from "../assets/pause.png";
import playIMG from "../assets/play.png";
import rewindIMG from "../assets/rewind.png";
import ControlButton from "./ControlButton";
import usePlay from "../hooks/usePlay";
import usePlayer from "../hooks/usePlayers";
import usePlayersTimes from "../hooks/usePlayersTimes";

export default function ChessClock({ children, times, setTimes }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { player, changePlayer } = usePlayer();
  const { changePlayersTimes } = usePlayersTimes();
  const { handlePause, handleStart, handleRestart } = usePlay(
    setIsPlaying,
    setTimes,
    player
  );
  useEffect(() => {
    if (isPlaying) {
      const resultado = changePlayersTimes(times, player);
      setTimes(resultado);
      handleStart();
    }
  }, [player]);

  useEffect(() => {
    if (times.timePlayer1 == 0 || times.timePlayer2 == 0) {
      handlePause();
    }
  }, [times.timePlayer1, times.timePlayer2]);

  return (
    <div className="game-container">
      <ButtonPlayer
        time={times.timePlayer1}
        changePlayer={changePlayer}
        myPlayer={player == 1}
        isPlaying={isPlaying}
      />
      <div className="buttons-container">
        {children}

        <ControlButton
          onClick={isPlaying ? handlePause : handleStart}
          src={isPlaying ? pauseIMG : playIMG}
          classe={`boton ${
            times.timePlayer1 == 0 || times.timePlayer2 == 0 ? "disabled" : ""
          }`}
        />
        <ControlButton onClick={handleRestart} src={rewindIMG} />
      </div>
      <ButtonPlayer
        time={times.timePlayer2}
        changePlayer={changePlayer}
        myPlayer={player == 2}
        isPlaying={isPlaying}
      />
    </div>
  );
}
