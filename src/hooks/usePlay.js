import { useCallback, useContext, useRef } from "react";
import StateContext from "../context/stateContex";

export default function usePlay() {
  const refInterval = useRef(null);
  const { dispatch } = useContext(StateContext);

  const handleRestart = useCallback(() => {
    dispatch({
      type: "RESTART",
    });
    clearInterval(refInterval.current);
  }, [dispatch]);

  const handleStart = useCallback(() => {
    clearInterval(refInterval.current);
    dispatch({ type: "SET_PLAYING", payload: true });

    refInterval.current = setInterval(() => {
      dispatch({ type: "SET_CLOCK_TIMES" });
    }, 1000);
  }, [dispatch]);

  const handlePause = useCallback(() => {
    clearInterval(refInterval.current);
    dispatch({ type: "SET_PLAYING", payload: false });
  }, [dispatch]);

  const handleSave = useCallback((obj) => {
    const userResponse = window.confirm(
      "Are you sure you want to save the game?"
    );
    if (!userResponse) return;
    const saveTimes = JSON.parse(localStorage.getItem("times")) || [];
    saveTimes.push(obj);
    localStorage.setItem("times", JSON.stringify(saveTimes));
    alert("Game saved successfully");
  }, []);
  return {
    handleRestart,
    handleStart,
    handlePause,
    handleSave,
  };
}
