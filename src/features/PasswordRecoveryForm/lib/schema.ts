import * as yup from "yup";

export const schema = yup
  .object({
    login: yup
      .string()
      .matches(
        /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/,
        "Введите валидный e-mail"
      )
      .required("Это обязательно поле"),
  })
  .required();
