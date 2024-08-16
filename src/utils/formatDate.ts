import dayjs from 'dayjs';

export const formatDate = (date: Date | undefined) => {
  if (!date) return null;
  return dayjs(date);
};
