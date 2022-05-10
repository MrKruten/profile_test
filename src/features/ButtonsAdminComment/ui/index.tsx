import React from "react";

import { Button } from "shared/ui";
import { ReactComponent as Edit } from "shared/images/Edit.svg";
import { setEditComment, Types } from "shared/lib";

import "./style.scss";
import { updateStatusComment } from "../model";

interface IButtonsAdminComment {
  comment: Types.IReview;
  editFunc: () => void;
}

export const ButtonsAdminComment: React.FC<IButtonsAdminComment> = ({
  comment,
  editFunc,
}) => {
  const publish = () => {
    updateStatusComment({ id: comment.id!, status: "approved" });
  };

  const reject = () => {
    updateStatusComment({ id: comment.id!, status: "declined" });
  };

  const edit = () => {
    setEditComment(comment);
    editFunc();
  };

  return (
    <div className="comment__admin-buttons">
      <div className="comment__left-buttons">
        <Button onClick={publish}>Опубликовать</Button>
        <Button color="red" onClick={reject}>
          Отклонить
        </Button>
      </div>
      <Button isImg onClick={edit}>
        <Edit />
      </Button>
    </div>
  );
};
