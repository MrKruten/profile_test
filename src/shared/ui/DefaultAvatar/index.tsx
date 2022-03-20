import React from "react";

import camera from "../../images/Camera.svg";
import "./style.scss";

export const DefaultAvatar = () => {
  return (
    <div className="default-avatar">
      <img src={camera} alt="Default avatar" />
    </div>
  );
};
