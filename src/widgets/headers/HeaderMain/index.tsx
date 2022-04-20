import React from "react";
import { useStore } from "effector-react";

import "./style.scss";

import { Button, Avatar, Logo } from "shared/ui";
import data from "shared/lib/data.json";
import profile from "shared/images/Profile.svg";
import { $isResize } from "shared/lib";

export const HeaderMain = () => {
  const isResize = useStore($isResize);
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
        <Button>
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
