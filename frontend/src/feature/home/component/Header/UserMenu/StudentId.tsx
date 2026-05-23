import type { FC } from "react";
import UserMenuTextField from "./UserMenuTextField";


type StudentIdProps = {
    isInput: boolean;
    value?: string;
    onChange?: (newValue: string) => void;
    helperText?: string;
};

const StudentId: FC<StudentIdProps> = ({ isInput, value, onChange, helperText }) => {
    return <UserMenuTextField
        isInput={isInput}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={(e) => onChange?.(e.target.value.trim())}
        helperText={helperText}
        variant="h2"
        label="学籍番号"
        placeHolder="0CDIM0000"
    />;
};

export default StudentId;