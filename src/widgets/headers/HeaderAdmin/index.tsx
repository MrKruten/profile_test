import React from "react";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";

import { Avatar, Logo } from "shared/ui";
import data from "shared/lib/data.json";
import { $isResize, SCREENS } from "shared/lib";

import "./style.scss";

export const HeaderAdmin = () => {
  const navigate = useNavigate();
  const isResize = useStore($isResize);

  const navigateToMain = () => {
    navigate(SCREENS.MAIN);
  };

  return (
    <header className="header header-admin">
      <div className="header-admin__left">
        <div className="header__user">
          <Avatar avatar={data.user.avatar} />
          <span className="header__user-name">
            {isResize ? data.user.name : data.user.name.split(" ")[0]}
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
