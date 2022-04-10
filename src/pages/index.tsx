import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const MainPage = lazy(() => import("./MainPage"));

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};
