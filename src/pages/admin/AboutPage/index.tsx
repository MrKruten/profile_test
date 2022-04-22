import React from "react";

import { AdminTemplate } from "shared/ui/templates";
import { HeaderAdmin } from "widgets/headers";
import { AdminNav } from "features/AdminNav";
import { AboutUser } from "widgets/AboutUser";
import { BottomNotification } from "entities/BottomNotification";
import { Notification } from "entities/Notification";

const AboutPage = () => {
  return (
    <AdminTemplate
      header={<HeaderAdmin />}
      navigation={<AdminNav />}
      main={<AboutUser />}
      notifications={
        <>
          <BottomNotification text="Ошибка загрузки. Размер файла превышает 5Mb." />
          <Notification
            titleSuccess="Сохранено"
            textError="Не получилось отредактировать данные. Попробуйте еще раз!"
            textSuccess="Данные успешно отредактированы!"
          />
        </>
      }
    />
  );
};

export default AboutPage;
