import React from "react";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";

import { Avatar, Logo, Loader } from "shared/ui";
import { $isResize } from "shared/lib";
import { SCREENS } from "shared/constants";
import { UserModel } from "entities/Profile";

import { resetNotifications } from "../model";

import "./style.scss";

export const HeaderAdmin = () => {
  const user = useStore(UserModel.$user);
  const navigate = useNavigate();
  const isResize = useStore($isResize);
  const isLoading = useStore(UserModel.getProfileFx.pending);

  const navigateToMain = () => {
    resetNotifications();
    navigate(SCREENS.MAIN);
  };

  return (
    <header className="header header-admin">
      <div className="header-admin__left">
        <div className="header__user">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Avatar
                avatar={user.profileImage ? user.profileImage! : "None"}
              />
              <span className="header__user-name">
                {isResize
                  ? `${user.firstName} ${user.lastName}`
                  : user.firstName}
              </span>
            </>
          )}
        </div>
        <h3>Панель управления</h3>
      </div>
      <div className="header-admin__right">
        <button onClick={navigateToMain}>
          <Logo isWhite />
        </button>
      </div>
    </header>
  );
};
