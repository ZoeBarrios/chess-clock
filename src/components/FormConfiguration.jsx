import { memo, useCallback, useContext } from "react";
import PreferencesContext from "../context/preferencesContex";
import InputPlayer from "./InputPlayer";

function FormConfigurationComponent({ handleInputChange, inputs }) {
  const { statePreferences, changeTheme } = useContext(PreferencesContext);

  const handleChange = useCallback(
    (e) => {
      handleInputChange(
        e.target.name,
        isNaN(e.target.value) ? e.target.value : ""
      );
    },
    [handleInputChange]
  );

  const handleChangeTheme = useCallback(() => {
    changeTheme(statePreferences.theme == "dark" ? "light" : "dark");
  }, [changeTheme, statePreferences.theme]);
  return (
    <>
      {Object.entries(inputs).map(([key, value]) => (
        <InputPlayer
          key={key}
          name={key}
          value={value}
          onChange={handleChange}
          label={`Jugador ${key.slice(-1)}`}
        />
      ))}

      <label className="switch">
        <input type="checkbox" onClick={handleChangeTheme} />
        <span className="slider"></span>
      </label>
    </>
  );
}

const FormConfiguration = memo(FormConfigurationComponent);
export default FormConfiguration;
