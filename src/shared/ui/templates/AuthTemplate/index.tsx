import React from "react";

import { Footer } from "shared/ui/Footer";
import "./style.scss";
import { Logo } from "shared/ui/Logo";

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
        <Logo isWhite />
      </header>
      <main className="auth-page__main">{mainBlock}</main>
      {Notification}
      <Footer />
    </div>
  );
};
