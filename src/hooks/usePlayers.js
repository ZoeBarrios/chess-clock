import { useState } from "react";

export default function usePlayer() {
  const [player, setPlayer] = useState(1);

  function changePlayer() {
    setPlayer((prevPlayer) => (prevPlayer == 1 ? 2 : 1));
  }

  return {
    player,
    changePlayer,
  };
}
