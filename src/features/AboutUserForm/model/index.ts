import { createEffect, createEvent, sample } from "effector";

import { API } from "shared/api";
import { NotificationModel } from "entities/Notification";
import { errorAuth } from "shared/lib/errorAuth";
import { UserModel } from "entities/Profile";
import { Types } from "shared/constants";

export const uploadPhotoProfile = createEvent<FormData>();

const uploadPhotoProfileFx = createEffect<FormData, any, Error>(
  async (profileImage) => await API.updatePhotoProfile(profileImage)
);

sample({
  clock: uploadPhotoProfile,
  target: uploadPhotoProfileFx,
});

sample({
  clock: uploadPhotoProfileFx.doneData,
  target: UserModel.getUser,
});

sample({
  clock: uploadPhotoProfileFx.doneData,
  fn: (_) => true,
  target: [
    NotificationModel.successNotification,
    NotificationModel.showNotification,
  ],
});

sample({
  clock: uploadPhotoProfileFx.failData,
  filter: (clock) => clock.message === "Unauthorized",
  target: errorAuth,
});

export const updateProfile = createEvent<Types.IUpdateProfile>();

const updateProfileFx = createEffect<Types.IUpdateProfile, any, Error>(
  async (updateInfo) => await API.updateProfile(updateInfo)
);

sample({
  clock: updateProfile,
  target: updateProfileFx,
});

sample({
  clock: updateProfileFx.doneData,
  fn: (_) => true,
  target: [
    NotificationModel.successNotification,
    NotificationModel.showNotification,
  ],
});

sample({
  clock: updateProfileFx.doneData,
  target: UserModel.getUser,
});

sample({
  clock: updateProfileFx.failData,
  filter: (clock) => clock.message === "Unauthorized",
  target: errorAuth,
});

sample({
  clock: updateProfileFx.failData,
  filter: (clock) => clock.message !== "Unauthorized",
  fn: (_) => false,
  target: NotificationModel.successNotification,
});

sample({
  clock: updateProfileFx.failData,
  filter: (clock) => clock.message !== "Unauthorized",
  fn: (_) => true,
  target: NotificationModel.showNotification,
});
