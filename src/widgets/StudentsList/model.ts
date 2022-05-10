import { createEffect, createEvent, createStore, sample } from "effector";

import { Types } from "shared/lib";
import { API } from "shared/api";
import { errorAuth } from "shared/lib/errorAuth";

export const getStudents = createEvent();

export const getStudentsFx = createEffect(async () => await API.getStudents());

sample({
  clock: getStudents,
  target: getStudentsFx,
});

export const $students = createStore<Array<Types.IProfile>>([]);

sample({
  clock: getStudentsFx.doneData,
  target: $students,
});

sample({
  clock: getStudentsFx.failData,
  filter: (clock) => clock.message === "Unauthorized",
  target: errorAuth,
});
