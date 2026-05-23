import type { FC } from "react";
import UserMenuTextField from "./UserMenuTextField";

type NameProps = {
  isInput: boolean;
  value?: string;
  onChange?: (newValue: string) => void;
  helperText?: string;
};

const Name: FC<NameProps> = ({ isInput, value, onChange, helperText }) => {
  return (
    <UserMenuTextField
      isInput={isInput}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={(e) => onChange?.(e.target.value.trim())}
      helperText={helperText}
      variant="h2"
      label="名前"
      placeHolder="東海太郎"
    />
  );
};

export default Name;
