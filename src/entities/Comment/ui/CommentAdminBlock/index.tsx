import React from "react";
import classnames from "classnames";

import { ReactComponent as Cross } from "shared/images/Error_Cross.svg";
import { ReactComponent as Check } from "shared/images/Check.svg";

import "./style.scss";

interface ICommentAdminBlock {
  editBlock?: React.ReactNode;
  status?: "onCheck" | "approved" | "declined";
}

export const CommentAdminBlock: React.FC<ICommentAdminBlock> = ({
  editBlock,
  status,
}) => {
  if (status === "onCheck") {
    return <div className="comment__admin-block">{editBlock}</div>;
  }

  return (
    <div
      className={classnames("comment__admin-block", {
        "comment__admin-block_rejected": status === "declined",
      })}
    >
      <div
        className={classnames("comment__icon", {
          comment__icon_rejected: status === "declined",
        })}
      >
        {status === "declined" ? <Cross /> : <Check />}
      </div>
      <p>Отзыв{status === "declined" ? " отклонен" : " опубликован"}</p>
    </div>
  );
};
