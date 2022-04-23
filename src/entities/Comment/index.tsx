import React from "react";
import classnames from "classnames";

import { Avatar } from "shared/ui";
import { Types } from "shared/lib";
import { ReactComponent as Cross } from "shared/images/Error_Cross.svg";
import { ReactComponent as Check } from "shared/images/Check.svg";

import "./style.scss";

interface ICommentAdminBlock {
  editBlock?: React.ReactNode;
  status?: "editable" | "rejected" | "published" | string;
}

const CommentAdminBlock: React.FC<ICommentAdminBlock> = ({
  editBlock,
  status,
}) => {
  if (status === "editable") {
    return <div className="comment__admin-block">{editBlock}</div>;
  }

  return (
    <div
      className={classnames("comment__admin-block", {
        "comment__admin-block_rejected": status === "rejected",
      })}
    >
      <div
        className={classnames("comment__icon", {
          comment__icon_rejected: status === "rejected",
        })}
      >
        {status === "rejected" ? <Cross /> : <Check />}
      </div>
      <p>Отзыв{status === "rejected" ? " отклонен" : " опубликован"}</p>
    </div>
  );
};

interface ICommentComponent extends Types.IComment {
  isAdmin?: boolean;
  editBlock?: React.ReactNode;
}

export const Comment: React.FC<ICommentComponent> = ({
  avatar = "None",
  name,
  date,
  text,
  status = "editable",
  isAdmin = false,
  editBlock,
}) => {
  return (
    <div
      className={classnames("comment", {
        comment_admin: isAdmin,
        comment_published: status === "published",
        comment_rejected: status === "rejected",
      })}
    >
      <div className="comment__header">
        <div className="comment__header__name-avatar">
          <Avatar avatar={avatar} />
          <h4>{name}</h4>
        </div>
        <span className="comment__header date">{date}</span>
      </div>
      <p className="comment__text">{text}</p>
      {isAdmin && <CommentAdminBlock status={status} editBlock={editBlock} />}
    </div>
  );
};
