import React from "react";

interface IResultItem {
  v?: string;
  lc?: string;
  list?: string;
  index?: number;
  t?: number;
  text?: string;
}

export const ResultItem: React.FC<IResultItem> = ({
  v,
  lc,
  list,
  index,
  t,
  text,
}) => {
  return (
    <div className="w-full flex p-2 flex-col sm:flex-row mb-2">
      <a
        rel="noreferrer"
        href={`https://youtube.com/watch?v=${v}&lc=${lc}${
          list ? `&list=${list}&index=${index}` : ``
        }&t=${t}`}
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
      <div className="w-full sm:w-10/12 ml-1 h-full">
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default ResultItem;
