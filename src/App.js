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
import NotFoundPage from "./pages/notFoundPage/NotFoundFound";
import ResponsiveAppBar from "./components/AppBar";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";
import Footer from "./components/Footer";
const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/search-jobs" element={<SearchJobsPage />} />
              <Route path="/job-details" element={<JobDetails />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
