import React, { useEffect } from "react";

import { AuthTemplate } from "shared/ui/templates";
import { Auth } from "widgets";
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
      titleSuccess: "Пароль изменен",
    });
  }, []);

  return <AuthTemplate mainBlock={<Auth />} />;
};

export default AuthPage;
