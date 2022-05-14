import { createEvent, createStore, restore, sample } from "effector";

interface INotification {
  textError: string;
  titleSuccess: string;
  textSuccess: string;
}

const $isShowNotification = createStore(false);

const showNotification = createEvent<boolean>();

sample({
  clock: showNotification,
  target: $isShowNotification,
});

const $isSuccessNotification = createStore(true);

const successNotification = createEvent<boolean>();

sample({
  clock: successNotification,
  target: $isSuccessNotification,
});

const setNotification = createEvent<INotification>();

const $notification = restore<INotification>(setNotification, {
  textError: "",
  textSuccess: "",
  titleSuccess: "",
});

export const NotificationModel = {
  $isShowNotification,
  showNotification,
  setNotification,
  $notification,
  $isSuccessNotification,
  successNotification,
};
