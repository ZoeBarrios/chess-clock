import Form from "./Form";
import { MODOS_JUEGO } from "../../Utils";
import gearIMG from "../assets/gear.png";
import ControlButton from "./ControlButton";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import ComboBox from "./ComboBox";
import { useContext } from "react";
import StateContext from "../context/stateContex";

export default function ConfigurationClock({ handlePause, handleRestart }) {
  const { isOpen, toggleModal } = useModal();
  const { game, dispatch } = useContext(StateContext);
  const handleModoChange = ({ target: { value } }) => {
    dispatch({ type: "SET_MODE", payload: value });
  };

  return (
    <>
      <ControlButton
        src={gearIMG}
        onClick={(e) => {
          game.isPlaying && handlePause();
          toggleModal(e);
        }}
      />
      <Modal onClose={toggleModal} isOpen={isOpen}>
        <h1>Configure su reloj</h1>

        <ComboBox
          value={game.mode}
          onChange={handleModoChange}
          options={Object.entries(MODOS_JUEGO).map((obj) => obj[1].name)}
        />
        <form>
          <Form handleRestart={handleRestart} />
        </form>
      </Modal>
    </>
  );
}
