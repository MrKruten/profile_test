import { createEvent, createStore, sample } from "effector";

import { $comments, Helpers, Types, updateComment } from "shared/lib";

export const filterComments = createEvent<string>();

export const $sortedComments = createStore<Types.IComment[]>([]).on(
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
  clock: updateComment,
  fn: (clock) => clock.status as string,
  target: filterComments,
});