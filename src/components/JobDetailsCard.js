import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import { formatDistance } from "date-fns";
import { useTheme } from "@emotion/react";
import useMyListStore from "../common/customHook/useMyListStore";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

export default function JobDetailsCard(props) {
  const theme = useTheme();
  const { isJobOnMyList, addJobToMylist, removeJobFromMyList } =
    useMyListStore();
  const jobData = props.selectedJobData;
  const dateDistance = formatDistance(new Date(jobData.created), new Date(), {
    addSuffix: true,
  });

  const favorite = isJobOnMyList(jobData.id);

  const handleBackButtonClick = () => {
    window.history.back();
  };

  const handleAddButton = () => {
    addJobToMylist(jobData);
  };

  const handleRemoveButton = () => {
    removeJobFromMyList(jobData.id);
  };

  return (
    <Card sx={{ mt: 2, boxShadow: 0 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {favorite && (
            <Box sx={{ pr: 1, display: "inline-block" }}>
              <FavoriteRoundedIcon sx={{ color: "red" }} />
            </Box>
          )}
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
        {favorite ? (
          <Button variant="outlined" color="error" onClick={handleRemoveButton}>
            Remove from Mylist
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleAddButton}>
            Add to Mylist
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
