export default function ButtonPlayer({ time, setPlayer, isPlaying, paused }) {
  return (
    <div
      className={`boton-player ${isPlaying ? "active" : ""}`}
      onClick={() => {
        if (paused) {
          setPlayer((prevPlayer) => (prevPlayer == 1 ? 2 : 1));
        }
      }}
    >
      <span className="clock-time">{time == 0 ? "Perdiste" : time}</span>
    </div>
  );
}
