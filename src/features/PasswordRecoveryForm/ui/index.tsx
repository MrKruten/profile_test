import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useStore } from "effector-react";

import { NotificationModel } from "entities/Notification";
import { $isResize } from "shared/lib";
import { Types, SCREENS } from "shared/constants";
import { ArrowButton, Button, Input } from "shared/ui";
// mock date
import dataTest from "shared/lib/data.json";

import { schema } from "../lib/schema";
import "./style.scss";

export const PasswordRecoveryForm: React.FC = () => {
  const navigate = useNavigate();
  const isResize = useStore($isResize);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Types.IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const previousPage = () => {
    navigate(SCREENS.AUTH);
    reset();
    NotificationModel.showNotification(false);
  };

  const onSubmit: SubmitHandler<Types.IFormInputs> = (data) => {
    NotificationModel.showNotification(false);
    const resultFindUser = dataTest.users.find(
      (user) => user.login === data.login
    );
    if (resultFindUser) {
      NotificationModel.successNotification(true);
    } else {
      NotificationModel.successNotification(false);
    }
    setTimeout(() => NotificationModel.showNotification(true), 2000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="password-recovery-form">
      <div className="password-recovery-form__header">
        <ArrowButton onClick={previousPage} rotated />
        <h3>Сброс пароля</h3>
      </div>
      <Input
        name="login"
        label="Электронная почта"
        placeholder="Введите e-mail"
        register={register}
        id="login"
        required
        error={!!errors.login}
        errorMessage={errors.login?.message}
      />
      <div className="password-recovery-form__buttons">
        <Button type="submit" disabled={!!errors.login}>
          Отправить код
        </Button>
        {isResize && (
          <Button onClick={previousPage} color="white">
            Отмена
          </Button>
        )}
      </div>
    </form>
  );
};
