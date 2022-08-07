import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function Home() {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>();
  const [timestamps, setTimestamps] = React.useState<any[]>([]);

  const updateTimestamps = async () => {
    try {
      const emam: any = require("../json/emam.min.json");
      let final: any[] = [];
      const convertTimestamp = (value: any, list?: string) => {
        const key = value.questions ? "questions" : "topics";
        if (value[key]) {
          final.push(
            ...value[key].map((item: any) => ({
              ...item,
              v: value.v,
              lc: value.lc,
              index: value.index,
              list: list,
            }))
          );
        }
        // console.log(final[0]);
      };
      emam?.critical?.forEach((value: any) => convertTimestamp(value));
      Object.keys(emam)
        .filter((series) => !["nqc", "qc", "eqc", "critical"].includes(series))
        .forEach((series: string) => {
          const values = Object.values(emam[series]).filter(
            (item) => typeof item !== "string"
          );
          const list: string = emam[series]?.list;
          console.log("values[0]", values[0]);
          values.forEach((value) => convertTimestamp(value, list));
        });
      // console.log(final);
      console.log(final[0]);
      setTimestamps(final);
    } catch (err: any) {
      console.error(err);
    }
  };

  const filterByExact = (value: any, index?: number, array?: any[]) => {
    return value?.text?.toLowerCase().includes(search?.toLowerCase());
  };

  React.useEffect(() => {
    updateTimestamps();
  }, []);

  const ResultItem: React.FC<{ item: any }> = ({ item }) => (
    <a
      className="w-full flex p-2 items-center flex-col sm:flex-row"
      href={`https://youtube.com/watch?v=${item.v}&lc=${item.lc}${
        item.list ? `&list=${item.list}&index=${item.index}&t=${item.t}` : `&t=${item.t}`
      }`}
      target="_blank"
    >
      <div className="w-full sm:w-2/12 mr-1">
        <img
          src={`https://i.ytimg.com/vi/${item.v}/maxresdefault.jpg`}
          onError={(e) => {
            e.preventDefault();
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://i.ytimg.com/vi/${item.v}/sddefault.jpg`
          }}
          alt={"Video Cover"}
          className={"object-cover"}
        />
      </div>
      <div className="w-full sm:w-10/12 ml-1">
        <p>{item.text}</p>
      </div>
    </a>
  );

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
          focus || search ? "h-full" : "h-0 hidden"
        } overflow-x-hidden transition-all duration-300`}
      >
        {search &&
        search.length > 1 &&
        timestamps.filter(filterByExact).length > 0 ? (
          <>
            {timestamps
              .filter(filterByExact)
              .map((item: any, index: number) => index < 5 && (
                <ResultItem item={item} key={index} />
              ))}
          </>
        ) : (
          <div className="w-full">
            <p className="w-full text-center">No Records</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
