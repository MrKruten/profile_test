import React from "react";
import classnames from "classnames";

import "./style.scss";
import { IStatus } from "shared/lib/types";

export const Status: React.FC<IStatus> = ({ status }) => {
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
