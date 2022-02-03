import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { fetchJobs } from "./common/utils/asyncfuncs";
import { ReactQueryDevtools } from "react-query/devtools";
import LandingPage from "./pages/landingPage/LandingPage";
import HomePage from "./pages/homePage/HomePage";
import SearchJobsPage from "./pages/searchJobsPage/SearchJobsPage";
import JobDetails from "./pages/jobDetails/JobDetails";
import SearchCompaniesPage from "./pages/searchCompaniesPage/SearchCompaniesPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundFound";
import ResponsiveAppBar from "./components/AppBar";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";
const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
              <Route path="/example" element={<Example />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/search-jobs" element={<SearchJobsPage />} />
              <Route path="/job-details" element={<JobDetails />} />
              <Route
                path="/search-companies"
                element={<SearchCompaniesPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

const Example = () => {
  const [page, setPage] = useState(3);
  const { isLoading, error, data } = useQuery(
    ["repoData", { page: page }],
    ({ queryKey }) => fetchJobs(queryKey[1]),
    {
      staleTime: 300000,
      retry: 1,
    }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <div>
      {/* <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong> */}
    </div>
  );
};
