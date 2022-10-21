import * as React from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ILoader {
  className?: string;
}

export const Loader: React.FC<ILoader> = ({ className = "text-primary" }) => {
  return <BiLoaderAlt className={"animate-spin ml-1 " + className}/>;
};

export default Loader;
