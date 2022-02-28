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
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { useTheme } from "@emotion/react";

export default function JobDetailsCard(props) {
  const theme = useTheme();
  const jobData = props.selectedJobData;

  const dateDistance = formatDistance(new Date(jobData.created), new Date(), {
    addSuffix: true,
  });

  const handleBackButtonClick = () => {
    window.history.back();
  };

  return (
    <Card sx={{ mt: 2, boxShadow: 0 }} onClick={() => console.log(jobData)}>
      <CardContent>
        <Typography variant="h4" component="div">
          {jobData.title}
        </Typography>

        <Typography variant="h5" color="text.secondary">
          {jobData.contract_type}
        </Typography>

        <Typography variant="h6" color="text.secondary">
          {jobData.company.display_name}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`${jobData.location.display_name} - ${dateDistance}`}
        </Typography>

        <Typography variant="body1">{jobData.description}</Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          variant="outlined"
          onClick={handleBackButtonClick}
          sx={{ [theme.breakpoints.up("md")]: { display: "none" } }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          href={`${jobData.redirect_url}`}
          target="blank"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
