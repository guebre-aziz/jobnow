import React, { useEffect } from "react";
import FavoriteJobCard from "../components/FavoriteJobCard";
import { Grid, Typography, Box, Pagination, Container } from "@mui/material";
import useMyListStore from "../common/customHook/useMyListStore";

export default function MyListPage() {
  const { myListData, removeJobFromMyList } = useMyListStore();

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Typography
        component={"div"}
        variant="h5"
        align="center"
        sx={{ backgroundColor: "primary.main", p: 2, borderRadius: 2 }}
      >
        MY FAVORITES JOBS LIST
        <Typography color={"dark_grey.main"}>
          (Data saved in your browser local storage)
        </Typography>
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          mt: 4,
          p: 2,
          borderRadius: 2,
          minHeight: "90vh",
        }}
      >
        <Grid container>
          {myListData.length ? (
            myListData.map((job) => {
              return (
                <Grid key={job.id} item xs={12} md={4}>
                  <FavoriteJobCard
                    jobData={job}
                    removeJobFromMyList={removeJobFromMyList}
                  />
                </Grid>
              );
            })
          ) : (
            <Typography variant="h4" align="center">
              No item yet on your list
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}
