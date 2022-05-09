import { createEffect, createStore } from "effector";

import data from "shared/lib/data.json";
import { IStudent } from "shared/lib/types";
// import { API } from "shared/api";

// export const getStudentsFx = createEffect(async () => await API.)

export const $students = createStore<Array<IStudent>>(data.students);
