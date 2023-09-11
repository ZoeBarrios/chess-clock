import { useEffect } from "react";
import { INITIAL_INPUTS, MODOS_JUEGO } from "../../Utils";
import InputsTime from "./InputsTime";
import useInputs from "../hooks/useInputs";

export default function Form({ game, dispatch }) {
  const { inputs, handleInputChange, resetInputs } = useInputs(INITIAL_INPUTS);

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

    alert("Se guardaron los cambios");
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
        <h2>{MODOS_JUEGO[game.mode].name}</h2>
        <p>{MODOS_JUEGO[game.mode].description}</p>
      </div>
      <div>
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
      <button onClick={handleSave}>Guardar</button>
    </>
  );
}
