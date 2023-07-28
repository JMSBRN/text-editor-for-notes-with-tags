import { styled } from 'styled-components';

export const FormStyled = styled.form`
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;
export default FormStyled;
