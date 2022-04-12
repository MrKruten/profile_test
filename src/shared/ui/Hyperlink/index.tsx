import React from "react";

import "./style.scss";

interface IHyperlink {
  href: string;
}

export const Hyperlink: React.FC<IHyperlink> = ({ children, href }) => {
  return (
    <a href={href} className="hyperlink">
      {children}
    </a>
  );
};
