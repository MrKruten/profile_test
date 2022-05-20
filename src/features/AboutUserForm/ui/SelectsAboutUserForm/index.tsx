import React from "react";
import { Control, Controller } from "react-hook-form";
import Select from "react-select";

import { Types } from "shared/constants";

import { optionsCity, optionsPet, optionsSex } from "../../lib/options";

import "./style.scss";

interface ISelectsAboutUserForm {
  user: Types.IProfile;
  isEdit: boolean;
  control: Control<Types.IFormInputs>;
}

export const SelectsAboutUserForm: React.FC<ISelectsAboutUserForm> = ({
  user,
  control,
  isEdit,
}) => {
  return (
    <div className="about-form__fields">
      <div className="about-form__select">
        <p className="input-block__label">Город</p>
        <Controller
          name="city"
          control={control}
          defaultValue={optionsCity.find(
            (city) => city.value === user.cityOfResidence
          )}
          render={({ field }) => (
            <Select
              {...field}
              isDisabled={!isEdit}
              className="react-select-container"
              classNamePrefix="react-select"
              options={optionsCity}
            />
          )}
        />
      </div>
      <div className="about-form__select">
        <p className="input-block__label">Пол</p>
        <Controller
          name="sex"
          control={control}
          defaultValue={optionsSex.find((sex) => sex.value === user.gender)}
          render={({ field }) => (
            <Select
              {...field}
              isDisabled={!isEdit}
              className="react-select-container"
              classNamePrefix="react-select"
              options={optionsSex}
            />
          )}
        />
      </div>
      <div className="about-form__select">
        <p className="input-block__label">Животное</p>
        <Controller
          name="pet"
          control={control}
          defaultValue={optionsPet.find(
            (pet) => pet.value === (user.hasPet ? "true" : "false")
          )}
          render={({ field }) => (
            <Select
              {...field}
              isDisabled={!isEdit}
              className="react-select-container"
              classNamePrefix="react-select"
              options={optionsPet}
            />
          )}
        />
      </div>
    </div>
  );
};
