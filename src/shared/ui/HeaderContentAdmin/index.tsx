import React from "react";

import "./style.scss";

interface IHeaderContentAdmin {
  title: string;
  select?: React.ReactNode;
}

export const HeaderContentAdmin: React.FC<IHeaderContentAdmin> = ({
  title,
  select,
}) => {
  return (
    <div className="header-content">
      <h3>{title}</h3>
      {select}
    </div>
  );
};
