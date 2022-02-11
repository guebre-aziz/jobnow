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

export default function JobDetails(props) {
  const [jobData] = props.selectedJobData;

  return (
    <Card sx={{ mt: 2, boxShadow: 0 }} onClick={() => console.log(jobData)}>
      <CardContent>
        <Typography variant="h6" component="div">
          {jobData.title}
        </Typography>
        <Typography color="text.secondary">
          {jobData.company.display_name}
        </Typography>
        <Typography variant="caption" sx={{ mb: 1.5 }} color="text.secondary">
          {jobData.location.display_name}
        </Typography>
        <Typography variant="body2">{jobData.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
