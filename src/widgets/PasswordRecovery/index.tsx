import React from "react";

import { PasswordRecoveryForm } from "features/PasswordRecoveryForm";
import "./style.scss";

export const PasswordRecovery: React.FC = () => {
  return (
    <div className="password-recovery">
      <PasswordRecoveryForm />
    </div>
  );
};
