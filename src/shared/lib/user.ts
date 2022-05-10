import { createEffect, createEvent, createStore, sample } from "effector";

import { IProfile } from "shared/lib/types";
// eslint-disable-next-line import/no-cycle
import { API } from "shared/api";

export const updatePhotoUser = createEvent<FormData>();

export const $user = createStore<IProfile>({
  aboutMe: "",
  academyStatus: "studies",
  birthDate: "",
  cityOfResidence: "",
  favoriteFood: "undefined",
  firstName: "",
  gender: "male",
  hasPet: false,
  lastName: "",
  petName: "undefined",
  petType: "undefined",
  profileImage: "",
  smallAboutMe: "undefined",
});

export const getUser = createEvent();

export const getProfileFx = createEffect(async () => {
  return await API.getProfile();
});

sample({
  clock: getUser,
  target: getProfileFx,
});

sample({
  clock: getProfileFx.doneData,
  target: $user,
});
