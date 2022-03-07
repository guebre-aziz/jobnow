import React, { useEffect } from "react";
import JobCard from "../components/jobs-listing/JobCard";
import { Grid, Typography, Box, Pagination, Container } from "@mui/material";

export default function MyListPage() {
  let myList = JSON.parse(localStorage.getItem("jobnow-my-list"))?.jobs;

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Box
        sx={{
          bgcolor: "background.paper",
          mt: 4,
          p: 2,
          borderRadius: 2,
          minHeight: "90vh",
        }}
      >
        {myList ? (
          myList.map((job) => {
            return <JobCard jobData={job} />;
          })
        ) : (
          <Typography variant="h4" align="center">
            No item yet on your list
          </Typography>
        )}
      </Box>
    </Container>
  );
}
