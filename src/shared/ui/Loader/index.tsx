import React from "react";

import "./style.scss";

export const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__content">
        <div className="loader__block loader__block_first" />
        <div className="loader__block loader__block_second" />
        <div className="loader__block loader__block_third" />
      </div>
    </div>
  );
};
