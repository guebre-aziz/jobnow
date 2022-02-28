import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import LogoIconMin from "../../assets/images/logo-icon-min.svg";
import Box from "@mui/material/Box";

const LogoContainer = styled(Box)(({ theme }) => ({
  width: theme.spacing(16),
  padding: theme.spacing(0.4),
  transition: "all 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

export default function HomeButton() {
  return (
    <Link to={"/"}>
      <LogoContainer
        component="div"
        sx={{
          maxHeight: "3rem",
          maxWidth: "3rem",
          mr: 2,
          display: { xs: "none", md: "flex" },
        }}
      >
        <img src={LogoIconMin} alt="logo-image" style={{ maxWidth: "100%" }} />
      </LogoContainer>
    </Link>
  );
}
