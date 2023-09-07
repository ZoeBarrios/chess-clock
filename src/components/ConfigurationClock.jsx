import { useRef } from "react";
import Form from "./Form";
import { MODOS_JUEGO } from "../../ModosJuego";
import gearIMG from "../assets/gear.png";
import ControlButton from "./ControlButton";

export default function ConfigurationClock({ times, setTimes }) {
  const refConfiguration = useRef(null);

  const handleModoChange = ({ target: { value } }) => {
    setTimes((prevTimes) => {
      return {
        ...prevTimes,
        mode: value,
      };
    });
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

          <select value={times.mode} onChange={handleModoChange}>
            {Object.entries(MODOS_JUEGO).map((obj) => (
              <option key={obj[0]} value={obj[0]}>
                {obj[1].name}
              </option>
            ))}
          </select>
          <form>
            <Form times={times} setTimes={setTimes} />
          </form>
        </section>
      </div>
    </>
  );
}