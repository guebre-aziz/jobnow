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
import { Link } from "react-router-dom";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
import { useNavigate } from "react-router-dom";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

export default function JobCard(props) {
  const { jobData, selectedJob } = props;
  const navigate = useNavigate();
  const selectedJobColor = () =>
    selectedJob === jobData.id ? "primary.main" : "inherit";

  const dateDistance = formatDistance(new Date(jobData.created), new Date(), {
    addSuffix: true,
  });

  const handleCardClick = () => {
    if (window.innerWidth <= 768) {
      // change route only with screen size less than 768px "md"
      navigate(`/job-details/${jobData.id}`);
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      variant="outlined"
      sx={{
        mt: 2,
        mr: 2,
        boxShadow: 0,
        backgroundColor: `${selectedJobColor()}`,
      }}
    >
      <CardActionArea>
        <CardContent onClick={() => props.handleSelectedJob(jobData.id)}>
          <Typography variant="h6">{jobData.title}</Typography>
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
