import React from 'react';
import InputStyled from './InputTextFieldStyles.ts';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<unknown>;
}
function InputWithPropmise({ value, onChange }: InputProps) {
  return <InputStyled value={value} onChange={onChange} />;
}

export default InputWithPropmise;
