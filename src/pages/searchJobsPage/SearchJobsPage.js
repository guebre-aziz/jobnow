import React from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  Input,
  InputBase,
  Box,
  Pagination,
  FormControl,
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useQuery } from "react-query";
import { fetchCategories, fetchJobs } from "../../common/utils/asyncfuncs";
import JobsListing from "../../components/JobsListing";
import JobDetails from "../../components/JobDetails";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SimpleSearchForm from "../../components/SimpleSearchForm";
import AdvancedSearchForm from "../../components/AdvancedSearchForm";

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

export default function SearchJobsPage() {
  const theme = useTheme();
  const [tabPanelValue, setValue] = React.useState(0);

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
  const [maxDaysOld, setMaxDaysOld] = React.useState(null);
  const [sortBy, setSort] = React.useState("");
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
    app_id: process.env.REACT_APP_APP_ID,
    app_key: process.env.REACT_APP_APP_KEY,
    results_per_page: 20,
  };

  // advanced fetch param
  const advancedSearchParams = {
    what: what,
    category: category,
    where: where,
    what_and: mustToBeInclude,
    max_days_old: maxDaysOld,
    distance: maxDistance,
    app_id: process.env.REACT_APP_APP_ID,
    app_key: process.env.REACT_APP_APP_KEY,
    results_per_page: 20,
  };

  const selectedParams = () => {
    let params = {};
    if (tabPanelValue === 0) {
      params = simpleSearchParams;
    }
    if (tabPanelValue === 1) {
      params = advancedSearchParams;
    }
    return params;
  };

  // get jobs data
  const jobsData = useQuery(
    [
      "jobsData",
      {
        country: country,
        page: page,
        params: selectedParams(),
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

  // handle pagination
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

  // handle texts fields
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
      case "max-days-field-id":
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
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    jobsData.refetch();
  };

  return (
    <>
      <Container
        component={"div"}
        maxWidth="xl"
        sx={{ /* height: "100vh" */ mb: 2 }}
      >
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
                  maxDaysOld={maxDaysOld}
                  sortBy={sortBy}
                  maxDistance={maxDistance}
                />
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
          <Grid container spacing={2} sx={{ height: "90vh" }}>
            {jobsData.isLoading && (
              <Grid item xs={12}>
                <Loading />
              </Grid>
            )}
            {jobsData.data && (
              <>
                <Grid item xs={12}>
                  {jobsData.data.results.length > 0 ? (
                    <Typography variant="h6" color="primary.main">
                      {jobsData.data && jobsData.data.count + " results:"}
                    </Typography>
                  ) : (
                    <Typography variant="h6" color="primary.main">
                      No jobs found.
                    </Typography>
                  )}
                </Grid>
                {jobsData.data.results.length > 0 && (
                  <Grid
                    item
                    xs={4}
                    sx={{ overflowY: "scroll", maxHeight: "85vh" }}
                  >
                    <Box>
                      <Pagination
                        count={paginationCount()}
                        variant="outlined"
                        shape="rounded"
                        size="small"
                        page={page}
                        onChange={handlePage}
                      />
                      <JobsListing
                        jobsData={jobsData}
                        selectedJob={selectedJob}
                        handleSelectedJob={handleSelectedJob}
                      />
                      <Pagination
                        count={paginationCount()}
                        variant="outlined"
                        shape="rounded"
                        size="small"
                        page={page}
                        onChange={handlePage}
                        sx={{ mt: 2 }}
                      />
                    </Box>
                  </Grid>
                )}
                <Grid item xs={8}>
                  {selectedJobData()[0] && (
                    <JobDetails selectedJobData={selectedJobData()} />
                  )}
                </Grid>
              </>
            )}
            {jobsData.isError && <Error error={jobsData.error} />}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
