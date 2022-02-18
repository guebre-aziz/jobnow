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
  FormControl,
} from "@mui/material";

import { fetchCategories, fetchJobs } from "../common/utils/asyncfuncs";
import { useQuery } from "react-query";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import {
  countryData,
  sortingData,
  maxDistanceData,
} from "../common/data/formData";
import LoadingButton from "@mui/lab/LoadingButton";

const app_id = "8028b95d";
const app_key = "e55f767e4b51e106e03219958f6ef82d";

export default function AdvancedSearchForm(props) {
  const {
    jobsData,
    handleSubmit,
    handleFieldsChanges,
    country,
    what,
    where,
    category,
    mustToBeInclude,
    maxDaysOld,
    sortBy,
    maxDistance,
  } = props;

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
      /* enabled: false, */
      staleTime: 300000000,
      retry: 1,
    }
  );
  return (
    <>
      <Grid
        container
        justifyContent={"space-around"}
        spacing={4}
        sx={{
          p: 2,
        }}
      >
        <Grid
          component="form"
          onSubmit={handleSubmit}
          item
          xs={12}
          md={6}
          lg={4}
        >
          <TextField
            id="countryFieldId"
            name="countryFieldId"
            placeholder="Country"
            label="Country"
            variant="outlined"
            select
            size="small"
            value={country}
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
              <MenuItem key={country.IsoCode} value={country.IsoCode} sx={{}}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          component="form"
          onSubmit={handleSubmit}
          item
          xs={12}
          md={6}
          lg={4}
        >
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
        <Grid
          component="form"
          onSubmit={handleSubmit}
          item
          xs={12}
          md={6}
          lg={4}
        >
          <TextField
            id="categoryFieldId"
            name="categoryFieldId"
            placeholder="Category"
            label="Category"
            variant="outlined"
            select
            size="small"
            value={category}
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
                <MenuItem key={category.tag} value={category.tag}>
                  {category.label}
                </MenuItem>
              ))
            ) : (
              <p>select country first</p>
            )}
          </TextField>
        </Grid>
        <Grid
          component="form"
          onSubmit={handleSubmit}
          item
          xs={12}
          md={6}
          lg={4}
        >
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
        <Grid
          component="form"
          onSubmit={handleSubmit}
          item
          xs={12}
          md={6}
          lg={4}
        >
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

        <Grid
          component="form"
          onSubmit={handleSubmit}
          item
          xs={12}
          md={6}
          lg={4}
        >
          <TextField
            id="max-days-field-id"
            placeholder="e.g. 5"
            label="Max days after pubblication"
            variant="outlined"
            size="small"
            value={maxDaysOld}
            onChange={handleFieldsChanges}
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
        <Grid
          component="form"
          onSubmit={handleSubmit}
          item
          xs={12}
          md={6}
          lg={4}
        >
          <TextField
            id="sortFieldId"
            name="sortFieldId"
            placeholder=""
            label="Sort by"
            variant="outlined"
            select
            size="small"
            value={sortBy}
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
        <LoadingButton
          onClick={jobsData.refetch}
          loading={jobsData.isLoading}
          endIcon={<SearchIcon />}
          loadingPosition="end"
          variant="contained"
        >
          search
        </LoadingButton>
      </Box>
    </>
  );
}
