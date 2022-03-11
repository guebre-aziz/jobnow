import React from "react";
import { Typography, Box } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SimpleSearchForm from "./SimpleSearchForm";
import AdvancedSearchForm from "./AdvancedSearchForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function SearchSection(props) {
  const theme = useTheme();

  const {
    jobsData,
    handleFieldsChanges,
    country,
    what,
    where,
    category,
    mustToBeInclude,
    whatExclude,
    maxDaysOld,
    sortBy,
    maxDistance,
    tabPanelValue,
    setTabPanelValue,
    handleChangeTab,
    handleChangeTabIndex,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    jobsData.refetch();
  };

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <AppBar position="static" sx={{ boxShadow: 0 }}>
          <Tabs
            value={tabPanelValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Search" {...a11yProps(0)} />
            <Tab label="Advanced research" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={tabPanelValue}
          onChangeIndex={handleChangeTabIndex}
        >
          <TabPanel value={tabPanelValue} index={0} dir={theme.direction}>
            <SimpleSearchForm
              jobsData={jobsData}
              handleSubmit={handleSubmit}
              handleFieldsChanges={handleFieldsChanges}
              what={what}
              where={where}
            />
          </TabPanel>

          <TabPanel value={tabPanelValue} index={1} dir={theme.direction}>
            <AdvancedSearchForm
              jobsData={jobsData}
              handleSubmit={handleSubmit}
              handleFieldsChanges={handleFieldsChanges}
              country={country}
              what={what}
              where={where}
              category={category}
              mustToBeInclude={mustToBeInclude}
              whatExclude={whatExclude}
              maxDaysOld={maxDaysOld}
              sortBy={sortBy}
              maxDistance={maxDistance}
            />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Box>
  );
}
