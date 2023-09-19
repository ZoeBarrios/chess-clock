import { useState } from "react";
import SaveTime from "./SaveTime";

export default function ListOfPlays() {
  const [matchs, setMatchs] = useState(
    JSON.parse(localStorage.getItem("times")) || []
  );

  return (
    <div>
      {matchs.length > 0 ? (
        Object.entries(matchs).map((time, index) => (
          <div key={index}>
            <ul className="matchs">
              <SaveTime time={time[1]} index={index} setMatchs={setMatchs} />
            </ul>
          </div>
        ))
      ) : (
        <h1>No hay partidas guardadas</h1>
      )}
    </div>
  );
}
