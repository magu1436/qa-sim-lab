import type { TaskRequest } from "@/feature/task/type/table"
import { createContext, useState } from "react";

type TaskRequestContextValue = {
    taskRequest: TaskRequest;
    setTaskRequest: React.Dispatch<React.SetStateAction<TaskRequest>>;
};

export const TaskRequestContext = createContext<TaskRequestContextValue | null>(null);

export const TaskRequestProvider = ({
    children,
}: {
    children: React.ReactNode | React.ReactNode[];
}) => {
    const [taskRequest, setTaskRequest] = useState<TaskRequest>({
        elemStart: 0,
        elemEnd: 50,
        order: "DESC",
        user: null,
        problemName: null,
        dateStart: null,
        dateEnd: null,
        status: null,
    });

    return (
        <TaskRequestContext
            value={{
                taskRequest: taskRequest,
                setTaskRequest: setTaskRequest,
            }}
        >
            {children}
        </TaskRequestContext>
    );
}