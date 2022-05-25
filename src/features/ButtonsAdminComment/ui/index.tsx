import React from "react";

import { Button } from "shared/ui";
import { ReactComponent as Edit } from "shared/images/Edit.svg";
import { CommentsModel } from "entities/Comment";
import { Types } from "shared/constants";

import { updateStatusComment } from "../model";

import "./style.scss";

interface IButtonsAdminComment {
  comment: Types.IReview;
  editFunc: () => void;
}

export const ButtonsAdminComment: React.FC<IButtonsAdminComment> = ({
  comment,
  editFunc,
}) => {
  const handleCommentApproveClick = () => {
    updateStatusComment({ id: comment.id!, status: "approved" });
  };

  const handleCommentRejectClick = () => {
    updateStatusComment({ id: comment.id!, status: "declined" });
  };

  const edit = () => {
    CommentsModel.setEditComment(comment);
    editFunc();
  };

  return (
    <div className="comment__admin-buttons">
      <div className="comment__left-buttons">
        <Button onClick={handleCommentApproveClick}>Опубликовать</Button>
        <Button color="red" onClick={handleCommentRejectClick}>
          Отклонить
        </Button>
      </div>
      <Button isImg onClick={edit}>
        <Edit />
      </Button>
    </div>
  );
};
