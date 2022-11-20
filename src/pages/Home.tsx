import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ResultItem } from "../components";
import { useContextController } from "context";
import { formatText } from "../utils/reformers";
import { BiLoaderAlt } from "react-icons/bi";

function Home() {
  const [{ darkMode }] = useContextController();
  const [focus, setFocus] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [search, setSearch] = React.useState<string>("");
  const [limit, setLimit] = React.useState<number>(10);
  const [timestamps, setTimestamps] = React.useState<any[]>([]);
  const searchedTimestamps = React.useMemo(
    () => [
      ...timestamps?.filter((item) => {
        let from = formatText(item.text);
        const query = formatText(search);
        if (from?.includes(query)) return true;
        return false;
      }),
      ...timestamps?.filter((item) => {
        let from = formatText(item.text);
        const query = formatText(search);
        const params = query?.split(" ").filter((item) => item);
        const len = params?.length;
        if (!params || len < 2) return false;
        for (let i = 0; i < len; i++) {
          const param = params[0];
          if (from?.includes(param)) {
            from = from?.replace(param, "");
          } else {
            return false;
          }
        }
        return true;
      }),
    ],
    [search, timestamps]
  );

  const fetchTimestamps = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://raw.githubusercontent.com/waleed2812/EMAM/master/search.min.json");
      const resJSON = await res.json();
      setTimestamps(resJSON)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimestamps();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen	">
      {/* Header */}
      <div
        className={`w-full mb-2 ${
          focus || search
            ? "h-1/6"
            : `h-2/3vh bg-banner bg-cover bg-center pb-5`
        } flex flex-col items-center justify-end px-4 sm:px-0 `}
      >
        {/* Title */}

        <div
          className={`w-full ${
            focus || search ? "hidden" : ""
          } flex flex-col items-center justify-center mb-3 container`}
        >
          <h1 className="text-white text-5xl mb-5 font-helvetica">AskEMAM</h1>
          <p className="text-white text-2xl text-center">
            Search Questions from Engineer Muhammad Ali Mirza(EMAM)'s Lectures.
          </p>
        </div>

        {/* Search Input */}

        <div
          className={`px-2 max-w-md sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl w-full overflow-hidden ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } mt-2 flex items-center rounded-3xl shadow-xl drop-shadow-xl border-2 ${
            focus
              ? darkMode
                ? "border-white w-full"
                : "border-black w-8/12"
              : search
              ? "border-secondary w-full"
              : "border-transparent w-8/12"
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
      {isLoading ? (
        <div>
          <span className="animate-spin">
            <BiLoaderAlt
              className={`animate-spin ml-1 ${
                darkMode ? "text-white" : "text-black"
              }`}
              size={72}
            />
          </span>
        </div>
      ) : (
        <div
          className={`px-4 sm:px-0 max-w-md sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl w-full ${
            focus || search ? "h-full" : "h-1/3"
          }`}
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
              <p className="w-full text-center text-error text-xl">
                No Records.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
