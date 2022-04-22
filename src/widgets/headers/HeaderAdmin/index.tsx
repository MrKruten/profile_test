import React from "react";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";

import { Avatar, Logo } from "shared/ui";
import { $isResize, SCREENS } from "shared/lib";
import { $user } from "shared/lib/user";
import { resetNotifications } from "widgets/headers/resetNotifications";
import "./style.scss";

export const HeaderAdmin = () => {
  const user = useStore($user);
  const navigate = useNavigate();
  const isResize = useStore($isResize);

  const navigateToMain = () => {
    resetNotifications();
    navigate(SCREENS.MAIN);
  };

  return (
    <header className="header header-admin">
      <div className="header-admin__left">
        <div className="header__user">
          <Avatar avatar={user.avatar} />
          <span className="header__user-name">
            {isResize ? `${user.firstName} ${user.secondName}` : user.firstName}
          </span>
        </div>
        <h3>Панель управления</h3>
      </div>
      <div className="header-admin__right">
        <button onClick={navigateToMain}>
          <Logo isWhite />
        </button>
      </div>
    </header>
  );
};
