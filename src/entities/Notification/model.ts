import { createEvent, createStore, sample } from "effector";

export const $isShowNotification = createStore(false);

export const showNotification = createEvent<boolean>();

sample({
  clock: showNotification,
  target: $isShowNotification,
});

export const $isSuccessNotification = createStore(true);

export const successNotification = createEvent<boolean>();

sample({
  clock: successNotification,
  target: $isSuccessNotification,
});
