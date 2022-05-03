import React from "react";
import { useStore } from "effector-react";

import { Avatar } from "shared/ui";
import male from "shared/images/Male.svg";
import female from "shared/images/Female.svg";
import food from "shared/images/Dog_Food.svg";
import { $user, Helpers, userFx } from "shared/lib";
import "./style.scss";
import { Loader } from "shared/ui/Loader";

export const Profile: React.FC = () => {
  const user = useStore($user);
  const isLoading = useStore(userFx.pending);

  if (isLoading) {
    return (
      <div className="profile">
        <Loader />
      </div>
    );
  }

  return (
    <div className="profile">
      <Avatar avatar={user.profileImage ? user.profileImage! : "None"} />
      <div className="profile__description">
        <div className="profile__description__name-date">
          <h3>{`${user.firstName} ${user.lastName}`}</h3>
          <span className="profile__description__name-date date">
            {Helpers.dateToString(new Date(user.birthDate))}
          </span>
        </div>
        <div className="profile__description__info">
          <span className="profile__description__info__item">
            <b>Город:&nbsp;</b>
            {user.cityOfResidence}
          </span>
          <span className="profile__description__info__item">
            <b>Пол:&nbsp;</b>
            {user.gender === "male" ? (
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
            {Helpers.calculateAge(user.birthDate)}
          </span>
        </div>
        <div className="profile__description__text">
          <p>
            <b>О себе:&nbsp;</b>
            {user.aboutMe}
          </p>
        </div>
        <div className="profile__description__pet">
          <img src={food} alt="Питомец" />
          <b>Домашнее животное:&nbsp;</b>
          {user.hasPet ? "есть" : "нет"}
        </div>
      </div>
    </div>
  );
};
