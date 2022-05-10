import { createEvent, createStore, sample } from "effector";

import { $comments, Helpers, Types } from "shared/lib";
import { NotificationModel } from "entities/Notification";
import { updateStatusCommentFx } from "features/ButtonsAdminComment/model";

export const filterComments = createEvent<string>();

export const $sortedComments = createStore<Types.IReview[]>([]).on(
  filterComments,
  (d) => [...d]
);

sample({
  clock: filterComments,
  source: $comments,
  fn: (source, clock) => {
    return Helpers.sortComments(clock, source);
  },
  target: $sortedComments,
});

sample({
  clock: $comments,
  source: filterComments,
  fn: (source, clock) => {
    return Helpers.sortComments(source, clock);
  },
  target: $sortedComments,
});

sample({
  clock: updateStatusCommentFx.failData,
  fn: (_) => false,
  target: NotificationModel.successNotification,
});

sample({
  clock: updateStatusCommentFx.doneData,
  fn: (_) => true,
  target: NotificationModel.successNotification,
});

sample({
  clock: [updateStatusCommentFx.doneData, updateStatusCommentFx.failData],
  fn: (_) => true,
  target: NotificationModel.showNotification,
});
