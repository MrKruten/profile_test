import * as yup from "yup";

export const schema = yup
  .object({
    text: yup
      .string()
      .min(6, "Поле должно содержать не менее 6 символов")
      .max(200, "Поле должно содержать не более 200 символов")
      .required("Это обязательное поле"),
  })
  .required();
