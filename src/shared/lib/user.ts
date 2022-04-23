import { createEvent, createStore } from "effector";

import data from "shared/lib/data.json";
import { IUser } from "shared/lib/types";

export const editUser = createEvent<IUser>();

export const $user = createStore<IUser>(data.user).on(
  editUser,
  (_, next) => next
);
