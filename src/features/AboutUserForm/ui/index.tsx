import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "effector-react";

import { Button } from "shared/ui";
import { Helpers } from "shared/lib";
import { UserModel } from "entities/Profile";
import { Types } from "shared/constants";

import { schema } from "../lib/schema";
import { updateProfile } from "../model";

import { TextareaAboutUserForm } from "./TextareaAboutUserForm";
import { SelectsAboutUserForm } from "./SelectsAboutUserForm";
import { InputsAboutUserForm } from "./InputsAboutUserForm";
import { AvatarAboutUserForm } from "./AvatarAboutUserForm";

import "./style.scss";

export const AboutUserForm = () => {
  const user = useStore(UserModel.$user);
  const [isEdit, setIsEdit] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Types.IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onEdit = () => {
    setIsEdit(true);
  };

  const onSubmit: SubmitHandler<Types.IFormInputs> = (data) => {
    const dateUser: Date | null =
      data.dateBirth !== undefined
        ? Helpers.stringToDate(data.dateBirth)
        : null;
    console.log(data.text);

    updateProfile({
      firstName: data.firstName || user.firstName,
      lastName: data.lastName || user.lastName,
      birthDate: dateUser! || user.birthDate,
      gender: (data.sex.value as "male" | "female") || user.gender!,
      cityOfResidence: data.city.value || user.cityOfResidence!,
      hasPet: data.pet.value !== "false",
      aboutMe: data.text !== undefined ? data.text : user.aboutMe!,
      smallAboutMe:
        data.shortInfo !== undefined ? data.shortInfo : user.smallAboutMe!,
    });

    setIsEdit(false);
  };

  return (
    <form className="about-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="about-form__head">
        <AvatarAboutUserForm user={user} />
        {!isEdit && <Button onClick={onEdit}>Редактировать</Button>}
      </div>
      <InputsAboutUserForm
        user={user}
        errors={errors}
        register={register}
        isEdit={isEdit}
      />
      <SelectsAboutUserForm user={user} isEdit={isEdit} control={control} />
      <TextareaAboutUserForm
        user={user}
        isEdit={isEdit}
        register={register}
        errors={errors}
      />
      {isEdit && (
        <div className="about-form__save">
          <Button type="submit">Сохранить изменения</Button>
        </div>
      )}
    </form>
  );
};
