import { useEffect, useRef } from "react";

export default function ButtonPlayer({ time, setPlayer, isPlaying, paused }) {
  const cardRef = useRef(null);
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    if (time > 10) {
      cardRef.current.classList.remove("warning");
      cardRef.current.classList.remove("lost");
    } else {
      if (seconds <= 10 && minutes == 0) {
        cardRef.current.classList.add("warning");
      }
      if (seconds == 0 && minutes == 0) {
        cardRef.current.classList.remove("warning");
        cardRef.current.classList.add("lost");
      }
    }
  }, [time]);
  return (
    <div
      className={`boton-player ${isPlaying ? "active" : ""}`}
      ref={cardRef}
      onClick={() => {
        if (paused) {
          setPlayer((prevPlayer) => (prevPlayer == 1 ? 2 : 1));
        }
      }}
    >
      <span className="clock-time">
        {seconds == 0 && minutes == 0 ? "Perdiste" : `${minutes}:${seconds}`}
      </span>
    </div>
  );
}
