import React, { useEffect } from "react";
import { useStore } from "effector-react";

import { HeaderContentAdmin, Loader } from "shared/ui";
import { AboutUserForm } from "features/AboutUserForm";
import { BottomNotificationModel } from "entities/BottomNotification";
import { NotificationModel } from "entities/Notification";
import { UserModel } from "entities/Profile";

import "./style.scss";

export const AboutUser = () => {
  const isLoading = useStore(UserModel.getProfileFx.pending);

  useEffect(() => {
    BottomNotificationModel.setBottomNotification(
      "Ошибка загрузки. Размер файла превышает 5Mb."
    );
    NotificationModel.setNotification({
      textError: "Не получилось отредактировать данные. Попробуйте еще раз!",
      textSuccess: "Данные успешно отредактированы!",
      titleSuccess: "Сохранено",
    });
    UserModel.getUser();
  }, []);

  return (
    <div className="about">
      <HeaderContentAdmin title="Обо мне" />
      {isLoading ? <Loader /> : <AboutUserForm />}
    </div>
  );
};
