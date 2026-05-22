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
};

const UserMenuTextField: FC<UserMenuTextFieldProps> = ({
  isInput,
  value,
  onChange,
  onBlur,
  helperText,
  variant,
  label,
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
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={helperText}
      slotProps={{
        input: {
          sx: typographySx,
        },
      }}
    />
  );
};

export default UserMenuTextField;
