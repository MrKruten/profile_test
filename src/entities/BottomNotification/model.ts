import { createEvent, createStore, sample } from "effector";

export const $isShowBottomNotification = createStore(false);

export const showBottomNotification = createEvent<boolean>();

sample({
  clock: showBottomNotification,
  target: $isShowBottomNotification,
});
