import { useState } from "react";

export default function useInputs(I_STATE) {
  const [inputs, setInputs] = useState(I_STATE);
  const handleInputChange = (input, value) => {
    setInputs({
      ...inputs,
      [input]: value,
    });
  };

  const resetInputs = (isFinish = false) => {
    if (isFinish) {
      setInputs({
        ...I_STATE,
        inputIncrement: 0,
      });
    } else {
      setInputs(I_STATE);
    }
  };

  return {
    inputs,
    handleInputChange,
    resetInputs,
  };
}
