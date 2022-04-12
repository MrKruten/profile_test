import React from "react";
import { useStore } from "effector-react";

import "./style.scss";
import { $isShowBottomNotification } from "./model";

interface IBottomNotification {
  text: string;
}

export const BottomNotification: React.FC<IBottomNotification> = ({ text }) => {
  const isShowNotification = useStore($isShowBottomNotification);

  if (!isShowNotification) {
    return null;
  }

  return (
    <div className="bottom-notification">
      <p>{text}</p>
    </div>
  );
};
