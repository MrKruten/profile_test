import * as yup from "yup";

export const schema = yup
  .object({
    name: yup
      .string()
      .min(4, "Поле должно содержать не менее 4 символов")
      .max(64, "Поле должно содержать не более 64 символов")
      .required("Это обязательное поле"),
    text: yup
      .string()
      .min(6, "Поле должно содержать не менее 6 символов")
      .max(200, "Поле должно содержать не более 200 символов")
      .required("Это обязательное поле"),
  })
  .required();
