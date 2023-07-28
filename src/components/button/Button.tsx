import React from 'react';
import ButtonStyled from './ButtonStyles.ts';

interface ButtonProps {
  textButton: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
function Button({ onClick, textButton }: ButtonProps) {
  return (
    <ButtonStyled type="button" onClick={onClick}>
      {textButton}
    </ButtonStyled>
  );
}

export default Button;
