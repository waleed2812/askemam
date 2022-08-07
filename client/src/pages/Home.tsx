import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function Home() {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>();

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className={`w-full mb-2 ${
          focus || search ? "h-1/6" : "h-1/2"
        } flex flex-col items-center justify-end transition-all duration-300`}
      >
        <div
          className={`w-full ${
            focus || search ? "h-0 hidden" : "h-max"
          } flex items-center justify-center transition-all duration-300`}
        >
          <p>Search Through Engineer Muhammad Ali Mirza's Lectures</p>
        </div>
        <div
          className={`flex w-8/12 items-center rounded-3xl shadow-xl drop-shadow-xl px-2 border-2 ${
            focus ? "border-blue-500" : "border-transparent"
          }`}
        >
          <div className="w-1/12 flex items-center justify-center">
            <AiOutlineSearch className="text-xl xs:text-4xl" />
          </div>
          <div className="w-11/12">
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
              className={`w-full px-2 py-3 xs:py-5 border-0 focus:outline-0 bg-transparent text-lg`}
            />
          </div>
        </div>
      </div>
      <div
        className={`w-full ${
          focus || search ? "h-full" : "h-0"
        } bg-red-500 transition-all duration-300`}
      >

      </div>
    </div>
  );
}

export default Home;
