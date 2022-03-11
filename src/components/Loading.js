import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";

export default function LoadingJobsData() {
  return (
    <Grid container spacing={2} sx={{ width: "100%", height: "100%" }}>
      <Grid item xs={4}>
        <Stack spacing={2} sx={{ width: "100%", height: "100%" }}>
          <Skeleton variant="rectangular" width="100%" height="15%" />
          <Skeleton variant="rectangular" width="100%" height="15%" />
          <Skeleton variant="rectangular" width="100%" height="15%" />
          <Skeleton variant="rectangular" width="100%" height="15%" />
          <Skeleton variant="rectangular" width="100%" height="15%" />
          <Skeleton variant="rectangular" width="100%" height="15%" />
          <Skeleton variant="rectangular" width="100%" height="15%" />
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Stack spacing={2} sx={{ width: "100%", height: "100%" }}>
          <Skeleton variant="h1" animation="wave" />
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ width: "100%", height: "30%" }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
