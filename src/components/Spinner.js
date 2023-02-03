import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingY: 16,
        paddingX: 36,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
