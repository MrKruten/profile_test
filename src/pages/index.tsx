import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SCREENS } from "shared/lib";

const MainPage = lazy(() => import("./MainPage"));
const AuthPage = lazy(() => import("./auth/AuthPage"));
const PasswordRecoveryPage = lazy(() => import("./auth/PasswordRecoveryPage"));
const StudentsPage = lazy(() => import("./admin/StudentsPage"));
const CommentsPage = lazy(() => import("./admin/CommentsPage"));
const AboutPage = lazy(() => import("./admin/AboutPage"));

export const Router = () => {
  // TODO add isAuth
  return (
    <Routes>
      <Route path={SCREENS.MAIN} element={<MainPage />} />
      <Route path={SCREENS.STUDENTS} element={<StudentsPage />} />
      <Route path={SCREENS.COMMENTS} element={<CommentsPage />} />
      <Route path={SCREENS.ABOUT} element={<AboutPage />} />
      <Route path={SCREENS.AUTH} element={<AuthPage />} />
      <Route path={SCREENS.RECOVERY} element={<PasswordRecoveryPage />} />
      <Route path={SCREENS.REDIRECT} element={<Navigate to={SCREENS.AUTH} />} />
    </Routes>
  );
};
