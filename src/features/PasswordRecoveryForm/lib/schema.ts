import * as yup from "yup";

export const schema = yup
  .object({
    login: yup
      .string()
      .matches(
        /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/,
        "E-mail может содержать латиницу, цифры, прописные буквы, до @ может содержать специальные символы"
      )
      .required("Это обязательное поле"),
  })
  .required();
