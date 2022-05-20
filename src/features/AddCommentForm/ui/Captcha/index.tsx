import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useStore } from "effector-react";

import { Types } from "shared/constants";
import { Input, Loader } from "shared/ui";
import { ReactComponent as ReloadCaptcha } from "shared/images/Reload.svg";
import { AddCommentModel } from "features/AddCommentForm/model";

import "./style.scss";

interface ICaptcha {
  register: UseFormRegister<Types.IFormInputs>;
  errors: FieldErrors<Types.IFormInputs>;
  isError?: boolean;
  captchaImg: string;
  reloadCaptcha: () => void;
}

export const Captcha: React.FC<ICaptcha> = ({
  register,
  errors,
  isError = false,
  captchaImg,
  reloadCaptcha,
}) => {
  const isLoadingCaptcha = useStore(AddCommentModel.getCaptchaFx.pending);

  return (
    <div className="add-comment__captcha">
      <Input
        placeholder="00000"
        name="captcha"
        label="Введите код с картинки:"
        id="captcha"
        register={register}
        required
        error={!!errors.captcha || isError}
        maxlength={5}
        errorMessage={
          isError ? "Введите код с картинки" : errors.captcha?.message
        }
      />
      <div className="add-comment__captcha-right">
        {isLoadingCaptcha ? (
          <Loader />
        ) : (
          <img
            src={captchaImg}
            alt="Captcha"
            className="add-comment__captcha-img"
          />
        )}
        <button
          type="button"
          className="add-comment__reload-captcha"
          onClick={reloadCaptcha}
        >
          <ReloadCaptcha />
        </button>
      </div>
    </div>
  );
};
