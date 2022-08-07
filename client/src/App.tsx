import "./assets/styles/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux";
import { ToastContainer } from "react-toastify";
import { TOAST_OPTIONS } from "./config";
import Routing from "./pages/Routing";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

export const App = () => {
  return (
    <Provider store={store}>
      <Routing />
      <ToastContainer {...TOAST_OPTIONS}/>
    </Provider>
  );
};

export default App;
