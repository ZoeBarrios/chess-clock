import Form from "./Form";
import { MODOS_JUEGO } from "../../ModosJuego";
import gearIMG from "../assets/gear.png";
import ControlButton from "./ControlButton";
import Modal from "./Modal";
import useModal from "../hooks/useModal";

export default function ConfigurationClock({ times, setTimes }) {
  const { isOpen, toggleModal } = useModal();
  const handleModoChange = ({ target: { value } }) => {
    setTimes((prevTimes) => {
      return {
        ...prevTimes,
        mode: value,
      };
    });
  };

  return (
    <>
      <ControlButton src={gearIMG} onClick={toggleModal} />
      <Modal onClose={toggleModal} isOpen={isOpen}>
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
      </Modal>
    </>
  );
}
