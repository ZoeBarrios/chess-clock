import ConfigurationClock from "./ConfigurationClock";
import pauseIMG from "../assets/pause.png";
import playIMG from "../assets/play.png";
import rewindIMG from "../assets/rewind.png";
import ControlButton from "./ControlButton";
import saveImg from "../assets/save.png";
import { useCallback } from "react";
export default function ContainerButtons({
  game,
  handlePause,
  handleStart,
  handleRestart,
  handleSave,
}) {
  const handleSaveGame = useCallback(() => {
    handlePause();
    handleSave(game);
  }, [game]);
  return (
    <div className="buttons-container">
      <ConfigurationClock
        handlePause={handlePause}
        handleRestart={handleRestart}
      />
      <ControlButton
        onClick={game.isPlaying ? handlePause : handleStart}
        src={game.isPlaying ? pauseIMG : playIMG}
        classe={`boton ${
          game.timePlayer1 == 0 || game.timePlayer2 == 0 ? "disabled" : ""
        }`}
      />
      <ControlButton onClick={handleRestart} src={rewindIMG} />
      <ControlButton onClick={handleSaveGame} src={saveImg} />
    </div>
  );
}
