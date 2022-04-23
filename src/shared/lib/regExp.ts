const regName = /^[A-Za-zа-яА-Я]+$/;
const regDate = /^\d{2}.\d{2}.\d{4}$/;
const regEmail =
  /^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/;
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/;

export const Regulars = {
  regName,
  regDate,
  regEmail,
  regPassword,
};
