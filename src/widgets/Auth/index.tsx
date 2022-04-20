import React from "react";
import { useNavigate } from "react-router-dom";

import { Hyperlink } from "shared/ui";
import { SCREENS } from "shared/lib";
import { AuthForm } from "features/AuthForm";
import { BottomNotificationModel } from "entities/BottomNotification";

import "./style.scss";

export const Auth: React.FC = () => {
  const navigate = useNavigate();

  const navigatePasswordRecovery = () => {
    navigate(SCREENS.RECOVERY);
    BottomNotificationModel.showBottomNotification(false);
  };

  return (
    <div className="auth">
      <h3>Войти</h3>
      <AuthForm />
      <div className="auth__link">
        <button type="button" onClick={navigatePasswordRecovery}>
          <Hyperlink text="Забыли пароль?" />
        </button>
      </div>
    </div>
  );
};
