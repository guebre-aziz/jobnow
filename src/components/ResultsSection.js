import React from "react";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import JobsListing from "./jobs-listing/JobsListing";
import JobDetailsCard from "./JobDetailsCard";
import Loading from "./Loading";

export default function ResultsSection(props) {
  const {
    selectedJobId,
    jobsData,
    selectedJobData,
    handleSelectedJob,
    setPage,
    page,
  } = props;

  const theme = useTheme();

  // handle pagination
  const handlePage = (event, value) => {
    setPage(value);
    setTimeout(() => {
      jobsData.refetch();
    }, 100);
  };

  const paginationCount = () => {
    if (jobsData.data) {
      return Math.floor(jobsData.data.count / 20);
    } else return 0;
  };
  const PaginationBox = () => (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Pagination
        count={paginationCount()}
        variant="outlined"
        shape="rounded"
        size="small"
        page={page}
        onChange={handlePage}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        mt: 4,
        p: 2,
        borderRadius: 2,
        maxHeight: "90vh",
      }}
    >
      <Grid container spacing={2} sx={{ height: "90vh" }}>
        {jobsData.isLoading && (
          <Grid item xs={12}>
            <Loading />
          </Grid>
        )}
        {jobsData.data && (
          <>
            <Grid item xs={12}>
              {jobsData.data.results.length > 0 ? (
                <Typography variant="h6" color="primary.main">
                  {jobsData.data && jobsData.data.count + " results:"}
                </Typography>
              ) : (
                <Typography variant="h6" color="primary.main">
                  No jobs found.
                </Typography>
              )}
            </Grid>
            {jobsData.data.results.length > 0 && (
              <Grid
                item
                sm={12}
                md={4}
                sx={{ overflowY: "auto", maxHeight: "85vh" }}
              >
                <Box>
                  <PaginationBox />
                  <JobsListing
                    jobsData={jobsData}
                    selectedJob={selectedJobId}
                    handleSelectedJob={handleSelectedJob}
                  />
                  <PaginationBox />
                </Box>
              </Grid>
            )}
            <Grid
              item
              md={8}
              sx={{
                overflowY: "auto",
                maxHeight: "85vh",
                [theme.breakpoints.down("md")]: { display: "none" },
              }}
            >
              {selectedJobData() && (
                <JobDetailsCard selectedJobData={selectedJobData()} />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
