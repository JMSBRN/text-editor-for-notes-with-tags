const generateUniqueId = () => {
  return new Date().getTime().toString();
};

export default generateUniqueId;

export const checkValueWithRegex = (value: string, pattern: RegExp) => {
  const regex = new RegExp(pattern);
  return regex.test(value);
};
