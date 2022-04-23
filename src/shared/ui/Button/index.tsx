import React from "react";
import classnames from "classnames";

import "./style.scss";

interface IButton {
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
  color?: "" | "white" | "red";
  isImg?: boolean;
}

export const Button: React.FC<IButton> = ({
  onClick = () => {},
  type = "button",
  children,
  disabled = false,
  color = "",
  isImg,
}) => {
  return (
    <button
      className={classnames("btn", {
        btn_white: color === "white",
        btn_red: color === "red",
        btn_img: isImg,
      })}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
