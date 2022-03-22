import React from "react";

import "./style.scss";

interface IButton {
  onClick: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
}

export const Button: React.FC<IButton> = ({
  onClick,
  type = "button",
  children,
  disabled = false,
}) => {
  return (
    <button
      className="button-purple"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
