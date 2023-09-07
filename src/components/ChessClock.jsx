import { useEffect, useRef, useState } from "react";
import "../stylesheet/ChessClock.css";
import { INITIAL_STATE } from "../../ModosJuego";
import ButtonPlayer from "./ButtonPlayer";
import pauseIMG from "../assets/pause.png";
import playIMG from "../assets/play.png";
import rewindIMG from "../assets/rewind.png";
import ControlButton from "./ControlButton";

export default function ChessClock({ children, times, setTimes }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(1);
  const refInterval = useRef(null);

  const handleRestart = () => {
    clearInterval(refInterval.current);
    setIsPlaying(false);
    setTimes(INITIAL_STATE);
  };

  const handleStart = () => {
    clearInterval(refInterval.current);
    setIsPlaying(true);

    refInterval.current = setInterval(() => {
      setTimes((prevTimes) => {
        return {
          ...prevTimes,
          [`timePlayer${player}`]: prevTimes[`timePlayer${player}`] - 1,
        };
      });
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(refInterval.current);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      let newTimes;
      const lastPLayer = player == 1 ? 2 : 1;
      const playerName = `timePlayer${lastPLayer}`;
      const playerTime = times[`timePlayer${lastPLayer}`];

      if (playerTime + times.timeIncrement > times.time && times.mode == 3) {
        newTimes = {
          ...times,
          [playerName]: times.time,
        };
      } else {
        newTimes = {
          ...times,
          [playerName]: playerTime + times.timeIncrement,
        };
      }
      console.log(newTimes);
      setTimes(newTimes);
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
        setPlayer={setPlayer}
        isPlaying={player == 1}
        paused={isPlaying}
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
        setPlayer={setPlayer}
        isPlaying={player == 2}
        paused={isPlaying}
      />
    </div>
  );
}
