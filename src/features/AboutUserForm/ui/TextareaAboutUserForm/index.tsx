import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Types } from "shared/constants";
import { TextArea } from "shared/ui";

interface ITextareaAboutUserForm {
  user: Types.IProfile;
  register: UseFormRegister<Types.IFormInputs>;
  errors: FieldErrors<Types.IFormInputs>;
  isEdit: boolean;
}

export const TextareaAboutUserForm: React.FC<ITextareaAboutUserForm> = ({
  user,
  register,
  errors,
  isEdit,
}) => {
  return (
    <div className="about-form__textarea">
      <TextArea
        placeholder="Кратко расскажи о себе..."
        defaultValue={user.smallAboutMe!}
        disabled={!isEdit}
        label="Краткая информация"
        name="shortInfo"
        maxlength={99}
        id="shortInfo"
        register={register}
        error={!!errors.shortInfo}
        errorMessage={errors.shortInfo?.message}
      />
      <TextArea
        defaultValue={user.aboutMe}
        disabled={!isEdit}
        placeholder="Расскажите о себе..."
        label="О себе"
        name="text"
        id="text"
        register={register}
        error={!!errors.text}
        errorMessage={errors.text?.message}
      />
    </div>
  );
};
