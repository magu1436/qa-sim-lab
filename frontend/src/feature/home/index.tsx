import { CssBaseline, Stack, type SxProps } from "@mui/material";
import Header from "./component/Header/Header";
import { TableTaskProvider } from "./component/TableTaskContext";
import TaskTable from "./component/TaskTable/TaskTable";
import { TaskRequestProvider } from "./component/TaskRequestContext";

const Home = () => {
  const sx: SxProps = {
    height: "100vh",
    width: "100%",
  };
  return (
    <>
      <Stack sx={sx}>
        <CssBaseline>
          <Header />
          <TaskRequestProvider>
            <TableTaskProvider>
              <TaskTable />
            </TableTaskProvider>
          </TaskRequestProvider>
        </CssBaseline>
      </Stack>
    </>
  );
};

export default Home;
