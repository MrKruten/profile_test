import { createEvent, createStore, sample } from "effector";

import { Helpers } from "shared/lib";
import { CommentsModel } from "entities/Comment";
import { NotificationModel } from "entities/Notification";
import { updateStatusCommentFx } from "features/ButtonsAdminComment";
import { Types } from "shared/constants";

export const filterComments = createEvent<string>();

export const $sortedComments = createStore<Types.IReview[]>([]);

sample({
  clock: filterComments,
  source: CommentsModel.$comments,
  fn: (source, clock) => {
    return [...Helpers.sortComments(clock, source)];
  },
  target: $sortedComments,
});

sample({
  clock: CommentsModel.$comments,
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
