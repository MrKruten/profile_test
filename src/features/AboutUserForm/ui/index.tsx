import React, { useRef, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "effector-react";
import Select from "react-select";

import { Avatar, Button, Input, TextArea } from "shared/ui";
import { Types, Helpers, $user } from "shared/lib";
import { BottomNotificationModel } from "entities/BottomNotification";
import { ReactComponent as Edit } from "shared/images/Edit.svg";

import { optionsCity, optionsSex, optionsPet } from "../lib/options";
import { schema } from "../lib/schema";
import { updateProfile, uploadPhotoProfile } from "../model";
import "./style.scss";

export const AboutUserForm = () => {
  const user = useStore($user);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isDateError, setIsDateError] = useState(false);
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

  const readFile = (input: FileList | null) => {
    if (!input) return;
    BottomNotificationModel.showBottomNotification(false);
    const file = input[0];
    const readerURL = new FileReader();
    readerURL.readAsDataURL(file);

    readerURL.onload = () => {
      if (file.size / 1024 / 1024 > 5) {
        BottomNotificationModel.showBottomNotification(true);
        setTimeout(
          () => BottomNotificationModel.showBottomNotification(false),
          4000
        );
      } else {
        const formData = new FormData();
        formData.set("profileImage", inputFileRef.current?.files?.[0]!);
        uploadPhotoProfile(formData);
      }
    };
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      readFile(e.target.files);
    }
  };

  const onEdit = () => {
    setIsEdit(true);
  };

  const onSubmit: SubmitHandler<Types.IFormInputs> = (data) => {
    let newAgeUser: Date;
    if (data.dateBirth) {
      if (!Helpers.checkIsDateMoreToday(data.dateBirth)) {
        setIsDateError(true);
        setTimeout(() => {
          setIsDateError(false);
        }, 3000);
        return;
      }
      newAgeUser = Helpers.stringToDate(data.dateBirth);
    }

    // editUser({
    //   firstName: data.firstName || user.firstName,
    //   secondName: data.secondName || user.secondName,
    //   avatar,
    //   description: {
    //     city: data.city.value || user.description.city,
    //     pet: data.pet.value !== "false",
    //     age: newAgeUser !== -1 ? newAgeUser : user.description.age,
    //     sex: data.sex.value || user.description.sex,
    //     text: data.text || user.description.text,
    //     shortInfo: data.shortInfo || user.description.shortInfo,
    //     dateBirth: data.dateBirth || user.description.dateBirth,
    //   },
    // });

    updateProfile({
      firstName: data.firstName || user.firstName,
      lastName: data.lastName || user.lastName,
      birthDate: newAgeUser! || user.birthDate,
      gender: (data.sex.value as "male" | "female") || user.gender!,
      cityOfResidence: data.city.value || user.cityOfResidence!,
      hasPet: data.pet.value !== "false",
      aboutMe: data.text || user.aboutMe!,
      smallAboutMe: data.shortInfo || user.smallAboutMe!,
    });

    setIsEdit(false);
  };

  return (
    <form className="about-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="about-form__head">
        <div className="about-form__avatar">
          <div className="about-form__photo">
            <Avatar avatar={user.profileImage} />
            <div className="avatar-big">
              <Avatar avatar={user.profileImage} />
            </div>
          </div>
          <div className="about-form__avatar-info">
            <p className="about-form__photo-text">Фото профиля</p>
            <div className="input__wrapper">
              <label htmlFor="avatar" className="input__file-button">
                <input
                  type="file"
                  className="input input__file"
                  id="avatar"
                  accept="image/*"
                  ref={inputFileRef}
                  onChange={onChangeFile}
                />
                <span className="input__file-icon-wrapper">
                  <Edit />
                </span>
                <span className="input__file-button-text">Загрузить фото</span>
              </label>
            </div>
          </div>
        </div>
        {!isEdit && <Button onClick={onEdit}>Редактировать</Button>}
      </div>
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
          error={!!errors.dateBirth || isDateError}
          errorMessage={
            isDateError
              ? "Дата должна быть не больше сегодняшней"
              : errors.dateBirth?.message
          }
        />
      </div>
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
      {isEdit && (
        <div className="about-form__save">
          <Button type="submit">Сохранить изменения</Button>
        </div>
      )}
    </form>
  );
};
