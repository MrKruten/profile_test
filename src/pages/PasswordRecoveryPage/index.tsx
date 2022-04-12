import React from "react";
import { useGate } from "effector-react";

import { Notification } from "entities/Notification";
import { AuthTemplate } from "shared/ui/templates";
import { PasswordRecoveryForm } from "widgets";
import { ResizeGate } from "features/resize/model";

const PasswordRecoveryPage = () => {
  useGate(ResizeGate);

  return (
    <AuthTemplate
      mainBlock={<PasswordRecoveryForm />}
      Notification={
        <Notification
          titleSuccess="Код отправлен"
          textSuccess="Код успешно отправлен на вашу почту!"
          textError="Не получилось отправить код. Попробуйте еще раз!"
        />
      }
    />
  );
};

export default PasswordRecoveryPage;
