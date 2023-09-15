import SaveTime from "./SaveTime";

export default function ListOfPlays() {
  const timesSaves = JSON.parse(localStorage.getItem("times")) || [];
  return (
    <div>
      {timesSaves.length > 0 ? (
        Object.entries(timesSaves).map((time, index) => (
          <div key={index}>
            <ul className="matchs">
              <SaveTime time={time[1]} index={index} />
            </ul>
          </div>
        ))
      ) : (
        <h1>No hay partidas guardadas</h1>
      )}
    </div>
  );
}
