import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "effector-react";

import { CommentsModel } from "entities/Comment";
import { ReactComponent as Cross } from "shared/images/Cross.svg";
import { Button, TextArea } from "shared/ui";
import { Types } from "shared/constants";

import { EditCommentModel } from "../model";
import { schema } from "../lib/schema";

import "./style.scss";

export const EditComment = () => {
  const editComment = useStore(CommentsModel.$editComment);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Types.IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Types.IFormInputs> = (data) => {
    EditCommentModel.updateTextComment({
      id: editComment.id!,
      text: data.text,
    });
    reset();
  };

  const onClose = () => {
    EditCommentModel.showEditComment(false);
    reset();
  };

  return (
    <div className="edit-comment">
      <div className="edit-comment__header">
        <h4>Редактирование отзыва</h4>
        <button type="button" onClick={onClose}>
          <Cross />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          defaultValue={editComment.text}
          placeholder="Напишите пару слов о вашем опыте..."
          label="Отзыв"
          name="text"
          maxlength={200}
          id="text"
          register={register}
          required
          error={!!errors.text}
          errorMessage={errors.text?.message}
        />
        <div className="edit-comment__btn">
          <Button type="submit" disabled={!isValid}>
            Подтвердить редактирование
          </Button>
          <Button color="red" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};
