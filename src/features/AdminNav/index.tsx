import React from "react";

import { BottomNotificationModel } from "entities/BottomNotification";
import { NotificationModel } from "entities/Notification";
import { RouterLink } from "shared/ui";
import { SCREENS } from "shared/constants";
import { ReactComponent as Users } from "shared/images/Users.svg";
import { ReactComponent as Comment } from "shared/images/Chat.svg";
import { ReactComponent as About } from "shared/images/Paper.svg";

import "./style.scss";

const resetNotifications = () => {
  BottomNotificationModel.showBottomNotification(false);
  NotificationModel.showNotification(false);
};

export const AdminNav = () => {
  return (
    <div className="admin-nav">
      <button onClick={resetNotifications}>
        <RouterLink
          toRoute={SCREENS.STUDENTS}
          text="Участники"
          icon={<Users />}
        />
      </button>
      <button onClick={resetNotifications}>
        <RouterLink
          toRoute={SCREENS.COMMENTS}
          text="Отзывы"
          icon={<Comment />}
        />
      </button>
      <button onClick={resetNotifications}>
        <RouterLink toRoute={SCREENS.ABOUT} text="Обо мне" icon={<About />} />
      </button>
    </div>
  );
};
