import { createEffect, createEvent, createStore, sample } from "effector";

import { IAddReview, IReview } from "shared/lib/types";
// eslint-disable-next-line import/no-cycle
import { API } from "shared/api";
import { errorAuth } from "shared/lib/errorAuth";

export const addComment = createEvent<IAddReview>();

export const addCommentFx = createEffect<IAddReview, IReview, Error>(
  async (comment: IAddReview) => await API.createComment(comment)
);

sample({
  clock: addComment,
  target: addCommentFx,
});

export const getCommentsFx = createEffect(async () => await API.getComments());

export const getComments = createEvent();

sample({
  clock: getComments,
  target: getCommentsFx,
});

export const $comments = createStore<Array<IReview>>([]);

sample({
  clock: getCommentsFx.doneData,
  target: $comments,
});

sample({
  clock: addCommentFx.doneData,
  target: getComments,
});

export const resetLastAddedComment = createEvent();

export const $lastAddedComment = createStore<IReview>({
  authorImage: "",
  authorName: "",
  createdAt: "",
  deletedAt: "",
  id: "-1",
  status: "onCheck",
  text: "",
  title: "",
  updatedAt: "",
  version: 0,
}).reset(resetLastAddedComment);

sample({
  clock: addCommentFx.doneData,
  target: $lastAddedComment,
});

export const addCommentCaptchaError = createEvent();

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

export const updateComment = createEvent<IReview>();

sample({
  clock: updateComment,
  source: $comments,
  fn: (source, clock) => {
    const id = source.findIndex((comment) => comment.id === clock.id);
    if (id === -1) return source;
    source[id] = clock;
    return source;
  },
  target: $comments,
});

export const $editComment = createStore<IReview>({
  status: "onCheck",
  authorName: "",
  id: "-1",
  text: "",
  authorImage: "",
  createdAt: "",
});

export const setEditComment = createEvent<IReview>();

sample({
  clock: setEditComment,
  target: $editComment,
});

export const $publishedComments = $comments.map((comments) =>
  comments.filter((comment) => comment.status === "onCheck")
);
