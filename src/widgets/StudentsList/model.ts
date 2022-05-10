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

export const $sortedStudents = createStore<Array<Types.IProfile>>([]);

sample({
  clock: $students,
  target: $sortedStudents,
});

export const filterStudents = createEvent<string>();

// Какие ещё академ статусы есть???
sample({
  clock: filterStudents,
  source: $students,
  fn: (source, clock) => {
    if (clock === "all") {
      return source;
    }
    return source.filter((student) => student.academyStatus === clock);
  },
  target: $sortedStudents,
});
