import React from "react";
import { useParams } from "react-router-dom";

import client from "../../common/utils/reactQueryClient";
import { QueryCache } from "react-query";
import JobDetailsCard from "../../components/JobDetailsCard";
import { Box } from "@mui/system";
import { Container } from "@mui/material";

export default function JobDetailsPage() {
  const id = useParams().id;
  const cacheLength = client.getQueryCache().queries.length;
  const selectedJobData = client
    .getQueryCache()
    .queries[cacheLength - 1]?.state?.data?.results.find(
      (item) => item.id === id
    );
  console.log(selectedJobData);
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
        {selectedJobData && (
          <JobDetailsCard selectedJobData={selectedJobData} />
        )}
      </Box>
    </Container>
  );
}
