export const isObjectEmpty = <T>(a: T) => {
  return JSON.stringify(a) === JSON.stringify({});
};
