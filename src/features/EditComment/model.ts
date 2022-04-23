import { createEvent, createStore, sample } from "effector";

export const $isShowEditComment = createStore(false);

export const showEditComment = createEvent<boolean>();

sample({
  clock: showEditComment,
  target: $isShowEditComment,
});
