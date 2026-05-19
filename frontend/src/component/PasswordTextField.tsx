import { IconButton, InputAdornment, TextField, type TextFieldVariants } from "@mui/material";
import { useCallback, useState, type FC } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type PasswordTextFieldProps = {
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string,
    variant?: TextFieldVariants,
    helperText?: string,
    placeHolder?: string,
    error?: boolean,
}

/**
 * パスワード入力用のテキストフィールド  
 * 
 * パスワードの可視化・不可視化を行うボタンを保持する
 */
const PasswordTextField: FC<PasswordTextFieldProps> = ({
    password,
    onChange,
    label,
    variant,
    helperText,
    placeHolder,
    error,
}) => {

    const [ showPassword, setShowPassword ] = useState(false);

    const handleClickShowpassword = useCallback(() => {
        setShowPassword((s) => !s);
    }, [setShowPassword]);

    return (
        <TextField
            variant={variant}
            value={password}
            onChange={onChange}
            label={label}
            helperText={helperText}
            placeholder={placeHolder}
            type={showPassword ? 'text' : 'password'}
            slotProps={{
                input: {
                    endAdornment: (<InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowpassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>)
                }
            }}
            error={error}
        />
    )
};

export default PasswordTextField;