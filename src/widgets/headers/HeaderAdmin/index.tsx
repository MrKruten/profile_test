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
    <header className="header header_admin">
      <div className="header_admin__left">
        <div className="header__user">
          <Avatar avatar={data.user.avatar} />
          <span className="header__user__name">
            {isResize ? data.user.name : data.user.name.split(" ")[0]}
          </span>
        </div>
        <h3>Панель управления</h3>
      </div>
      <div className="header_admin__right">
        <button onClick={navigateToMain}>
          <Logo isWhite />
        </button>
      </div>
    </header>
  );
};
