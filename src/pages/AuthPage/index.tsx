import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { AuthTemplate } from "shared/ui/templates";
import { BottomNotificationModel } from "entities/BottomNotification";
import { NotificationModel } from "entities/Notification";

const AuthPage = () => {
  useEffect(() => {
    BottomNotificationModel.setBottomNotification(
      "Такого пользователя не существует"
    );
    NotificationModel.setNotification({
      textError: "Не получилось отправить код. Попробуйте еще раз!",
      textSuccess: "Код успешно отправлен на вашу почту!",
      titleSuccess: "Код отправлен",
    });
  }, []);

  return <AuthTemplate mainBlock={<Outlet />} />;
};

export default AuthPage;
