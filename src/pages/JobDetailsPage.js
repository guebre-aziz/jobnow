import React from "react";
import { useParams } from "react-router-dom";
import client from "../common/utils/reactQueryClient";
import JobDetailsCard from "../components/JobDetailsCard";
import { Container, Typography, Box } from "@mui/material";
import useMyListStore from "../common/customHook/useMyListStore";
export default function JobDetailsPage() {
  const { isData, myListData } = useMyListStore();
  const id = useParams().id;

  const data = client.getQueriesData("jobsData");
  const lastCacheItemPos = data?.length - 1; // It may exists more than one "jobsData" cache.

  const selectedJobData = () => {
    let jobData;
    if (data[lastCacheItemPos]) {
      // try to get data from query cache
      jobData = data[lastCacheItemPos][1]?.results.find(
        (item) => item.id === id
      );
    }
    if (!jobData && isData) {
      // or get it from local storage (in case is saved)
      jobData = myListData.find((item) => item.id === id);
    }
    return jobData;
  };

  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.paper",
          m: 4,
          p: 2,
          borderRadius: 2,
          minHeight: "90vh",
          maxWidth: "xl",
        }}
      >
        {selectedJobData() ? (
          <JobDetailsCard selectedJobData={selectedJobData()} />
        ) : (
          <Typography variant="h4" align="center">
            Job not found. Please, return to the search page
          </Typography>
        )}
      </Box>
    </Container>
  );
}
