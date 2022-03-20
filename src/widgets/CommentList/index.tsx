import React from "react";

import "./style.scss";
import plus from "shared/images/Plus.svg";
import { Button } from "shared/ui";

export const CommentList = () => {
  return (
    <div className="comment-list">
      <div className="comment-list__header">
        <h2>Отзывы</h2>
        <Button onClick={() => {}}>
          <>
            <img src={plus} alt="Добавить" />
            Добавить отзыв
          </>
        </Button>
      </div>
    </div>
  );
};
