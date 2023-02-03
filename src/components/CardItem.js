import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const CardItem = ({ avatarUrl, userName, userId, contributionCount }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ minWidth: 230, cursor: "pointer" }}
      onClick={() => {
        navigate(`/${userName}`);
      }}
    >
      <Box sx={{ background: "#3b3b3b", paddingY: 1 }}>
        <CardMedia
          sx={{
            height: 100,
            width: 100,
            borderRadius: "50%",
            borderStyle: "solid",
            borderColor: "#fff",
            borderWidth: 4,
            margin: "auto",
          }}
          image={avatarUrl}
          title={userName}
        />
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ textAlign: "center" }}
        >
          {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          User ID: {userId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contributions: {contributionCount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardItem;
