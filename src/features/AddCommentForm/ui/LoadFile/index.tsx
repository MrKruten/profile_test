import React from "react";
import { UseFormRegister } from "react-hook-form";

import { Types } from "shared/constants";
import plusImg from "shared/images/Plus.svg";

interface ILoadFile {
  register: UseFormRegister<Types.IFormInputs>;
  onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoadFile: React.FC<ILoadFile> = ({ register, onChangeFile }) => {
  return (
    <div className="name-file input__wrapper">
      <label htmlFor="file" className="input__file-button btn">
        <input
          type="file"
          className="input input__file"
          id="file"
          accept="image/*"
          onInput={onChangeFile}
          {...register("file", { required: false })}
        />
        <span className="input__file-icon-wrapper">
          <img className="input__file-icon" src={plusImg} alt="Выбрать файл" />
        </span>
        <span className="input__file-button-text">Загрузить фото</span>
      </label>
    </div>
  );
};
