import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SCREENS } from "shared/lib";

const MainPage = lazy(() => import("./MainPage"));
const AuthPage = lazy(() => import("./AuthPage"));
const PasswordRecoveryPage = lazy(() => import("./PasswordRecoveryPage"));
const AdminPage = lazy(() => import("./AdminPage"));

export const Router = () => {
  // TODO add isAuth
  return (
    <Routes>
      <Route path={SCREENS.MAIN} element={<MainPage />} />
      <Route path={SCREENS.USERS} element={<AdminPage />} />
      <Route path={SCREENS.AUTH} element={<AuthPage />} />
      <Route path={SCREENS.RECOVERY} element={<PasswordRecoveryPage />} />
      <Route path={SCREENS.REDIRECT} element={<Navigate to={SCREENS.AUTH} />} />
    </Routes>
  );
};
