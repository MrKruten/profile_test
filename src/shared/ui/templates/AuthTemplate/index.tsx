import React from "react";

import "./style.scss";
import { ReactComponent as Logo } from "shared/images/Logo.svg";
import { Footer } from "shared/ui/Footer";

export const AuthTemplate: React.FC = ({ children }) => {
  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <Logo />
      </header>
      <main className="auth-page__main">{children}</main>
      <Footer />
    </div>
  );
};
