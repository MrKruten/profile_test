import React from "react";
import { useStore } from "effector-react";
import classnames from "classnames";

import { ReactComponent as Cross } from "shared/images/Cross.svg";

import { NotificationModel } from "../model";
import "./style.scss";

export const Notification: React.FC = () => {
  const isShowNotification = useStore(NotificationModel.$isShowNotification);
  const isSuccessNotification = useStore(
    NotificationModel.$isSuccessNotification
  );
  const { titleSuccess, textSuccess, textError } = useStore(
    NotificationModel.$notification
  );

  const onClose = () => {
    NotificationModel.showNotification(false);
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
