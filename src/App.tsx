import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/tailwind.css";
import { TOAST_OPTIONS } from "./config";
import { ContextProvider } from "./context";
import Routing from "./pages/Routing";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

export const App = () => {
  return (
    <ContextProvider>
      <Routing />
      <ToastContainer {...TOAST_OPTIONS} />
    </ContextProvider>
  );
};

export default App;
