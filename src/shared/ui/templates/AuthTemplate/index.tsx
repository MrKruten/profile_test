import React from "react";

import { Footer } from "shared/ui/Footer";
import { Logo } from "shared/ui/Logo";

import "./style.scss";

interface IAuthTemplate {
  mainBlock: React.ReactNode;
}

export const AuthTemplate: React.FC<IAuthTemplate> = ({ mainBlock }) => {
  return (
    <div className="auth-page">
      <header className="auth-page__header">
        <Logo isWhite />
      </header>
      <main className="auth-page__main">{mainBlock}</main>
      <Footer />
    </div>
  );
};
