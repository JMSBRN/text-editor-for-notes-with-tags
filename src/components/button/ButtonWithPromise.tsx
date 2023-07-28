import React from 'react';
import ButtonStyled from './ButtonStyles.ts';

interface ButtonProps {
  textButton: string;
  onClickPromise: () => Promise<unknown>;
}
function Button({ textButton, onClickPromise }: ButtonProps) {
  return (
    <ButtonStyled
      variant="contained"
      color="primary"
      type="button"
      onClick={onClickPromise}
    >
      {textButton}
    </ButtonStyled>
  );
}

export default Button;
