import React from "react";
import classnames from "classnames";

import "./style.scss";
import arrow from "../../images/Arrow.svg";

interface IButton {
  onClick: () => void;
  rotated?: boolean;
}

export const ArrowButton: React.FC<IButton> = ({
  onClick,
  rotated = false,
}) => {
  return (
    <button
      className={classnames("button-arrow", {
        "button-arrow__rotated": rotated,
      })}
      onClick={onClick}
    >
      <img src={arrow} alt="Move button" />
    </button>
  );
};
