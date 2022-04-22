import React from "react";
import classnames from "classnames";

import "./style.scss";

interface IStatus {
  status?: string;
}

export const Status: React.FC<IStatus> = ({ status = "study" }) => {
  return (
    <div
      className={classnames("status", {
        status_expelled: status === "expelled",
        status_finished: status === "finished",
      })}
    >
      {status === "study"
        ? "Обучается"
        : status === "expelled"
        ? "Отчислен"
        : "Закончил"}
    </div>
  );
};
