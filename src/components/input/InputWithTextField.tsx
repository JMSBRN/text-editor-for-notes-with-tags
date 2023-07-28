import React from 'react';
import InputStyled from './InputTextFieldStyles.ts';

interface InputProps {
  inputValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
function InputWithTextField({ inputValue, onChange }: InputProps) {
  return (
    <InputStyled
      label="Note"
      color="primary"
      variant="standard"
      helperText="insert new note here"
      multiline
      type="text"
      value={inputValue}
      onChange={onChange}
    />
  );
}

export default InputWithTextField;
