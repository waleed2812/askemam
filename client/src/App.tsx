import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function App() {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>();

  return (
    <div className="w-screen h-screen flex flex-col">
      <div
        className={`w-full ${
          focus || search ? "h-1/6" : "h-full"
        } flex items-center justify-center transition-all duration-300`}
      >
        <div className={`flex w-8/12 items-center rounded-xl shadow-xl drop-shadow-xl px-2 border-2 ${focus ? "border-blue-500" : "border-transparent"}`}>
          <AiOutlineSearch className="text-xl xs:text-4xl" />
          <input
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            onFocus={(e) => {
              e.preventDefault();
              setFocus(true);
            }}
            onBlur={(e) => {
              e.preventDefault();
              setFocus(false);
            }}
            className={`px-2 py-5 border-0 focus:outline-0 bg-transparent text-lg`}
          />
        </div>
      </div>
      <div
        className={`w-full ${
          focus || search ? "h-5/6" : "h-0"
        } bg-red-500 transition-all duration-300`}
      >

      </div>
    </div>
  );
}

export default App;
