import React from "react";

import "shared/ui/Footer/style.scss";
import vk from "shared/images/Vk.svg";
import telegram from "shared/images/Telegram.svg";
import reddit from "shared/images/Reddit.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__company">
        © iLINK ACADEMY. ALL RIGHTS RESERVED. 2022
      </div>
      <div className="footer__references">
        <a href="/#">
          <img src={vk} alt="Vk" />
        </a>
        <a href="/#">
          <img src={reddit} alt="Reddit" />
        </a>
        <a href="/#">
          <img src={telegram} alt="Telegram" />
        </a>
      </div>
    </footer>
  );
};
