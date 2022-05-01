import { createEffect, createEvent, createStore, sample } from "effector";

import { API } from "shared/api";
import {
  $lastAddedComment,
  addCommentCaptchaError,
  addCommentFx,
  resetLastAddedComment,
  Types,
} from "shared/lib";
import { IUploadImage } from "shared/lib/types";
import { NotificationModel } from "entities/Notification";

export const $isShowAddComment = createStore(false);

export const showAddComment = createEvent<boolean>();

sample({
  clock: showAddComment,
  target: $isShowAddComment,
});

export const getCaptcha = createEvent();

export const $captcha = createStore<Types.ICaptcha>({
  base64Image: "",
  key: "",
});

const getCaptchaFx = createEffect(async () => await API.getCaptcha());

sample({
  clock: getCaptcha,
  target: getCaptchaFx,
});

sample({
  clock: getCaptchaFx.doneData,
  target: $captcha,
});

export const $isErrorCaptcha = createStore(false);

export const setNoErrorCaptcha = createEvent();

sample({
  clock: addCommentCaptchaError,
  fn: (_) => true,
  target: $isErrorCaptcha,
});

sample({
  clock: setNoErrorCaptcha,
  fn: (_) => false,
  target: $isErrorCaptcha,
});

export const updateUploadPhoto = createEvent<string>();

export const resetUploadPhoto = createEvent();

export const $uploadPhoto = createStore("None")
  .on(updateUploadPhoto, (_, newImg) => newImg)
  .reset(resetUploadPhoto);

export const uploadPhoto = createEvent<FormData>();

export const uploadPhotoFx = createEffect<Types.IUploadImage, any, Error>(
  async ({ authorImage, id }) => await API.updatePhotoComment(id, authorImage)
);

sample({
  clock: $lastAddedComment,
  source: uploadPhoto,
  filter: (_, clock) => clock.id !== "-1",
  fn: (source, clock) => ({ authorImage: source, id: clock.id! }),
  target: uploadPhotoFx,
});

sample({
  clock: uploadPhotoFx.doneData,
  target: resetLastAddedComment,
});

sample({
  clock: uploadPhotoFx.doneData,
  fn: () => false,
  target: showAddComment,
});

sample({
  clock: uploadPhotoFx.doneData,
  fn: () => true,
  target: NotificationModel.successNotification,
});

sample({
  clock: uploadPhotoFx.failData,
  fn: () => false,
  target: NotificationModel.successNotification,
});

sample({
  clock: addCommentFx.doneData,
  source: $uploadPhoto,
  filter: (source, _) => source === "None",
  fn: () => false,
  target: showAddComment,
});

sample({
  clock: showAddComment,
  fn: () => true,
  target: NotificationModel.showNotification,
});
