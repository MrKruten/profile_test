import { createEvent, createStore } from "effector";

import data from "shared/lib/data.json";
import { IComment } from "shared/lib/types";

export const addComment = createEvent<IComment>();

export const $comments = createStore<Array<IComment>>(data.comments).on(
  addComment,
  (prev, array) => [...prev, array]
);
