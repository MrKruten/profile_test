import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

// mock date
import dataTest from "shared/lib/data.json";
import { Types, SCREENS } from "shared/lib";
import { Button, Input } from "shared/ui";
import { BottomNotificationModel } from "entities/BottomNotification";

import { schema } from "../lib/schema";

import "./style.scss";

export const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Types.IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Types.IFormInputs> = (data) => {
    const resultFindUser = dataTest.users.find(
      (user) => user.login === data.login && user.password === data.password
    );
    if (resultFindUser) {
      navigate(SCREENS.MAIN);
      BottomNotificationModel.showBottomNotification(false);
      reset();
    } else {
      BottomNotificationModel.showBottomNotification(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <Input
        name="login"
        label="Логин"
        placeholder="Введите логин"
        register={register}
        id="login"
        required
        error={!!errors.login}
        errorMessage={errors.login?.message}
      />
      <Input
        maxlength={24}
        typeInput="password"
        name="password"
        label="Пароль"
        placeholder="Введите пароль"
        register={register}
        id="password"
        required
        error={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <Button type="submit" disabled={!!(errors?.password || errors?.login)}>
        Войти
      </Button>
    </form>
  );
};
