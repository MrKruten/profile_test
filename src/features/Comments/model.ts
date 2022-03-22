import { createEvent, createStore, sample } from "effector";

import data from "shared/lib/data.json";
import { IComment } from "shared/lib/types";

export const $comments = createStore<Array<IComment>>(data.comments);

export const addComment = createEvent<IComment>();

sample({
  clock: addComment,
  source: $comments,
  fn: (source, clock) => [clock, ...source],
  target: $comments,
});
