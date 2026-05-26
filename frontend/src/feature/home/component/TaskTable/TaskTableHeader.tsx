import { TableHead, TableRow } from "@mui/material";
import CommonCell from "./CommonCell";

const TaskTableHeader = () => {
  return (
    <>
      <TableHead>
        <TableRow>
          <CommonCell>最適化問題名</CommonCell>
          <CommonCell>タスク名</CommonCell>
          <CommonCell>学生証番号</CommonCell>
          <CommonCell>ユーザー名</CommonCell>
          <CommonCell>作成日時</CommonCell>
          <CommonCell>進行状況</CommonCell>
          <CommonCell>進行割合</CommonCell>
          <CommonCell>詳細</CommonCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default TaskTableHeader;
