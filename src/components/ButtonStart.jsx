import { memo } from "react";
import { Link } from "wouter";

function ButtonStartComponent({ handleClick }) {
  return (
    <button onClick={handleClick} className="button">
      <Link to="/clock">Comenzar juego</Link>
    </button>
  );
}

const ButtonStart = memo(ButtonStartComponent);
export default ButtonStart;
