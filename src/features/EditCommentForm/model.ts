import { createEffect, createEvent, createStore, sample } from "effector";

import { API } from "shared/api";
import { getComments } from "shared/lib";
import { NotificationModel } from "entities/Notification";
import { errorAuth } from "shared/lib/errorAuth";

interface IUpdateTextComment {
  id: string;
  text: string;
}

export const $isShowEditComment = createStore(false);

export const showEditComment = createEvent<boolean>();

sample({
  clock: showEditComment,
  target: $isShowEditComment,
});

export const updateTextComment = createEvent<IUpdateTextComment>();

export const updateTextCommentFx = createEffect<IUpdateTextComment, any, Error>(
  async ({ id, text }) => await API.updateTextComment(id, text)
);

sample({
  clock: updateTextComment,
  target: updateTextCommentFx,
});

sample({
  clock: updateTextCommentFx.doneData,
  target: getComments,
});

sample({
  clock: updateTextCommentFx.failData,
  filter: (clock) => clock.message === "Unauthorized",
  target: errorAuth,
});

sample({
  clock: updateTextCommentFx.failData,
  fn: (_) => false,
  target: NotificationModel.successNotification,
});

sample({
  clock: updateTextCommentFx.doneData,
  fn: (_) => true,
  target: NotificationModel.successNotification,
});

sample({
  clock: [updateTextCommentFx.doneData, updateTextCommentFx.failData],
  fn: (_) => true,
  target: NotificationModel.showNotification,
});

sample({
  clock: [updateTextCommentFx.doneData, updateTextCommentFx.failData],
  fn: (_) => false,
  target: showEditComment,
});
