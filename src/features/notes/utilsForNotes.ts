import { v4 as uuid } from 'uuid';

const generateUniqueId = () => {
  return uuid();
};

export default generateUniqueId;

export const checkValueWithRegex = (value: string, pattern: RegExp) => {
  const regex = new RegExp(pattern);
  return regex.test(value);
};

export const cutSymbolIfExist = (value: string, symbol: string) => {
  const regex = new RegExp(symbol, 'g');
  return value.replace(regex, '');
};
