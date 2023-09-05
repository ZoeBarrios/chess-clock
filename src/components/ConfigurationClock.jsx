import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import { INITIAL_STATE, MODOS_JUEGO } from "../../ModosJuego";
import gearIMG from "../assets/gear.png";
import ControlButton from "./ControlButton";

export default function ConfigurationClock({ times, setTimes }) {
  const [modo, setModo] = useState(1);
  const refConfiguration = useRef(null);

  useEffect(() => {
    setTimes(INITIAL_STATE);
  }, [modo]);

  const handleModoChange = ({ target: { value } }) => {
    setModo(value);
  };

  const toggleConfiguration = () => {
    refConfiguration.current.classList.toggle("hidden");
  };

  return (
    <>
      <ControlButton src={gearIMG} onClick={toggleConfiguration} />
      <div className="container-configuration" ref={refConfiguration}>
        <section className="card-configuration">
          <button onClick={toggleConfiguration}>X</button>
          <h1>Configure su reloj</h1>
          <select value={modo} onChange={handleModoChange}>
            {Object.entries(MODOS_JUEGO).map(([valor, texto]) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
          <form>
            <Form mode={modo} times={times} setTimes={setTimes} />
          </form>
        </section>
      </div>
    </>
  );
}
