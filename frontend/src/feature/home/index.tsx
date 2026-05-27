import { CssBaseline, Stack, type SxProps } from "@mui/material";
import Header from "./component/Header/Header";
import { TableTaskProvider } from "./component/TableTaskContext";
import TaskTable from "./component/TaskTable/TaskTable";
import { TaskRequestProvider } from "./component/TaskRequestContext";
import TaskFilterPanel from "./component/TaskFilterPanel/TaskFilterPanel";

const Home = () => {
  const sx: SxProps = {
    height: "100vh",
    width: "100%",
  };
  return (
    <>
      <CssBaseline>
        <Stack sx={sx}>
          <Header />
          <TaskRequestProvider>
            <Stack direction={"row"} sx={{ flex: 1, padding: 2, minHeight: 0 }} spacing={1}>
              <TaskFilterPanel />
              <TableTaskProvider>
                <TaskTable />
              </TableTaskProvider>
            </Stack>
          </TaskRequestProvider>
        </Stack>
      </CssBaseline>
    </>
  );
};

export default Home;
