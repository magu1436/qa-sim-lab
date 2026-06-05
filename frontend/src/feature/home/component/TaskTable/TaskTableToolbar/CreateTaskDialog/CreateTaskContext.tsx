import type { CreateTaskForm } from "@/feature/task/type/task";
import { createContext, useState, type FC, type ReactNode } from "react";

interface HelperTexts {
  name: string | null;
  problemName: string | null;
  memo: string | null;
  step: string | null;
  dt: string | null;
  tau: string | null;
  b0: string | null;
  threads: string | null;
  inputFile: string | null;
}

export type HelperTextKeys = keyof HelperTexts;

interface CreateTaskDialogContextValues {
  task: CreateTaskForm | undefined;
  setTask: React.Dispatch<React.SetStateAction<CreateTaskForm | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  helperTexts: HelperTexts;
  setHelperText: (key: HelperTextKeys, text: string | null) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateTaskDialogContext = createContext<CreateTaskDialogContextValues | null>(null);

export const CreateTaskDialogContextProvider: FC<{ children?: ReactNode | ReactNode[] }> = ({
  children,
}) => {
  const [task, setTask] = useState<CreateTaskForm | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [helperTexts, setHelperTexts] = useState<HelperTexts>({
    name: null,
    problemName: null,
    memo: null,
    step: null,
    dt: null,
    tau: null,
    b0: null,
    threads: null,
    inputFile: null,
  });
  const setHelperText = (key: HelperTextKeys, text: string | null) => {
    setHelperTexts((prev) => ({ ...prev, [key]: text }));
  };
  return (
    <CreateTaskDialogContext.Provider
      value={{ task, setTask, open, setOpen, setHelperText, helperTexts, isLoading, setIsLoading }}
    >
      {children}
    </CreateTaskDialogContext.Provider>
  );
};
