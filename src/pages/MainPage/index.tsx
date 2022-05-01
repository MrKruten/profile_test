import React, { useEffect } from "react";
import { useGate } from "effector-react";
import "./style.scss";

import { Profile } from "entities/Profile";
import { CommentsList, AddComment } from "widgets";
import { getComments, getUser, ResizeGate } from "shared/lib";
import { Footer } from "shared/ui";
import { HeaderMain } from "widgets/headers";
import { NotificationModel } from "entities/Notification";

const MainPage = () => {
  useGate(ResizeGate);

  useEffect(() => {
    NotificationModel.setNotification({
      textError: "Не получилось отправить отзыв. Попробуйте еще раз!",
      textSuccess: "Спасибо за отзыв о нашей компании :)",
      titleSuccess: "Успешно!",
    });
    getUser();
    getComments();
  }, []);

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
        </main>
        <Footer />
      </div>
      <AddComment />
    </>
  );
};

export default MainPage;
