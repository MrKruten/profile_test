import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

export const resize = createEvent<void>();

export const $isResize = createStore(document.body.offsetWidth > 768);

const resizeFx = createEffect(() => {
  window.addEventListener("resize", () => resize());
  return window.removeEventListener("resize", () => resize());
});

sample({
  clock: resize,
  fn: () => document.body.offsetWidth > 768,
  target: $isResize,
});

export const ResizeGate = createGate();

sample({
  clock: ResizeGate.open,
  target: resizeFx,
});
