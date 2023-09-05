export default function ControlButton({ onClick, src, classe }) {
  return (
    <span className={`${classe} control-button`} onClick={onClick}>
      <img src={src} className="icon" />
    </span>
  );
}
