import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Types } from "shared/constants";
import { Button, Input } from "shared/ui";

import { AuthModel } from "../model";
import { schema } from "../lib/schema";

import "./style.scss";

export const AuthForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Types.IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Types.IFormInputs> = async (data) => {
    await AuthModel.submitAuthForm({
      email: data.login,
      password: data.password,
    });
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
