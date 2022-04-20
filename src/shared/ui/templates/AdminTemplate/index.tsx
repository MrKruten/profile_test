import React from "react";

import { Footer } from "shared/ui/Footer";
import { ZeroData } from "shared/ui/ZeroData";
import "./style.scss";
import { Status } from "shared/ui/Status";

interface IAdminTemplate {
  header: React.ReactNode;
  navigation: React.ReactNode;
  isZero?: boolean;
}

export const AdminTemplate: React.FC<IAdminTemplate> = ({
  header,
  navigation,
  isZero = false,
}) => {
  return (
    <div className="admin-page">
      {header}
      <div className="admin-page__content">
        <nav className="admin-page__nav">{navigation}</nav>
        <main
          className={
            isZero
              ? "admin-page__main admin-page__main-zero"
              : "admin-page__main"
          }
        >
          {isZero && <ZeroData />}
          <Status status="study" />
        </main>
      </div>
      <Footer />
    </div>
  );
};
