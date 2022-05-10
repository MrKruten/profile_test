import React from "react";
import classnames from "classnames";

import "./style.scss";

interface IStatus {
  status?: "studies" | string;
}

export const Status: React.FC<IStatus> = ({ status = "studies" }) => {
  return (
    <div
      className={classnames("status", {
        status_expelled: status === "expelled",
        status_finished: status === "finished",
      })}
    >
      {status === "studies"
        ? "Обучается"
        : status === "expelled"
        ? "Отчислен"
        : "Закончил"}
    </div>
  );
};
