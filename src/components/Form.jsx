import { useEffect, useState } from "react";
import { INITIAL_INPUTS, MODOS_JUEGO } from "../../ModosJuego";
import InputsTime from "./InputsTime";

export default function Form({ times, setTimes }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS);

  useEffect(() => {
    setInputs(INITIAL_INPUTS);
  }, [times.mode]);

  const handleSave = (e) => {
    e.preventDefault();
    if (inputs.inputTime == "" && inputs.inputIncrement == "")
      return alert("Debe ingresar un valor");

    const minutes = inputs.inputTime * 60;
    setTimes((prevTimes) => {
      return {
        ...prevTimes,
        time: minutes,
        timePlayer1: minutes,
        timePlayer2: minutes,
        timeIncrement: inputs.inputIncrement,
      };
    });
    alert("Se guardaron los cambios");
  };

  const handlerChangeInput = (e, accion) => {
    const { value } = e.target;
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [`input${accion}`]: isNaN(parseFloat(value)) ? "" : parseFloat(value),
      };
    });
  };

  return (
    <>
      <div>
        <h2>{MODOS_JUEGO[times.mode].name}</h2>
        <p>{MODOS_JUEGO[times.mode].description}</p>
      </div>
      <div>
        <InputsTime
          label="Minutos"
          handleChange={(e) => handlerChangeInput(e, "Time")}
          value={inputs.inputTime}
        />

        {(times.mode == 2 || times.mode == 3) && (
          <InputsTime
            label="Incremento(Segundos)"
            handleChange={(e) => handlerChangeInput(e, "Increment")}
            value={inputs.inputIncrement}
          />
        )}
      </div>
      <button onClick={handleSave}>Guardar</button>
    </>
  );
}
