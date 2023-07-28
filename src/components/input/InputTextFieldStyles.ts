import TextField from '@mui/material/TextField/TextField';
import { styled } from 'styled-components';

export const InputStyled = styled(TextField)`
  width: 70%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export default InputStyled;
