import React from "react";
import classnames from "classnames";

import "./style.scss";

interface IModalWrapper {
  isShow?: boolean;
  modal: React.ReactNode;
}

export const ModalWrapper: React.FC<IModalWrapper> = ({ isShow, modal }) => {
  return (
    <div
      className={classnames("modal", {
        modal_active: isShow,
      })}
    >
      {modal}
    </div>
  );
};
