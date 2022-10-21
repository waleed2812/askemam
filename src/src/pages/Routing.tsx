import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components";
import { useContextController } from "../context";
import Home from "./Home";

export const Routing: React.FC<{}> = () => {
  const [{ darkMode }] = useContextController();
  return (
    <BrowserRouter>
      <Navbar />
      <div
        className={`mt-20 w-full h-full ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Routing;
