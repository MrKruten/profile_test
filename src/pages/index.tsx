import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const MainPage = lazy(() => import("./MainPage"));
const AuthPage = lazy(() => import("./AuthPage"));
const PasswordRecoveryPage = lazy(() => import("./PasswordRecoveryPage"));

export const Router = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<AuthPage />} />
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
    </Routes>
  );
};
