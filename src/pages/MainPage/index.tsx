import React from "react";

import "./style.scss";

import { Profile } from "entities/Profile";
import { Header, Footer, CommentList, AddComment } from "widgets";

export const MainPage = () => {
  return (
    <>
      <div className="main-page">
        <Header />
        <main>
          <h1>Добро пожаловать в академию!</h1>
          <Profile />
          <CommentList />
        </main>
        <Footer />
      </div>
      <AddComment />
    </>
  );
};
