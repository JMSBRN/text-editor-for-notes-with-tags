import { createGlobalStyle } from 'styled-components';
import { Colors, Fonts } from '../constants.ts';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${Fonts.FAMILY};
    color: ${Colors.TEXT};
  }
`;

export default GlobalStyle;
