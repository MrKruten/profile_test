export const stringToDate = (stringDate: string): Date => {
  const dateSplit = stringDate.split(".");
  return new Date(`${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`);
};

export const checkIsDateMoreToday = (dateCheck: string): boolean => {
  const today = new Date();
  const dateUser = stringToDate(dateCheck);
  return dateUser <= today;
};

export const calcAgeUser = (dateCheck: string): number => {
  const today = new Date();
  const dateUser = stringToDate(dateCheck);
  return today.getFullYear() - dateUser.getFullYear();
};
