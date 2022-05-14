import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "effector-react";

import infoImg from "shared/images/Info_Square.svg";
import plusImg from "shared/images/Plus.svg";
import fileImg from "shared/images/File.svg";
import { ReactComponent as DeleteImg } from "shared/images/Delete.svg";
import { ReactComponent as ReloadCaptcha } from "shared/images/Reload.svg";
import { Button, Input, TextArea, Loader } from "shared/ui";
import { CommentsModel } from "entities/Comment";
import { Types } from "shared/constants";
import { NotificationModel } from "entities/Notification";
import crossImg from "shared/images/Cross.svg";

import { AddCommentModel } from "../model";
import { schema } from "../lib/schema";

import "./style.scss";

export const AddCommentForm = () => {
  const isLoadingCaptcha = useStore(AddCommentModel.getCaptchaFx.pending);
  const isLoadingRequestComment = useStore(CommentsModel.addCommentFx.pending);
  const isLoadingRequestPhoto = useStore(
    AddCommentModel.uploadPhotoCommentFx.pending
  );
  const [fileName, setFileName] = useState("");
  const [isFileError, setIsFileError] = useState(false);
  const captcha = useStore(AddCommentModel.$captcha);
  const isErrorCaptcha = useStore(AddCommentModel.$isErrorCaptcha);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Types.IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const reloadCaptcha = () => {
    AddCommentModel.getCaptcha();
  };

  useEffect(() => {
    if (isErrorCaptcha) {
      reloadCaptcha();
      NotificationModel.successNotification(false);
      NotificationModel.setNotification({
        textError: "Введите валидный код с картинки",
        textSuccess: "Спасибо за отзыв о нашей компании :)",
        titleSuccess: "Успешно!",
      });
      NotificationModel.showNotification(true);
      setTimeout(() => {
        AddCommentModel.resetIsErrorCaptcha();
        NotificationModel.showNotification(false);
      }, 4000);
    }
  }, [isErrorCaptcha]);

  useEffect(() => {
    reloadCaptcha();
  }, []);

  const readFile = (input: FileList | null) => {
    if (!input) return;
    const file = input[0];

    if (!/\.(jpg|jpeg|png)$/i.test(file?.name)) {
      setIsFileError(true);
      return;
    }

    if (file.size / 1024 / 1024 > 5) {
      setIsFileError(true);
      return;
    }

    setFileName(file.name);
    const readerURL = new FileReader();

    readerURL.readAsDataURL(file);

    readerURL.onload = () => {
      AddCommentModel.updateUploadPhoto(readerURL.result as string);
    };
  };

  const deleteFile = () => {
    AddCommentModel.resetUploadPhoto();
    setFileName("");
    setIsFileError(false);
  };

  const closeWindow = () => {
    AddCommentModel.showAddComment(false);
    reset();
    deleteFile();
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      readFile(e.target.files);
    }
  };

  const onSubmit: SubmitHandler<Types.IFormInputs> = (data) => {
    CommentsModel.addComment({
      authorName: data.name,
      text: data.text,
      title: data.name,
      captchaValue: data.captcha,
      captchaKey: captcha.key,
    });

    if (data.file) {
      const form = new FormData();
      form.append("authorImage", data.file[0]);
      AddCommentModel.uploadPhotoComment(form);
    }
  };

  if (isLoadingRequestComment || isLoadingRequestPhoto) {
    return <Loader />;
  }

  return (
    <div className="add-comment__content">
      <div className="add-comment__header">
        <h4>Отзыв</h4>
        <button onClick={closeWindow}>
          <img src={crossImg} alt="Закрыть" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="add-comment__name-file">
          <Input
            name="name"
            label="Как вас зовут?"
            placeholder="Имя Фамилия"
            register={register}
            id="name"
            required
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <div className="name-file input__wrapper">
            <label htmlFor="file" className="input__file-button btn">
              <input
                type="file"
                className="input input__file"
                id="file"
                accept="image/*"
                onInput={onChangeFile}
                {...register("file")}
              />
              <span className="input__file-icon-wrapper">
                <img
                  className="input__file-icon"
                  src={plusImg}
                  alt="Выбрать файл"
                />
              </span>
              <span className="input__file-button-text">Загрузить фото</span>
            </label>
          </div>
        </div>
        {fileName === "" ? null : (
          <div className="add-comment__file">
            <img src={fileImg} alt="Файл" />
            <div className="add-comment__name-load">
              <p className={isFileError ? "add-comment__name-load_error" : ""}>
                {isFileError ? "Your file is too big!" : fileName}
              </p>
              <div className="add-comment__stripe">
                <div className="add-comment__bar" />
                <div
                  className={classnames("add-comment__load", {
                    "add-comment__load_error": isFileError,
                  })}
                />
              </div>
            </div>
            <button onClick={deleteFile}>
              <DeleteImg />
            </button>
          </div>
        )}
        <TextArea
          placeholder="Напишите пару слов о вашем опыте..."
          label="Все ли вам понравилось?"
          name="textarea"
          maxlength={200}
          id="text"
          register={register}
          required
          error={!!errors.text}
          errorMessage={errors.text?.message}
        />
        <div className="add-comment__captcha">
          <Input
            placeholder="00000"
            name="captcha"
            label="Введите код с картинки:"
            id="captcha"
            register={register}
            required
            error={!!errors.captcha || isErrorCaptcha}
            maxlength={5}
            errorMessage={
              isErrorCaptcha
                ? "Введите код с картинки"
                : errors.captcha?.message
            }
          />
          <div className="add-comment__captcha-right">
            {isLoadingCaptcha ? (
              <Loader />
            ) : (
              <img
                src={captcha.base64Image}
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
        <div className="add-comment__submit">
          <Button
            type="submit"
            disabled={isFileError || !!(errors.text || errors.name)}
          >
            Отправить отзыв
          </Button>
          <div className="add-comment__info">
            <img src={infoImg} alt="Информация" />
            <span>Все отзывы проходят модерацию в течение 2 часов</span>
          </div>
        </div>
      </form>
    </div>
  );
};
