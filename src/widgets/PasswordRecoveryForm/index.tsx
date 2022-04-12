import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useStore } from "effector-react";

import "./style.scss";
import {
  showNotification,
  successNotification,
} from "entities/Notification/model";
import { IFormInputs } from "shared/lib/types";
import { ArrowButton, Button, Input } from "shared/ui";
import { $isResize } from "features/resize/model";

const schema = yup
  .object({
    login: yup
      .string()
      .matches(
        /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/,
        "Введите валидный e-mail"
      )
      .required("Это обязательно поле"),
  })
  .required();

export const PasswordRecoveryForm: React.FC = () => {
  const navigate = useNavigate();
  const isResize = useStore($isResize);
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

  const previousPage = () => {
    navigate("/");
    reset();
    showNotification(false);
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    showNotification(false);
    // рандом для проверки ошибки и успеха
    const result = Math.random() >= 0.5;
    successNotification(result);
    setTimeout(() => showNotification(true), 2000);
  };

  return (
    <div className="password-recovery">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="password-recovery__header">
          <ArrowButton onClick={previousPage} rotated />
          <h3>Изменение пароля</h3>
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
        <div className="password-recovery__buttons">
          <Button onClick={() => {}} type="submit" disabled={!!errors.login}>
            Отправить код
          </Button>
          {isResize && (
            <Button onClick={previousPage} isWhite>
              Отмена
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
