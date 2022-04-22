import React from "react";
import classnames from "classnames";

import "./style.scss";
import { Types } from "shared/lib";

export const Status: React.FC<Types.IStatus> = ({ status = "study" }) => {
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
