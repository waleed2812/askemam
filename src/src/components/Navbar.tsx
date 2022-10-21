import * as React from "react";
import { useContextController } from "../context";
import { BsSun, BsSunFill } from "react-icons/bs";

export const Navbar: React.FC<any> = () => {
  const [{ darkMode }, dispatch] = useContextController();

  return (
    <div className="absolute top-0 left-0 w-full h-20 bg-secondary px-2 py-5 flex items-center justify-center">
      <div className="w-full h-full container flex justify-between items-center text-2xl ">
        <div>
          <h1 className="text-white font-helvetica">AskEMAM</h1>
        </div>
        <div>
          <button
            className="text-white"
            onClick={() => dispatch({ type: "DARK_MODE", value: !darkMode })}
          >
            {darkMode ? <BsSun /> : <BsSunFill />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
