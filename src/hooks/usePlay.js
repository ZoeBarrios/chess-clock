import { useCallback, useContext, useRef } from "react";
import StateContext from "../context/stateContex";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function usePlay() {
  const refInterval = useRef(null);
  const { dispatch } = useContext(StateContext);

  const handleRestart = useCallback(() => {
    dispatch({
      type: "RESTART",
    });
    clearInterval(refInterval.current);
  }, []);

  const handleStart = useCallback(() => {
    clearInterval(refInterval.current);
    dispatch({ type: "SET_PLAYING", payload: true });

    refInterval.current = setInterval(() => {
      dispatch({ type: "SET_CLOCK_TIMES" });
    }, 1000);
  }, []);

  const handlePause = useCallback(() => {
    clearInterval(refInterval.current);
    dispatch({ type: "SET_PLAYING", payload: false });
  }, []);

  const handleSave = useCallback((obj) => {
    const saveTimes = JSON.parse(localStorage.getItem("times")) || [];
    saveTimes.push(obj);
    localStorage.setItem("times", JSON.stringify(saveTimes));
    toast.success("Partida guardada con éxito");
  }, []);
  return {
    handleRestart,
    handleStart,
    handlePause,
    handleSave,
  };
}
