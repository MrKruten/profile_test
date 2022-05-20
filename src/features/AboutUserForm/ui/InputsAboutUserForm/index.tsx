import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Types } from "shared/constants";
import { Input } from "shared/ui";
import { Helpers } from "shared/lib";

interface IInputsAboutUserForm {
  user: Types.IProfile;
  register: UseFormRegister<Types.IFormInputs>;
  errors: FieldErrors<Types.IFormInputs>;
  isEdit: boolean;
}

export const InputsAboutUserForm: React.FC<IInputsAboutUserForm> = ({
  user,
  register,
  errors,
  isEdit,
}) => {
  return (
    <div className="about-form__fields">
      <Input
        defaultValue={user.firstName}
        disabled={!isEdit}
        placeholder="Введите имя"
        name="firstName"
        label="Имя"
        register={register}
        id="firstName"
        required
        error={!!errors.firstName}
        errorMessage={errors.firstName?.message}
      />
      <Input
        placeholder="Введите фамилию"
        defaultValue={user.lastName}
        disabled={!isEdit}
        name="lastName"
        label="Фамилия"
        register={register}
        id="lastName"
        required
        error={!!errors.lastName}
        errorMessage={errors.lastName?.message}
      />
      <Input
        maxlength={10}
        defaultValue={Helpers.dateToString(new Date(user.birthDate!))}
        disabled={!isEdit}
        placeholder="Введите дату рождения"
        name="dateBirth"
        label="Дата рождения"
        register={register}
        id="dateBirth"
        error={!!errors.dateBirth}
        errorMessage={errors.dateBirth?.message}
      />
    </div>
  );
};
