import { createEffect, createEvent, createStore, sample } from "effector";

import { IProfile } from "shared/lib/types";

// eslint-disable-next-line import/no-cycle
import { API } from "../api/requests";

import { errorAuth } from "./errorAuth";

export const editUser = createEvent<IProfile>();

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
}).on(editUser, (_, next) => next);

export const getUser = createEvent();

export const userFx = createEffect(async () => {
  return await API.getProfile();
});

sample({
  clock: getUser,
  target: userFx,
});

sample({
  clock: userFx.doneData,
  target: $user,
});

sample({
  clock: userFx.failData,
  target: errorAuth,
});
