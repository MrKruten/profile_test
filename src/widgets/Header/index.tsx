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
        <a
          href="https://www.youtube.com/watch?v=cw9FIeHbdB8"
          target="_blank"
          rel="noreferrer"
        >
          <Button onClick={() => {}}>Панель управления</Button>
        </a>
      </div>
    </header>
  );
};
