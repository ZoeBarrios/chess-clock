import { useState } from "react";
import ChessClock from "./ChessClock";
import ConfigurationClock from "./ConfigurationClock";
import { INITIAL_STATE } from "../../ModosJuego";

export default function Table() {
  const [times, setTimes] = useState(INITIAL_STATE);
  return (
    <ChessClock times={times} setTimes={setTimes}>
      <ConfigurationClock times={times} setTimes={setTimes} />
    </ChessClock>
  );
}
