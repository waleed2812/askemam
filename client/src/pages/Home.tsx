import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ResultItem } from "../components";
import { useContextController } from "../context";
import timestamps from "../json/search.min.json";

function Home() {
  const [{ darkMode }] = useContextController();
  const [focus, setFocus] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [limit, setLimit] = React.useState<number>(10);
  const searchedTimestamps = React.useMemo(
    () =>
      timestamps.filter((item) => {
        const from = item.text?.toLowerCase();
        const query = search?.toLowerCase();
        if (from?.includes(query)) return true;
        const params = query
          ?.split(/[^a-z]/)
          .join(" ")
          .split(" ")
          .filter((item) => item);

        if (!params || params?.length < 2) return false;
        return !!params.find((param) => from?.includes(param));
      }),
    [search, timestamps]
  );

  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <div
        className={`w-full mb-2 ${
          focus || search ? "h-1/6" : `h-2/3vh bg-banner-01 bg-cover	 pb-5`
        } flex flex-col items-center justify-end transition-all duration-300`}
      >
        {/* Title */}

        <div
          className={`w-full ${
            focus || search ? "hidden" : ""
          } flex flex-col items-center justify-center transition-all duration-300 mb-3 container`}
        >
          <h1 className="text-white text-5xl mb-5 font-helvetica">AskEMAM</h1>
          <p className="text-white text-2xl text-center">
            Search Questions from Engineer Muhammad Ali Mirza(EMAM)'s Lectures.
          </p>
        </div>

        {/* Search Input */}

        <div
          className={`max-w-xl overflow-hidden ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } mt-2 flex w-8/12 items-center rounded-3xl shadow-xl drop-shadow-xl px-2 border-2 ${
            focus
              ? darkMode
                ? "border-white"
                : "border-black"
              : "border-transparent"
          }`}
        >
          <div className="w-1/12 flex items-center justify-center">
            <AiOutlineSearch className="text-xl xs:text-4xl" />
          </div>
          <div className="w-11/12">
            <input
              value={search}
              onChange={(e) => setSearch(e?.target?.value || "")}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className={`w-full px-2 py-3 xs:py-5 border-0 focus:outline-0 bg-transparent text-lg`}
            />
          </div>
        </div>
      </div>
      {/* Search Results */}
      <div
        className={`container w-full ${
          focus || search ? "h-full" : "h-1/3"
        } transition-all duration-300`}
      >
        {searchedTimestamps.length > 0 ? (
          <>
            {!focus && !search ? (
              <h3 className="text-2xl p-2 ">Most Recent Questions</h3>
            ) : null}
            {searchedTimestamps.map((item: any, index: number) =>
              index < limit ? <ResultItem {...item} key={index} /> : null
            )}
            {searchedTimestamps.length > limit ? (
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={() => setLimit(limit + 10)}
                  className="bg-primary rounded-lg py-2 px-4 text-white mb-2"
                >
                  Load More
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="w-full">
            <p className="w-full text-center text-error text-xl">No Records.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
