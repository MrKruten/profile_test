import { BottomNotificationModel } from "entities/BottomNotification";
import { NotificationModel } from "entities/Notification";

export const resetNotifications = () => {
  BottomNotificationModel.showBottomNotification(false);
  NotificationModel.showNotification(false);
};
