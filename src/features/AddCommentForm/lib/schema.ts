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
    captcha: yup
      .string()
      .min(5, "Поле должно содержать 5 символа")
      .max(5, "Поле должно содержать 5 символа")
      .required("Это обязательное поле"),
    file: yup
      .mixed()
      .test({
        name: "size-file",
        message: "Файл должен быть не больше 5 мб",
        test: (value: FileList) => {
          if (value && value.length > 0) {
            return value[0]?.size < 1024 * 1024 * 5;
          }
          return true;
        },
      })
      .test({
        name: "format-file",
        message: "Допустимые форматы jpg, jpeg или png",
        test: (value: FileList) => {
          if (value && value.length > 0) {
            return /\.(jpg|jpeg|png)$/i.test(value![0]?.name);
          }
          return true;
        },
      }),
  })
  .required();
