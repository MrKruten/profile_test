import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const MainPage = lazy(() => import("./MainPage"));
const AuthPage = lazy(() => import("./AuthPage"));

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};
// <Route path="/main" element={<MainPage />} />
