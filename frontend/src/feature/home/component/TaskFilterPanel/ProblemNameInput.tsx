import useTaskRequest from "@/feature/task/hook/useTaskRequest";
import { TextField, type SxProps } from "@mui/material";
import { useCallback } from "react";

type ProblemNameInputProps = {
    sx?: SxProps,
}

const ProblemNameInput = ({ sx }: ProblemNameInputProps) => {
    const { taskRequest, setTaskRequest } = useTaskRequest();
    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (taskRequest.problemName === value) return;
        setTaskRequest((prev) => ({ ...prev, problemName: value || null }));
    }, [taskRequest, setTaskRequest]);
    return (
        <>
            <TextField 
                sx={sx}
                label={"最適化問題名"}
                onBlur={handleBlur}
            />
        </>
    );
};

export default ProblemNameInput;

