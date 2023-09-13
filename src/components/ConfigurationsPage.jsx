import useInputs from "../hooks/useInputs";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import ListOfPlays from "./ListOfPlays";
import ButtonStart from "./ButtonStart";
import InputPlayer from "./InputPlayer";
import ComboBox from "./ComboBox";

const INITIAL_INPUTS = {
  namePlayer1: "player1",
  namePlayer2: "player2",
};

export default function ConfigurationsPage() {
  const { inputs, handleInputChange } = useInputs(INITIAL_INPUTS);
  const { isOpen, toggleModal } = useModal();
  const root = document.getElementsByTagName("html")[0];

  root.classList.remove("light-theme");
  const handleChange = (e) => {
    handleInputChange(
      e.target.name,
      isNaN(e.target.value) ? e.target.value : ""
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    const players = {
      player1: inputs.namePlayer1,
      player2: inputs.namePlayer2,
    };
    localStorage.setItem("players", JSON.stringify(players));
  };

  const handleChangeTheme = (e) => {
    if (e.target.value === "Dark") {
      root.classList.remove("light-theme");
    } else {
      root.classList.add("light-theme");
    }
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

      <ComboBox
        label="Tema"
        options={["Dark", "Light"]}
        onChange={handleChangeTheme}
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
