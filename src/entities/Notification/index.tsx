import React from "react";
import { useStore } from "effector-react";
import classnames from "classnames";

import { ReactComponent as Cross } from "shared/images/Cross.svg";

import {
  $isShowNotification,
  $isSuccessNotification,
  showNotification,
} from "./model";
import "./style.scss";

interface INotification {
  textError: string;
  titleSuccess: string;
  textSuccess: string;
}

// Т.к есть валидация формы и нет сервера, то уведомление всегда будет успешным
export const Notification: React.FC<INotification> = ({
  textError,
  textSuccess,
  titleSuccess,
}) => {
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
          <h4>{isSuccessNotification ? titleSuccess : "Что-то не так..."}</h4>
          <p>{isSuccessNotification ? textSuccess : textError}</p>
        </div>
        <button onClick={onClose}>
          <Cross />
        </button>
      </div>
    </div>
  );
};
