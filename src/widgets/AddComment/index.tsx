import React, { useRef, useState } from "react";
import classnames from "classnames";
import { useStore } from "effector-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import infoImg from "shared/images/Info_Square.svg";
import crossImg from "shared/images/Cross.svg";
import plusImg from "shared/images/Plus.svg";
import fileImg from "shared/images/File.svg";
import { ReactComponent as DeleteImg } from "shared/images/Delete.svg";
import "./style.scss";
import { Button, Input } from "shared/ui";
import { TextArea } from "shared/ui/TextArea";
import {
  $isShowAddComment,
  showAddComment,
} from "features/showAddComment/model";
import { addComment } from "features/Comments/model";
import { IFormInputs } from "shared/lib/types";
import { showNotification } from "entities/Notification/model";

const schema = yup
  .object({
    name: yup
      .string()
      .min(4, "Поле должно содержать не менее 4 символов")
      .max(64, "Поле должно содержать не более 64 символов")
      .required("Это обязательно поле"),
    text: yup
      .string()
      .min(6, "Поле должно содержать не менее 6 символов")
      .max(200, "Поле должно содержать не более 200 символов")
      .required("Это обязательно поле"),
  })
  .required();

export const AddComment = () => {
  const [avatar, setAvatar] = useState("None");
  const [fileName, setFileName] = useState("");
  const [isFileError, setIsFileError] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const isShowAddComment = useStore($isShowAddComment);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
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
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      readFile(e.target.files);
    }
  };

  const onDeleteFile = () => {
    deleteFile();
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const today = new Date().toLocaleDateString().replaceAll("/", ".");
    addComment({ ...data, avatar, date: today });
    showAddComment(false);
    showNotification(true);
    deleteFile();
    reset();
  };

  return (
    <div
      className={classnames("add-comment", {
        "add-comment_active": isShowAddComment,
      })}
    >
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
                <p
                  className={isFileError ? "add-comment__name-load_error" : ""}
                >
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
            <Button onClick={() => {}} type="submit" disabled={isFileError}>
              Отправить отзыв
            </Button>
            <div className="add-comment__info">
              <img src={infoImg} alt="Информация" />
              <span>Все отзывы проходят модерацию в течение 2 часов</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
