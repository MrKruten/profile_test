import React, { useEffect } from "react";

import { HeaderContentAdmin } from "shared/ui";
import { AboutUserForm } from "features/AboutUserForm";
import { BottomNotificationModel } from "entities/BottomNotification";
import { NotificationModel } from "entities/Notification";
import "./style.scss";

export const AboutUser = () => {
  useEffect(() => {
    BottomNotificationModel.setBottomNotification(
      "Ошибка загрузки. Размер файла превышает 5Mb."
    );
    NotificationModel.setNotification({
      textError: "Не получилось отредактировать данные. Попробуйте еще раз!",
      textSuccess: "Данные успешно отредактированы!",
      titleSuccess: "Сохранено",
    });
  }, []);

  return (
    <div className="about">
      <HeaderContentAdmin title="Обо мне" />
      <AboutUserForm />
    </div>
  );
};
