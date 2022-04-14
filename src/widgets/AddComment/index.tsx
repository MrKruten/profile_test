import React from "react";
import classnames from "classnames";
import { useStore } from "effector-react";

import { AddCommentForm, AddCommentModel } from "features/AddCommentForm";
import "./style.scss";

export const AddComment = () => {
  const isShowAddComment = useStore(AddCommentModel.$isShowAddComment);

  return (
    <div
      className={classnames("add-comment", {
        "add-comment_active": isShowAddComment,
      })}
    >
      <AddCommentForm />
    </div>
  );
};
