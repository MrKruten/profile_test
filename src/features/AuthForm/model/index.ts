import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";

import { CommentsModel } from "entities/Comment";
import { UserModel } from "entities/Profile";
import { API } from "shared/api";
import { BottomNotificationModel } from "entities/BottomNotification";
import { errorAuth, errorAuthFx } from "shared/lib/errorAuth";
import { Types } from "shared/constants";

const submitAuthForm = createEvent<Types.IAuthorization>();

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

const $accessToken = restore(authFx.doneData, "");

const checkAccessTokenFx = createEffect(() =>
  localStorage.getItem("accessToken") !== null
    ? localStorage.getItem("accessToken")!
    : ""
);

const checkAccessToken = createEvent();
sample({
  clock: checkAccessToken,
  target: checkAccessTokenFx,
});

const $isAuth = createStore<boolean>(false);

sample({
  clock: checkAccessTokenFx.doneData,
  target: $accessToken,
});

sample({
  clock: $accessToken,
  fn: (clock) => !!clock,
  target: $isAuth,
});

sample({
  clock: $isAuth,
  filter: (clock) => clock,
  fn: () => false,
  target: BottomNotificationModel.showBottomNotification,
});

sample({
  clock: authFx.failData,
  fn: (clock) => !!clock.message,
  target: BottomNotificationModel.showBottomNotification,
});

sample({
  clock: errorAuthFx.doneData,
  fn: (_) => "",
  target: $accessToken,
});

sample({
  clock: errorAuthFx.doneData,
  fn: (_) => false,
  target: $isAuth,
});

sample({
  clock: [
    UserModel.getProfileFx.failData,
    CommentsModel.getCommentsFx.failData,
  ],
  target: errorAuth,
});

export const AuthModel = {
  $isAuth,
  checkAccessToken,
  $accessToken,
  submitAuthForm,
};
