import type { Task } from "@/feature/task/type/task";
import { createContext, useState, type FC, type ReactNode } from "react";

interface HelperTexts {
    problemName: string | null;
    step: string | null;
    dt: string | null;
    tau: string | null;
    b0: string | null;
    threads: string | null;
    inputFile: string | null;
}

export type HelperTextKeys = keyof HelperTexts;

interface TaskDetailDialogContextValue {
    task: Task | undefined;
    setTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
    getTask: (taskId: number) => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    helperTexts: HelperTexts;
    setHelperTexts: (helperTexts: HelperTexts) => void;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskDetailDialogContext = createContext<TaskDetailDialogContextValue | null>(null);

export const TaskDetailDialogContextProvider: FC<{ children?: ReactNode | ReactNode[] }> = ({ children }) => {
    const [task, setTask] = useState<Task | undefined>(undefined);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [helperTexts, setHelperTexts] = useState<HelperTexts>({
        problemName: null,
        step: null,
        dt: null,
        tau: null,
        b0: null,
        threads: null,
        inputFile: null,
    });