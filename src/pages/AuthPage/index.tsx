import React from "react";

import "./style.scss";
import { AuthTemplate } from "shared/ui/templates";
import { AuthForm } from "widgets";
import { BottomNotification } from "entities/BottomNotification";

const AuthPage = () => {
  return (
    <AuthTemplate
      mainBlock={<AuthForm />}
      Notification={
        <BottomNotification text="Такого пользователя не существует" />
      }
    />
  );
};

export default AuthPage;
