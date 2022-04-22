import React from "react";
import { useStore } from "effector-react";

import { Avatar } from "shared/ui";
import male from "shared/images/Male.svg";
import female from "shared/images/Female.svg";
import food from "shared/images/Dog_food.svg";
import { $user } from "shared/lib";
import "./style.scss";

export const Profile: React.FC = () => {
  const user = useStore($user);

  return (
    <div className="profile">
      <Avatar avatar={user.avatar} />
      <div className="profile__description">
        <div className="profile__description__name-date">
          <h3>{`${user.firstName} ${user.secondName}`}</h3>
          <span className="profile__description__name-date date">
            {user.description.dateBirth}
          </span>
        </div>
        <div className="profile__description__info">
          <span className="profile__description__info__item">
            <b>Город:&nbsp;</b>
            {user.description.city}
          </span>
          <span className="profile__description__info__item">
            <b>Пол:&nbsp;</b>
            {user.description.sex === "Male" ? (
              <span>
                мужчина&nbsp;
                <img src={male} alt="Мужчина" />
              </span>
            ) : (
              <span>
                женщина&nbsp;
                <img src={female} alt="Женщина" />
              </span>
            )}
          </span>
          <span className="profile__description__info__item">
            <b>Возраст:&nbsp;</b>
            {user.description.age}
          </span>
        </div>
        <div className="profile__description__text">
          <p>
            <b>О себе:&nbsp;</b>
            {user.description.text}
          </p>
        </div>
        <div className="profile__description__pet">
          <img src={food} alt="Питомец" />
          <b>Домашнее животное:&nbsp;</b>
          {user.description.pet ? "есть" : "нет"}
        </div>
      </div>
    </div>
  );
};
