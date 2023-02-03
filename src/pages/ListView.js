import React, { useState, useEffect, useCallback } from "react";
import { Grid, Pagination } from "@mui/material";
import axios from "axios";
import { GITHUB_API_URL } from "../helper/const";
import CardItem from "../components/CardItem";
import Container from "../components/Container";
import Title from "../components/Title";
import Divider from "../components/Divider";
import Spinner from "../components/Spinner";

const PER_PAGE = 12;

const extractTotalPages = (linkHeader) => {
  const lastPattern = /<.*&page=(\d+).*>; rel="last"/i;
  const hasLastPage = linkHeader && linkHeader.includes(`rel="last"`);
  const totalPages = hasLastPage ? Number(linkHeader.match(lastPattern)[1]) : 1;
  return totalPages;
};

const ListView = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotalPages = useCallback(async () => {
    const result = await axios.get(`${GITHUB_API_URL}/repos/facebook/react/contributors?q=contributions&page=1&per_page=${PER_PAGE}`);
    setTotalPages(extractTotalPages(result.headers.link));
  }, []);

  useEffect(() => {
    getTotalPages();
  }, [getTotalPages]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${GITHUB_API_URL}/repos/facebook/react/contributors?q=contributions&page=${page}&per_page=${PER_PAGE}`);
      setUsers(result.data);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    localStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Title title="Contributor List" />
      <Divider />
      {loading ? (
        <Spinner />
      ) : (
        <Grid
          container
          gap={{ xs: 2 }}
          sx={{ justifyContent: "center", marginY: 4 }}
        >
          {users.map((user) => (
            <Grid item key={user.id}>
              <CardItem
                avatarUrl={user.avatar_url}
                userName={user.login}
                userId={user.id}
                contributionCount={user.contributions}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <Divider />
      <Pagination
        count={totalPages}
        color="primary"
        onChange={handleChangePage}
        page={page}
        sx={{ display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default ListView;
