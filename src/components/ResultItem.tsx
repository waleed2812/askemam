import React from "react";
import { AiFillYoutube } from "react-icons/ai";
import { toast } from "react-toastify";
import { useContextController } from "../context";

interface IResultItem {
  v?: string;
  lc?: string;
  list?: string;
  index?: number;
  t?: number;
  hms?: string;
  text?: string;
}

export const ResultItem: React.FC<IResultItem> = ({
  v,
  lc,
  list,
  index,
  t,
  hms,
  text,
}) => {
  const [{ darkMode }] = useContextController();
  const href = `https://youtu.be/${v}?t=${t}`;
  const hrefComplete = `https://youtube.com/watch?v=${v}&lc=${lc}${
    list ? `&list=${list}&index=${index}` : ``
  }&t=${t}`;

  return (
    <div
      className={`w-full flex flex-col sm:flex-row p-1 mb-2 border-2 ${
        darkMode ? "border-white" : "border-secondary"
      } rounded-md drop-shadow-2xl`}
    >
      <a
        rel="noreferrer"
        href={href}
        target="_blank"
        className="w-full sm:w-2/12 mr-1 cursor-pointer "
      >
        <img
          src={`https://i.ytimg.com/vi/${v}/hqdefault.jpg`}
          onError={(e) => {
            e.currentTarget.src = `/assets/emam.jpeg`;
            e.currentTarget.onerror = null;
          }}
          alt={"Video Cover"}
          className={"object-cover aspect-video"}
        />
      </a>
      <div className="flex flex-col justify-between w-full sm:w-10/12 ml-1">
        <p className="text-sm md:text-base capitalize ">
          <a
            rel="noreferrer"
            href={href}
            target="_blank"
            className="text-primary underline"
          >
            {hms}{" "}
          </a>
          - {text}
        </p>
        <div className="flex">
          <button
            onClick={(e) => {
              e?.preventDefault();
              navigator.clipboard.writeText(href);
              toast("Link Copied.");
            }}
            className="py-1 px-3 bg-primary rounded text-white text-sm md:text-base mr-2 border-2 border-primary "
          >
            Copy
          </button>
          <a
            rel="noreferrer"
            href={hrefComplete}
            target="_blank"
            className="py-1 px-3 bg-red rounded text-white text-sm md:text-base mr-2 border-2 border-red flex items-center justify-center"
          >
            <AiFillYoutube className="mr-1 text-sm md:text-lg" />
            Play Lecture
          </a>
          <button
            onClick={(e) => {
              e?.preventDefault();
              navigator.clipboard.writeText(hrefComplete);
              toast("Link Copied.", { progressStyle: { background: "red" } });
            }}
            className={`py-1 px-3 ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            } rounded text-white text-sm md:text-base mr-2 border-2 border-red  flex items-center justify-center`}
          >
            <AiFillYoutube className="mr-1 text-sm md:text-lg text-red" />
            Copy Lecture Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
