import { createEffect, createEvent, createStore, sample } from "effector";

import { API } from "shared/api";
import { CommentsModel } from "entities/Comment";
import { NotificationModel } from "entities/Notification";
import { errorAuth } from "shared/lib/errorAuth";
import { Types } from "shared/constants";

const $isShowAddComment = createStore(false);

const showAddComment = createEvent<boolean>();

sample({
  clock: showAddComment,
  target: $isShowAddComment,
});

const getCaptcha = createEvent();

const $captcha = createStore<Types.ICaptcha>({
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

const resetIsErrorCaptcha = createEvent();

const $isErrorCaptcha = createStore(false).reset(resetIsErrorCaptcha);

sample({
  clock: CommentsModel.addCommentCaptchaError,
  fn: (_) => true,
  target: $isErrorCaptcha,
});

const updateUploadPhoto = createEvent<string>();

const resetUploadPhoto = createEvent();

const $uploadPhotoComment = createStore("None")
  .on(updateUploadPhoto, (_, newImg) => newImg)
  .reset(resetUploadPhoto);

const uploadPhotoComment = createEvent<FormData>();

const $uploadPhotoCommentData = createStore<FormData | null>(null);

sample({
  clock: uploadPhotoComment,
  target: $uploadPhotoCommentData,
});

const uploadPhotoCommentFx = createEffect<Types.IUploadImage, any, Error>(
  async ({ authorImage, id }) => {
    await API.updatePhotoComment(id, authorImage);
  }
);

sample({
  clock: CommentsModel.$lastAddedCommentID,
  source: $uploadPhotoCommentData,
  filter: (_, clock) => clock !== "-1",
  fn: (source, clock) => {
    return { authorImage: source!, id: clock };
  },
  target: uploadPhotoCommentFx,
});

sample({
  clock: [
    uploadPhotoCommentFx.doneData,
    uploadPhotoCommentFx.failData,
    showAddComment,
  ],
  target: CommentsModel.resetLastAddedComment,
});

sample({
  clock: uploadPhotoCommentFx.doneData,
  fn: () => false,
  target: showAddComment,
});

sample({
  clock: [uploadPhotoCommentFx.doneData, CommentsModel.addCommentFx.doneData],
  fn: () => true,
  target: NotificationModel.successNotification,
});

sample({
  clock: [uploadPhotoCommentFx.failData, CommentsModel.addCommentFx.failData],
  fn: () => false,
  target: NotificationModel.successNotification,
});

sample({
  clock: CommentsModel.addCommentFx.failData,
  fn: () => ({
    textError: "Не удеалось добавить отзыв",
    textSuccess: "Спасибо за отзыв о нашей компании :)",
    titleSuccess: "Успешно!",
  }),
  target: NotificationModel.setNotification,
});

sample({
  clock: CommentsModel.addCommentFx.doneData,
  source: $uploadPhotoComment,
  filter: (source, _) => source === "None",
  fn: () => false,
  target: showAddComment,
});

sample({
  clock: CommentsModel.addCommentFx.doneData,
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

export const AddCommentModel = {
  uploadPhotoCommentFx,
  uploadPhotoComment,
  $uploadPhotoComment,
  resetUploadPhoto,
  $isErrorCaptcha,
  resetIsErrorCaptcha,
  getCaptchaFx,
  updateUploadPhoto,
  $captcha,
  getCaptcha,
  showAddComment,
  $isShowAddComment,
};
