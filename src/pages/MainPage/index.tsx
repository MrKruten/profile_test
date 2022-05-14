import React, { useEffect } from "react";
import { useGate } from "effector-react";

import { Profile, UserModel } from "entities/Profile";
import { CommentsList, AddComment } from "widgets";
import { ResizeGate } from "shared/lib";
import { CommentsModel } from "entities/Comment";
import { Footer } from "shared/ui";
import { HeaderMain } from "widgets/headers";
import { NotificationModel } from "entities/Notification";

import "./style.scss";

const MainPage = () => {
  useGate(ResizeGate);

  useEffect(() => {
    NotificationModel.setNotification({
      textError: "Не получилось отправить отзыв. Попробуйте еще раз!",
      textSuccess: "Спасибо за отзыв о нашей компании :)",
      titleSuccess: "Успешно!",
    });
    UserModel.getUser();
    CommentsModel.getComments();
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
