import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "effector-react";

import { SCREENS } from "shared/constants";
import {
  AboutUser,
  AdminCommentsList,
  Auth,
  PasswordRecovery,
  StudentsList,
} from "widgets";
import { AuthModel } from "features/AuthForm";

const MainPage = lazy(() => import("./MainPage"));
const AuthPage = lazy(() => import("./AuthPage"));
const AdminPage = lazy(() => import("./AdminPage"));

export const Router = () => {
  const isAuth = useStore(AuthModel.$isAuth);

  if (isAuth) {
    return (
      <Routes>
        <Route path={SCREENS.MAIN} element={<MainPage />} />
        <Route path={SCREENS.ADMIN} element={<AdminPage />}>
          <Route
            path={SCREENS.ADMIN}
            element={<Navigate to={SCREENS.STUDENTS} />}
          />
          <Route path={SCREENS.STUDENTS} element={<StudentsList />} />
          <Route path={SCREENS.COMMENTS} element={<AdminCommentsList />} />
          <Route path={SCREENS.ABOUT} element={<AboutUser />} />
        </Route>
        <Route
          path={SCREENS.REDIRECT}
          element={<Navigate to={SCREENS.MAIN} />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={SCREENS.AUTH} element={<AuthPage />}>
        <Route index element={<Auth />} />
        <Route path={SCREENS.RECOVERY} element={<PasswordRecovery />} />
      </Route>
      <Route path={SCREENS.REDIRECT} element={<Navigate to={SCREENS.AUTH} />} />
    </Routes>
  );
};
