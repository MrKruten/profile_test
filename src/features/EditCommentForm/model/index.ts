import { createEffect, createEvent, createStore, sample } from "effector";

import { API } from "shared/api";
import { CommentsModel } from "entities/Comment";
import { NotificationModel } from "entities/Notification";
import { errorAuth } from "shared/lib/errorAuth";

interface IUpdateTextComment {
  id: string;
  text: string;
}

const $isShowEditComment = createStore(false);

const showEditComment = createEvent<boolean>();

sample({
  clock: showEditComment,
  target: $isShowEditComment,
});

const updateTextComment = createEvent<IUpdateTextComment>();

const updateTextCommentFx = createEffect<IUpdateTextComment, any, Error>(
  async ({ id, text }) => await API.updateTextComment(id, text)
);

sample({
  clock: updateTextComment,
  target: updateTextCommentFx,
});

sample({
  clock: updateTextCommentFx.doneData,
  target: CommentsModel.getComments,
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

export const EditCommentModel = {
  updateTextCommentFx,
  updateTextComment,
  showEditComment,
  $isShowEditComment,
};
