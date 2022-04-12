import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import "./style.scss";

// mock date
import dataTest from "shared/lib/data.json";
import { IFormInputs } from "shared/lib/types";
import { Button, Hyperlink, Input } from "shared/ui";
import { showBottomNotification } from "entities/BottomNotification/model";

const schema = yup
  .object({
    login: yup
      .string()
      .matches(
        /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/,
        "Введите валидный e-mail"
      )
      .required("Это обязательно поле"),
    password: yup
      .string()
      .min(8, "Пароль должен содержать не менее 8 символов")
      .max(24, "Пароль должен содержать не более 24 символов")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/,
        "Пароль должен содержать латиницу, цифры, прописные буквы, символ ( ., -, _ ...)"
      )
      .required("Это обязательно поле"),
  })
  .required();

export const AuthForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  // isValid и mode:"onChanged" не работают. Мб инпуты виноваты (onChange)

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const resultFindUser = dataTest.users.find(
      (user) => user.login === data.login && user.password === data.password
    );
    if (resultFindUser) {
      navigate("/main");
      showBottomNotification(false);
      reset();
    } else {
      showBottomNotification(true);
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Войти</h3>
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
        <Button
          type="submit"
          onClick={() => {}}
          disabled={!!(errors?.password || errors?.login)}
        >
          Войти
        </Button>
        <div>
          <Hyperlink href="#">Забыли пароль?</Hyperlink>
        </div>
      </form>
    </div>
  );
};
