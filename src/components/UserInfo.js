import React from "react";
import { Typography } from "@mui/material";

const UserInfo = ({ title, data }) => {
  return (
    <Typography variant="h6" sx={{ padding: 1 }} color="text.primary">
      <span style={{ fontWeight: "bold" }}>{title}</span>
      {!!data ? data : "_"}
    </Typography>
  );
};

export default UserInfo;
