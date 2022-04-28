import React from "react";
import classnames from "classnames";

import "./style.scss";
import { ReactComponent as Arrow } from "shared/images/Arrow.svg";

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
      type="button"
      className={classnames("button-arrow", {
        "button-arrow__rotated": rotated,
      })}
      onClick={onClick}
    >
      <Arrow />
    </button>
  );
};
