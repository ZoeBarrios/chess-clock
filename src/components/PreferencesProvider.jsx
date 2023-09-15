import { useReducer } from "react";
import PreferencesContext from "../context/preferencesContex";

const actions = {
  SET_THEME: "SET_THEME",
};

const preferencesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_THEME:
      return {
        ...state,
        theme: payload,
      };

    default:
      return state;
  }
};

export default function PreferencesProvider({ children }) {
  const [statePreferences, dispatchPreferences] = useReducer(
    preferencesReducer,
    {
      theme: "dark",
    }
  );

  const changeTheme = (theme) => {
    dispatchPreferences({ type: actions.SET_THEME, payload: theme });
    if (theme == "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  };
  return (
    <PreferencesContext.Provider
      value={{ statePreferences, dispatchPreferences, changeTheme }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
