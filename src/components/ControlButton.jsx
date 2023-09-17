import { memo } from "react";
export function ControlButtonComponent({ onClick, src, classe }) {
  return (
    <span className={`${classe} control-button`} onClick={onClick}>
      <img src={src} className="icon" />
    </span>
  );
}
const ControlButton = memo(ControlButtonComponent);
export default ControlButton;
