import React, { useState } from "react";
import classnames from "classnames";

import "./style.scss";
import { IInputField } from "shared/ui/Input";
import { ReactComponent as Cross } from "shared/images/Cross.svg";

export const TextArea: React.FC<IInputField> = ({
  name,
  placeholder,
  label,
  maxlength,
  error,
  required,
  errorMessage,
  id,
  register,
}) => {
  const [symbols, setSymbols] = useState(0);

  return (
    <div className="textarea-block">
      <label
        htmlFor={name}
        className="textarea-block__label input-block__label"
      >
        {label}
      </label>
      <div>
        <textarea
          id={name}
          className={classnames(
            "textarea-block__textarea",
            "input-block__input",
            {
              "input-block__input_error": error,
            }
          )}
          placeholder={placeholder}
          maxLength={maxlength}
          {...register(id, { required })}
          onChange={(e) => setSymbols(e.target.value.length)}
        />
        <p>
          {symbols}/{maxlength}
        </p>
      </div>
      {error && (
        <span className="error">
          <Cross />
          <span>{errorMessage}</span>
        </span>
      )}
    </div>
  );
};
