import { memo } from "react";
import { useLocation } from "wouter";

function ButtonStartComponent({ handleClick }) {
  const [location, setLocation] = useLocation();
  const redirect = (e) => {
    e.preventDefault();
    handleClick();
    setLocation("/clock");
  };
  return (
    <button onClick={(e) => redirect(e)} className="button">
      Comenzar Juego
    </button>
  );
}

const ButtonStart = memo(ButtonStartComponent);
export default ButtonStart;
