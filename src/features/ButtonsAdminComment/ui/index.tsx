import React from "react";

import { Button } from "shared/ui";
import { ReactComponent as Edit } from "shared/images/Edit.svg";
import { setEditComment, Types, updateComment } from "shared/lib";
import "./style.scss";

interface IButtonsAdminComment {
  comment: Types.IComment;
  editFunc: () => void;
}

export const ButtonsAdminComment: React.FC<IButtonsAdminComment> = ({
  comment,
  editFunc,
}) => {
  const publish = () => {
    updateComment({ ...comment, status: "published" });
  };

  const reject = () => {
    updateComment({ ...comment, status: "rejected" });
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
