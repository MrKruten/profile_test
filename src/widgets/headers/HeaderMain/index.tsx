import React from "react";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";

import { Button, Avatar, Logo } from "shared/ui";
import profile from "shared/images/Profile.svg";
import { $isResize, SCREENS, $user } from "shared/lib";
import "./style.scss";
import { resetNotifications } from "widgets/headers/resetNotifications";

export const HeaderMain = () => {
  const user = useStore($user);
  const isResize = useStore($isResize);
  const navigate = useNavigate();

  const goAdmin = () => {
    resetNotifications();
    navigate(SCREENS.STUDENTS);
  };

  return (
    <header className="header">
      <div className="header__user">
        <Avatar avatar={user.avatar} />
        <span className="header__user-name">
          {isResize ? `${user.firstName} ${user.secondName}` : user.firstName}
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
