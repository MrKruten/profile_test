import { createEffect, createEvent, createStore, sample } from "effector";

import { API } from "shared/api";
import {
  $lastAddedComment,
  addCommentCaptchaError,
  addCommentFx,
  resetLastAddedComment,
  Types,
} from "shared/lib";
import { NotificationModel } from "entities/Notification";
import { errorAuth } from "shared/lib/errorAuth";

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

export const getCaptchaFx = createEffect(async () => await API.getCaptcha());

sample({
  clock: getCaptcha,
  target: getCaptchaFx,
});

sample({
  clock: getCaptchaFx.doneData,
  target: $captcha,
});

export const resetIsErrorCaptcha = createEvent();

export const $isErrorCaptcha = createStore(false).reset(resetIsErrorCaptcha);

sample({
  clock: addCommentCaptchaError,
  fn: (_) => true,
  target: $isErrorCaptcha,
});

export const updateUploadPhoto = createEvent<string>();

export const resetUploadPhoto = createEvent();

export const $uploadPhotoComment = createStore("None")
  .on(updateUploadPhoto, (_, newImg) => newImg)
  .reset(resetUploadPhoto);

export const uploadPhotoComment = createEvent<FormData>();

export const uploadPhotoCommentFx = createEffect<
  Types.IUploadImage,
  any,
  Error
>(async ({ authorImage, id }) => await API.updatePhotoComment(id, authorImage));

sample({
  clock: $lastAddedComment,
  source: uploadPhotoComment,
  filter: (_, clock) => clock.id !== "-1",
  fn: (source, clock) => ({ authorImage: source, id: clock.id! }),
  target: uploadPhotoCommentFx,
});

sample({
  clock: [uploadPhotoCommentFx.doneData, uploadPhotoCommentFx.failData],
  target: resetLastAddedComment,
});

sample({
  clock: uploadPhotoCommentFx.doneData,
  fn: () => false,
  target: showAddComment,
});

sample({
  clock: [uploadPhotoCommentFx.doneData, addCommentFx.doneData],
  fn: () => true,
  target: NotificationModel.successNotification,
});

sample({
  clock: [uploadPhotoCommentFx.failData, addCommentFx.failData],
  fn: () => false,
  target: NotificationModel.successNotification,
});

sample({
  clock: addCommentFx.failData,
  fn: () => ({
    textError: "Не удеалось добавить отзыв",
    textSuccess: "Спасибо за отзыв о нашей компании :)",
    titleSuccess: "Успешно!",
  }),
  target: NotificationModel.setNotification,
});

sample({
  clock: addCommentFx.doneData,
  source: $uploadPhotoComment,
  filter: (source, _) => source === "None",
  fn: () => false,
  target: showAddComment,
});

sample({
  clock: addCommentFx.doneData,
  source: $uploadPhotoComment,
  filter: (source, _) => source === "None",
  fn: () => true,
  target: NotificationModel.showNotification,
});

sample({
  clock: uploadPhotoCommentFx.doneData,
  fn: () => true,
  target: NotificationModel.showNotification,
});

sample({
  clock: uploadPhotoCommentFx.failData,
  filter: (clock) => clock.message === "Unauthorized",
  target: errorAuth,
});
