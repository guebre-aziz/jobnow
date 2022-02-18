import * as React from "react";
import AppBar from "@mui/material/AppBar";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LogoIconMin from "../assets/images/logo-icon-min.svg";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

const pages = ["Home", "Search", "Profile"];
const settings = ["Profile", "MyList", "Setting"];

const LogoContainer = styled(Box)(({ theme }) => ({
  width: theme.spacing(16),
  padding: theme.spacing(0.4),
  transition: "all 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

function LinkTab(props) {
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        navigate(props.href);
      }}
      {...props}
    />
  );
}

console.log(process.env.REACT_APP_APP_ID);
export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [tabValue, setTabValue] = React.useState(0);

  const handleTab = (event, newValue) => {
    console.log(newValue);
    setTabValue(newValue);
  };

  return (
    <AppBar position="static" color="light_grey" sx={{ boxShadow: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              <img
                src={LogoIconMin}
                alt="logo-image"
                style={{ maxWidth: "100%" }}
              />
            </LogoContainer>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Link to={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <img
                src={LogoIconMin}
                alt="logo-image"
                style={{ maxWidth: "3rem", padding: "5px" }}
              />
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tabValue}
                onChange={handleTab}
                aria-label="nav tabs example"
              >
                <LinkTab label="Search" href="/search-jobs" />
              </Tabs>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
