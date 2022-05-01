import React from "react";
import classnames from "classnames";

import { Avatar } from "shared/ui";
import { Helpers, Types } from "shared/lib";
import { ReactComponent as Cross } from "shared/images/Error_Cross.svg";
import { ReactComponent as Check } from "shared/images/Check.svg";

import "./style.scss";

interface ICommentAdminBlock {
  editBlock?: React.ReactNode;
  status?: "onCheck" | "approved" | "declined";
}

const CommentAdminBlock: React.FC<ICommentAdminBlock> = ({
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

interface ICommentComponent extends Types.IReview {
  isAdmin?: boolean;
  editBlock?: React.ReactNode;
}

export const Comment: React.FC<ICommentComponent> = ({
  authorImage = "None",
  authorName,
  createdAt,
  text,
  status = "onCheck",
  isAdmin = false,
  editBlock,
}) => {
  return (
    <div
      className={classnames("comment", {
        comment_admin: isAdmin,
        comment_published: status === "approved",
        comment_rejected: status === "declined",
      })}
    >
      <div className="comment__header">
        <div className="comment__header__name-avatar">
          <Avatar avatar={authorImage ? authorImage! : "None"} />
          <h4>{authorName}</h4>
        </div>
        <span className="comment__header date">
          {Helpers.dateToString(new Date(createdAt))}
        </span>
      </div>
      <p className="comment__text">{text}</p>
      {isAdmin && <CommentAdminBlock status={status} editBlock={editBlock} />}
    </div>
  );
};
