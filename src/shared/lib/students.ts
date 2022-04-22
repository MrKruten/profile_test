import { createStore } from "effector";

import data from "shared/lib/data.json";
import { IStudent } from "shared/lib/types";

export const $students = createStore<Array<IStudent>>(data.students);
