import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

import { Types } from "shared/lib";
import { API } from "shared/api";
import { BottomNotificationModel } from "entities/BottomNotification";
import { errorAuthDone } from "shared/lib/errorAuth";

export const submitAuthForm = createEvent<Types.IAuthorization>();

const authFx = createEffect<Types.IAuthorization, string, Error>(
  async (auth) => {
    const accessToken = await API.authorization(auth);
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  }
);

sample({
  clock: submitAuthForm,
  target: authFx,
});

export const $accessToken = restore(
  authFx.doneData,
  localStorage.getItem("accessToken") !== null
    ? localStorage.getItem("accessToken")!
    : ""
);

export const setIsAuth = createEvent<boolean>();
export const $isAuth = createStore(false);

sample({
  clock: setIsAuth,
  target: $isAuth,
});

sample({
  clock: $accessToken,
  fn: (clock) => !!clock,
  target: setIsAuth,
});

sample({
  clock: authFx.failData,
  fn: (clock) => !!clock.message,
  target: BottomNotificationModel.showBottomNotification,
});

sample({
  clock: errorAuthDone,
  fn: (_) => "",
  target: $accessToken,
});

sample({
  clock: errorAuthDone,
  fn: (_) => false,
  target: $isAuth,
});
