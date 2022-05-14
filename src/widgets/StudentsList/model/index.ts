import { createEffect, createEvent, createStore, sample } from "effector";

import { Types } from "shared/constants";
import { API } from "shared/api";
import { errorAuth } from "shared/lib/errorAuth";

const getStudents = createEvent();

const getStudentsFx = createEffect(async () => await API.getStudents());

sample({
  clock: getStudents,
  target: getStudentsFx,
});

const $students = createStore<Array<Types.IProfile>>([]);

sample({
  clock: getStudentsFx.doneData,
  target: $students,
});

sample({
  clock: getStudentsFx.failData,
  filter: (clock) => clock.message === "Unauthorized",
  target: errorAuth,
});

const $sortedStudents = createStore<Array<Types.IProfile>>([]);

sample({
  clock: $students,
  target: $sortedStudents,
});

const filterStudents = createEvent<string>();

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

export const StudentsModel = {
  filterStudents,
  $sortedStudents,
  $students,
  getStudentsFx,
  getStudents,
};
