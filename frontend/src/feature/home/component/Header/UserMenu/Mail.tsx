import type { FC } from "react";
import UserMenuTextField from "./UserMenuTextField";

type MailProps = {
  isInput: boolean;
  value?: string;
  onChange?: (newValue: string) => void;
  helperText?: string;
};

const Mail: FC<MailProps> = ({ isInput, value, onChange, helperText }) => {
  return (
    <UserMenuTextField
      isInput={isInput}
      type={"email"}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={(e) => onChange?.(e.target.value.trim())}
      helperText={helperText}
      variant="body1"
      label="メールアドレス"
      placeHolder="0CDIM0000@tokai.ac.jp"
    />
  );
};

export default Mail;
