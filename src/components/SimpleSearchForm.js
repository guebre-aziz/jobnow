import React from "react";
import { Grid, TextField, InputAdornment, MenuItem } from "@mui/material";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { countryData } from "../common/data/formData";

export default function SimpleSearchForm(props) {
  const { jobsData, handleSubmit, handleFieldsChanges, country, what, where } =
    props;

  return (
    <Grid
      container
      justifyContent={"space-around"}
      spacing={4}
      sx={{
        p: 2,
      }}
    >
      <Grid component="form" onSubmit={handleSubmit} item xs={12} md={6} lg={4}>
        <TextField
          id="country-field-id"
          name="country-field-id"
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
      <Grid component="form" onSubmit={handleSubmit} item xs={12} md={6} lg={4}>
        <TextField
          id="what-field-id"
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
      <Grid component="form" onSubmit={handleSubmit} item xs={12} md={6} lg={4}>
        <TextField
          id="where-field-id"
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
        <LoadingButton
          onClick={jobsData.refetch}
          loading={jobsData.isLoading}
          endIcon={<SearchIcon />}
          loadingPosition="end"
          variant="contained"
        >
          search
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
