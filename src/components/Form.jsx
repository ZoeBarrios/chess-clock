import { useContext, useEffect } from "react";
import { MODOS_JUEGO, convertSecondsToTime } from "../../Utils";
import InputsTime from "./InputsTime";
import useInputs from "../hooks/useInputs";
import StateContext from "../context/stateContex";

export default function Form({ handleRestart }) {
  const { game, dispatch } = useContext(StateContext);
  const { hours, mins, secs } = convertSecondsToTime(game.time, "h:m:s");
  const { inputs, handleInputChange, resetInputs } = useInputs({
    inputHours: hours,
    inputMinutes: mins,
    inputSeconds: secs,
    inputIncrement: game.timeIncrement,
  });

  useEffect(() => {
    resetInputs();
  }, [game.mode]);

  const handleSave = (e) => {
    e.preventDefault();
    if (
      inputs.inputIncrement == "" &&
      inputs.inputHours == "" &&
      inputs.inputMinutes == "" &&
      inputs.inputSeconds == ""
    )
      return alert("Debe ingresar un valor");

    const timeInSeconds =
      (inputs.inputSeconds || 0) +
      (inputs.inputMinutes * 60 || 0) +
      (inputs.inputHours * 3600 || 0);
    dispatch({
      type: "SET_TIMES",
      payload: {
        timeInSeconds,
        timeIncrement: inputs.inputIncrement,
      },
    });

    if (window.confirm("Quieres reiniciar la partida?")) {
      alert("Se reiniciara la partida");
      handleRestart();
    }
    alert("Se guardo correctamente");
  };

  const handlerChangeInput = (e) => {
    const value = isNaN(parseFloat(e.target.value))
      ? ""
      : parseFloat(e.target.value);
    handleInputChange(e.target.name, value);
  };

  return (
    <>
      <div>
        <p>{MODOS_JUEGO[game.mode].description}</p>
      </div>
      <div className="container-inputs">
        <InputsTime
          label="Horas"
          handleChange={handlerChangeInput}
          value={inputs.inputHours}
          name="inputHours"
        />

        <InputsTime
          label="Minutos"
          handleChange={handlerChangeInput}
          value={inputs.inputMinutes}
          name="inputMinutes"
        />

        <InputsTime
          label="Segundos"
          handleChange={handlerChangeInput}
          value={inputs.inputSeconds}
          name="inputSeconds"
        />

        {(game.mode == 2 || game.mode == 3) && (
          <InputsTime
            label="Incremento(Segundos)"
            handleChange={(e) => handlerChangeInput(e, "Increment")}
            value={inputs.inputIncrement}
            name="inputIncrement"
          />
        )}
      </div>
      <button onClick={handleSave} className="button">
        Guardar
      </button>
    </>
  );
}
