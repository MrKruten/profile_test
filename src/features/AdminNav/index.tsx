import React from "react";

import { RouterLink } from "shared/ui";
import { SCREENS } from "shared/lib";
import { ReactComponent as Users } from "shared/images/Users.svg";
import { ReactComponent as Comment } from "shared/images/Chat.svg";
import { ReactComponent as About } from "shared/images/Paper.svg";

import "./style.scss";

export const AdminNav = () => {
  return (
    <div className="admin-nav">
      <RouterLink
        toRoute={SCREENS.STUDENTS}
        text="Участники"
        icon={<Users />}
      />
      <RouterLink toRoute={SCREENS.COMMENTS} text="Отзывы" icon={<Comment />} />
      <RouterLink toRoute={SCREENS.ABOUT} text="Обо мне" icon={<About />} />
    </div>
  );
};
