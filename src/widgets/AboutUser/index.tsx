import React from "react";

import { HeaderContentAdmin } from "shared/ui";
import { AboutUserForm } from "features/AboutUserForm";

import "./style.scss";

export const AboutUser = () => {
  return (
    <div className="about">
      <HeaderContentAdmin title="Обо мне" />
      <AboutUserForm />
    </div>
  );
};
