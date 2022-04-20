import React from "react";

import { ReactComponent as Zero } from "shared/images/ZeroData.svg";
import "./style.scss";

export const ZeroData = () => {
  return (
    <div className="zero-data">
      <div className="zero-data__content">
        <Zero />
        <p>Здесь еще нет данных...</p>
      </div>
    </div>
  );
};
