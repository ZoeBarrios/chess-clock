import { useRef } from "react";
import { INITIAL_STATE } from "../../Utils";
import { navigate } from "wouter/use-location";

export default function usePlay(dispatch) {
  const refInterval = useRef(null);

  const handleRestart = () => {
    clearInterval(refInterval.current);
    dispatch({ type: "SET_PLAYING", payload: false });
    dispatch({ type: "SET_TIMES", payload: INITIAL_STATE });
    navigate("/");
  };

  const handleStart = () => {
    clearInterval(refInterval.current);
    dispatch({ type: "SET_PLAYING", payload: true });

    refInterval.current = setInterval(() => {
      dispatch({ type: "SET_CLOCK_TIMES" });
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(refInterval.current);
    dispatch({ type: "SET_PLAYING", payload: false });
  };
  return {
    handleRestart,
    handleStart,
    handlePause,
  };
}
