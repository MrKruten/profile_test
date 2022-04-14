import React from "react";
import classnames from "classnames";

import "./style.scss";

interface IButton {
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
  isWhite?: boolean;
}

export const Button: React.FC<IButton> = ({
  onClick = () => {},
  type = "button",
  children,
  disabled = false,
  isWhite = false,
}) => {
  return (
    <button
      className={classnames("button-purple", { "button-white": isWhite })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
