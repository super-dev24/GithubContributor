import React from "react";
import { Typography } from "@mui/material";

const Title = ({ title }) => {
  return (
    <Typography variant="h3" component="div" sx={{ textAlign: "center" }}>
      {title}
    </Typography>
  );
};

export default Title;
