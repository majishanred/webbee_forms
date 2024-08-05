import dayjs from 'dayjs';

export const formatDate = (date: string | undefined) => {
  const formatedDate = dayjs(date, 'DD.MM.YYYY').format();

  if (formatedDate === 'Invalid Date') return null;

  return dayjs(date, 'DD.MM.YYYY');
};
