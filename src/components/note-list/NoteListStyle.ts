import { styled } from 'styled-components';

export const NoteListStyled = styled.div`
  width: 100%;
  height: auto;
  min-height: 600px;
  display: block;
`;
export const NoteStyled = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #8888;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ContentStyled = styled.div`
  margin-left: 20px;
  width: 300px;
  height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ButtonsContainer = styled.div`
  width: 150px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
