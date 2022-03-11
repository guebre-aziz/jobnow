import React, { useState, useEffect } from "react";
import { Container, useForkRef } from "@mui/material";
import { useQuery } from "react-query";
import { fetchJobs } from "../common/utils/asyncfuncs";
import client from "../common/utils/reactQueryClient";
import Error from "../components/Error";
import SearchSection from "../components/SearchSection";
import ResultsSection from "../components/ResultsSection";
import { maxDistanceData } from "../common/data/formData";

export default function SearchJobsPage() {
  const [country, setCountry] = useState("it");
  const [what, setWhat] = useState("");
  const [category, setCategory] = useState("");
  const [where, setWhere] = useState("");
  const [mustToBeInclude, setMustToBeInclude] = useState("");
  const [whatExclude, setWhatExclude] = useState("");
  const [maxDaysOld, setMaxDaysOld] = useState("");
  const [sortBy, setSort] = useState("date");
  const [maxDistance, setMaxDistance] = useState(maxDistanceData.min);
  const [page, setPage] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Paneltab
  const [tabPanelValue, setTabPanelValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabPanelValue(newValue);
    setPage(1); // reset results pagination on tab changing
  };
  const handleChangeTabIndex = (index) => {
    setTabPanelValue(index);
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
    what_exclude: whatExclude,
    max_days_old: maxDaysOld,
    sort_by: sortBy,
    distance: maxDistance,
    app_id: process.env.REACT_APP_APP_ID,
    app_key: process.env.REACT_APP_APP_KEY,
    results_per_page: 20,
  };

  // returned params depend on wich panel is active
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
        tabPanelValue: tabPanelValue,
        country: country,
        page: page,
        params: selectedParams(),
      },
    ],
    ({ queryKey }) => fetchJobs(queryKey[1]),
    {
      enabled: false,
      retry: 2,
    }
  );

  // handleSelectedJob
  const handleSelectedJob = (jobId) => {
    setSelectedJobId(jobId);
  };

  const selectedJobData = () => {
    if (jobsData.data) {
      return jobsData.data.results.find((item) => item.id === selectedJobId);
    }
  };

  // handle texts fields
  const handleFieldsChanges = (event) => {
    const name = event.target.name;
    const id = event.target.id;
    const value = event.target.value;
    switch (id || name) {
      case "where-field-id":
        setWhere(value);
        break;
      case "what-field-id":
        setWhat(value);
        break;
      case "category-field-id":
        setCategory(value);
        break;
      case "must-to-be-include-field-id":
        setMustToBeInclude(value);
        break;
      case "what-exclude-field-id":
        setWhatExclude(value);
        break;
      case "max-days-field-id":
        setMaxDaysOld(value);
        break;
      case "country-field-id":
        setCountry(value);
        break;
      case "sort-field-id":
        setSort(value);
        break;
      case "max-distance-field-id":
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

  // Pick last params from cache on mount
  useEffect(() => {
    const data = client.getQueriesData("jobsData");
    const lastCacheItem = data.length - 1; // It may exist more than one "jobsData" cache.
    const cacheParams = data[lastCacheItem][0][1];

    if (cacheParams.tabPanelValue) setTabPanelValue(cacheParams.tabPanelValue);
    if (cacheParams.page) setPage(cacheParams.page);
    if (cacheParams.country) setCountry(cacheParams.country);
    if (cacheParams.params?.what) setWhat(cacheParams.params.what);
    if (cacheParams.params?.where) setWhere(cacheParams.params.where);
    if (cacheParams.params?.category) setCategory(cacheParams.params.category);
    if (cacheParams.params?.what_and)
      setMustToBeInclude(cacheParams.params.what_and);
    if (cacheParams.params?.whatExclude)
      setWhatExclude(cacheParams.params.whatExclude);
    if (cacheParams.params?.max_days_old)
      setMaxDaysOld(cacheParams.params.max_days_old);
    if (cacheParams.params?.sort_by) setSort(cacheParams.params.sort_by);
    if (cacheParams.params?.distance)
      setMaxDistance(cacheParams.params.distance);
  }, []);

  useEffect(() => {
    const sessionSelectedJobId = sessionStorage.getItem("selectedJobId"); // session storage set by JobCard component
    if (sessionSelectedJobId) {
      setSelectedJobId(sessionSelectedJobId);
    }
  }, []);

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
        whatExclude={whatExclude}
        maxDaysOld={maxDaysOld}
        sortBy={sortBy}
        maxDistance={maxDistance}
        tabPanelValue={tabPanelValue}
        setTabPanelValue={setTabPanelValue}
        handleChangeTab={handleChangeTab}
        handleChangeTabIndex={handleChangeTabIndex}
      />

      <ResultsSection
        jobsData={jobsData}
        selectedJobData={selectedJobData}
        selectedJobId={selectedJobId}
        handleSelectedJob={handleSelectedJob}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
}
