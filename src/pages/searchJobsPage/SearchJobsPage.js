import React, { useState, useEffect } from "react";
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
import JobsListing from "../../components/jobs-listing/JobsListing";
import JobDetailsCard from "../../components/JobDetailsCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import LoadingButton from "@mui/lab/LoadingButton";
import SimpleSearchForm from "../../components/SimpleSearchForm";
import AdvancedSearchForm from "../../components/AdvancedSearchForm";
import SearchSection from "../../components/SearchSection";

/* function TabPanel(props) {
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
} */

export default function SearchJobsPage() {
  const theme = useTheme();

  // Tab
  const [tabPanelValue, setTabPanelValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabPanelValue(newValue);
  };
  const handleChangeTabIndex = (index) => {
    setTabPanelValue(index);
  };

  const [country, setCountry] = useState("it");
  const [what, setWhat] = useState("");
  const [category, setCategory] = useState("");
  const [where, setWhere] = useState("");
  const [mustToBeInclude, setMustToBeInclude] = useState("");
  const [maxDaysOld, setMaxDaysOld] = useState(null);
  const [sortBy, setSort] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [page, setPage] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // handleSelectedJob
  const handleSelectedJob = (jobId) => {
    setSelectedJobId(jobId);
  };

  // simple fetch params
  const simpleSearchParams = {
    what: what,
    where: where,
    app_id: process.env.REACT_APP_APP_ID,
    app_key: process.env.REACT_APP_APP_KEY,
    results_per_page: 20,
  };

  // advanced fetch params
  const advancedSearchParams = {
    what: what,
    category: category,
    where: where,
    what_and: mustToBeInclude,
    max_days_old: maxDaysOld,
    sortBy: sortBy,
    distance: maxDistance,
    app_id: process.env.REACT_APP_APP_ID,
    app_key: process.env.REACT_APP_APP_KEY,
    results_per_page: 20,
  };

  const selectedParams = () => {
    let params = {};
    if (tabPanelValue === 0) {
      // simple search panel
      params = simpleSearchParams;
    }
    if (tabPanelValue === 1) {
      // advanced search panel
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
        params: selectedParams(), // returned params depend on wich panel we are
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
      return jobsData.data.results.find((item) => item.id === selectedJobId);
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
  const PaginationBox = () => (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        count={paginationCount()}
        variant="outlined"
        shape="rounded"
        size="small"
        page={page}
        onChange={handlePage}
      />
    </Box>
  );

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

  // auto select first item on data change
  useEffect(() => {
    if (jobsData.data) {
      setSelectedJobId(jobsData.data.results[0].id);
    }
  }, [jobsData.data]);

  return (
    <Container component={"div"} maxWidth="xl" sx={{ mb: 2 }}>
      <SearchSection
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
        tabPanelValue={tabPanelValue}
        setTabPanelValue={setTabPanelValue}
        handleChangeTab={handleChangeTab}
        handleChangeTabIndex={handleChangeTabIndex}
      />

      <Box
        sx={{
          width: "100%",
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
                  sm={12}
                  md={4}
                  sx={{ overflowY: "auto", maxHeight: "85vh" }}
                >
                  <Box>
                    <PaginationBox />
                    <JobsListing
                      jobsData={jobsData}
                      selectedJob={selectedJobId}
                      handleSelectedJob={handleSelectedJob}
                    />
                    <PaginationBox />
                  </Box>
                </Grid>
              )}
              <Grid
                item
                md={8}
                sx={{
                  overflowY: "auto",
                  maxHeight: "85vh",
                  [theme.breakpoints.down("md")]: { display: "none" },
                }}
              >
                {selectedJobData() && (
                  <JobDetailsCard selectedJobData={selectedJobData()} />
                )}
              </Grid>
            </>
          )}
          {jobsData.isError && <Error error={jobsData.error} />}
        </Grid>
      </Box>
    </Container>
  );
}
