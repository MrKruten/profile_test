import React from "react";
import { useStore } from "effector-react";
import classnames from "classnames";

import {
  $isShowNotification,
  $isSuccessNotification,
  showNotification,
} from "entities/Notification/model";
import { ReactComponent as Cross } from "shared/images/Cross.svg";
import "./style.scss";

// Т.к есть валидация формы и нет сервера, то уведомление всегда будет успешным
export const Notification = () => {
  const isShowNotification = useStore($isShowNotification);
  const isSuccessNotification = useStore($isSuccessNotification);

  const onClose = () => {
    showNotification(false);
  };

  if (!isShowNotification) {
    return null;
  }

  return (
    <div className="notification">
      <div
        className={classnames("notification__container", {
          notification__container_error: !isSuccessNotification,
        })}
      >
        <div className="notification__container__message-img" />
        <div className="notification__container__text">
          <h4>{isSuccessNotification ? "Успешно!" : "Что-то не так..."}</h4>
          <p>
            {isSuccessNotification
              ? "Спасибо за отзыв о нашей компании :)"
              : "Не получилось отправить отзыв. Попробуйте еще раз!"}
          </p>
        </div>
        <button onClick={onClose}>
          <Cross />
        </button>
      </div>
    </div>
  );
};
