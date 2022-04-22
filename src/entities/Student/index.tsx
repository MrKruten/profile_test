import React from "react";

import { Types } from "shared/lib";
import { Avatar, Status } from "shared/ui";
import "./style.scss";

interface IStudent extends Types.IStudent {}

export const Student: React.FC<IStudent> = ({
  status,
  avatar,
  firstName,
  secondName,
  shortInfo,
}) => {
  return (
    <div className="student">
      <div className="student__avatar-name">
        <Avatar avatar={avatar} />
        <p className="student__name">{`${firstName} ${secondName}`}</p>
      </div>
      <p className="student__text">{shortInfo}</p>
      <Status status={status} />
    </div>
  );
};
