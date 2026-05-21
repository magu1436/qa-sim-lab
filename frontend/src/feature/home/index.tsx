import { CssBaseline, Stack, type SxProps } from "@mui/material";
import Header from "./component/Header/Header";

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
        </CssBaseline>
      </Stack>
    </>
  );
};

export default Home;
