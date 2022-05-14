import React from "react";

import { Types } from "shared/constants";
import { Avatar, Status } from "shared/ui";
import "./style.scss";

export const Student: React.FC<Types.IProfile> = ({
  academyStatus,
  profileImage,
  firstName,
  lastName,
  smallAboutMe,
}) => {
  return (
    <div className="student">
      <div className="student__avatar-name">
        <Avatar avatar={profileImage} />
        <p className="student__name">{`${firstName} ${lastName}`}</p>
      </div>
      <p className="student__text">{smallAboutMe}</p>
      <Status status={academyStatus} />
    </div>
  );
};
