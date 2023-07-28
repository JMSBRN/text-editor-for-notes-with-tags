import { v4 as uuid } from 'uuid';
import { HighlightedElement } from './interfaces.ts';

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

export const checkIfStringContainsHash = (inputString: string): boolean => {
  return inputString.includes('#');
};

export const checkWordsForHash = (strings: string[]): boolean => {
  return strings.some((str) => str.includes('#'));
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

export const setArrayWithUniqItems = (arr: string[] = []) => {
  const set = new Set(arr);
  const newArr = Array.from(set);
  return newArr.filter((str) => {
    return str !== '';
  });
};

export const setHighlightText = (inputText: string): HighlightedElement[] => {
  const regex = /#[^.]*\./g;
  const highlightedElements: HighlightedElement[] = [];
  const highlightedTags: Set<string> = new Set();

  let lastIndex = 0;
  let match;

  for (
    match = regex.exec(inputText);
    match !== null;
    match = regex.exec(inputText)
  ) {
    const fullMatch = match[0];

    if (!highlightedTags.has(fullMatch)) {
      highlightedTags.add(fullMatch);

      const matchIndex = match.index;
      const textBeforeMatch = inputText.substring(lastIndex, matchIndex);
      lastIndex = matchIndex + fullMatch.length;

      if (textBeforeMatch) {
        highlightedElements.push({
          isHighlighted: false,
          text: textBeforeMatch,
        });
      }

      highlightedElements.push({
        isHighlighted: true,
        text: fullMatch,
      });
    }
  }

  const remainingText = inputText.substring(lastIndex);
  if (remainingText) {
    highlightedElements.push({ isHighlighted: false, text: remainingText });
  }
  return highlightedElements;
};
