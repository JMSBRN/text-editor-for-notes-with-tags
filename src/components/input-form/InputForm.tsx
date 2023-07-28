import React from 'react';
import FormStyled from './InputFormStyles.ts';
import InputWithTextField from '../input/InputWithTextField.tsx';
import Button from '../button/Button.tsx';

interface InputFormProps {
  inputValue: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
function InputForm({
  onChange,
  onSubmit,
  onClick,
  inputValue,
}: InputFormProps) {
  return (
    <FormStyled onSubmit={onSubmit}>
      <InputWithTextField inputValue={inputValue} onChange={onChange} />
      <Button textButton="Save note" onClick={onClick} />
    </FormStyled>
  );
}

InputForm.defaultProps = {
  onSubmit: () => undefined,
};

export default InputForm;
