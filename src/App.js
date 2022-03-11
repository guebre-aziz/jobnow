import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import LandingPage from "./pages/LandingPage";

import SearchJobsPage from "./pages/SearchJobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import NotFoundPage from "./pages/NotFoundFound";
import ResponsiveAppBar from "./components/app-bar/AppBar";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";
import Footer from "./components/Footer";
import client from "./common/utils/reactQueryClient";
import MyListPage from "./pages/MyListPage";

export default function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/search-jobs" element={<SearchJobsPage />} />
              <Route path="/my-list" element={<MyListPage />} />
              <Route path="/job-details/:id" element={<JobDetailsPage />} />
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
