import * as yup from "yup";

import { Regulars } from "shared/lib";

// расписывать e-mail 0_0
export const schema = yup
  .object({
    login: yup
      .string()
      .matches(
        Regulars.regEmail,
        "E-mail может содержать латиницу, цифры, прописные буквы, до @ может содержать специальные символы"
      )
      .required("Это обязательное поле"),
    password: yup
      .string()
      .min(8, "Пароль должен содержать не менее 8 символов")
      .max(24, "Пароль должен содержать не более 24 символов")
      .matches(
        Regulars.regPassword,
        "Пароль должен содержать латиницу, цифры, прописные буквы, символ ( ., -, _ ...)"
      )
      .required("Это обязательное поле"),
  })
  .required();
