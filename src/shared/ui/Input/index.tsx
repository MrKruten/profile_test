import React, { useState } from "react";
import classnames from "classnames";
import { Path, UseFormRegister } from "react-hook-form";

import "./style.scss";

import { IFormInputs } from "shared/lib/types";
import { ReactComponent as Info } from "shared/images/Info_Square.svg";
import { ReactComponent as Show } from "shared/images/Show.svg";
import { ReactComponent as Hide } from "shared/images/Hide.svg";

export interface IInputField {
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

interface IInput extends IInputField {
  typeInput?: "text" | "password";
}

export const Input: React.FC<IInput> = ({
  placeholder,
  label,
  name,
  error = false,
  maxlength,
  typeInput = "text",
  required = false,
  errorMessage = "Ошибка",
  id,
  register,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(
    typeInput === "password"
  );

  const updateShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <div className="input-block">
      <label htmlFor={name} className="input-block__label">
        {label}
      </label>
      <div className="input-block__content">
        <input
          type={isShowPassword ? "password" : "text"}
          id={name}
          className={classnames("input-block__input", {
            "input-block__input_active": isActive,
            "input-block__input_password": typeInput === "password",
            "input-block__input_error": error,
          })}
          placeholder={placeholder}
          maxLength={maxlength}
          {...register(id, { required })}
          onChange={onChange}
        />
        <div className="input-block__icons">
          {typeInput === "password" && (
            <button
              className="input-block__password"
              onClick={updateShowPassword}
            >
              {isShowPassword ? <Show /> : <Hide />}
            </button>
          )}
          {error && (
            <div className="info-error">
              <p>{errorMessage}</p>
              <Info />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
