import React from "react";

import "./style.scss";
import { Button, DefaultAvatar } from "shared/ui";
import logo from "shared/images/Logo.svg";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__user">
        <DefaultAvatar />
        <span className="header__user__name"> Name Family</span>
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
