import theMuseAPI from "../axios/theMuseApi";

export const fetchJobs = async (queryKey) => {
  console.log(queryKey);
  const res = await theMuseAPI.get("/jobs", {
    params: queryKey,
  });
  return res.data;
};

export const fetchJobId = async (jobId) => {
  const res = await theMuseAPI.get("/jobs", {
    params: jobId,
  });
  return res.data;
};

// companies list to fetch

//
