import { createEffect, createEvent, createStore, sample } from "effector";

import { Types } from "shared/constants";
import { API } from "shared/api";
import { errorAuth } from "shared/lib/errorAuth";

const addComment = createEvent<Types.IAddReview>();

const addCommentFx = createEffect<Types.IAddReview, Types.IReview, Error>(
  async (comment: Types.IAddReview) => await API.createComment(comment)
);

sample({
  clock: addComment,
  target: addCommentFx,
});

const getCommentsFx = createEffect(async () => await API.getComments());

const getComments = createEvent();

sample({
  clock: getComments,
  target: getCommentsFx,
});

const $comments = createStore<Array<Types.IReview>>([]);

sample({
  clock: getCommentsFx.doneData,
  target: $comments,
});

sample({
  clock: addCommentFx.doneData,
  target: getComments,
});

const resetLastAddedComment = createEvent();

const $lastAddedCommentID = createStore<string>("-1").reset(
  resetLastAddedComment
);

sample({
  clock: addCommentFx.doneData,
  fn: (review): string => review.id!,
  target: $lastAddedCommentID,
});

const addCommentCaptchaError = createEvent();

sample({
  clock: addCommentFx.failData,
  filter: (clock) => clock.message.indexOf("invalid captcha") !== -1,
  target: addCommentCaptchaError,
});

sample({
  clock: addCommentFx.failData,
  filter: (clock) => clock.message === "Unauthorized",
  target: errorAuth,
});

const $editComment = createStore<Types.IReview>({
  status: "onCheck",
  authorName: "",
  id: "-1",
  text: "",
  authorImage: "",
  createdAt: "",
});

const setEditComment = createEvent<Types.IReview>();

sample({
  clock: setEditComment,
  target: $editComment,
});

export const CommentsModel = {
  setEditComment,
  $editComment,
  addCommentCaptchaError,
  $lastAddedCommentID,
  resetLastAddedComment,
  $comments,
  getComments,
  getCommentsFx,
  addCommentFx,
  addComment,
};
