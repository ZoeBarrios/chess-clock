import { useRef } from "react";
import { INITIAL_STATE } from "../../ModosJuego";

export default function usePlay(setIsPlaying, setTimes, player) {
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
  return {
    handleRestart,
    handleStart,
    handlePause,
  };
}
