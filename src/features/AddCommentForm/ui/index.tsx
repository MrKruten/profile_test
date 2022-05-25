import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "effector-react";

import { Input, TextArea, Loader } from "shared/ui";
import { CommentsModel } from "entities/Comment";
import { Types } from "shared/constants";
import { NotificationModel } from "entities/Notification";

import { AddCommentModel } from "../model";
import { schema } from "../lib/schema";

import { SubmitBlock } from "./SubmitBlock";
import { LoadFile } from "./LoadFile";
import { HeaderAddCommentForm } from "./HeaderAddCommentForm";
import { FileBar } from "./FileBar";
import { Captcha } from "./Captcha";

import "./style.scss";

export const AddCommentForm = () => {
  const isLoadingRequestComment = useStore(CommentsModel.addCommentFx.pending);
  const isLoadingRequestPhoto = useStore(
    AddCommentModel.uploadPhotoCommentFx.pending
  );
  const [fileName, setFileName] = useState("");
  const captcha = useStore(AddCommentModel.$captcha);
  const isErrorCaptcha = useStore(AddCommentModel.$isErrorCaptcha);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
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
        NotificationModel.successNotification(true);
      }, 4000);
    }
  }, [isErrorCaptcha]);

  useEffect(() => {
    reloadCaptcha();
  }, []);

  const readFile = (input: FileList | null) => {
    if (!input) return;
    const file = input[0];

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
    reset({ file: null });
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
    reset();
  };

  if (isLoadingRequestComment || isLoadingRequestPhoto) {
    return <Loader />;
  }

  return (
    <div className="add-comment__content">
      <HeaderAddCommentForm closeWindow={closeWindow} />
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
          <LoadFile register={register} onChangeFile={onChangeFile} />
        </div>
        {fileName === "" ? null : (
          <FileBar
            fileName={fileName}
            deleteFile={deleteFile}
            errorMessage={errors.file?.message}
            isError={!!errors.file}
          />
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
        <Captcha
          register={register}
          errors={errors}
          isError={isErrorCaptcha}
          captchaImg={captcha.base64Image}
          reloadCaptcha={reloadCaptcha}
        />
        <SubmitBlock errors={errors} isValid={isValid} />
      </form>
    </div>
  );
};
