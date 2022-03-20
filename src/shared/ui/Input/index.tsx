import React from "react";
import classnames from "classnames";

import "./style.scss";

interface IInput {
  name: string;
  placeholder: string;
  label: string;
  error?: boolean;
}

export const Input: React.FC<IInput> = ({
  placeholder,
  label,
  name,
  error = false,
}) => {
  return (
    <div className="input-block">
      <label htmlFor={name} className="input-block__label">
        {label}
      </label>
      <input
        name={name}
        className={classnames("input-block__input", {
          "input-block__input__error": error,
        })}
        placeholder={placeholder}
      />
    </div>
  );
};
