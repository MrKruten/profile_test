import { createEffect, createEvent, createStore, sample } from "effector";

import { Types } from "shared/constants";
import { API } from "shared/api";

const updatePhotoUser = createEvent<FormData>();

const $user = createStore<Types.IProfile>({
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

const getUser = createEvent();

const getUserFx = createEffect(async () => {
  return await API.getProfile();
});

sample({
  clock: getUser,
  target: getUserFx,
});

sample({
  clock: getUserFx.doneData,
  target: $user,
});

export const UserModel = {
  getProfileFx: getUserFx,
  getUser,
  $user,
  updatePhotoUser,
};
