import useTaskRequest from "@/feature/task/hook/useTaskRequest";
import type { OrderType } from "@/feature/task/type/table";
import { ToggleButton, ToggleButtonGroup, type SxProps } from "@mui/material";
import { useState } from "react";

type OrderButtonGroupProps = {
  sx?: SxProps;
};

const OrderButtonGroup = ({ sx }: OrderButtonGroupProps) => {
  const { taskRequest, setTaskRequest } = useTaskRequest();
  const [alignment, setAlignment] = useState<OrderType>("DESC");

  const handleAlignment = (_: React.MouseEvent<HTMLElement>, order: OrderType) => {
    setAlignment(order);
    if (taskRequest.order === order) return;
    setTaskRequest((prev) => ({ ...prev, order: order }));
  };

  return (
    <ToggleButtonGroup value={alignment} onChange={handleAlignment} sx={sx} exclusive>
      <ToggleButton value="DESC">降順</ToggleButton>
      <ToggleButton value="ASC">昇順</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default OrderButtonGroup;
