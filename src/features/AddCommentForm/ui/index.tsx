import React, { useRef, useState } from "react";
import classnames from "classnames";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import infoImg from "shared/images/Info_Square.svg";
import plusImg from "shared/images/Plus.svg";
import fileImg from "shared/images/File.svg";
import { ReactComponent as DeleteImg } from "shared/images/Delete.svg";
import { Button, Input, TextArea } from "shared/ui";
import { addComment } from "shared/lib/comments";
import { Types } from "shared/lib";
import { NotificationModel } from "entities/Notification";
import crossImg from "shared/images/Cross.svg";

import { showAddComment } from "../model";
import { schema } from "../lib/schema";

import "./style.scss";

export const AddCommentForm = () => {
  const [avatar, setAvatar] = useState("None");
  const [fileName, setFileName] = useState("");
  const [isFileError, setIsFileError] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Types.IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const readFile = (input: FileList | null) => {
    if (!input) return;
    const file = input[0];
    setFileName(file.name);
    const readerURL = new FileReader();

    readerURL.readAsDataURL(file);

    readerURL.onload = () => {
      setAvatar(readerURL.result as string);
      if (file.size / 1024 / 1024 > 6) {
        setIsFileError(true);
      }
    };
  };

  const deleteFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
    setAvatar("None");
    setFileName("");
    setIsFileError(false);
  };

  const closeWindow = () => {
    showAddComment(false);
    reset();
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      readFile(e.target.files);
    }
  };

  const onDeleteFile = () => {
    deleteFile();
  };

  const onSubmit: SubmitHandler<Types.IFormInputs> = (data) => {
    const today = new Date().toLocaleDateString().replaceAll("/", ".");
    addComment({ ...data, avatar, date: today });
    showAddComment(false);
    NotificationModel.showNotification(true);
    deleteFile();
    reset();
  };

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
            <label
              htmlFor="avatar"
              className="input__file-button button-purple"
            >
              <input
                type="file"
                className="input input__file"
                id="avatar"
                accept="image/*"
                ref={inputFileRef}
                onChange={onChangeFile}
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
            <button onClick={onDeleteFile}>
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
