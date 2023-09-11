
export default function Modal({ children, onClose, isOpen }) {
  return (
    (
      <>
        {isOpen ? (
          <div className="container-configuration">
            <section className="card-configuration">
              <button onClick={onClose}>X</button>
              {children}
            </section>
          </div>
        ) : null}
      </>
    ),
  );
}
