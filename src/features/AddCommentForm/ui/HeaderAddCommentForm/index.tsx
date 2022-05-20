import React from "react";

import "./style.scss";
import crossImg from "shared/images/Cross.svg";

interface IHeaderAddCommentForm {
  closeWindow: () => void;
}

export const HeaderAddCommentForm: React.FC<IHeaderAddCommentForm> = ({
  closeWindow,
}) => {
  return (
    <div className="add-comment__header">
      <h4>Отзыв</h4>
      <button onClick={closeWindow}>
        <img src={crossImg} alt="Закрыть" />
      </button>
    </div>
  );
};
