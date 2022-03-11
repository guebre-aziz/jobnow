import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDistance } from "date-fns";

export default function JobCard(props) {
  const { jobData, removeJobFromMyList } = props;
  const navigate = useNavigate();

  const dateDistance = formatDistance(new Date(jobData.created), new Date(), {
    addSuffix: true,
  });

  const handleCardClick = () => {
    navigate(`/job-details/${jobData.id}`);
  };

  const handleRemoveButton = () => {
    removeJobFromMyList(jobData.id);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        m: 1,
        mr: 2,
        boxShadow: 0,
      }}
    >
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography variant="h6" noWrap>
            {jobData.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" noWrap>
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
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={handleRemoveButton}
        >
          remove
        </Button>
      </CardActions>
    </Card>
  );
}
