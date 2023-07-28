import React from 'react';
import InputStyled from './InputTextFieldStyles.ts';

interface InputProps {
  inputValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
function InputWithTextField({ inputValue, onChange }: InputProps) {
  return <InputStyled type="text" value={inputValue} onChange={onChange} />;
}

export default InputWithTextField;
