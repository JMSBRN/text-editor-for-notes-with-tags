import { Paper } from '@mui/material';
import { styled } from 'styled-components';

export const NoteStyled = styled(Paper)`
  margin: 10px;
  min-height: 80px;
  height: auto;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-rows: repeat(2, 1fr);
  }
`;

export const ContentContainer = styled.div`
  max-width: 500px;
  min-height: 80px;
  height: auto;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ButtonsContainer = styled.div`
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  button {
    margin: 10px;
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
