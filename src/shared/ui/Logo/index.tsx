import React from "react";

import { ReactComponent as Logotype } from "shared/images/Logo.svg";

import "./style.scss";

interface ILogo {
  isWhite?: boolean;
}

export const Logo: React.FC<ILogo> = ({ isWhite = false }) => {
  return (
    <div className={isWhite ? "logo logo_white" : "logo"}>
      <Logotype />
    </div>
  );
};
