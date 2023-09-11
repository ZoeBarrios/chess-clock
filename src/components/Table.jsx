import { useReducer } from "react";
import ChessClock from "./ChessClock";
import ConfigurationClock from "./ConfigurationClock";
import { INITIAL_STATE, gameReducer } from "../../Utils";

export default function Table() {
  const [game, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  return (
    <ChessClock game={game} dispatch={dispatch}>
      <ConfigurationClock game={game} dispatch={dispatch} />
    </ChessClock>
  );
}
