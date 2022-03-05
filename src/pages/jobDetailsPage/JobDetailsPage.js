import React from "react";
import { useParams } from "react-router-dom";
import client from "../../common/utils/reactQueryClient";
import JobDetailsCard from "../../components/JobDetailsCard";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";

export default function JobDetailsPage() {
  const id = useParams().id;
  const data = client.getQueriesData("jobsData");
  const lastCacheItem = data?.length - 1; // It may exist more than one "jobsData" cache.
  const selectedJobData = data[lastCacheItem][1].results.find(
    (item) => item.id === id
  );

  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.paper",
          mt: 4,
          p: 2,
          borderRadius: 2,
          minHeight: "90vh",
          maxWidth: "xl",
        }}
      >
        {selectedJobData ? (
          <JobDetailsCard selectedJobData={selectedJobData} />
        ) : (
          <Typography variant="h4" align="center">
            Job not found. Please, return to the search page
          </Typography>
        )}
      </Box>
    </Container>
  );
}
