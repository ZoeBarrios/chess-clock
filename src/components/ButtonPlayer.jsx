import { useEffect, useRef } from "react";

function convertMinutesToTime(minutes) {
  let mins = Math.floor(minutes / 60);
  let hours = Math.floor(mins / 60);
  let secs = Math.floor(minutes % 60);

  if (mins >= 60) {
    hours = Math.floor(mins / 60);
    mins = Math.floor(mins % 60);
  }
  if (secs < 10) {
    secs = `0${secs}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }

  return { hours, mins, secs };
}

export default function ButtonPlayer({
  time,
  changePlayer,
  myPlayer,
  isPlaying,
}) {
  const cardRef = useRef(null);
  const { hours, mins, secs } = convertMinutesToTime(time);

  useEffect(() => {
    if (time > 10) {
      cardRef.current.classList.remove("warning");
      cardRef.current.classList.remove("lost");
    } else {
      if (secs <= 10 && mins == 0) {
        cardRef.current.classList.add("warning");
      }
      if (secs == 0 && mins == 0) {
        cardRef.current.classList.remove("warning");
        cardRef.current.classList.add("lost");
      }
    }
  }, [time]);
  return (
    <div
      className={`boton-player ${myPlayer ? "active" : ""}`}
      ref={cardRef}
      onClick={() => {
        if (isPlaying) {
          changePlayer();
        }
      }}
    >
      <span className="clock-time">
        {hours == 0 && secs == 0 && mins == 0
          ? "Perdiste"
          : `${hours}:${mins}:${secs}`}
      </span>
    </div>
  );
}
