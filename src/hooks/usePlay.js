import { useContext, useRef } from "react";
import StateContext from "../context/stateContex";

export default function usePlay() {
  const refInterval = useRef(null);
  const { dispatch } = useContext(StateContext);

  const handleRestart = () => {
    dispatch({
      type: "RESTART",
    });
    clearInterval(refInterval.current);
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

  const handleSave = (obj) => {
    const userResponse = window.confirm(
      "Are you sure you want to save the game?"
    );
    if (!userResponse) return;
    const saveTimes = JSON.parse(localStorage.getItem("times")) || [];
    saveTimes.push(obj);
    localStorage.setItem("times", JSON.stringify(saveTimes));
    alert("Game saved successfully");
  };
  return {
    handleRestart,
    handleStart,
    handlePause,
    handleSave,
  };
}
