import { useReducer } from "react";
import { INITIAL_STATE, gameReducer } from "../../Utils";
import StateContext from "../context/stateContex";

export default function StateProvider({ children }) {
  const [game, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  return (
    <StateContext.Provider value={{ game, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}
