import React from "react";
import {
  Grid,
  Typography,
  Skeleton,
  Box,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  Button,
  CardActions,
} from "@mui/material";
import JobCard from "./JobCard";

export default function JobsListing(props) {
  const { isLoading, data, error } = props.jobsData;

  return isLoading ? (
    <Box>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  ) : data ? (
    data.results.map((job) => {
      return (
        <JobCard
          key={job.id}
          jobData={job}
          handleSelectedJob={props.handleSelectedJob}
        />
      );
    })
  ) : (
    <p>error</p>
  );
}
