import { ToastContainerProps } from "react-toastify";

export const TOAST_OPTIONS: ToastContainerProps = {
  position: "bottom-left",
  autoClose: 2000,
  progressStyle: {
    background: "#3688E5",
  },
  style: {
    display: "flex",
    flexDirection: "column",
    width: "max-content",
    maxWidth: "300px",
  },
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
};
