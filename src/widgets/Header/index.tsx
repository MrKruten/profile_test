import React from "react";
import { useStore } from "effector-react";

import "./style.scss";

import { Button, Avatar } from "shared/ui";
import logo from "shared/images/Logo.svg";
import data from "shared/lib/data.json";
import profile from "shared/images/Profile.svg";
import { $isResize } from "features/resize/model";

export const Header = () => {
  const isResize = useStore($isResize);
  return (
    <header className="header">
      <div className="header__user">
        <Avatar avatar={data.user.avatar} />
        <span className="header__user__name">
          {isResize ? data.user.name : data.user.name.split(" ")[0]}
        </span>
      </div>
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div>
        <Button onClick={() => {}}>
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
