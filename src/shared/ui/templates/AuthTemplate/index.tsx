import React from "react";

import "./style.scss";
import { ReactComponent as Logo } from "shared/images/Logo.svg";
import { Footer } from "shared/ui/Footer";

interface IAuthTemplate {
  mainBlock: React.ReactNode;
  Notification?: React.ReactNode;
}

export const AuthTemplate: React.FC<IAuthTemplate> = ({
  mainBlock,
  Notification,
}) => {
  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <Logo />
      </header>
      <main className="auth-page__main">{mainBlock}</main>
      {Notification}
      <Footer />
    </div>
  );
};
