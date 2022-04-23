import { IComment } from "./types";

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

export const compareDates = (prev: string, next: string) => {
  const prevDate = stringToDate(prev);
  const nextDate = stringToDate(next);
  if (prevDate === nextDate) return 0;
  if (prevDate < nextDate) return 1;
  if (prevDate > nextDate) return -1;
  return 0;
};

export const sortComments = (filter: string, comments: Array<IComment>) => {
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
      return compareDates(prev.date, next.date);
    }
    if (prev.status === filter || next.status === filter) return 0;
    return compareDates(prev.date, next.date);
  });
  return newSorted;
};
