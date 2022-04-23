import { createEvent, createStore, sample } from "effector";

import data from "shared/lib/data.json";
import { IComment } from "shared/lib/types";

export const addComment = createEvent<IComment>();

export const $comments = createStore<Array<IComment>>(data.comments).on(
  addComment,
  (prev, array) => [...prev, array]
);

export const updateComment = createEvent<IComment>();

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

export const $editComment = createStore<IComment>({
  status: "",
  name: "",
  id: -1,
  text: "",
  avatar: "",
  date: "",
});

export const setEditComment = createEvent<IComment>();

sample({
  clock: setEditComment,
  target: $editComment,
});

export const $publishedComments = $comments.map((comments) => comments.filter(comment => comment.status === "published"));