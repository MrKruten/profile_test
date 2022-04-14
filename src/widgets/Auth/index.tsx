import React from "react";
import { useNavigate } from "react-router-dom";

import { Hyperlink } from "shared/ui";
import { SCREENS } from "shared/lib";
import { AuthForm } from "features/AuthForm";
import "./style.scss";

export const Auth: React.FC = () => {
  const navigate = useNavigate();

  const navigatePasswordRecovery = () => {
    navigate(SCREENS.RECOVERY);
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
