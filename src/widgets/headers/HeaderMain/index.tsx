import React from "react";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";

import { Button, Avatar, Logo } from "shared/ui";
import data from "shared/lib/data.json";
import profile from "shared/images/Profile.svg";
import { $isResize, SCREENS } from "shared/lib";
import { NotificationModel } from "entities/Notification";
import "./style.scss";

export const HeaderMain = () => {
  const isResize = useStore($isResize);
  const navigate = useNavigate();

  const goAdmin = () => {
    navigate(SCREENS.STUDENTS);
    NotificationModel.showNotification(false);
  };

  return (
    <header className="header">
      <div className="header__user">
        <Avatar avatar={data.user.avatar} />
        <span className="header__user-name">
          {isResize ? data.user.name : data.user.name.split(" ")[0]}
        </span>
      </div>
      <Logo />
      <div>
        <Button onClick={goAdmin}>
          {isResize ? (
            "Панель управления"
          ) : (
            <img src={profile} alt="Панель управления" />
          )}
        </Button>
      </div>
    </header>
  );
};
