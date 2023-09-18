import useInputs from "../hooks/useInputs";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import ListOfPlays from "./ListOfPlays";
import ButtonStart from "./ButtonStart";
import InputPlayer from "./InputPlayer";
import { useContext } from "react";
import StateContext from "../context/stateContex";
import { INITIAL_STATE } from "../../Utils";
import PreferencesContext from "../context/preferencesContex";

const INITIAL_INPUTS = {
  namePlayer1: "player1",
  namePlayer2: "player2",
};

export default function ConfigurationsPage() {
  const { inputs, handleInputChange } = useInputs(INITIAL_INPUTS);
  const { statePreferences, changeTheme } = useContext(PreferencesContext);
  const { isOpen, toggleModal } = useModal();
  const { dispatch } = useContext(StateContext);

  const handleChange = (e) => {
    handleInputChange(
      e.target.name,
      isNaN(e.target.value) ? e.target.value : ""
    );
  };

  const handleClick = (e) => {
    e.preventDefault();

    dispatch({
      type: "SET_STATE",
      payload: {
        ...INITIAL_STATE,
        player1Name: inputs.namePlayer1,
        player2Name: inputs.namePlayer2,
      },
    });
  };

  const handleChangeTheme = () => {
    changeTheme(statePreferences.theme == "dark" ? "light" : "dark");
  };

  return (
    <form className="configurations-page">
      <h1 className="title">Configurationes iniciales</h1>
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
