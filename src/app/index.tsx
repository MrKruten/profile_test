import React, { useEffect } from "react";

import { Router } from "pages";
import { Notification } from "entities/Notification";
import { BottomNotification } from "entities/BottomNotification";
import { AuthModel } from "features/AuthForm";

import { withProviders } from "./providers";

const App = () => {
  useEffect(() => {
    // При обновлении страницы на админке происходит переход на main -_-
    // Думал(ю), что из localStorage не успеваю доставать токен
    // Try to fix
    AuthModel.checkAccessToken();
  }, []);

  return (
    <>
      <Router />
      <Notification />
      <BottomNotification />
    </>
  );
};

export default withProviders(App);
