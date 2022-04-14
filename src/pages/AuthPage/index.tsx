import React from "react";

import { BottomNotification } from "entities/BottomNotification";
import { AuthTemplate } from "shared/ui/templates";
import { Auth } from "widgets";

const AuthPage = () => {
  return (
    <AuthTemplate
      mainBlock={<Auth />}
      Notification={
        <BottomNotification text="Такого пользователя не существует" />
      }
    />
  );
};

export default AuthPage;
