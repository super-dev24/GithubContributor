import React from "react";
import { Box } from "@mui/material";

const Container = ({ children }) => {
  return (
    <Box
      component="div"
      sx={{
        borderColor: "#bababa",
        borderStyle: "solid",
        borderRadius: 5,
        borderWidth: 1,
        padding: 2,
        marginX: 24,
        marginY: 8,
        minWidth: 280,
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
