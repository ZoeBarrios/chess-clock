import { useState, useMemo } from "react";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const modalState = useMemo(() => {
    const toggleModal = (e) => {
      e.preventDefault();
      setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return {
      isOpen,
      toggleModal,
    };
  }, [isOpen]);

  return modalState;
}
