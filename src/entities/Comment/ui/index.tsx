import React from "react";
import classnames from "classnames";

import { Avatar } from "shared/ui";
import { Helpers } from "shared/lib";
import { Types } from "shared/constants";

import { CommentAdminBlock } from "./CommentAdminBlock";

import "./style.scss";

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
