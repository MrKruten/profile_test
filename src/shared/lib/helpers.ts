import { IReview } from "shared/constants/types";

export const stringToDate = (stringDate: string): Date => {
  const dateSplit = stringDate.split(".");
  return new Date(`${dateSplit[1]}-${dateSplit[0]}-${dateSplit[2]}`);
};

export const dateToString = (dateString: Date): string => {
  const day =
    dateString.getDate() < 10
      ? `0${dateString.getDate()}`
      : dateString.getDate();
  const month = dateString.getMonth() + 1;
  const monthStr = month < 10 ? `0${month}` : month;
  return `${day}.${monthStr}.${dateString.getFullYear()}`;
};

export const checkIsDateMoreToday = (dateCheck: string): boolean => {
  const today = new Date();
  try {
    const dateUser = stringToDate(dateCheck);
    return dateUser <= today;
  } catch (e) {
    return false;
  }
};

export const compareDates = (prev: string, next: string) => {
  const prevDate = new Date(prev);
  const nextDate = new Date(next);
  if (prevDate === nextDate) return 0;
  if (prevDate < nextDate) return 1;
  if (prevDate > nextDate) return -1;
  return 0;
};

export const sortComments = (filter: string, comments: Array<IReview>) => {
  // сортировка по фильтру
  const newSorted = comments.sort((prev, next) => {
    if (prev.status === filter && next.status === filter) return 0;
    if (prev.status === filter && next.status !== filter) {
      return -1;
    }
    return 1;
  });
  // сортировка по дате
  newSorted.sort((prev, next) => {
    if (prev.status === filter && next.status === filter) {
      return compareDates(prev.createdAt, next.createdAt);
    }
    if (prev.status === filter || next.status === filter) return 0;
    return compareDates(prev.createdAt, next.createdAt);
  });
  return newSorted;
};

export const calculateAge = (dateBirth: string): number => {
  const today = new Date();
  const birth = new Date(dateBirth);
  if (
    birth.getMonth() > today.getMonth() ||
    (birth.getMonth() === today.getMonth() && birth.getDay() > today.getDate())
  ) {
    return today.getFullYear() - birth.getFullYear() - 1;
  }
  return today.getFullYear() - birth.getFullYear();
};
