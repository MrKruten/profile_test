import React from "react";

import "./style.scss";
import { Avatar } from "shared/ui";

interface IComment {
  avatar?: string;
  name: string;
  date: string;
  text: string;
}

export const Comment: React.FC<IComment> = ({
  avatar = "None",
  name,
  date,
  text,
}) => {
  return (
    <div className="comment">
      <div className="comment__header">
        <div className="comment__header__name-avatar">
          <Avatar avatar={avatar} />
          <h4>{name}</h4>
        </div>
        <span className="comment__header date">{date}</span>
      </div>
      <p>{text}</p>
    </div>
  );
};
