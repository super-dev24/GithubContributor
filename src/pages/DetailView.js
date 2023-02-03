import React, { useState, useEffect, useCallback } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GITHUB_API_URL } from "../helper/const";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Container from "../components/Container";
import Title from "../components/Title";
import Divider from "../components/Divider";
import UserInfo from "../components/UserInfo";
import Spinner from "../components/Spinner";

const DetailView = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user: login} = useParams();
  
  const details = {
    login: "User Name",
    name: "Name",
    location: "Location",
    bio: "Bio",
    followers: "Follower Count",
    following: "Following Count"
  };

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${GITHUB_API_URL}/users/${login}`);
      setUser(result.data);
    } catch(err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  
  }, [login]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Box
      component="div"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Container>
        <Title title="Contributor Detail" />
        <Divider />
        {loading ? (
          <Spinner />
        ) : (
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={user.avatar_url}
              alt={user.login}
              sx={{
                width: 255,
                borderRadius: 4,
                borderColor: "#ececec",
                borderStyle: "solid",
                borderWidth: 6,
                marginRight: 8,
              }}
            />
            <Box component="div">
              {Object.keys(details).map((key) => (
                <UserInfo title={`${details[key]}: `} data={user[key]} key={key}/>
              ))}
            </Box>
          </Box>
        )}
      </Container>
      <Button
        variant="contained"
        sx={{ height: "3.4rem", width: "3.4rem" }}
        onClick={handleBackClick}
      >
        <ArrowBackIcon />
      </Button>
    </Box>
  );
};

export default DetailView;
