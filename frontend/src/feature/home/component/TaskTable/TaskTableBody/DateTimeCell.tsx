import { Stack, TableCell, Typography } from "@mui/material";
import type { FC } from "react";

type DateTimeCellProps = {
  date: Date;
};

const DateTimeCell: FC<DateTimeCellProps> = ({ date }) => {
  return (
    <>
      <TableCell>
        <Stack direction={"column"} sx={{ alignItems: "center" }}>
          <Typography variant={"body2"}>{date.toLocaleDateString()}</Typography>
          <Typography variant={"body2"}>{date.toLocaleTimeString()}</Typography>
        </Stack>
      </TableCell>
    </>
  );
};

export default DateTimeCell;
