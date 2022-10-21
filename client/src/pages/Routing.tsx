import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";

export const Routing: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
