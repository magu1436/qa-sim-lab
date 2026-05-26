import type { TaskRow } from "@/feature/task/type/table";
import { IconButton, TableCell, TableRow } from "@mui/material";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import type { FC } from "react";
import DateTimeCell from "./DateTimeCell";
import CommonCell from "./CommonCell";

type TableRowProps = {
  data: TaskRow;
};

const TaskTableRow: FC<TableRowProps> = ({ data }) => {
  return (
    <>
      <TableRow>
        <CommonCell>{data.problemName}</CommonCell>
        <CommonCell>{data.name}</CommonCell>
        <CommonCell>{data.user.studentId}</CommonCell>
        <CommonCell>{data.user.name}</CommonCell>
        <DateTimeCell date={data.createdAt} />
        <CommonCell>{data.status}</CommonCell>
        <CommonCell>{data.ratio}</CommonCell>
        <TableCell align="center">
          <IconButton>
            <ChevronIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TaskTableRow;
