import { Box, type SxProps } from "@mui/material";
import logo from "@/assets/logo.png";

type LogoProps = {
  sx: SxProps;
};

const Logo = ({ sx }: LogoProps) => {
  return (
    <>
      <Box
        component={"img"}
        src={logo}
        alt="QASim Lab"
        sx={[
          {
            height: "100%",
            width: "auto",
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    </>
  );
};

export default Logo;
