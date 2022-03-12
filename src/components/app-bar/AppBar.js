import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  Tabs,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import LinkTab from "./LinkTab";
import HomeButton from "./HomeButton";

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(0);
  };

  const [tabValue, setTabValue] = useState(0);

  const handleTab = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    // lowlight appbar buttons when we move to "/"
    if (location.pathname === "/") {
      setTabValue(-1);
    }
    if (location.pathname === "/search-jobs") {
      setTabValue(0);
    }
    if (location.pathname === "/my-list") {
      setTabValue(1);
    }
  }, [location.pathname]);

  return (
    <AppBar position="static" color="light_grey" sx={{ boxShadow: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <HomeButton />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu-appbar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                key="search"
                name="search"
                onClick={() => navigate("/search-jobs")}
              >
                <Typography textAlign="center">Search</Typography>
              </MenuItem>
              <MenuItem
                key="mylist"
                name="mylist"
                onClick={() => navigate("/my-list")}
              >
                <Typography textAlign="center">Mylist</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box sx={{ width: "100%" }}>
              <Tabs value={tabValue} onChange={handleTab} aria-label="nav tabs">
                <LinkTab label="Search" href="/search-jobs" />
                <LinkTab label="My list" href="/my-list" />
              </Tabs>
            </Box>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Box sx={{ display: { sx: "flex", md: "none" } }}>
              <HomeButton />
            </Box>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
