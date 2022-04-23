import * as yup from "yup";

import { Regulars } from "shared/lib";

export const schema = yup
  .object({
    firstName: yup
      .string()
      .min(2, "Поле должно содержать не менее 2 символов")
      .max(40, "Поле должно содержать не более 40 символов")
      .matches(
        Regulars.regName,
        "Это поле может содержать только латиницу и кириллицу"
      ),
    secondName: yup
      .string()
      .min(2, "Поле должно содержать не менее 2 символов")
      .max(40, "Поле должно содержать не более 40 символов")
      .matches(
        Regulars.regName,
        "Это поле может содержать только латиницу и кириллицу"
      ),
    dateBirth: yup
      .string()
      .matches(Regulars.regDate, "Дата должна быть в формате: дд.мм.гггг"),
    city: yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
    sex: yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
    pet: yup.object({
      label: yup.string(),
      value: yup.string(),
    }),
    text: yup.string(),
    shortInfo: yup
      .string()
      .max(99, "Поле должно содержать не более 200 символов"),
  })
  .required();
