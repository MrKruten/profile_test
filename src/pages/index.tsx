import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { SCREENS } from "shared/lib";

const MainPage = lazy(() => import("./MainPage"));
const AuthPage = lazy(() => import("./AuthPage"));
const PasswordRecoveryPage = lazy(() => import("./PasswordRecoveryPage"));

export const Router = () => {
  // TODO add isAuth
  return (
    <Routes>
      <Route path={SCREENS.MAIN} element={<MainPage />} />
      <Route path={SCREENS.RECOVERY} element={<PasswordRecoveryPage />} />
      <Route path={SCREENS.AUTH} element={<AuthPage />} />
      <Route path={SCREENS.REDIRECT} element={<AuthPage />} />
    </Routes>
  );
};
