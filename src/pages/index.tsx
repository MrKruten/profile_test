import React, { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "effector-react";

import { SCREENS } from "shared/lib";
import {
  AboutUser,
  AdminCommentsList,
  Auth,
  PasswordRecovery,
  StudentsList,
} from "widgets";
import { $accessToken, $isAuth, setIsAuth } from "features/AuthForm/model";

const MainPage = lazy(() => import("./MainPage"));
const AuthPage = lazy(() => import("./AuthPage"));
const AdminPage = lazy(() => import("./AdminPage"));

export const Router = () => {
  const isAuth = useStore($isAuth);
  const accessToken = useStore($accessToken);

  useEffect(() => {
    setIsAuth(accessToken !== "");
  }, []);

  if (!isAuth) {
    return (
      <Routes>
        <Route path={SCREENS.AUTH} element={<AuthPage />}>
          <Route index element={<Auth />} />
          <Route path={SCREENS.RECOVERY} element={<PasswordRecovery />} />
        </Route>
        <Route
          path={SCREENS.REDIRECT}
          element={<Navigate to={SCREENS.AUTH} />}
        />
      </Routes>
    );
  }

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
      <Route path={SCREENS.REDIRECT} element={<Navigate to={SCREENS.MAIN} />} />
    </Routes>
  );
};
