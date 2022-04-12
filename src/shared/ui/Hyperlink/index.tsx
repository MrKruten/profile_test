import React from "react";

import "./style.scss";

interface IHyperlink {
  text: String;
}

export const Hyperlink: React.FC<IHyperlink> = ({ text }) => {
  return <span className="hyperlink">{text}</span>;
};
