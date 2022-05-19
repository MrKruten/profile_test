import React from "react";

import { Types } from "shared/constants";
import { Student } from "entities/Student";

import "./style.scss";

interface IITems {
  currentItems: Array<Types.IProfile> | null;
}

export const Items: React.FC<IITems> = ({ currentItems }) => {
  if (!currentItems) {
    return null;
  }
  return (
    <ul className="students__list">
      {currentItems.map((student, id) => (
        <li key={`${student.firstName}-${student.lastName}-${id + 1}`}>
          <Student
            academyStatus={student.academyStatus}
            firstName={student.firstName}
            lastName={student.lastName}
            profileImage={student.profileImage}
            smallAboutMe={student.smallAboutMe}
            birthDate=""
            gender="male"
            cityOfResidence=""
            favoriteFood={null}
            hasPet={false}
            petType={null}
            petName={null}
            aboutMe=""
          />
        </li>
      ))}
    </ul>
  );
};
