import useInputs from "../hooks/useInputs";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import ListOfPlays from "./ListOfPlays";
import ButtonStart from "./ButtonStart";
import { useCallback, useContext } from "react";
import StateContext from "../context/stateContex";
import { INITIAL_STATE } from "../../Utils";
import FormConfiguration from "./FormConfiguration";

const INITIAL_INPUTS = {
  namePlayer1: "player1",
  namePlayer2: "player2",
};

export default function ConfigurationsPage() {
  const { isOpen, toggleModal } = useModal();
  const { dispatch } = useContext(StateContext);
  const { inputs, handleInputChange } = useInputs(INITIAL_INPUTS);
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      dispatch({
        type: "SET_STATE",
        payload: {
          ...INITIAL_STATE,
          player1Name: inputs.namePlayer1 || "player1",
          player2Name: inputs.namePlayer2 || "player2",
        },
      });
    },
    [inputs, dispatch]
  );
  return (
    <form className="configurations-page">
      <h1 className="title">Configuraciones iniciales</h1>
      <FormConfiguration
        handleInputChange={handleInputChange}
        inputs={inputs}
      />
      <div className="container-action-buttons">
        <button className="button" onClick={toggleModal}>
          Partidas guardadas
        </button>
        <Modal onClose={toggleModal} isOpen={isOpen}>
          <ListOfPlays />
        </Modal>
        <ButtonStart handleClick={handleClick} />
      </div>
    </form>
  );
}
