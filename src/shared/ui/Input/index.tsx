import React from "react";
import classnames from "classnames";
import { Path, UseFormRegister } from "react-hook-form";

import "./style.scss";
import { IFormInputs } from "shared/lib/types";
import { ReactComponent as Cross } from "shared/images/Cross.svg";

export interface IInput {
  name: string;
  placeholder: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
  maxlength?: number;
  required?: boolean;
  id: Path<IFormInputs>;
  register: UseFormRegister<IFormInputs>;
}

export const Input: React.FC<IInput> = ({
  placeholder,
  label,
  name,
  error = false,
  maxlength,
  register,
  required = false,
  id,
  errorMessage = "Ошибка",
}) => {
  return (
    <div className="input-block">
      <label htmlFor={name} className="input-block__label">
        {label}
      </label>
      <input
        id={name}
        className={classnames("input-block__input", {
          "input-block__input_error": error,
        })}
        placeholder={placeholder}
        maxLength={maxlength}
        {...register(id, { required })}
      />
      {error && (
        <span className="error">
          <Cross />
          <span>{errorMessage}</span>
        </span>
      )}
    </div>
  );
};
