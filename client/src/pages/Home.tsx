import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Loader, ResultItem } from "../components";

function Home() {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [isSearching, setSearching] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>();
  const [timestamps, setTimestamps] = React.useState<any[]>([]);
  const [limit, setLimit] = React.useState<number>(10);
  const [searchedTimestamps, setSearchedTimestamps] = React.useState<any[]>([]);

  const updateTimestamps = async () => {
    try {
      const emam: any = require("../json/search.min.json");
      if (emam) {
        setTimestamps(emam);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const filterMultipleWords = () => {
    const params = search
      ?.split(/[^a-z]/)
      .join(" ")
      .split(" ")
      .filter(item => item);
    if (!params || params?.length < 2) return;
    console.log("params", params);
    let filteredTimestamps = [...timestamps];
    params.forEach((param) => {
      filteredTimestamps = filteredTimestamps
        .filter((value) =>
          value?.text?.toLowerCase().includes(param.toLowerCase())
        )
        .map((value) => ({
          ...value,
          text: value?.text?.replace(new RegExp(param, "i"), ""),
        }));
    });
    if (filteredTimestamps.length > 1) {
      setSearchedTimestamps((prevState: any[]) => {
        filteredTimestamps = filteredTimestamps.filter(
          (value) =>
            prevState.findIndex((item) => item._id === value._id) === -1
        );
        return timestamps.filter(
          (value) =>
            filteredTimestamps.findIndex((item) => item._id === value._id) !== -1
        );
      });
    }
  };

  const filterByExact = () => {
    timestamps.forEach((value) => {
      if (value?.text?.toLowerCase().includes(search?.toLowerCase())) {
        setSearchedTimestamps((prevState) => [...prevState, value]);
      }
    });
  };

  const startSearch = () => {
    setSearchedTimestamps([]);
    if (search && search.length > 1) {
      setSearching(true);
      filterByExact();
      filterMultipleWords();
      setSearching(false);
    }
  };

  React.useEffect(() => {
    updateTimestamps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    startSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

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
              onChange={(e) => setSearch(e?.target?.value || "")}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className={`w-full px-2 py-3 xs:py-5 border-0 focus:outline-0 bg-transparent text-lg`}
            />
          </div>
        </div>
      </div>
      <div
        className={`w-full ${
          focus || search ? "h-full" : "h-0 hidden"
        } overflow-x-hidden transition-all duration-300`}
      >
        {search && search.length > 1 ? (
          <>
            {searchedTimestamps.length > 0 ? (
              <>
                {searchedTimestamps.map((item: any, index: number) =>
                  index < limit ? <ResultItem {...item} key={index} /> : null
                )}
                {searchedTimestamps.length > limit ? (
                  <div className="w-full flex items-center justify-center">
                    <button
                      onClick={() => setLimit(limit + 10)}
                      className="bg-blue-500 rounded-lg py-2 px-4 text-white mb-2"
                    >
                      Load More
                    </button>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="w-full">
                <p className="w-full text-center">no records.</p>
              </div>
            )}
            {isSearching ? (
              <div className="w-full flex items-center justify-center py-2">
                <Loader />
              </div>
            ) : null}
          </>
        ) : (
          <div className="w-full">
            <p className="w-full text-center">
              enter at least two characters to search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
