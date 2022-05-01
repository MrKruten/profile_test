import { createEffect, createEvent, sample } from "effector";

export const errorAuth = createEvent();

const errorAuthFx = createEffect(() => {
  localStorage.clear();
});

sample({
  clock: errorAuth,
  target: errorAuthFx,
});

export const errorAuthDone = createEvent();

sample({
  clock: errorAuthFx,
  target: errorAuthDone,
});
