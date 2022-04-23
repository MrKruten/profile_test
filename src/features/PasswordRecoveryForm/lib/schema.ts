import * as yup from "yup";

import { Regulars } from "shared/lib";

export const schema = yup
  .object({
    login: yup
      .string()
      .matches(
        Regulars.regEmail,
        "E-mail может содержать латиницу, цифры, прописные буквы, до @ может содержать специальные символы"
      )
      .required("Это обязательное поле"),
  })
  .required();
