import React from "react";
import { useGate } from "effector-react";

import { AuthTemplate } from "shared/ui/templates";
import { PasswordRecovery } from "widgets";
import { ResizeGate } from "shared/lib";

const PasswordRecoveryPage = () => {
  useGate(ResizeGate);

  return <AuthTemplate mainBlock={<PasswordRecovery />} />;
};

export default PasswordRecoveryPage;
