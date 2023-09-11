import { useState } from "react";

export default function useInputs(I_STATE) {
  const [inputs, setInputs] = useState(I_STATE);
  const handleInputChange = (input, value) => {
    setInputs({
      ...inputs,
      [input]: value,
    });
  };

  const resetInputs = () => {
    setInputs(I_STATE);
  };

  return {
    inputs,
    handleInputChange,
    resetInputs,
  };
}
