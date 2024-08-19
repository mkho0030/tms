import SpaceDashboard from "@mui/icons-material/SpaceDashboard";
import { Box, Typography } from "@mui/material";
import React from "react";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        color: "primary.main",
      }}
    >
      <SpaceDashboard fontSize="large" sx={{ mr: "0.385rem" }} />
      <Typography variant="h5" fontWeight={600} sx={{ height: "100%" }}>
        Grah
      </Typography>
    </Box>
  );
};

export default Logo;
