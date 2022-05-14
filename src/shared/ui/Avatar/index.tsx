import React from "react";
import classnames from "classnames";

import camera from "shared/images/Camera.svg";
import "./style.scss";
import { IAvatar } from "shared/constants/types";

export const Avatar: React.FC<IAvatar> = ({ avatar = "None" }) => {
  return (
    <div
      className={classnames("avatar", { avatar_default: avatar === "None" })}
    >
      <img
        src={
          avatar === "None"
            ? camera
            : `https://academtest.ilink.dev/images/${avatar}`
        }
        alt="Avatar"
      />
    </div>
  );
};
