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
  const { jobsData, selectedJob, handleSelectedJob } = props;

  return jobsData.data.results.map((job) => {
    return (
      <JobCard
        key={job.id}
        jobData={job}
        selectedJob={selectedJob}
        handleSelectedJob={handleSelectedJob}
      />
    );
  });
}
