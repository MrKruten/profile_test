import { createEffect, createEvent, sample } from "effector";

import { API } from "shared/api";
import { errorAuth } from "shared/lib/errorAuth";
import { CommentsModel } from "entities/Comment";
import { Types } from "shared/constants";

interface IUpdateStatusComment {
  id: string;
  status: Types.TStatus;
}

export const updateStatusComment = createEvent<IUpdateStatusComment>();

export const updateStatusCommentFx = createEffect<
  IUpdateStatusComment,
  any,
  Error
>(async ({ id, status }) => await API.updateStatusComment(id, status));

sample({
  clock: updateStatusComment,
  target: updateStatusCommentFx,
});

sample({
  clock: updateStatusCommentFx.doneData,
  target: CommentsModel.getComments,
});

sample({
  clock: updateStatusCommentFx.failData,
  filter: (clock) => clock.message === "Unauthorized",
  target: errorAuth,
});
