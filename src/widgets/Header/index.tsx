import React from "react";

import "./style.scss";
import { Button, Avatar } from "shared/ui";
import logo from "shared/images/Logo.svg";
import data from "shared/lib/data.json";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__user">
        <Avatar avatar={data.user.avatar} />
        <span className="header__user__name">{data.user.name}</span>
      </div>
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div>
        <Button onClick={() => {}}>Панель управления</Button>
      </div>
    </header>
  );
};
