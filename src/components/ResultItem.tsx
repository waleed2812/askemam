import React, { useState } from "react";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiFillYoutube,
  AiOutlineClose,
} from "react-icons/ai";
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
  title?: string;
}

export const ResultItem: React.FC<IResultItem> = ({
  v,
  lc,
  list,
  index,
  t,
  hms,
  text,
  title,
}) => {
  const [{ darkMode }] = useContextController();
  const href = `https://youtu.be/${v}?t=${t}`;
  const embed = `https://youtube.com/embed/${v}?start=${t}&autoplay=1&rel=0`;
  const hrefComplete = `https://youtube.com/watch?v=${v}&lc=${lc}${
    list ? `&list=${list}&index=${index}` : ``
  }&t=${t}`;

  const [isPlaying, setPlaying] = useState(false);

  return (
    <div
      className={`mb-4 w-full flex flex-col px-2 py-2 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } rounded-md drop-shadow-2xl transition-all duration-500 `}
    >
      <div className="flex flex-col sm:flex-row mb-2">
        <div className="relative w-full sm:w-2/12 mr-1 cursor-pointer">
          <button
            // rel="noreferrer"
            // href={href}
            // target="_blank"
            style={{
              backgroundImage: `https://i.ytimg.com/vi/${v}/hqdefault.jpg`,
              
            }}
            className="absolute top-0 left-0 w-full h-full text-center bg-hover"
            onClick={() => setPlaying((isPlaying) => !isPlaying)}
          >
            {isPlaying ? (
              <AiFillPauseCircle className="ml-auto mr-auto " size={32} />
            ) : (
              <AiFillPlayCircle className="ml-auto mr-auto " size={32} />
            )}
          </button>
          <img
            src={`https://i.ytimg.com/vi/${v}/hqdefault.jpg`}
            onError={(e) => {
              e.currentTarget.src = `/assets/emam.jpeg`;
              e.currentTarget.onerror = null;
            }}
            alt={"Video Cover"}
            className={"object-cover aspect-video h-full"}
          />
        </div>

        <div className="flex flex-col justify-between w-full sm:w-10/12 ml-1">
          <p className="text-sm mb-2 sm:mb-0 md:text-base capitalize ">
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
          <div className="text-sm mb-2 md:text-base capitalize overflow-hidden text-ellipsis whitespace-nowrap	">
            <span className="font-bold">Lecture: </span>
            <a
              rel="noreferrer"
              href={hrefComplete}
              target="_blank"
              className="text-primary underline"
            >
              {title}
            </a>
          </div>
          <div className="flex flex-col sm:flex-row">
            <button
              onClick={(e) => {
                e?.preventDefault();
                navigator.clipboard.writeText(href);
                toast("Link Copied.");
              }}
              className="transition-all duration-500 ease-in-out hover:scale-110 mb-2 sm:mb-0 py-1 px-3 bg-primary rounded text-white text-sm md:text-base mr-2 sm:mr-4 border-2 border-primary "
            >
              Copy Link
            </button>
            <button
              onClick={(e) => {
                e?.preventDefault();
                navigator.clipboard.writeText(hrefComplete);
                toast("Link Copied.", { progressStyle: { background: "red" } });
              }}
              className={`transition-all duration-500 ease-in-out hover:scale-110 mb-2 sm:mb-0 py-1 px-3 bg-red text-white rounded text-white text-sm md:text-base mr-2 sm:mr-4 border-2 border-red flex items-center justify-center`}
            >
              <AiFillYoutube className="mr-1 text-sm md:text-lg" />
              Copy Lecture Link
            </button>
          </div>
        </div>
      </div>

      {isPlaying ? (
        <div className="w-full relative">
          <AiOutlineClose
            className="absolute top-1 right-1 cursor-pointer"
            color="red"
            onClick={() => setPlaying(false)}
          />
          <iframe
            width="100%"
            className="aspect-video"
            src={embed}
            allow="enablejsapi; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      ) : null}
    </div>
  );
};

export default ResultItem;
