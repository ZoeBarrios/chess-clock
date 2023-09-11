import { Link } from "wouter";
import useInputs from "../hooks/useInputs";

const INITIAL_INPUTS = {
  namePlayer1: "player1",
  namePlayer2: "player2",
};
export default function ConfigurationsPage() {
  const { inputs, handleInputChange } = useInputs(INITIAL_INPUTS);
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
    const root = document.getElementsByTagName("html")[0];

    if (e.target.value === "Dark") {
      root.classList.remove("light-theme");
    } else {
      root.classList.add("light-theme");
    }
  };

  return (
    <form className="configurations-page" style={{ color: "white" }}>
      <h1>Configurationes iniciales</h1>
      <label>Nombre jugador 1</label>
      <input
        type="text"
        value={inputs.namePlayer1}
        name="namePlayer1"
        onChange={handleChange}
      />
      <label>Nombre jugador 2</label>
      <input
        type="text"
        value={inputs.namePlayer2}
        name="namePlayer2"
        onChange={handleChange}
      />
      Theme
      <select onChange={handleChangeTheme}>
        <option>Dark</option>
        <option>Light</option>
      </select>
      <button>Historial de ganadores</button>
      <button onClick={handleClick}>
        <Link to="/clock">Comenzar juego</Link>
      </button>
    </form>
  );
}
