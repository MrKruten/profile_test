import React from "react";

import "./style.scss";

interface IButton {
  onClick: () => void;
}

export const Button: React.FC<IButton> = ({ onClick, children }) => {
  return (
    <button className="button-purple" onClick={onClick}>
      {children}
    </button>
  );
};
