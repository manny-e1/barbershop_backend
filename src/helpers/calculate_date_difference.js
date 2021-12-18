import { differenceInDays, parseISO } from 'date-fns';

export const calculateDateDifference = (date) => {
  return differenceInDays(
    parseISO(dateSpliter(date)),
    new Date().setHours(0, 0, 0, 0)
  );
};

export const dateSpliter = (date) => {
  if (typeof date === 'string') return date.split(' ')[0];
};
