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
  // const [images] = React.useState<string[]>([
  //   `https://i.ytimg.com/vi/${v}/maxresdefault.jpg`,
  //   `https://i.ytimg.com/vi/${v}/sddefault.jpg`,
  //   `https://i.ytimg.com/vi/${v}/hqdefault.jpg`,
  //   `/assets/emam.jpeg`,
  // ]);
  const [
    src,
    // setSrc
  ] = React.useState<string>(
    `https://i.ytimg.com/vi/${v}/hqdefault.jpg`
    //images[0]
  );
  // const [index, setIndex] = React.useState<number>(0);
  // const ref = React.createRef<HTMLImageElement>();

  // React.useEffect(() => {
  //   if(ref.current) {
  //     ref.current.onerror = () => {
  //       console.log("onerror");
  //       setIndex((index) => {
  //         // if (index + 1 === 3) {
  //         //   console.log("onerror = null");
  //         //   ref.current.onerror = null;
  //         // }
  //         setSrc(images[index]);
  //         return index + 1;
  //       });
  //     }
  //   }
  // }, [])

  return (
    <a
      className="w-full flex p-2 items-center flex-col sm:flex-row"
      href={`https://youtube.com/watch?v=${v}&lc=${lc}${
        list ? `&list=${list}&index=${index}` : ``
      }&t=${t}`}
      target="_blank"
    >
      <div className="w-full sm:w-2/12 mr-1">
        <img
          src={src}
          // ref={ref}
          alt={"Video Cover"}
          className={"object-cover aspect-video"}
        />
      </div>
      <div className="w-full sm:w-10/12 ml-1">
        <p>{text}</p>
      </div>
    </a>
  );
};

export default ResultItem;
