import { createEvent, createStore, sample } from "effector";

export const $isShowAddComment = createStore(false);

export const showAddComment = createEvent<boolean>();

sample({
  clock: showAddComment,
  target: $isShowAddComment,
});
