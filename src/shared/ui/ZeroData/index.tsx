import React from "react";

import { ReactComponent as Zero } from "shared/images/ZeroData.svg";
import "./style.scss";

interface IZeroData {
  text: string;
}

export const ZeroData: React.FC<IZeroData> = ({ text }) => {
  return (
    <div className="zero-data">
      <div className="zero-data__content">
        <Zero />
        <p>{text}</p>
      </div>
    </div>
  );
};
