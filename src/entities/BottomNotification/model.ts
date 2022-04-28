import { createEvent, createStore, restore, sample } from "effector";

const $isShowBottomNotification = createStore(false);

const showBottomNotification = createEvent<boolean>();

sample({
  clock: showBottomNotification,
  target: $isShowBottomNotification,
});

const setBottomNotification = createEvent<string>();

const $bottomNotification = restore(setBottomNotification, "");

export const BottomNotificationModel = {
  $isShowBottomNotification,
  showBottomNotification,
  setBottomNotification,
  $bottomNotification,
};
