import React from "react";

import { Footer } from "shared/ui/Footer";
import { ZeroData } from "shared/ui/ZeroData";
import "./style.scss";

interface IAdminTemplate {
  header: React.ReactNode;
  navigation: React.ReactNode;
  isZero?: boolean;
  main?: React.ReactNode;
  textZero?: string;
  notifications?: React.ReactNode;
}

export const AdminTemplate: React.FC<IAdminTemplate> = ({
  header,
  navigation,
  isZero = false,
  main,
  textZero = "",
  notifications,
}) => {
  return (
    <div className="admin-page">
      {header}
      <div className="admin-page__content">
        <nav className="admin-page__nav">{navigation}</nav>
        <main
          className={
            isZero
              ? "admin-page__main admin-page__main_zero"
              : "admin-page__main"
          }
        >
          {isZero ? <ZeroData text={textZero} /> : main}
        </main>
      </div>
      {notifications}
      <Footer />
    </div>
  );
};
