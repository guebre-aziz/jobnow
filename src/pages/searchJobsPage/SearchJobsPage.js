import React from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  Input,
  InputBase,
  Box,
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Paper,
  Slider,
  Pagination,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./searchJobsPagestyledComponents";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import {
  countryData,
  sortingData,
  maxDistanceData,
} from "../../common/data/formData";
import { flexbox } from "@mui/system";
import { useQuery } from "react-query";
import { fetchCategories, fetchJobs } from "../../common/utils/asyncfuncs";
import JobsListing from "../../components/JobsListing";
import JobDetails from "../../components/JobDetails";
import { useState } from "react";

const app_id = "8028b95d";
const app_key = "e55f767e4b51e106e03219958f6ef82d";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function SearchJobsPage() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  // Tab
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeTabIndex = (index) => {
    setValue(index);
  };

  const [country, setCountry] = React.useState("it");
  const [what, setWhat] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [where, setWhere] = React.useState("");
  const [mustToBeInclude, setMustToBeInclude] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [maxDaysOld, setMaxDaysOld] = React.useState(null);
  const [sort, setSort] = React.useState("");
  const [maxDistance, setMaxDistance] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [selectedJob, setSelectedJob] = useState(null);

  // handleSelectedJob
  const handleSelectedJob = (jobId) => {
    setSelectedJob(jobId);
  };

  // simple fetch param
  const simpleSearchParams = {
    what: what,
    where: where,
    app_id: app_id,
    app_key: app_key,
    results_per_page: 20,
  };

  // advanced fetch param
  const advancedSearchParams = {
    country: country,
    what: what,
    category: category,
    where: where,
    what_and: mustToBeInclude,
    company: company,
    max_days_old: maxDaysOld,
    results_per_page: 20,
  };

  // get categories
  const categoriesData = useQuery(
    [
      "categoryData",
      {
        country: country,
        params: { app_id: app_id, app_key: app_key },
      },
    ],
    ({ queryKey }) => fetchCategories(queryKey[1]),
    {
      enabled: false,
      staleTime: 300000000,
      retry: 1,
    }
  );

  // get jobs data
  const jobsData = useQuery(
    [
      "jobsData",
      {
        country: country,
        page: page,
        params: simpleSearchParams,
      },
    ],
    ({ queryKey }) => fetchJobs(queryKey[1]),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: 30000000,
      retry: 1,
    }
  );

  const selectedJobData = () => {
    if (jobsData.data) {
      return jobsData.data.results.filter((item) => item.id === selectedJob);
    }
  };

  //handle pagination
  const handlePage = (event, value) => {
    setPage(value);
    setTimeout(() => {
      jobsData.refetch();
    }, 100);
  };

  const paginationCount = () => {
    if (jobsData.data) {
      return Math.floor(jobsData.data.count / 20);
    } else return 0;
  };

  const handleFieldsChanges = (event) => {
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    switch (id || name) {
      case "whereFieldId":
        setWhere(value);
        break;
      case "whatFieldId":
        setWhat(value);
        break;
      case "categoryFieldId":
        setCategory(value);
        break;
      case "mustToBeIncludeFieldId":
        setMustToBeInclude(value);
        break;
      case "companyFieldId":
        setCompany(value);
        break;
      case "max-days-fiald-id":
        setMaxDaysOld(value);
        break;
      case "countryFieldId":
        setCountry(value);
        break;
      case "sortFieldId":
        setSort(value);
        break;
      case "maxDistance":
        setMaxDistance(value);
        break;
    }
  };

  return (
    <>
      <Container component={"div"} maxWidth="xl" sx={{ height: "100vh" }}>
        <Box
          sx={{
            maxWidth: "xl",
            mt: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          >
            <AppBar position="static" sx={{ boxShadow: 0 }}>
              <Tabs
                value={value}
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
              index={value}
              onChangeIndex={handleChangeTabIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Grid
                  container
                  justifyContent={"space-around"}
                  spacing={4}
                  sx={{
                    p: 2,
                  }}
                >
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="whatFieldId"
                      placeholder="e.g. Fullstack developer"
                      label="Job title"
                      variant="outlined"
                      size="small"
                      value={what}
                      onChange={handleFieldsChanges}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WorkRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="whereFieldId"
                      placeholder="city, region, postal code ect.."
                      label="Where"
                      variant="outlined"
                      size="small"
                      value={where}
                      onChange={handleFieldsChanges}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={1}>
                    <Button
                      onClick={jobsData.refetch}
                      variant="contained"
                      sx={{ boxShadow: 0 }}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={value} index={1} dir={theme.direction}>
                <Grid
                  container
                  justifyContent={"space-around"}
                  spacing={4}
                  sx={{
                    p: 2,
                  }}
                >
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="countryFieldId"
                      name="countryFieldId"
                      placeholder="Country"
                      label="Country"
                      variant="outlined"
                      select
                      size="small"
                      onChange={handleFieldsChanges}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PublicRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {countryData.map((country) => (
                        <MenuItem
                          key={country.IsoCode}
                          value={country.IsoCode}
                          sx={{}}
                        >
                          {country.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="whatFieldId"
                      placeholder="e.g. Fullstack developer"
                      label="Job title"
                      variant="outlined"
                      size="small"
                      value={what}
                      onChange={handleFieldsChanges}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <WorkRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="categoryFieldId"
                      name="categoryFieldId"
                      placeholder="Category"
                      label="Category"
                      variant="outlined"
                      select
                      size="small"
                      onChange={handleFieldsChanges}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CategoryRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {categoriesData.isSuccess ? (
                        categoriesData.data.results.map((category) => (
                          <MenuItem
                            key={category.tag}
                            value={category.tag}
                            sx={{}}
                          >
                            {category.label}
                          </MenuItem>
                        ))
                      ) : (
                        <p>(select country first)</p>
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="whereFieldId"
                      placeholder="city, region, postal code ect.."
                      label="Where"
                      variant="outlined"
                      size="small"
                      value={where}
                      onChange={handleFieldsChanges}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="mustToBeIncludeFieldId"
                      placeholder="e.g. Start-up, React"
                      label="Must include"
                      variant="outlined"
                      size="small"
                      value={mustToBeInclude}
                      onChange={handleFieldsChanges}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VisibilityRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="companyFieldId"
                      placeholder=""
                      label="In this company"
                      variant="outlined"
                      size="small"
                      value={company}
                      onChange={handleFieldsChanges}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="max-days-fiald-id"
                      placeholder="e.g. 5"
                      label="Max days after pubblication"
                      variant="outlined"
                      size="small"
                      value={maxDaysOld}
                      type={"number"}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ReplayRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <TextField
                      id="sortFieldId"
                      name="sortFieldId"
                      placeholder=""
                      label="Sort by"
                      variant="outlined"
                      select
                      size="small"
                      value={sort}
                      onChange={handleFieldsChanges}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FilterListRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {sortingData.map((sort) => (
                        <MenuItem key={sort.value} value={sort.value} sx={{}}>
                          {sort.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Box
                      sx={{
                        pl: 2,
                        pr: 2,
                      }}
                    >
                      <Typography variant="caption">Max distance</Typography>
                      <Slider
                        name="maxDistance"
                        aria-label="Max distance"
                        valueLabelDisplay="auto"
                        value={maxDistance}
                        onChange={handleFieldsChanges}
                        step={10}
                        marks={maxDistanceData.marks}
                        min={maxDistanceData.min}
                        max={maxDistanceData.max}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: "flex ", justifyContent: "center" }}>
                  <Button variant="contained" sx={{ boxShadow: 0 }}>
                    Search
                  </Button>
                </Box>
              </TabPanel>
            </SwipeableViews>
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            mt: 4,
            p: 2,
            borderRadius: 2,
            maxHeight: "90vh",
          }}
        >
          {jobsData.data && (
            <Grid container spacing={2} sx={{ height: "90vh" }}>
              <Grid item xs={12}>
                <Typography variant="h6" color="primary.main">
                  {jobsData.data.count + " results:"}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ overflowY: "scroll", maxHeight: "85vh" }}>
                <Box>
                  <Pagination
                    count={paginationCount()}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handlePage}
                  />
                  <JobsListing
                    jobsData={jobsData}
                    handleSelectedJob={handleSelectedJob}
                  />
                  <Pagination
                    count={paginationCount()}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handlePage}
                  />
                </Box>
              </Grid>
              <Grid item xs={8}>
                {selectedJobData()[0] && (
                  <JobDetails selectedJobData={selectedJobData()} />
                )}
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}
