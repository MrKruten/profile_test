import React from "react";
import { useStore } from "effector-react";

import { BottomNotificationModel } from "../model";
import "./style.scss";

export const BottomNotification: React.FC = () => {
  const isShowNotification = useStore(
    BottomNotificationModel.$isShowBottomNotification
  );
  const text = useStore(BottomNotificationModel.$bottomNotification);

  if (!isShowNotification) {
    return null;
  }

  return (
    <div className="bottom-notification">
      <p>{text}</p>
    </div>
  );
};
