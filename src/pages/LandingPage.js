import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import { alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoIcon from "../assets/images/logo-icon.svg";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  let navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");

  const handleSearchButton = () => {
    navigate("/search-jobs");
  };
  const handleOnChange = (e) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container
      component={"div"}
      maxWidth="xl"
      sx={{ height: "100vh", backgroundColor: "dark_grey.main", mt: 0.8 }}
    >
      <Grid
        container
        spacing={1}
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid item sx={{ width: 300, mt: 4 }}>
          <img src={LogoIcon} alt="logo-icon" style={{ maxWidth: "100%" }} />
        </Grid>
        <Grid item sx={{ m: 10 }}>
          <Typography variant="h5" color="white">
            Search and find open jobs positions, everywhere.
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" size="large" onClick={handleSearchButton}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
