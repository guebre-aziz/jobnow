import React from "react";
import { Typography, Card, CardContent, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDistance } from "date-fns";
import { useTheme } from "@emotion/react";

export default function JobCard(props) {
  const { jobData, selectedJob, handleSelectedJob } = props;
  const navigate = useNavigate();
  const theme = useTheme();
  const selectedJobColor = () =>
    selectedJob === jobData.id ? "primary.main" : "inherit";
  const dateDistance = formatDistance(new Date(jobData.created), new Date(), {
    addSuffix: true,
  });

  const handleCardClick = () => {
    sessionStorage.setItem("selectedJobId", jobData.id);
    if (window.innerWidth <= theme.breakpoints.values.md) {
      // change route only with screen size less than "md"
      navigate(`/job-details/${jobData.id}`);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      variant="outlined"
      sx={{
        m: 1,
        mr: 2,
        boxShadow: 0,
        backgroundColor: `${selectedJobColor()}`,
      }}
    >
      <CardActionArea>
        <CardContent onClick={() => handleSelectedJob(jobData.id)}>
          <Typography variant="h6" component="div">
            {jobData.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {jobData.company.display_name}
          </Typography>
          <Typography color="text.secondary">
            {jobData.location.display_name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" align="right">
            {dateDistance}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
