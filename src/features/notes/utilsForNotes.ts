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

export const setTextAfterHash = (value: string) => {
  const index = value.indexOf('#');
  if (index !== -1) {
    return value.slice(index, value.length);
  }
  return '';
};

export const checkHash = (text: string) => {
  const index = text.indexOf('#');
  if (index !== -1) {
    return true;
  }
  return false;
};

export const setTextForTag = (content: string) => {
  const textAfterHash = setTextAfterHash(content);
  const cutContent = cutSymbolIfExist(textAfterHash, '#');
  const isTagMode = checkHash(content);
  if (isTagMode) {
    return cutContent;
  }
  return '';
};

export const getSymbolsAfterHashAnStopedAfterPoint = (
  inputString: string
): string[] => {
  const regex = /#([^.]*)/g;
  const matches = inputString.match(regex);

  return matches ? matches.map((match) => match.substring(1)) : [];
};
