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

export default function JobCard(props) {
  const jobData = props.jobData;
  return (
    <>
      <Card variant="outlined" sx={{ mt: 2, mr: 2, boxShadow: 0 }}>
        <CardActionArea>
          <CardContent onClick={() => props.handleSelectedJob(jobData.id)}>
            <Typography variant="h6" component="div">
              {jobData.title}
            </Typography>
            <Typography color="text.secondary">
              {jobData.company.display_name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ mb: 1.5 }}
              color="text.secondary"
            >
              {jobData.location.display_name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
