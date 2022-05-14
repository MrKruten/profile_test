import React from "react";
import { useStore } from "effector-react";
import { useNavigate } from "react-router-dom";

import { Button, Avatar, Logo, Loader } from "shared/ui";
import profile from "shared/images/Profile.svg";
import { $isResize } from "shared/lib";
import { SCREENS } from "shared/constants";
import { UserModel } from "entities/Profile";

import { resetNotifications } from "../model";
import "./style.scss";

export const HeaderMain = () => {
  const user = useStore(UserModel.$user);
  const isResize = useStore($isResize);
  const navigate = useNavigate();
  const isLoading = useStore(UserModel.getProfileFx.pending);

  const goAdmin = () => {
    resetNotifications();
    navigate(SCREENS.ADMIN);
  };

  return (
    <header className="header">
      <div className="header__user">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Avatar avatar={user.profileImage ? user.profileImage! : "None"} />
            <span className="header__user-name">
              {isResize ? `${user.firstName} ${user.lastName}` : user.firstName}
            </span>
          </>
        )}
      </div>
      <Logo />
      <div>
        <Button onClick={goAdmin} isImg={!isResize}>
          {isResize ? (
            "Панель управления"
          ) : (
            <img src={profile} alt="Панель управления" />
          )}
        </Button>
      </div>
    </header>
  );
};
