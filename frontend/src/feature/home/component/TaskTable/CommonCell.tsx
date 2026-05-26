import { TableCell, Typography, type SxProps } from "@mui/material";
import type { FC } from "react";

type CommonCellProps = {
  children: React.ReactNode;
  cellSx?: SxProps;
};

const CommonCell: FC<CommonCellProps> = ({ children, cellSx }) => {
  return (
    <>
      <TableCell sx={cellSx} align="center">
        <Typography variant={"body1"}>{children}</Typography>
      </TableCell>
    </>
  );
};

export default CommonCell;
