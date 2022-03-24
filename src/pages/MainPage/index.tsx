import React from "react";
import { useGate } from "effector-react";
import "./style.scss";

import { Profile } from "entities/Profile";
import { Header, Footer, CommentList, AddComment } from "widgets";
import { ResizeGate } from "features/resize/model";
import { Notification } from "entities/Notification";

export const MainPage = () => {
  useGate(ResizeGate);

  return (
    <>
      <div className="main-page">
        <Header />
        <main>
          <h1>Добро пожаловать в академию!</h1>
          <Profile />
          <div className="main-page__comment-list">
            <CommentList />
          </div>
          <Notification />
        </main>
        <Footer />
      </div>
      <AddComment />
    </>
  );
};
