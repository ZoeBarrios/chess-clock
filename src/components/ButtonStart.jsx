import { Link } from "wouter";

export default function ButtonStart({ handleClick }) {
  return (
    <button onClick={handleClick} className="button">
      <Link to="/clock">Comenzar juego</Link>
    </button>
  );
}
