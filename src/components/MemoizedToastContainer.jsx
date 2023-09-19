// MemoizedToastContainer.js
import { memo } from "react";
import { ToastContainer } from "react-toastify";

function ToastContainerComponent() {
  return <ToastContainer />;
}
const MemoizedToastContainer = memo(ToastContainerComponent);

export default MemoizedToastContainer;
