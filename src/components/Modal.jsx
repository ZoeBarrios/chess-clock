import { createPortal } from "react-dom";
import React from "react";

function ModalComponent({ children, onClose, isOpen }) {
  return createPortal(
    <>
      {isOpen ? (
        <div className="container-configuration">
          <section className="card-configuration scroll-bar">
            <button onClick={onClose} className="button-modal">
              X
            </button>
            {children}
          </section>
        </div>
      ) : null}
    </>,
    document.getElementById("root")
  );
}

const Modal = React.memo(ModalComponent);
export default Modal;
