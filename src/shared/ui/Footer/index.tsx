import React from "react";

import { ReactComponent as Vk } from "shared/images/Vk.svg";
import { ReactComponent as Telegram } from "shared/images/Telegram.svg";
import { ReactComponent as Reddit } from "shared/images/Reddit.svg";
import "./style.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__company">
        © iLINK ACADEMY. ALL RIGHTS RESERVED. 2022
      </div>
      <div className="footer__references">
        <a href="##" target="_blank">
          <Vk />
        </a>
        <a href="##" target="_blank">
          <Reddit />
        </a>
        <a href="##" target="_blank">
          <Telegram />
        </a>
      </div>
    </footer>
  );
};
