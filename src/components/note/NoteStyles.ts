import { Paper } from '@mui/material';
import { styled } from 'styled-components';

export const NoteStyled = styled(Paper)`
  margin: 10px;
  width: 100%;
  min-height: 80px;
  height: auto;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContentContainer = styled.div`
  width: 80%;
  max-width: 500px;
  min-height: 80px;
  height: auto;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonsContainer = styled.div`
  width: 20%;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
