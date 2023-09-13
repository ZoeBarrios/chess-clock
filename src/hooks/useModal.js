import { useState } from "react";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = (e) => {
    e.preventDefault();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return {
    isOpen,
    toggleModal,
  };
}
