import React from "react";
import { useGate } from "effector-react";
import "./style.scss";

import { Profile } from "entities/Profile";
import { CommentsList, AddComment } from "widgets";
import { ResizeGate } from "shared/lib";
import { Notification } from "entities/Notification";
import { Footer } from "shared/ui";
import { HeaderMain } from "widgets/headers";

const MainPage = () => {
  useGate(ResizeGate);

  return (
    <>
      <div className="main-page">
        <HeaderMain />
        <main>
          <h1>Добро пожаловать в академию!</h1>
          <Profile />
          <div className="main-page__comment-list">
            <CommentsList />
          </div>
          <Notification
            textSuccess="Спасибо за отзыв о нашей компании :)"
            textError="Не получилось отправить отзыв. Попробуйте еще раз!"
            titleSuccess="Успешно!"
          />
        </main>
        <Footer />
      </div>
      <AddComment />
    </>
  );
};

export default MainPage;
