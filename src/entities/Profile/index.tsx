import React from "react";

import "./style.scss";
import { Avatar } from "shared/ui";
import data from "shared/lib/data.json";
import male from "shared/images/Male.svg";
import female from "shared/images/Female.svg";
import food from "shared/images/Dog_food.svg";

export const Profile = () => {
  return (
    <div className="profile">
      <Avatar avatar={data.user.avatar} />
      <div className="profile__description">
        <div className="profile__description__name-date">
          <h3>{data.user.name}</h3>
          <span className="profile__description__name-date date">
            {data.user.description.date_of_birth}
          </span>
        </div>
        <div className="profile__description__info">
          <span className="profile__description__info__item">
            <b>Город:&nbsp;</b>
            {data.user.description.city}
          </span>
          <span className="profile__description__info__item">
            <b>Пол:&nbsp;</b>
            {data.user.description.sex === "Male" ? (
              <span>
                мужчина&nbsp;
                <img src={male} alt="Мужчина" />
              </span>
            ) : (
              <span className="profile__description__info__item">
                женщина&nbsp;
                <img src={female} alt="Женщина" />
              </span>
            )}
          </span>
          <span className="profile__description__info__item">
            <b>Возраст:&nbsp;</b>
            {data.user.description.age}
          </span>
        </div>
        <div className="profile__description__text">
          <p>
            <b>О себе:&nbsp;</b>
            {data.user.description.text}
          </p>
          <p>
            <i>BTW:&nbsp;</i>
            {data.user.description.btw}
          </p>
        </div>
        <div className="profile__description__pet">
          <img src={food} alt="Питомец" />
          <b>Домашнее животное:&nbsp;</b>
          {data.user.description.pet ? "есть" : "нет"}
        </div>
      </div>
    </div>
  );
};
