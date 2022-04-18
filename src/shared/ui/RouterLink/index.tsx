import React from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "effector-react";

import { $isResize } from "shared/lib";
import "./style.scss";

interface IRouterLink {
  toRoute: string;
  icon?: React.ReactNode;
  text?: React.ReactNode;
}

export const RouterLink: React.FC<IRouterLink> = ({ icon, text, toRoute }) => {
  const isResize = useStore($isResize);

  return (
    <NavLink to={toRoute} className="router-link">
      {isResize && icon}
      {text}
    </NavLink>
  );
};
