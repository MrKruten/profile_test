import React from "react";

import { Footer } from "shared/ui/Footer";
import "./style.scss";

interface IAdminTemplate {
  header: React.ReactNode;
  navigation: React.ReactNode;
  main?: React.ReactNode;
}

export const AdminTemplate: React.FC<IAdminTemplate> = ({
  header,
  navigation,
  main,
}) => {
  return (
    <div className="admin-page">
      {header}
      <div className="admin-page__content">
        <nav className="admin-page__nav">{navigation}</nav>
        <main className="admin-page__main">{main}</main>
      </div>
      <Footer />
    </div>
  );
};
