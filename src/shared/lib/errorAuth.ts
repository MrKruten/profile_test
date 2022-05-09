import { createEffect, createEvent, sample } from "effector";

export const errorAuth = createEvent();

export const errorAuthFx = createEffect(() => {
  localStorage.clear();
});

sample({
  clock: errorAuth,
  target: errorAuthFx,
});
