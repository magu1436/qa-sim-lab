import { TextField, Typography, type TypographyVariant } from "@mui/material";
import type { FC } from "react";

type UserMenuTextFieldProps = {
  isInput: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string;
  variant?: TypographyVariant;
  label?: string;
  placeHolder?: string;
  type?: React.HTMLInputTypeAttribute;
};

const UserMenuTextField: FC<UserMenuTextFieldProps> = ({
  isInput,
  value,
  onChange,
  onBlur,
  helperText,
  variant,
  label,
  placeHolder,
  type,
}) => {
  if (!isInput) {
    return <Typography variant={variant}>{value}</Typography>;
  }
  const typographySx = {
    typography: variant,
  };
  return (
    <TextField
      variant="outlined"
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={helperText}
      error={helperText !== undefined}
      placeholder={placeHolder}
      slotProps={{
        input: {
          sx: typographySx,
        },
      }}
    />
  );
};

export default UserMenuTextField;
